import{i as e}from"./preload-helper-xPQekRTU.js";import{n as t,t as n}from"./AiAssistantPanel-Bbta7HXJ.js";var r,i,a,o,s;e((()=>{t(),r={title:`Components/AI Assistant Panel`,component:n,parameters:{layout:`fullscreen`,docs:{description:{component:`An AI assistant chat panel built with Lyra design tokens. Supports streaming responses, user/AI message bubbles, copy/feedback actions, and a dynamic input field.`}}},argTypes:{width:{control:{type:`range`,min:400,max:720,step:4},description:`Panel width in pixels (25rem – 45rem)`},showSuggestionButton:{control:`boolean`,description:`Show or hide the suggestions (sparkle) button in the prompt field`},maxChars:{control:{type:`number`},description:`Maximum character limit. Counter appears when within 50 characters of the limit.`}},args:{width:400,showSuggestionButton:!0}},i={name:`Default`},a={name:`Empty Conversation`,args:{initialMessages:[]}},o={name:`Mobile Viewport`,parameters:{viewport:{defaultViewport:`mobile1`}}},i.parameters={...i.parameters,docs:{...i.parameters?.docs,source:{originalSource:`{
  name: "Default"
}`,...i.parameters?.docs?.source}}},a.parameters={...a.parameters,docs:{...a.parameters?.docs,source:{originalSource:`{
  name: "Empty Conversation",
  args: {
    initialMessages: []
  }
}`,...a.parameters?.docs?.source}}},o.parameters={...o.parameters,docs:{...o.parameters?.docs,source:{originalSource:`{
  name: "Mobile Viewport",
  parameters: {
    viewport: {
      defaultViewport: "mobile1"
    }
  }
}`,...o.parameters?.docs?.source}}},s=[`Default`,`EmptyConversation`,`Mobile`]}))();export{i as Default,a as EmptyConversation,o as Mobile,s as __namedExportsOrder,r as default};