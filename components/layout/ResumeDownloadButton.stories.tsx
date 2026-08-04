import type { Meta, StoryObj } from "@storybook/nextjs-vite"

import { ResumeDownloadButton } from "./ResumeDownloadButton"

const meta = {
  title: "Layout/ResumeDownloadButton",
  component: ResumeDownloadButton,
  argTypes: {
    variant: {
      control: "select",
      options: ["primary", "outline", "ghost"],
    },
  },
} satisfies Meta<typeof ResumeDownloadButton>

export default meta

type Story = StoryObj<typeof meta>

export const Default: Story = {
  args: {
    variant: "outline",
  },
}

export const Compact: Story = {
  args: {
    compact: true,
    variant: "outline",
  },
}

export const Variants: Story = {
  render: () => (
    <div className="flex flex-wrap items-center gap-3">
      <ResumeDownloadButton variant="primary" />
      <ResumeDownloadButton variant="outline" />
      <ResumeDownloadButton variant="ghost" />
    </div>
  ),
}
