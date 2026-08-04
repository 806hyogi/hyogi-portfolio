import type { Preview } from "@storybook/nextjs-vite"
import { useEffect } from "react"

import "../app/globals.css"

const preview: Preview = {
  globalTypes: {
    theme: {
      description: "Global theme for components",
      toolbar: {
        title: "Theme",
        icon: "circlehollow",
        items: ["light", "dark"],
        dynamicTitle: true,
      },
      defaultValue: "light",
    },
  },
  decorators: [
    (Story, context) => {
      const theme = context.globals.theme === "dark" ? "dark" : "light"

      useEffect(() => {
        document.documentElement.classList.toggle("dark", theme === "dark")
      }, [theme])

      return (
        <div className="min-h-screen bg-background p-6 text-foreground">
          <Story />
        </div>
      )
    },
  ],
  parameters: {
    controls: {
      matchers: {
        color: /(background|color)$/i,
        date: /Date$/i,
      },
    },
    a11y: {
      test: "todo",
    },
  },
}

export default preview
