import OpenAI from "openai";
import { zodResponseFormat } from "openai/helpers/zod";
// import { ChatCompletionContentPart } from "openai/resources";
import { date, z } from "zod";

export enum CompletionModels {
  gpt4o = "gpt-4o",
  gpt4oMini = "gpt-4o-mini",
}

export async function transcribeImage(context: string, imageUrl: string) {
  const compl = await getStructuredCompletion({
    model: CompletionModels.gpt4o,
    system:
      "You are a helpful assistant. Your job is to transcribe journal entries. The date MUST be in the format YYYY/MM/DD. Do your best to create markdown for the content that matches the style of the content in the image.",
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
