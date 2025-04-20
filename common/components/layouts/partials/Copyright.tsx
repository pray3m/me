const Copyright = () => {
  return (
    <div className="flex items-center gap-1 text-sm px-4 text-neutral-700 dark:text-neutral-600">
      <span>©</span>
      <span>{new Date().getFullYear()}</span>
      <span>by</span>
      <span>pray3m</span>
    </div>
  )
}

export default Copyright
