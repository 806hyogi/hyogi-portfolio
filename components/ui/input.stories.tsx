import type { Meta, StoryObj } from "@storybook/nextjs-vite"

import { Input } from "./input"

const meta = {
  title: "UI/Input",
  component: Input,
  args: {
    placeholder: "아이디를 입력하세요",
  },
} satisfies Meta<typeof Input>

export default meta

type Story = StoryObj<typeof meta>

export const Default: Story = {}

export const Password: Story = {
  args: {
    type: "password",
    placeholder: "비밀번호를 입력하세요",
  },
}

export const Disabled: Story = {
  args: {
    disabled: true,
    value: "disabled",
  },
}

export const Invalid: Story = {
  args: {
    "aria-invalid": true,
    value: "wrong value",
  },
}
