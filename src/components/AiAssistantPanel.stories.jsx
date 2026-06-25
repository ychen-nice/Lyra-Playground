import AiAssistantPanel from "./AiAssistantPanel";

export default {
  title: "Components/AI Assistant Panel",
  component: AiAssistantPanel,
  parameters: {
    layout: "fullscreen",
    docs: {
      description: {
        component:
          "An AI assistant chat panel built with Lyra design tokens. Supports streaming responses, user/AI message bubbles, copy/feedback actions, and a dynamic input field.",
      },
    },
  },
  argTypes: {
    width: {
      control: { type: "range", min: 400, max: 720, step: 4 },
      description: "Panel width in pixels (25rem – 45rem)",
    },
    showSuggestionButton: {
      control: "boolean",
      description: "Show or hide the suggestions (sparkle) button in the prompt field",
    },
    maxChars: {
      control: { type: "number" },
      description: "Maximum character limit. Counter appears when within 50 characters of the limit.",
    },
  },
  args: {
    width: 400,
    showSuggestionButton: true,
  },
};

export const Default = {
  name: "Default",
};

export const EmptyConversation = {
  name: "Empty Conversation",
  args: {
    initialMessages: [],
  },
};

export const Mobile = {
  name: "Mobile Viewport",
  parameters: {
    viewport: {
      defaultViewport: "mobile1",
    },
  },
};
