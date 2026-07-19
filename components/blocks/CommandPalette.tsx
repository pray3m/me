"use client"

import { Dialog as DialogPrimitive } from "@base-ui/react/dialog"
import { Command as CommandPrimitive } from "cmdk"
import { Palette, Search, Sparkles } from "lucide-react"
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
  CommandEmpty,
  CommandGroup,
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
    "Search or ask anything...",
    "Press Cmd + K anytime to open this palette",
  ]
  const placeholder = placeholders[placeholderIndex]

  useEffect(() => {
    if (isMobile) return
    const timer = setTimeout(() => {
      setPlaceholderIndex((prev) => (prev === 0 ? 1 : 0))
    }, 3000)
    return () => clearTimeout(timer)
  }, [isMobile])

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

  // Easter egg: the design system page is unlisted — it surfaces here only when the search is "design".
  if (query.trim().toLowerCase() === "design") {
    menuOptions.push({
      title: "✦ FOUND A SECRET",
      children: [
        {
          icon: <Palette size={20} />,
          title: "Design system",
          href: "/design",
          isExternal: false,
          closeOnSelect: true,
        },
      ],
    })
  }

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
    <DialogPrimitive.Root open={isOpen} onOpenChange={setIsOpen}>
      <DialogPrimitive.Portal>
        <DialogPrimitive.Backdrop className="data-closed:fade-out-0 data-open:fade-in-0 fixed inset-0 z-50 bg-background/70 backdrop-blur-sm duration-150 data-closed:animate-out data-open:animate-in" />
        <DialogPrimitive.Popup className="data-closed:fade-out-0 data-open:fade-in-0 data-closed:zoom-out-95 data-open:zoom-in-95 fixed top-[14vh] left-1/2 z-50 w-[calc(100%-2rem)] max-w-xl -translate-x-1/2 overflow-hidden rounded-2xl border border-border bg-popover text-popover-foreground shadow-2xl outline-none ring-1 ring-foreground/10 duration-150 data-closed:animate-out data-open:animate-in">
          <DialogPrimitive.Title className="sr-only">
            Command Palette
          </DialogPrimitive.Title>

          <Command
            shouldFilter={!askAssistantClicked}
            className="bg-transparent p-0"
          >
            <div className="flex items-center gap-3 border-border/70 border-b px-4">
              {askAssistantClicked ? (
                <Sparkles className="size-5 shrink-0 text-muted-foreground" />
              ) : (
                <Search className="size-5 shrink-0 text-muted-foreground" />
              )}
              <CommandPrimitive.Input
                autoFocus
                value={query}
                onValueChange={setQuery}
                disabled={askAssistantClicked}
                placeholder={askAssistantClicked ? queryDebounce : placeholder}
                className="h-14 w-full bg-transparent text-[15px] text-foreground outline-none placeholder:text-muted-foreground disabled:cursor-not-allowed disabled:opacity-60"
              />
            </div>

            {askAssistantClicked ? (
              <div className="max-h-[60vh] overflow-y-auto px-6 pt-4 pb-6">
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
              <CommandList className="max-h-[60vh] p-2">
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
                        className="cursor-pointer gap-3 rounded-lg px-3 py-2.5"
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
        </DialogPrimitive.Popup>
      </DialogPrimitive.Portal>
    </DialogPrimitive.Root>
  )
}
