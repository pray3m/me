import ReactMarkdown from "react-markdown"
import remarkGfm from "remark-gfm"
import CodeBlock from "./CodeBlock"

interface MarkdownRendererProps {
  children: string
}

const MarkdownRenderer = ({ children }: MarkdownRendererProps) => {
  return (
    <ReactMarkdown
      remarkPlugins={[remarkGfm]}
      components={{
        a: (props) => (
          <a
            className="cursor-pointer text-teal-500 hover:text-teal-400 hover:underline"
            {...props}
          />
        ),
        p: (props) => <p {...props} />,
        h2: (props) => (
          <h2
            className="font-medium text-xl dark:text-neutral-300"
            {...props}
          />
        ),
        h3: (props) => (
          <h3
            className="pt-4 font-medium text-[18px] leading-snug dark:text-neutral-300"
            {...props}
          />
        ),
        ol: (props) => (
          <ol className="list-decimal space-y-3 pb-5 pl-10" {...props} />
        ),
        code: (props) => <CodeBlock {...props} />,
      }}
    >
      {children}
    </ReactMarkdown>
  )
}

export default MarkdownRenderer
