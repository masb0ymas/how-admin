'use client'

import { Image, MantineRadius } from '@mantine/core'
import NextImage from 'next/image'

interface IProps {
  width: string
  height: string
  src: string
  alt: string
  radius?: MantineRadius
}

export default function MyImage({ width, height, src, alt, radius = 'lg' }: IProps) {
  return (
    <div style={{ position: 'relative', width: width, height: height }}>
      <Image
        component={NextImage}
        src={src}
        alt={alt}
        fill
        style={{ objectFit: 'contain' }}
        radius={radius}
      />
    </div>
  )
}
