'use client'

import '@uppy/core/dist/style.css'
import '@uppy/dashboard/dist/style.css'

import {
    Accordion,
    AccordionContent,
    AccordionItem,
    AccordionTrigger,
} from "@/components/ui/accordion"
import React, { useEffect, useRef, useState } from 'react'
import Uppy, { Meta, UploadResult } from '@uppy/core'
import { useParams, useRouter } from 'next/navigation'

import { Button } from '@/components/ui/button'
import { Dashboard } from '@uppy/react'
import Link from 'next/link'
import { Session } from '@supabase/supabase-js'
import { Textarea } from "@/components/ui/textarea"
import Tus from '@uppy/tus'
import { browswerClient } from '@/utils/supabase/client'
import { refreshEntryPage } from './actions'

// Import Uppy styles












export default function EntryImageUploader(props: { session: Session }) {

    const [error, setError] = useState(null)
    const params = useParams()
    const router = useRouter()
    const supabase = browswerClient()






    const [uppy] = useState(() => new Uppy({
        restrictions: {
            maxFileSize: 15 * 1024 * 1024, // 10MB
            allowedFileTypes: ['image/*', '.pdf'],
            maxNumberOfFiles: 25
        },

    })
        .use(Tus, {
            id: 'tus',
            endpoint: `${process.env.NEXT_PUBLIC_SUPABASE_URL}/storage/v1/upload/resumable`,
            retryDelays: [0, 1000, 5000],
            headers: {
                Authorization: `Bearer ${props.session.access_token}`,
            },
            chunkSize: 6 * 1024 * 1024,
            onError: (error) => console.log("Failed upload", error)
        }));



    useEffect(() => {

        uppy.on('file-added', (file) => {
            const supabaseMetadata = {
                bucketName: "account",
                objectName: `${params.acctId}/${params.date}/${file.id.split("/")[file.id.split("/").length - 1]}.${file.extension}`,
                contentType: file.type,
            }
            file.meta = {
                ...file.meta,
                ...supabaseMetadata,
            }
            console.log('file meta', file.meta)
        })
        uppy.on('upload-success', async (file, res) => {
            console.log('done', file)
        })
        uppy.on('complete', async (res) => {
            console.log('complete', res)
            refreshEntryPage(params.acctId as string, params.date as string)
        })



    }, [])

    const doneButtonHandler = () => {
        uppy.cancelAll();

    };


    return (
        <div className="p-4 min-w-96  w-full">

            <Dashboard
                uppy={uppy}
                plugins={['DropTarget', ""]}
                width="100%"
                height="400px"
                doneButtonHandler={doneButtonHandler}
            />



        </div>
    )
}