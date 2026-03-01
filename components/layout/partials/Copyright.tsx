const Copyright = () => {
  return (
    <div className="flex items-center gap-1 px-4 text-muted-foreground text-sm">
      <span>©</span>
      <span>{new Date().getFullYear()}</span>
      <span>by</span>
      <span>pray3m</span>
    </div>
  )
}

export default Copyright
