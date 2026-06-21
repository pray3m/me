import React, { createContext, useCallback, useMemo, useState } from "react"

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

  const value = useMemo(() => ({ isOpen, setIsOpen }), [isOpen, setIsOpen])

  return (
    <CommandPaletteContext.Provider value={value}>
      {children}
    </CommandPaletteContext.Provider>
  )
}
