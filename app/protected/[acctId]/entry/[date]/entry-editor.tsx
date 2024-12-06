"use client"

import './styles.scss'

import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert'
import { Cloud, CloudUpload, Terminal } from 'lucide-react'
import { Editor, EditorContent, EditorEvents, EditorProvider, FloatingMenu, TiptapEditorHTMLElement, useCurrentEditor, useEditor } from '@tiptap/react'
import React, { useState } from 'react'
import { Row, Stack } from '@/components/layout-components'

import { Button } from '@/components/ui/button'
import { Color } from '@tiptap/extension-color'
import EntryImageUploader from './ImageUploader'
import InteractiveImage from '@/components/interactive-image'
import ListItem from '@tiptap/extension-list-item'
import { Markdown } from 'tiptap-markdown';
import { Navigation } from './Navigation'
import { Session } from '@supabase/supabase-js'
import StarterKit from '@tiptap/starter-kit'
import TextStyle from '@tiptap/extension-text-style'
import Underline from '@tiptap/extension-underline'
import { browswerClient } from '@/utils/supabase/client'
import { on } from 'events'
import { transcribeImage } from './actions'
import { useDebouncedCallback } from 'use-debounce';
import { useParams } from 'next/navigation'

const MenuBar = ({ editor }: { editor: Editor | null }) => {
    // const { editor } = useCurrentEditor()


    if (!editor) {
        return null
    }

    return (

        <div className="control-group">
            <Row spacing='tight' wrap>
                <Button
                    onClick={() => editor.chain().focus().toggleBold().run()}
                    disabled={
                        !editor.can()
                            .chain()
                            .focus()
                            .toggleBold()
                            .run()
                    }
                    variant={editor.isActive('bold') ? 'default' : 'secondary'}
                >
                    B
                </Button>
                <Button
                    onClick={() => editor.chain().focus().toggleItalic().run()}
                    disabled={
                        !editor.can()
                            .chain()
                            .focus()
                            .toggleItalic()
                            .run()
                    }
                    variant={editor.isActive('italic') ? 'default' : 'secondary'}
                >
                    I
                </Button>
                <Button
                    onClick={() => editor.chain().focus().toggleUnderline().run()}
                    disabled={
                        !editor.can()
                            .chain()
                            .focus()
                            .toggleUnderline()
                            .run()
                    }
                    variant={editor.isActive('underline') ? 'default' : 'secondary'}
                >
                    U
                </Button>


                {/* <Button onClick={() => editor.chain().focus().clearNodes().run()}>
                    Clear nodes
                </Button> */}
                {/* <Button
                    onClick={() => editor.chain().focus().setParagraph().run()}
                    variant={editor.isActive('paragraph') ? 'default' : 'secondary'}
                >
                    P
                </Button> */}
                <Button
                    onClick={() => editor.chain().focus().toggleHeading({ level: 1 }).run()}
                    variant={editor.isActive('heading', { level: 1 }) ? 'default' : 'secondary'}
                >
                    H1
                </Button>
                <Button
                    onClick={() => editor.chain().focus().toggleHeading({ level: 2 }).run()}
                    variant={editor.isActive('heading', { level: 2 }) ? 'default' : 'secondary'}
                >
                    H2
                </Button>
                <Button
                    onClick={() => editor.chain().focus().toggleHeading({ level: 3 }).run()}
                    variant={editor.isActive('heading', { level: 3 }) ? 'default' : 'secondary'}
                >
                    H3
                </Button>
                <Button
                    variant={'secondary'}
                    onClick={() => editor.chain().focus().unsetAllMarks().run()}>
                    Clear
                </Button>

            </Row>
        </div>
    )
}

const extensions = [
    // Color.configure({ types: [TextStyle.name, ListItem.name] }),
    // // @ts-ignore
    // TextStyle.configure({ types: [ListItem.name] }),
    StarterKit.configure({
        bulletList: {
            keepMarks: true,
            keepAttributes: false,
        },
        orderedList: {
            keepMarks: true,
            keepAttributes: false,
        },
    }),
    Markdown,
    Underline
]



export default ({ content, session, signedUrls }:
    {
        content: string | undefined | null, session: Session, signedUrls: {
            error: string | null;
            path: string | null;
            signedUrl: string;
        }[]
    }) => {
    const { acctId, date } = useParams()
    const supabase = browswerClient()
    const [error, setError] = useState<string | null>(null)
    const [saving, setSaving] = useState(false)

    const debouncedUpdate = useDebouncedCallback(
        async (update: EditorEvents["update"]) => {
            setSaving(true)
            await supabase.from("entries").upsert({
                content: update.editor.getHTML(),
                date: date as string,
                account_id: acctId as string
            })
            setSaving(false)
        }, 1000);

    const editor = useEditor({
        extensions,
        content,
        onUpdate: debouncedUpdate
    })


    const onTranscribe = async (path: string) => {
        try {
            const markdown = await transcribeImage(path)

            if (!editor) throw new Error("editor not found")

            let newContent = editor?.getHTML()
            if (!newContent) {
                newContent = markdown || ""
            } else {
                newContent = `${newContent}\n\n${markdown}`
            }
            editor?.commands.setContent(newContent)

        } catch (error) {
            setError((error as Error).message)
        }
    }

    return (
        <Row>

            <Stack>

                <Navigation date={date as string} />

                <div className="border rounded-lg overflow-hidden shadow-sm min-h-96 md:min-w-[720px]">
                    <Row justify='between'>
                        <MenuBar editor={editor} />
                        <div className='mx-2'>

                            {saving ? <CloudUpload /> : <Cloud />}
                        </div>
                    </Row>
                    <EditorContent editor={editor} />
                    {/* <FloatingMenu editor={editor}><MenuBar editor={editor} /></FloatingMenu> */}
                </div>

                {signedUrls.map((entrySrc) => (
                    <InteractiveImage
                        key={entrySrc.path}
                        src={entrySrc.signedUrl}
                        alt=''
                        path={entrySrc.path ?? ''}
                        onProcess={() => onTranscribe(entrySrc.path ?? '')}
                    />
                ))}
            </Stack>
            <div className='flex flex-col flex-auto p-2 justify-start'>
                <EntryImageUploader session={session} />
            </div>
            {error && <Alert variant={"destructive"} className='absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2'>
                <Terminal className="h-4 w-4" />
                <AlertTitle>There was an error</AlertTitle>
                <AlertDescription>
                    {JSON.stringify(error)}
                </AlertDescription>
            </Alert>}
        </Row>
    );

}