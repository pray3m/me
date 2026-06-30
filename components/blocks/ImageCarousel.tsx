"use client"

import Image from "next/image"
import type React from "react"
import { useEffect, useRef } from "react"
import Slider from "react-slick"
import useWindowSize from "@/hooks/use-window-size"
import "slick-carousel/slick/slick-theme.css"
import "slick-carousel/slick/slick.css"

interface ImageCarouselProps {
  images: {
    src: string
    alt: string
  }[]
  interval?: number
}

const ImageCarousel: React.FC<ImageCarouselProps> = ({
  images,
  interval = 3000,
}) => {
  const sliderRef = useRef<Slider>(null)

  const width = useWindowSize() ?? 1024
  const isMobile = width < 480
  const logoSize = isMobile ? 64 : 76

  const getDeviceWidth = () => {
    let slidesToShow = 5

    if (width < 480) {
      slidesToShow = 2
    } else if (width <= 768) {
      slidesToShow = 4
    }

    return Math.min(slidesToShow, images.length)
  }

  useEffect(() => {
    const slider = sliderRef.current

    const startScrolling = () => {
      if (slider?.innerSlider?.list) {
        slider.slickPlay()
      }
    }

    const stopScrolling = () => {
      if (slider?.innerSlider?.list) {
        slider.slickPause()
      }
    }

    if (slider?.innerSlider?.list) {
      slider.innerSlider.list.addEventListener("mouseenter", stopScrolling)
      slider.innerSlider.list.addEventListener("mouseleave", startScrolling)

      startScrolling()
    }

    return () => {
      if (slider?.innerSlider?.list) {
        slider.innerSlider.list.removeEventListener("mouseenter", stopScrolling)
        slider.innerSlider.list.removeEventListener(
          "mouseleave",
          startScrolling
        )
      }
    }
  }, [])

  const settings = {
    dots: false,
    arrows: false,
    infinite: images.length > getDeviceWidth(),
    speed: interval,
    slidesToShow: getDeviceWidth(),
    slidesToScroll: 1,
    autoplay: true,
    autoplaySpeed: interval,
    cssEase: "linear",
  }

  if (images.length === 0) return null

  return (
    <Slider ref={sliderRef} {...settings} className="pt-5">
      {images?.map((image, index) => (
        <div key={index} className="px-2">
          <Image
            src={image.src}
            alt={image.alt}
            width={logoSize}
            height={logoSize}
            className="mx-auto rounded-full bg-card p-3 shadow-xs transition-shadow hover:shadow-md"
          />
        </div>
      ))}
    </Slider>
  )
}

export default ImageCarousel
