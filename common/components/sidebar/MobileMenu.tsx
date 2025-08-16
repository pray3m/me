import { motion } from "framer-motion"
import { type FC } from "react"
import Breakline from "../elements/Breakline"
import Navigation from "./Navigation"

const MobileMenu: FC = () => {
  return (
    <motion.div
      className="my-5"
      initial={{ opacity: 0, y: -20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -20 }}
      transition={{ duration: 0.3 }}
    >
      <Breakline className="mt-2" />
      <Navigation />
    </motion.div>
  )
}

export default MobileMenu
