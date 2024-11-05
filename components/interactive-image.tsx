'use client'

import { useState } from 'react'
import Image from 'next/image'
import { Trash2, Zap } from 'lucide-react'
import { Button } from "@/components/ui/button"
import { removeImage } from '@/app/protected/uploads/actions'
import { addImagesToProcessQueue } from '@/app/protected/upload/actions'

interface InteractiveImageProps {
  src: string
  alt: string
  path: string
  // onDelete: () => void
  // onProcess: () => void
}

export default function InteractiveImage({ src, alt, path }: InteractiveImageProps) {
  const [isActive, setIsActive] = useState(false)

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
          variant="default"
          size="sm"
          onClick={async () => {
            await addImagesToProcessQueue([path], "this is for the year 2024")
          }}
        >
          <Zap className="w-4 h-4 mr-2" />
          Process
        </Button>
      </div>
    </div>
  )
}