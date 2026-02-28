import { type AnimationPlaybackControls, animate } from "framer-motion"
import { type FC, type HTMLProps, useEffect, useRef } from "react"

interface AnimateCounterProps extends HTMLProps<HTMLSpanElement> {
  total: number
}

const AnimateCounter: FC<AnimateCounterProps> = ({ total, ...rest }) => {
  const countRef = useRef<HTMLSpanElement>(null)
  const initialCount = 0

  useEffect(() => {
    const count = countRef.current

    const controls: AnimationPlaybackControls = animate(initialCount, total, {
      duration: 1,
      onUpdate: (value) => {
        if (count) {
          count.textContent = Math.floor(value).toString()
        }
      },
    })

    return () => controls.stop()
  }, [total])

  return <span {...rest} ref={countRef} />
}

export default AnimateCounter
