"use client"

import clsx from "clsx"
import NextImage, { type ImageProps as NextImageProps } from "next/image"
import React from "react"

type ImageProps = {
  rounded?: string
} & NextImageProps

const Image = (props: ImageProps) => {
  const { alt, src, className, rounded, priority, loading, quality, ...rest } =
    props

  const [isLoading, setLoading] = React.useState(!priority)

  return (
    <div
      className={clsx(
        "overflow-hidden",
        rest.fill ? "relative size-full" : "",
        isLoading ? "animate-pulse bg-muted" : "",
        rounded
      )}
    >
      <NextImage
        className={clsx(
          "transition-opacity duration-500 ease-out",
          isLoading ? "opacity-0" : "opacity-100",
          rounded,
          className
        )}
        src={src}
        alt={alt}
        priority={priority}
        loading={priority ? undefined : (loading ?? "lazy")}
        quality={quality ?? 75}
        onLoad={() => setLoading(false)}
        {...rest}
      />
    </div>
  )
}
export default Image
