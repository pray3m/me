import { EXTERNAL_LINKS, MENU_ITEMS } from "@/common/constant/menu"
import { CommandPaletteContext } from "@/common/context/CommandPaletteContext"
import useIsMobile from "@/common/hooks/use-is-mobile"
import { MenuItemProps } from "@/common/lib/types"
import { sendMessage } from "@/services/chatgpt"
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
import { useTheme } from "next-themes"
import { useRouter } from "next/navigation"
import React, { Fragment, useContext, useEffect, useState } from "react"
import {
  BiLeftArrowCircle as BackButton,
  BiMoon as DarkModeIcon,
  BiSun as LightModeIcon,
  BiSearch as SearchIcon,
} from "react-icons/bi"
import { BiLogoGoogle as GoogleIcon } from "react-icons/bi"
import { FiExternalLink as ExternalLinkIcon } from "react-icons/fi"
import { HiOutlineChat as AiIcon } from "react-icons/hi"
import Typewriter from "typewriter-effect"
import { useDebounceValue } from "usehooks-ts"
import Button from "./Button"
import MarkdownRenderer from "./MarkdownRenderer"

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
  ]

  const filterMenuOptions: MenuOptionProps[] = queryDebounce
    ? menuOptions.map((menu) => ({
        ...menu,
        children: menu.children.filter((item) =>
          item.title.toLowerCase().includes(queryDebounce.toLowerCase())
        ),
      }))
    : menuOptions

  const handleSelect = (menu: MenuOptionItemProps) => {
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

    const reply = await sendMessage(queryDebounce)
    setAiResponse(reply)
    setAiLoading(false)
  }

  const handleAiClose = () => {
    setAskAssistantClicked(false)
    setAiResponse("")
    setAiFinished(false)
  }

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
      handleAiClose()
    }
  }, [isOpen])

  useEffect(() => {
    if (aiResponse.includes("```")) {
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
              onChange={(menu: MenuOptionItemProps) => handleSelect(menu)}
              as="div"
              className="relative mx-auto max-w-lg overflow-hidden rounded-xl border-2 border-neutral-300 bg-white shadow-3xl ring-1 ring-black/5 dark:divide-neutral-600 dark:border-neutral-800  dark:bg-neutral-950 "
              disabled={askAssistantClicked}
            >
              <div className="flex gap-3 items-center border-b border-neutral-300 dark:border-neutral-800 px-4">
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
                    askAssistantClicked ? "AI Responses" : placeholder
                  }
                />
              </div>

              <div className="max-h-80 overflow-y-auto py-2 px-1">
                {filterMenuOptions.map((menu) => (
                  <div
                    key={menu.title}
                    className={clsx(
                      menu.children.length === 0 && "hidden",
                      "py-1"
                    )}
                  >
                    <div className="my-2 px-5 text-xs font-medium text-neutral-500">
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
                                "mx-2 flex cursor-pointer items-center gap-3 rounded-md py-2 px-4"
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

              {!askAssistantClicked &&
                queryDebounce &&
                filterMenuOptions.flatMap((item) => item.children).length ===
                  0 && (
                  <div className="flex flex-col pt-5 pb-10 space-y-5 items-center">
                    <div className="text-neutral-500 text-center space-y-2">
                      <p>
                        No result found about
                        <span className="italic text-neutral-600 dark:text-neutral-400 ml-1 mr-2">
                          `{queryDebounce}`
                        </span>
                        in this website.
                      </p>
                      <p className="text-neutral-600 dark:text-neutral-400">
                        Ask my AI Assistant or find in Google instead?
                      </p>
                    </div>
                    <div className="flex flex-col lg:flex-row gap-3 w-full justify-center">
                      <Button
                        onClick={handleAskAiAssistant}
                        className="justify-center !bg-green-600"
                      >
                        <AiIcon size={20} /> Ask AI Assistant
                      </Button>
                      <Button
                        onClick={handleFindGoogle}
                        className="justify-center !bg-indigo-600"
                      >
                        <GoogleIcon size={20} />
                        Find in Google
                      </Button>
                    </div>
                    <p className="text-neutral-500 text-sm">
                      Press `ESC` to close this window
                    </p>
                  </div>
                )}

              {askAssistantClicked &&
                queryDebounce &&
                filterMenuOptions.every(
                  (item) => item.children.length === 0
                ) && (
                  <div className="max-h-80 overflow-y-auto px-8 pt-3 pb-8">
                    {aiLoading ? (
                      <div className="flex gap-3 items-center justify-center">
                        <div className="animate-spin rounded-full h-5 w-5 border-t-2 border-b-2 border-neutral-400" />
                        <div className="dark:text-neutral-400 animate-pulse">
                          AI is processing...
                        </div>
                      </div>
                    ) : (
                      <>
                        {aiResponse ? (
                          aiResponse.includes("```") ? (
                            <MarkdownRenderer>{aiResponse}</MarkdownRenderer>
                          ) : (
                            <Typewriter
                              onInit={(typewriter) => {
                                typewriter
                                  .typeString(aiResponse)
                                  .callFunction(() => {
                                    setAiFinished(true)
                                  })
                                  .start()
                              }}
                              options={{
                                delay: 10,
                              }}
                            />
                          )
                        ) : (
                          <Typewriter
                            onInit={(typewriter) => {
                              typewriter
                                .typeString(
                                  "Oops! The AI seems to be lost. \u00A0 😵‍💫 \u00A0\u00A0"
                                )
                                .pauseFor(1000)
                                .typeString("<br/><br/>")
                                .typeString(
                                  "Looks like the AI has gone on an unscheduled vacation to the Land of Confusion. Hope it brings back some souvenirs of clarity!. \u00A0\u00A0"
                                )
                                .pauseFor(1000)
                                .typeString("<br/><br/>")
                                .typeString("Please try again later. \u00A0")
                                .callFunction(() => {
                                  setAiFinished(true)
                                })
                                .start()
                            }}
                            options={{
                              delay: 10,
                            }}
                          />
                        )}

                        {aiFinished && (
                          <div className="flex justify-center mt-6 transition-all duration-300">
                            <Button onClick={handleAiClose}>
                              <BackButton />
                              Back
                            </Button>
                          </div>
                        )}
                      </>
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
