import Link from "next/link"
import type React from "react"
import type { ReactNode } from "react"
import { BsGithub as GithubIcon } from "react-icons/bs"
import { FiExternalLink as LinkIcon } from "react-icons/fi"

interface LinkComponentProps {
  url: string
  text: string
  icon?: ReactNode
}
interface ProjectLinkProps {
  link_github?: string
  link_demo?: string
}

const ProjectLink: React.FC<ProjectLinkProps> = ({
  link_github,
  link_demo,
}) => {
  return (
    <div className="flex gap-4">
      {link_github && (
        <LinkComponent
          url={link_github}
          text="Source Code"
          icon={<GithubIcon size={22} />}
        />
      )}

      {link_github && link_demo && (
        <span className="text-muted-foreground">|</span>
      )}
      {link_demo && (
        <LinkComponent
          url={link_demo}
          text="Live Demo"
          icon={<LinkIcon size={22} />}
        />
      )}
    </div>
  )
}

const LinkComponent = ({ icon, text, url }: LinkComponentProps) => {
  return (
    <Link href={url} target="_blank" passHref>
      <div className="flex items-center gap-2 font-medium text-muted-foreground">
        {icon}

        <span className="text-sm transition-all duration-300 dark:text-teal-500 dark:hover:text-teal-400">
          {text}
        </span>
      </div>
    </Link>
  )
}

export default ProjectLink
