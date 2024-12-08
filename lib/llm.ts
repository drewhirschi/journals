import { AzureOpenAI, OpenAI } from "openai";
import { date, z } from "zod";

import { zodResponseFormat } from "openai/helpers/zod";

// import { ChatCompletionContentPart } from "openai/resources";

export enum CompletionModels {
  gpt4o = "gpt-4o",
  gpt4oMini = "gpt-4o-mini",
}

export async function transcribeImage(context: string, imageUrl: string) {
  const compl = await getStructuredCompletion({
    model: CompletionModels.gpt4o,
    system: `Convert the provided image of journal entries into Markdown format appropriately separated into JSON objects.

# Steps 

1. Extract all text content from each journal entry in the provided image.
2. Identify and transform:
   - The date of each journal entry, represented in the format 'YYYY/MM/DD'.
   - The journal text content, formatted in Markdown.
3. Ensure all words and content is extracted for each entry. 
4. Structure each journal entry as a JSON object with the following keys:
   - 'date': the date of the entry, in 'YYYY/MM/DD' format.
   - 'content': The content of the journal entry, formatted in Markdown.
5. Combine all individual journal JSON objects into an array in the response. 
`,
    user: context,
    imageUrl,
    schema: z.object({
      entries: z.array(
        z.object({
          content: z.string(),
          date: z.string(),
        })
      ),
    }),
  });

  return compl;
}

interface CompletionOptions {
  system: string;
  user: string;
  model?: CompletionModels;
  imageUrl?: string;
  schemaName?: string;
}

interface StructuredCompletionOptions<Z extends z.ZodTypeAny>
  extends CompletionOptions {
  schema: Z;
}

export async function getStructuredCompletion<
  Z extends z.ZodTypeAny = z.ZodNever,
>({
  model = CompletionModels.gpt4o,
  system,
  user,
  schema,
  imageUrl,
  schemaName = "data",
}: StructuredCompletionOptions<Z>): Promise<z.infer<Z> | null> {
  const openai = new OpenAI({});

  try {
    const userMessageContent: Array<any> = [{ type: "text", text: user }];
    if (imageUrl) {
      userMessageContent.push({
        type: "image_url",
        image_url: { url: imageUrl },
      });
    }
    const response = await openai.beta.chat.completions.parse({
      model,
      messages: [
        { role: "system", content: system },
        { role: "user", content: userMessageContent },
      ],
      response_format: zodResponseFormat(schema, schemaName),
    });
    const responseParsed = response.choices[0].message.parsed;
    if (!responseParsed) {
      return null;
    }

    return responseParsed as z.infer<Z>;
  } catch (error) {
    console.error(error);
    return null;
  }
}

export async function getEmbedding(text: string): Promise<number[]> {
  const openai = new OpenAI({});

  const embedding = await openai.embeddings.create({
    model: "text-embedding-3-large",
    input: text,
  });
  return embedding.data[0].embedding;
}

export async function gptOCR({
  filePath,
  model = "gpt-4o",
}: {
  filePath: string;
  model?: "gpt-4o";
}) {
  const llm = new AzureOpenAI({
    apiKey: process.env.AZURE_OPENAI_KEY,
    deployment: model,
    baseURL: process.env.AZURE_OPENAI_URL,
    apiVersion: "2024-08-01-preview",
  });

  const systemPrompt = `You are an assistant that converts images of text into text for prosemirror.


Requirements:

  - Output Only html: Return solely the html for content without any additional explanations or comments.
  - Use h, u, and b tags for styled content.
  - No Delimiters: Do not use code fences or delimiters like \`\`\`markdown.
  - Complete Content: Do not omit any part of the page, including headers, footers, and subtext.
  `;

  const finalImageUrl = filePath;

  const output = await llm.chat.completions.create({
    model: model,
    messages: [
      {
        role: "user",
        content: [
          { type: "text", text: systemPrompt },
          {
            type: "image_url",
            image_url: {
              url: finalImageUrl,
            },
          },
        ],
      },
    ],
  });

  return output.choices[0].message.content;
}
