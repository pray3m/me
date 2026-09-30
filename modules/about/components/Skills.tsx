import { STACK_GROUPS, type Stack } from "@/common/constant/stacks"
import Tag from "@/components/ds/tag"
import { cn } from "@/lib/utils"

function SkillBadge({ skill }: { skill: Stack }) {
  const Icon = skill.icon
  return (
    <Tag>
      <Icon aria-hidden="true" className={cn(skill.className)} />
      {skill.name}
    </Tag>
  )
}

const Skills = () => {
  return (
    <div className="relative overflow-hidden rounded-xl border border-border">
      {/* One continuous dashed rule between the label and badge columns. */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-y-0 left-48 border-border border-r border-dashed max-sm:hidden"
      />
      {STACK_GROUPS.map((group, index) => {
        const id = `stack-${group.category.toLowerCase().replace(/\W+/g, "-")}`
        return (
          <div
            key={group.category}
            className="grid items-start gap-y-2 border-border border-b py-4 last:border-b-0 sm:grid-cols-[12rem_1fr]"
          >
            <h3 id={id} className="pl-4 text-sm/6">
              <span
                aria-hidden="true"
                className="mr-1.5 select-none font-mono text-muted-foreground"
              >
                {String(index + 1).padStart(2, "0")}
              </span>
              {group.category}
            </h3>
            <ul aria-labelledby={id} className="flex flex-wrap gap-1.5 px-4">
              {group.stacks.map((skill) => (
                <li key={skill.name} className="flex">
                  <SkillBadge skill={skill} />
                </li>
              ))}
            </ul>
          </div>
        )
      })}
    </div>
  )
}

export default Skills
