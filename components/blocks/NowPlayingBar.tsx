import Image from "next/image"
import { BsSpotify } from "react-icons/bs"
import useSWR from "swr"
import { fetcher } from "@/services/fetcher"
import AnimatedBars from "./AnimatedBars"

const NowPlayingBar = () => {
  const { data } = useSWR<{
    songUrl: string
    albumImageUrl: string
    album: string
    title: string
    artist: string
  }>("/api/now-playing", fetcher)

  const handleOpenSongUrl = (url?: string) => {
    url && window.open(url, "_blank")
  }

  return (
    <div className="fixed bottom-0 z-[99999] hidden w-full lg:block">
      <div className="flex justify-between bg-green-400 px-4 py-0.5 font-sora text-[14px] text-neutral-800 dark:bg-green-500 dark:text-neutral-900">
        {data?.songUrl ? (
          <div className="flex items-center gap-2">
            <AnimatedBars />
            <div className="hidden pt-0.5 sm:block">Now Playing :</div>
            <div className="flex items-center gap-2 transition-all duration-300">
              {data?.albumImageUrl && (
                <Image
                  className="rounded-sm"
                  unoptimized
                  alt={data?.album}
                  src={data?.albumImageUrl}
                  width={18}
                  height={18}
                />
              )}
              <button
                type="button"
                className="m-0 flex gap-1 border-none bg-transparent p-0 pt-0.5 hover:cursor-pointer hover:underline"
                onClick={() => handleOpenSongUrl(data?.songUrl)}
              >
                <span>{data?.artist} -</span>
                <span>{data?.title}</span>
              </button>
            </div>
          </div>
        ) : (
          <div className="flex items-center gap-1">
            <BsSpotify size={16} className="mr-1" />
            <div className="pt-0.5">Not Playing</div>
          </div>
        )}

        {data?.songUrl && (
          <div className="flex items-center gap-1">
            <BsSpotify size={16} className="mr-0.5" />
            <span className="pt-0.5">Listening on pray3m-devices</span>
          </div>
        )}
      </div>
    </div>
  )
}

export default NowPlayingBar
