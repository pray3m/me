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
    <div className="flex flex-wrap gap-3">
      {link_github && (
        <LinkComponent
          url={link_github}
          text="Source Code"
          icon={<GithubIcon size={22} />}
        />
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
    <Link href={url} target="_blank" rel="noopener noreferrer">
      <div className="flex items-center gap-2 rounded-lg border border-border bg-background px-3 py-2 font-medium text-muted-foreground transition-colors hover:text-foreground">
        {icon}

        <span className="text-sm">{text}</span>
      </div>
    </Link>
  )
}

export default ProjectLink
