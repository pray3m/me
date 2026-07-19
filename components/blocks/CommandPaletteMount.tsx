"use client"

import dynamic from "next/dynamic"
import { useContext, useEffect, useState } from "react"
import { CommandPaletteContext } from "@/common/context/CommandPaletteContext"

const CommandPalette = dynamic(() => import("./CommandPalette"))

const CommandPaletteMount = () => {
  const { isOpen } = useContext(CommandPaletteContext)
  const [hasOpened, setHasOpened] = useState(false)

  useEffect(() => {
    if (isOpen) setHasOpened(true)
  }, [isOpen])

  return hasOpened ? <CommandPalette /> : null
}

export default CommandPaletteMount
