interface Props {
  title: string
  subtitle?: string
}

const PageHeading = ({ title, subtitle }: Props) => {
  return (
    <>
      <h1 className="font-semibold text-2xl"> {title} </h1>
      <p className="mb-6 border-neutral-600 border-b border-dashed pt-2 pb-6 text-neutral-600 dark:text-neutral-400">
        {subtitle}
      </p>
    </>
  )
}

export default PageHeading
