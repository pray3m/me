interface Props {
  title: string
  subtitle?: string
}

const PageHeading = ({ title, subtitle }: Props) => {
  return (
    <>
      <h1 className="text-2xl font-semibold"> {title} </h1>
      <p className="mb-6 border-b border-dashed border-neutral-600 pb-6 pt-2 text-neutral-600 dark:text-neutral-400">
        {subtitle}
      </p>
    </>
  )
}

export default PageHeading
