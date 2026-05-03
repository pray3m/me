import { STACKS } from "@/common/constant/stacks"
import { Badge, Marquee } from "@/components/ds"
import { cn } from "@/lib/utils"

const seededRandom = (seed: number) => {
  let value = seed
  return () => {
    value = (value * 1664525 + 1013904223) % 4294967296
    return value / 4294967296
  }
}

const shuffleBySeed = <T,>(items: readonly T[], seed: number) => {
  const random = seededRandom(seed)
  const shuffled = [...items]
  for (let i = shuffled.length - 1; i > 0; i--) {
    const j = Math.floor(random() * (i + 1))
    ;[shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]]
  }
  return shuffled
}

const rows = [
  {
    stacks: shuffleBySeed(STACKS, 1),
    duration: "80s",
    delay: "0s",
    reverse: false,
  },
  {
    stacks: shuffleBySeed(STACKS, 2),
    duration: "100s",
    delay: "-30s",
    reverse: true,
  },
  {
    stacks: shuffleBySeed(STACKS, 3),
    duration: "90s",
    delay: "-55s",
    reverse: false,
  },
] as const

function SkillBadge({ skill }: { skill: (typeof STACKS)[number] }) {
  const Icon = skill.icon
  return (
    <Badge
      variant="outline"
      className="shrink-0 gap-2 rounded-full border-border bg-background px-5 py-2 font-medium text-[15px] text-foreground shadow-sm [&>svg]:size-5"
    >
      <Icon className={cn(skill.className)} aria-hidden="true" />
      <span>{skill.name}</span>
    </Badge>
  )
}

const Skills = () => {
  return (
    <>
      <ul className="sr-only">
        {STACKS.map((skill) => (
          <li key={skill.name}>{skill.name}</li>
        ))}
      </ul>
      <div
        aria-hidden="true"
        className="mask-[linear-gradient(90deg,transparent,black_12%,black_88%,transparent)] flex w-full flex-col gap-4 overflow-hidden py-2"
      >
        {rows.map((row, rowIndex) => (
          <Marquee
            key={rowIndex}
            duration={row.duration}
            delay={row.delay}
            reverse={row.reverse}
          >
            {row.stacks.map((skill) => (
              <SkillBadge key={skill.name} skill={skill} />
            ))}
          </Marquee>
        ))}
      </div>
    </>
  )
}

export default Skills
