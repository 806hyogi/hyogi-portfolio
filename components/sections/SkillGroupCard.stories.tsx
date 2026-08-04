import type { Meta, StoryObj } from "@storybook/nextjs-vite"

import { SkillGroupCard } from "./SkillGroupCard"

const meta = {
  title: "Sections/SkillGroupCard",
  component: SkillGroupCard,
  args: {
    group: {
      title: "Frontend",
      skills: [
        { name: "Next.js", icon: "/icon/github.svg" },
        { name: "React", icon: "/icon/github.svg" },
        { name: "TypeScript", icon: "/icon/github.svg" },
        { name: "Tailwind CSS", icon: "/icon/github.svg" },
      ],
    },
  },
} satisfies Meta<typeof SkillGroupCard>

export default meta

type Story = StoryObj<typeof meta>

export const Default: Story = {}
