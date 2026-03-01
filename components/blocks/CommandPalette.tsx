import {
  Combobox,
  ComboboxInput,
  ComboboxOption,
  ComboboxOptions,
  Dialog,
  DialogBackdrop,
  DialogPanel,
  Transition,
  TransitionChild,
} from "@headlessui/react"
import clsx from "clsx"
import { useRouter } from "next/navigation"
import { useTheme } from "next-themes"
import React, { Fragment, useContext, useEffect, useState } from "react"
import {
  BiMoon as DarkModeIcon,
  BiSun as LightModeIcon,
  BiSearch as SearchIcon,
} from "react-icons/bi"
import { HiOutlineChat as AiIcon } from "react-icons/hi"
import { useDebounceValue } from "usehooks-ts"
import { EXTERNAL_LINKS, MENU_ITEMS } from "@/common/constant/menu"
import { CommandPaletteContext } from "@/common/context/CommandPaletteContext"
import { MenuItemProps } from "@/common/lib/types"
import { useIsMobile } from "@/hooks/use-mobile"
import { cn } from "@/lib/utils"
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

  const [query, setQuery] = React.useState<string>("")
  const [isEmptyState, setEmptyState] = useState(false)
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

  useEffect(() => {
    if (!isMobile) {
      const timer = setTimeout(() => {
        setPlaceholderIndex((prevIndex) => (prevIndex === 0 ? 1 : 0))
      }, 3000)

      return () => {
        clearTimeout(timer)
      }
    }
  }, [isMobile])

  useEffect(() => {
    if (isOpen === false) setQuery("")
  }, [isOpen])

  const placeholder = placeholders[placeholderIndex]

  useEffect(() => {
    const handleKeyDown: (event: KeyboardEvent) => void = (
      event: KeyboardEvent
    ) => {
      if (event.key === "k" && (event.metaKey || event.ctrlKey)) {
        setIsOpen(!isOpen)
      } else if (event.key === "Escape") {
        setIsOpen(false)
      }
    }
    window.addEventListener("keydown", handleKeyDown)
    return () => window.removeEventListener("keydown", handleKeyDown)
  }, [isOpen, setIsOpen])

  const menuOptions: MenuOptionProps[] = [
    {
      title: "PAGES",
      children: MENU_ITEMS?.map((menu) => ({
        ...menu,
        closeOnSelect: true,
      })),
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
          title: `Switch to ${
            resolvedTheme === "dark" ? "Light" : "Dark"
          } Mode`,
          click: () => setTheme(resolvedTheme === "dark" ? "light" : "dark"),
          href: "#",
          isExternal: false,
          closeOnSelect: false,
        },
      ],
    },
  ]

  const filterMenuOptions: MenuOptionProps[] = queryDebounce
    ? menuOptions.map((menu) => ({
        ...menu,
        children: menu.children.filter((item) =>
          item.title.toLowerCase().includes(queryDebounce.toLowerCase())
        ),
      }))
    : menuOptions

  const handleSelect = (menu: MenuOptionItemProps | null) => {
    if (!menu) return

    setQuery("")
    if (menu.closeOnSelect) setIsOpen(false)

    if (menu.click) {
      menu.click()
      return
    }

    if (menu.isExternal) {
      window.open(menu.href, "_blank")
    } else {
      router.push(menu?.href as string)
    }
  }

  const handleSearch = ({
    target: { value },
  }: React.ChangeEvent<HTMLInputElement>) => setQuery(value)

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

  const handleAiClose = () => {
    setAskAssistantClicked(false)
    setAiResponse("")
    setAiFinished(false)
  }

  useEffect(() => {
    if (query) setEmptyState(false)
  }, [query])

  useEffect(() => {
    if (!isMobile) {
      const timer = setTimeout(() => {
        setPlaceholderIndex((prev) => (prev === 0 ? 1 : 0))
      }, 3000)

      return () => {
        clearTimeout(timer)
      }
    }
  }, [isMobile])

  // biome-ignore lint/correctness/useExhaustiveDependencies: <explanation>
  useEffect(() => {
    if (!isOpen) {
      setQuery("")
      setEmptyState(false)
      handleAiClose()
    }
  }, [isOpen])

  useEffect(() => {
    if (aiResponse?.includes("```")) {
      setAiFinished(true)
    }
  }, [aiResponse])

  return (
    <Transition show={isOpen} as={Fragment}>
      <Dialog
        onClose={setIsOpen}
        className="fixed inset-0 z-[999] overflow-y-auto p-4 pt-[25vh]"
      >
        <DialogBackdrop
          className="fixed inset-0 bg-neutral-600/90 dark:bg-neutral-900/90"
          transition
        />

        <DialogPanel>
          <TransitionChild
            as={Fragment}
            enter="transition-transform duration-200 ease-out"
            enterFrom="opacity-0 scale-95"
            enterTo="opacity-100 scale-100"
            leave="transition-transform duration-100 ease-in"
            leaveFrom="opacity-100 scale-100"
            leaveTo="opacity-0 scale-95"
          >
            <Combobox
              onChange={(menu: MenuOptionItemProps | null) =>
                handleSelect(menu)
              }
              as="div"
              className="relative mx-auto max-w-lg overflow-hidden rounded-xl border-2 border-neutral-300 bg-white shadow-3xl ring-1 ring-black/5 dark:divide-neutral-600 dark:border-neutral-800 dark:bg-neutral-950"
              disabled={askAssistantClicked}
            >
              <div className="flex items-center gap-3 border-neutral-300 border-b px-4 dark:border-neutral-800">
                {askAssistantClicked ? (
                  <AiIcon size={22} />
                ) : (
                  <SearchIcon size={22} />
                )}
                <ComboboxInput
                  autoFocus
                  onChange={handleSearch}
                  className="h-14 w-full border-0 bg-transparent text-neutral-800 placeholder-neutral-500 focus:outline-none focus:ring-0 dark:text-neutral-200"
                  placeholder={
                    askAssistantClicked ? queryDebounce : placeholder
                  }
                />
              </div>

              <div
                className={cn(
                  "max-h-80 overflow-y-auto px-1 py-2",
                  isEmptyState && "!py-0"
                )}
              >
                {filterMenuOptions.map((menu) => (
                  <div
                    key={menu.title}
                    className={clsx(
                      menu.children.length === 0 && "hidden",
                      "py-1"
                    )}
                  >
                    <div className="my-2 px-5 font-medium text-neutral-500 text-xs">
                      {menu?.title}
                    </div>
                    <ComboboxOptions static className="space-y-1">
                      {menu.children.map((child) => (
                        <ComboboxOption key={child.href} value={child}>
                          {({ active }) => (
                            <div
                              className={clsx(
                                active
                                  ? "bg-neutral-200 text-neutral-600 dark:bg-neutral-700/60 dark:text-white"
                                  : "text-neutral-600 dark:text-neutral-300",
                                "mx-2 flex cursor-pointer items-center gap-3 rounded-md px-4 py-2"
                              )}
                            >
                              {child?.icon && <span>{child?.icon}</span>}
                              <span>{child?.title}</span>
                            </div>
                          )}
                        </ComboboxOption>
                      ))}
                    </ComboboxOptions>
                  </div>
                ))}
              </div>

              {!isEmptyState &&
                !askAssistantClicked &&
                queryDebounce &&
                filterMenuOptions.flatMap((item) => item.children).length ===
                  0 && (
                  <QueryNotFound
                    queryDebounce={queryDebounce}
                    handleAskAiAssistant={handleAskAiAssistant}
                    handleFindGoogle={handleFindGoogle}
                  />
                )}

              {askAssistantClicked &&
                queryDebounce &&
                filterMenuOptions.every(
                  (item) => item.children.length === 0
                ) && (
                  <div className="max-h-80 overflow-y-auto px-8 pt-3 pb-8">
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
                )}
            </Combobox>
          </TransitionChild>
        </DialogPanel>
      </Dialog>
    </Transition>
  )
}
