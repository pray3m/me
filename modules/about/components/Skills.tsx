import { STACK_GROUPS, type Stack } from "@/common/constant/stacks"
import { cn } from "@/lib/utils"

function SkillBadge({ skill }: { skill: Stack }) {
  const Icon = skill.icon
  return (
    <div className="flex justify-center gap-2 rounded-full border-border bg-background px-3 py-2 text-center font-medium text-[13px] text-foreground hover:bg-primary/10 [&>svg]:size-4">
      <Icon className={cn(skill.className)} aria-hidden="true" />
      <span>{skill.name}</span>
    </div>
  )
}

const Skills = () => {
  return (
    <div className="flex flex-col gap-4">
      {STACK_GROUPS.map((group) => (
        <div
          key={group.category}
          className="relative rounded-xl border border-border px-4 pt-4 pb-3"
        >
          <h3 className="absolute top-0 right-3 -translate-y-1/2 bg-[#EDF4F9] px-1 font-medium font-mono text-[11px] text-muted-foreground uppercase tracking-widest dark:bg-[#0D1013]">
            {group.category}
          </h3>
          <ul className="flex flex-wrap gap-2">
            {group.stacks.map((skill) => (
              <li key={skill.name}>
                <SkillBadge skill={skill} />
              </li>
            ))}
          </ul>
        </div>
      ))}
    </div>
  )
}

export default Skills
