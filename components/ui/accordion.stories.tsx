import type { Meta, StoryObj } from "@storybook/nextjs-vite"

import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "./accordion"

const meta = {
  title: "UI/Accordion",
  component: Accordion,
  args: {
    type: "single",
    collapsible: true,
  },
} satisfies Meta<typeof Accordion>

export default meta

type Story = StoryObj<typeof meta>

export const Default: Story = {
  render: (args) => (
    <Accordion {...args} className="w-full max-w-xl">
      <AccordionItem value="intro">
        <AccordionTrigger>소개</AccordionTrigger>
        <AccordionContent>
          사용자 흐름과 유지보수를 함께 고려하는 프론트엔드 개발자입니다.
        </AccordionContent>
      </AccordionItem>
      <AccordionItem value="stack">
        <AccordionTrigger>기술 스택</AccordionTrigger>
        <AccordionContent>
          Next.js, React, TypeScript, Tailwind CSS를 중심으로 작업합니다.
        </AccordionContent>
      </AccordionItem>
    </Accordion>
  ),
}
