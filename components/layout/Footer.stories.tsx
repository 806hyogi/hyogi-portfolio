import type { Meta, StoryObj } from "@storybook/nextjs-vite"

import { Footer } from "./Footer"

const meta = {
  title: "Layout/Footer",
  component: Footer,
  parameters: {
    layout: "fullscreen",
  },
} satisfies Meta<typeof Footer>

export default meta

type Story = StoryObj<typeof meta>

export const Default: Story = {
  render: () => (
    <div className="flex min-h-64 items-end bg-background">
      <div className="w-full">
        <Footer />
      </div>
    </div>
  ),
}
