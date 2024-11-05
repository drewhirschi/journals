'use client'

import React, { useEffect, useRef, useState } from 'react'
import Uppy, { Meta, UploadResult } from '@uppy/core'
import { Dashboard } from '@uppy/react'
import Tus from '@uppy/tus'

// Import Uppy styles
import '@uppy/core/dist/style.css'
import '@uppy/dashboard/dist/style.css'
import { browswerClient } from '@/utils/supabase/client'
import { Session } from '@supabase/supabase-js'
import { useRouter } from 'next/navigation'
import { Textarea } from "@/components/ui/textarea"

import {
    Accordion,
    AccordionContent,
    AccordionItem,
    AccordionTrigger,
} from "@/components/ui/accordion"
import { Button } from '@/components/ui/button'
import Link from 'next/link'
import { addImagesToProcessQueue } from './actions'

export default function UppySupabaseUploader(props: { session: Session }) {

    const router = useRouter()
    const supabase = browswerClient()
    const [accordianValue, setAccordianValue] = useState('uploads')
    const [uploadRes, setUpload] = useState<UploadResult<Meta, Record<string, never>> | null>(null)
    const [context, setContext] = useState("")

    const [uppy] = useState(() => new Uppy({
        restrictions: {
            maxFileSize: 10 * 1024 * 1024, // 10MB
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

            console.log("adding file handler")

            const supabaseMetadata = {
                bucketName: "user",
                objectName: `${props.session.user?.id}/${file.id.split("/")[file.id.split("/").length - 1]}.${file.extension}`,
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
            setAccordianValue('details')
            setUpload(res)
        })



    }, [])

    const doneButtonHandler = () => {
        uppy.cancelAll();
        setAccordianValue('details')
        // router.push('/protected/upload/process')
    };


    return (
        <div className="p-4 min-w-[800px] w-full">
            <Accordion type="single" collapsible value={accordianValue} onValueChange={setAccordianValue}>
                <AccordionItem value="uploads">
                    <AccordionTrigger>File Uploader</AccordionTrigger>
                    <AccordionContent>
                        <Dashboard
                            uppy={uppy}
                            plugins={['DropTarget', ""]}
                            width="100%"
                            height="400px"
                            doneButtonHandler={doneButtonHandler}
                        />
                    </AccordionContent>
                </AccordionItem>
                <AccordionItem value="details">
                    <AccordionTrigger>Details</AccordionTrigger>
                    <AccordionContent>
                        Give some context for the files you uploaded.
                        <Textarea className='mx-4' value={context} onChange={(e) => setContext(e.target.value)} />

                    </AccordionContent>
                </AccordionItem>
                <AccordionItem value="review">
                    <AccordionTrigger>Review</AccordionTrigger>
                    <AccordionContent>
                        <Button onClick={async () => {
                            // console.log(uploadRes)
                            const imagesNames = uploadRes?.successful?.map((file) => file.meta.objectName) as string[] || []
                            await addImagesToProcessQueue(props.session.user?.id, imagesNames, context)
                            // router.push('/protected/upload/process')
                        }}>
                            Submit
                        </Button>
                    </AccordionContent>
                </AccordionItem>
            </Accordion>


        </div>
    )
}