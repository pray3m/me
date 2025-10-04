import Image from "next/image"
import React, { useState } from "react"
import { BsSpotify } from "react-icons/bs"
import { IoMdCloseCircleOutline } from "react-icons/io"
import useSWR from "swr"
import { cn } from "@/common/lib/utils"
import { fetcher } from "@/services/fetcher"
import AnimatedBars from "./AnimatedBars"

const NowPlayingCard = () => {
  const [expand, setExpand] = useState<boolean>(true)

  const { data } = useSWR<{
    songUrl: string
    albumImageUrl: string
    album: string
    title: string
    artist: string
  }>("/api/now-playing", fetcher)

  // album: 'Qayde Se (From "Metro ... In Dino")'
  // albumImageUrl: "https://i.scdn.co/image/ab67616d00004851127b091422dfbcc367062145"
  // artist: "Pritam, Arijit Singh, Amitabh Bhattacharya"
  // songUrl: "https://open.spotify.com/track/1iiVX4OJ6vo3a4sT3Fe7Ix"
  // title: 'Qayde Se (From "Metro ... In Dino")'

  const trimmedSongTitle =
    data?.title &&
    data?.title.slice(0, 40) + (data?.title?.length > 40 ? "..." : "")

  const trimmedSongArtist =
    data?.artist &&
    data?.artist.slice(0, 20) + (data?.artist?.length > 20 ? "..." : "")

  const handleOpenSongUrl = (url?: string) => {
    url && window.open(url, "_blank")
  }

  const handleMusicToggle = () => setExpand(!expand)

  if (!data?.songUrl) return null

  return (
    <div
      className={cn(
        "fixed bottom-0 p-3 z-[99999] w-full",
        !expand && "flex justify-end"
      )}
    >
      {!expand ? (
        <button
          type="button"
          className="bg-neutral-950 rounded-full m-2 transition-all duration-100 cursor-pointer flex items-center justify-center"
          onClick={handleMusicToggle}
        >
          <BsSpotify size={44} className="text-green-500 animate-pulse" />
        </button>
      ) : (
        <div className="flex items-center justify-between py-2 px-3 mt-5 bg-green-400 dark:bg-green-500 text-neutral-800 dark:text-neutral-900 rounded-md font-sora">
          <div className="flex gap-3 items-center">
            {data?.albumImageUrl && (
              <Image
                className="rounded-sm"
                unoptimized
                alt={data?.album}
                src={data?.albumImageUrl}
                width={60}
                height={60}
              />
            )}
            <button
              type="button"
              className="flex flex-col hover:underline hover:cursor-pointer pt-0.5 bg-transparent border-none p-0 text-left"
              onClick={() => handleOpenSongUrl(data?.songUrl)}
            >
              <div className="font-medium text-[15px]">{trimmedSongTitle}</div>
              <div className="flex gap-2 items-center">
                <AnimatedBars />
                <span className="text-neutral-800 text-[14px] pt-1 ">
                  {trimmedSongArtist}
                </span>
              </div>
            </button>
          </div>
          <div className="flex gap-3 pr-0.5">
            <IoMdCloseCircleOutline
              size={28}
              className="text-neutral-900 pt-0.5 cursor-pointer"
              onClick={handleMusicToggle}
            />
          </div>
        </div>
      )}
    </div>
  )
}

export default NowPlayingCard
