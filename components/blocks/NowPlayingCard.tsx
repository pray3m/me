"use client"

import { useQuery } from "@tanstack/react-query"
import Image from "next/image"
import { useState } from "react"
import { BsSpotify } from "react-icons/bs"
import { IoMdCloseCircleOutline } from "react-icons/io"
import { cn } from "@/lib/utils"
import { fetcher } from "@/services/fetcher"
import AnimatedBars from "./AnimatedBars"

const NowPlayingCard = () => {
  const [expand, setExpand] = useState<boolean>(true)

  const { data } = useQuery<{
    songUrl: string
    albumImageUrl: string
    album: string
    title: string
    artist: string
  }>({
    queryKey: ["now-playing"],
    queryFn: () => fetcher("/api/now-playing"),
  })

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
        "fixed bottom-0 z-[99999] w-full p-3",
        !expand && "flex justify-end"
      )}
    >
      {!expand ? (
        <button
          type="button"
          aria-label="Open music player"
          className="m-2 flex cursor-pointer items-center justify-center rounded-full bg-neutral-950 transition-all duration-100"
          onClick={handleMusicToggle}
        >
          <BsSpotify size={44} className="animate-pulse text-green-500" />
        </button>
      ) : (
        <div className="mt-5 flex items-center justify-between rounded-md bg-green-400 px-3 py-2 text-neutral-900 dark:bg-green-500">
          <div className="flex items-center gap-3">
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
              className="flex flex-col border-none bg-transparent p-0 pt-0.5 text-left hover:cursor-pointer hover:underline"
              onClick={() => handleOpenSongUrl(data?.songUrl)}
            >
              <div className="font-medium text-sm">{trimmedSongTitle}</div>
              <div className="flex items-center gap-2">
                <AnimatedBars />
                <span className="pt-1 text-neutral-900 text-sm">
                  {trimmedSongArtist}
                </span>
              </div>
            </button>
          </div>
          <div className="flex gap-3 pr-0.5">
            <button
              type="button"
              aria-label="Hide music player"
              className="cursor-pointer text-neutral-900"
              onClick={handleMusicToggle}
            >
              <IoMdCloseCircleOutline size={28} className="pt-0.5" />
            </button>
          </div>
        </div>
      )}
    </div>
  )
}

export default NowPlayingCard
