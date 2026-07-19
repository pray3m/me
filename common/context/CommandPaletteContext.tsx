import React, {
  createContext,
  useCallback,
  useEffect,
  useMemo,
  useState,
} from "react"

interface CommandPaletteContextType {
  isOpen: boolean
  setIsOpen: (open: boolean) => void
}

export const CommandPaletteContext = createContext<CommandPaletteContextType>({
  isOpen: false,
  setIsOpen: () => {},
})

interface CommandPaletteProviderProps {
  children: React.ReactNode
}

export const CommandPaletteProvider = ({
  children,
}: CommandPaletteProviderProps) => {
  const [isOpen, setOpen] = useState(false)

  const setIsOpen = useCallback((open: boolean) => {
    setOpen(open)
  }, [])

  useEffect(() => {
    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === "k" && (event.metaKey || event.ctrlKey)) {
        event.preventDefault()
        setOpen((prev) => !prev)
      } else if (event.key === "Escape") {
        setOpen(false)
      }
    }
    window.addEventListener("keydown", handleKeyDown)
    return () => window.removeEventListener("keydown", handleKeyDown)
  }, [])

  const value = useMemo(() => ({ isOpen, setIsOpen }), [isOpen, setIsOpen])

  return (
    <CommandPaletteContext.Provider value={value}>
      {children}
    </CommandPaletteContext.Provider>
  )
}
