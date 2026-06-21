"use client"

import { useRouter } from "next/navigation"
import { useTheme } from "next-themes"
import { useContext, useEffect, useState } from "react"
import { BiMoon as DarkModeIcon, BiSun as LightModeIcon } from "react-icons/bi"
import { useDebounceValue } from "usehooks-ts"
import { EXTERNAL_LINKS, MENU_ITEMS } from "@/common/constant/menu"
import { CommandPaletteContext } from "@/common/context/CommandPaletteContext"
import type { MenuItemProps } from "@/common/lib/types"
import {
  Command,
  CommandDialog,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
} from "@/components/ui/command"
import { useIsMobile } from "@/hooks/use-mobile"
import AiLoading from "@/modules/cmdpalette/components/AiLoading"
import AiResponses from "@/modules/cmdpalette/components/AiResponses"
import QueryNotFound from "@/modules/cmdpalette/components/QueryNotFound"
import { sendMessage } from "@/services/chatgpt"

interface MenuOptionItemProps extends MenuItemProps {
  click?: () => void
  closeOnSelect: boolean
}

interface MenuOptionProps {
  title: string
  children: MenuOptionItemProps[]
}

export default function CommandPalette() {
  const router = useRouter()
  const isMobile = useIsMobile()

  const [query, setQuery] = useState<string>("")
  const [placeholderIndex, setPlaceholderIndex] = useState(0)
  const [askAssistantClicked, setAskAssistantClicked] = useState(false)
  const [aiLoading, setAiLoading] = useState(false)
  const [aiResponse, setAiResponse] = useState("")
  const [aiFinished, setAiFinished] = useState(false)
  const { isOpen, setIsOpen } = useContext(CommandPaletteContext)

  const [queryDebounce] = useDebounceValue(query, 300)
  const { resolvedTheme, setTheme } = useTheme()

  const placeholders = [
    "Search or Ask anything...",
    "Press Cmd + K anytime to access this command palette",
  ]
  const placeholder = placeholders[placeholderIndex]

  useEffect(() => {
    if (isMobile) return
    const timer = setTimeout(() => {
      setPlaceholderIndex((prev) => (prev === 0 ? 1 : 0))
    }, 3000)
    return () => clearTimeout(timer)
  }, [isMobile])

  useEffect(() => {
    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === "k" && (event.metaKey || event.ctrlKey)) {
        event.preventDefault()
        setIsOpen(!isOpen)
      } else if (event.key === "Escape") {
        setIsOpen(false)
      }
    }
    window.addEventListener("keydown", handleKeyDown)
    return () => window.removeEventListener("keydown", handleKeyDown)
  }, [isOpen, setIsOpen])

  const handleAiClose = () => {
    setAskAssistantClicked(false)
    setAiResponse("")
    setAiFinished(false)
  }

  // biome-ignore lint/correctness/useExhaustiveDependencies: only reset palette state when open/close toggles
  useEffect(() => {
    if (!isOpen) {
      setQuery("")
      handleAiClose()
    }
  }, [isOpen])

  useEffect(() => {
    if (aiResponse?.includes("```")) setAiFinished(true)
  }, [aiResponse])

  const menuOptions: MenuOptionProps[] = [
    {
      title: "PAGES",
      children: MENU_ITEMS?.map((menu) => ({ ...menu, closeOnSelect: true })),
    },
    {
      title: "EXTERNAL LINKS",
      children: EXTERNAL_LINKS?.map((menu) => ({
        ...menu,
        closeOnSelect: true,
      })),
    },
    {
      title: "THEME",
      children: [
        {
          icon:
            resolvedTheme === "dark" ? (
              <LightModeIcon size={20} />
            ) : (
              <DarkModeIcon size={20} />
            ),
          title: `Switch to ${resolvedTheme === "dark" ? "Light" : "Dark"} Mode`,
          click: () => setTheme(resolvedTheme === "dark" ? "light" : "dark"),
          href: "#",
          isExternal: false,
          closeOnSelect: false,
        },
      ],
    },
  ]

  const handleSelect = (menu: MenuOptionItemProps) => {
    setQuery("")
    if (menu.closeOnSelect) setIsOpen(false)

    if (menu.click) {
      menu.click()
      return
    }

    if (menu.isExternal) {
      window.open(menu.href, "_blank")
    } else {
      router.push(menu.href as string)
    }
  }

  const handleFindGoogle = () => {
    const url = `https://www.google.com/search?q=${queryDebounce}&ref=premgautam.me`
    window.open(url, "_blank")
  }

  const handleAskAiAssistant = async () => {
    setAskAssistantClicked(true)
    setAiLoading(true)

    const response = await sendMessage(queryDebounce)
    setAiResponse(response)
    setAiLoading(false)
  }

  return (
    <CommandDialog open={isOpen} onOpenChange={setIsOpen} className="max-w-lg">
      <Command shouldFilter={!askAssistantClicked}>
        <CommandInput
          autoFocus
          value={query}
          onValueChange={setQuery}
          disabled={askAssistantClicked}
          placeholder={askAssistantClicked ? queryDebounce : placeholder}
        />

        {askAssistantClicked ? (
          <div className="max-h-80 overflow-y-auto px-6 pt-3 pb-6">
            {aiLoading ? (
              <AiLoading />
            ) : (
              <AiResponses
                response={aiResponse}
                isAiFinished={aiFinished}
                onAiFinished={() => setAiFinished(true)}
                onAiClose={handleAiClose}
              />
            )}
          </div>
        ) : (
          <CommandList className="max-h-80">
            {queryDebounce && (
              <CommandEmpty className="p-0">
                <QueryNotFound
                  queryDebounce={queryDebounce}
                  handleAskAiAssistant={handleAskAiAssistant}
                  handleFindGoogle={handleFindGoogle}
                />
              </CommandEmpty>
            )}
            {menuOptions.map((menu) => (
              <CommandGroup key={menu.title} heading={menu.title}>
                {menu.children.map((child) => (
                  <CommandItem
                    key={child.href}
                    value={child.title}
                    onSelect={() => handleSelect(child)}
                    className="cursor-pointer gap-3"
                  >
                    {child?.icon && <span>{child.icon}</span>}
                    <span>{child.title}</span>
                  </CommandItem>
                ))}
              </CommandGroup>
            ))}
          </CommandList>
        )}
      </Command>
    </CommandDialog>
  )
}
