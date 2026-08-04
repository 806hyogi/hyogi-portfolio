import type { Meta, StoryObj } from "@storybook/nextjs-vite"

import { BulletList } from "./BulletList"

const meta = {
  title: "Sections/BulletList",
  component: BulletList,
  args: {
    items: [
      "사용자 흐름을 기준으로 화면 구조를 설계했습니다.",
      "공통 컴포넌트를 분리해 반복되는 UI 구현 비용을 줄였습니다.",
      "로딩, 오류, 빈 상태를 함께 고려해 인터랙션을 정리했습니다.",
    ],
  },
} satisfies Meta<typeof BulletList>

export default meta

type Story = StoryObj<typeof meta>

export const Default: Story = {}
