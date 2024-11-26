"use client"

import './styles.scss'

import { EditorEvents, EditorProvider, useCurrentEditor } from '@tiptap/react'
import React, { useState } from 'react'

import { Button } from '@/components/ui/button'
import { Color } from '@tiptap/extension-color'
import ListItem from '@tiptap/extension-list-item'
import { Markdown } from 'tiptap-markdown';
import { Row } from '@/components/layout-components'
import StarterKit from '@tiptap/starter-kit'
import TextStyle from '@tiptap/extension-text-style'
import Underline from '@tiptap/extension-underline'
import { browswerClient } from '@/utils/supabase/client'
import { useDebouncedCallback } from 'use-debounce';

const MenuBar = () => {
    const { editor } = useCurrentEditor()

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
                <Button
                    onClick={() => editor.chain().focus().setParagraph().run()}
                    variant={editor.isActive('paragraph') ? 'default' : 'secondary'}
                >
                    P
                </Button>
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
                    Clear styles
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



export default ({ userId, content, date }:
    { userId: string, content: string | undefined | null, date: string }) => {
    const supabase = browswerClient()

    const debouncedUpdate = useDebouncedCallback(
        async (update: EditorEvents["update"]) => {

            await supabase.from("entries").upsert({ content: update.editor.getHTML(), date, account_id: userId })
        }, 1000);

    return (
        <div className="border rounded-lg overflow-hidden shadow-sm min-h-96 md:min-w-[720px]">
            <EditorProvider immediatelyRender={false} onUpdate={debouncedUpdate} slotBefore={<MenuBar />} extensions={extensions} content={content}>
            </EditorProvider>
        </div>
    );

}