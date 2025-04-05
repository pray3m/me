import { CommandPaletteContext } from "@/common/context/CommandPaletteContext"
import { MenuItemProps } from "@/common/lib/types"
import {
  Combobox,
  Dialog,
  DialogBackdrop,
  DialogPanel,
  Transition,
  TransitionChild,
} from "@headlessui/react"
import { useRouter } from "next/navigation"
import React, { Fragment, useContext, useEffect } from "react"

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

  const { isOpen, setIsOpen } = useContext(CommandPaletteContext)

  useEffect(() => {
    const handleKeyDown: (event: KeyboardEvent) => void = (
      event: KeyboardEvent
    ) => {
      if (event.key === "k" && (event.metaKey || event.ctrlKey)) {
        setIsOpen(!isOpen)
      }
    }
    window.addEventListener("keydown", handleKeyDown)
    return () => window.removeEventListener("keydown", handleKeyDown)
  }, [isOpen, setIsOpen])

  const handleSelect = (menu: MenuOptionItemProps) => {
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

        <TransitionChild
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
          >
            <div>Command Palette is Open</div>
          </Combobox>
        </TransitionChild>
      </Dialog>
    </Transition>
  )
}
