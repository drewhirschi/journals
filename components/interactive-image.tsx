'use client'

import { Trash2, Zap } from 'lucide-react'
import { addImagesToProcessQueue, removeImage } from '@/app/protected/[acctId]/upload/actions'

import { Button } from "@/components/ui/button"
import Image from 'next/image'
import { transcribeImage } from '@/app/protected/[acctId]/entry/[date]/actions'
import { useState } from 'react'

interface InteractiveImageProps {
  src: string
  alt: string
  path: string
}

export default function InteractiveImage({ src, alt, path }: InteractiveImageProps) {
  const [isActive, setIsActive] = useState(false)
  const [loading, setLoading] = useState(false)

  const toggleActive = () => setIsActive(!isActive)

  return (
    <div
      className="relative overflow-hidden rounded-lg cursor-pointer group"
      onClick={toggleActive}
      onKeyDown={(e) => {
        if (e.key === 'Enter' || e.key === ' ') {
          e.preventDefault()
          toggleActive()
        }
      }}
      tabIndex={0}
      role="button"
      aria-pressed={isActive}
    >
      <Image
        src={src}
        alt={alt}
        width={300}
        height={300}
        className="w-full h-auto transition-transform duration-300 ease-in-out group-hover:scale-105"
      />
      <div
        className={`absolute inset-0 bg-black transition-opacity duration-300 ease-in-out ${isActive ? 'opacity-50' : 'opacity-0'
          }`}
      />
      <div
        className={`absolute bottom-0 left-0 right-0 flex justify-center space-x-4 p-4 transition-transform duration-300 ease-in-out ${isActive ? 'translate-y-0' : 'translate-y-full'
          }`}
      >

        <Button
          variant="destructive"
          size="sm"
          onClick={async () => {
            await removeImage(path)
          }}
        >
          <Trash2 className="w-4 h-4 mr-2" />
          Delete
        </Button>

        <Button
          disabled={!path}
          variant="default"
          size="sm"
          onClick={async () => {
            setLoading(true)
            try {

              const markdown = await transcribeImage(path)

            } catch (error) {

            } finally {
              setLoading(false)

            }
          }}
        >
          <Zap className="w-4 h-4 mr-2" />
          Transcribe
        </Button>
      </div>
    </div>
  )
}