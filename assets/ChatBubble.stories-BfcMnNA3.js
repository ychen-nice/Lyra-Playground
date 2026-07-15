import{i as e}from"./preload-helper-xPQekRTU.js";import{o as t,t as n}from"./iframe-DUq1tqCM.js";import{n as r,t as i}from"./ChatBubble-n4s_PfBK.js";var a,o,s,c,l,u;e((()=>{r(),t(),a=n(),o=()=>(0,a.jsx)(`style`,{children:`
    :root {
      --lyra-color-bg-conversation-user: #EBF0FF;
      --lyra-color-bg-control-subtle:    rgba(0,0,0,0.02);
      --lyra-color-bg-control:           rgba(0,0,0,0.04);
      --lyra-color-bg-disabled:          rgba(0,0,0,0.08);
      --lyra-color-fg-default:           rgba(0,0,0,0.80);
      --lyra-color-fg-secondary:         rgba(0,0,0,0.60);
      --lyra-color-fg-action:            #5D6A79;
      --lyra-color-border-active:        #185BA4;
      --lyra-radius-sm:    6px;
      --lyra-radius-md:    8px;
      --lyra-radius-round: 999px;
      --lyra-spacing-05:   2px;
      --lyra-spacing-1:    4px;
      --lyra-spacing-2:    8px;
      --lyra-spacing-3:   12px;
      --lyra-spacing-4:   16px;
      --lyra-spacing-5:   20px;
      --lyra-border-default: 1px;
    }
    .icon-btn:focus-visible { outline: 2px solid var(--lyra-color-border-active); outline-offset: 0.125rem; }
  `}),s={title:`Components/Chat Bubble`,component:i,decorators:[e=>(0,a.jsxs)(`div`,{style:{padding:24,maxWidth:480,fontFamily:`Inter, sans-serif`},children:[(0,a.jsx)(o,{}),(0,a.jsx)(e,{})]})],parameters:{layout:`centered`,docs:{description:{component:`Unified chat bubble with two variants — **user** (right-aligned, blue tint, copy on hover/focus) and **ai** (left-aligned, full action bar with thumbs up/down, regenerate, and copy).`}}},argTypes:{variant:{control:`radio`,options:[`user`,`ai`],description:`Bubble variant`},isLatest:{control:`boolean`,description:`AI only — keeps the action bar permanently visible`,if:{arg:`variant`,eq:`ai`}},reasoning:{control:`text`,description:`AI only — collapsible reasoning/thinking text shown above the answer`,if:{arg:`variant`,eq:`ai`}},content:{control:`text`,description:`Message text (user) or structured content array (ai)`}}},c={name:`User`,args:{variant:`user`,content:`Hey — give me a quick read on where we stand right now. Queue's feeling heavy.`}},l={name:`AI Answer`,args:{variant:`ai`,isLatest:!0,reasoning:`The user is asking about queue status. I should check for SLA risks first, then look at agent availability. Billing queue shows a projected breach in ~8 minutes based on current call volume and agent capacity. James R. is the best candidate to re-route since he'll be free in ~90 seconds.`,content:[{type:`text`,text:`You're right to flag it. Here's the snapshot:`},{type:`list`,items:[`Calls in queue: 12 (↑4 from 10 min ago)`,`Longest wait: 6:48`,`Agents available: 2 of 6`,`SLA at risk: Billing queue – projected breach in ~8 minutes`]},{type:`text`,text:`James R. finishes his current call in about 90 seconds. Routing him straight to Billing would close the gap before the breach.`}]}},c.parameters={...c.parameters,docs:{...c.parameters?.docs,source:{originalSource:`{
  name: "User",
  args: {
    variant: "user",
    content: "Hey — give me a quick read on where we stand right now. Queue's feeling heavy."
  }
}`,...c.parameters?.docs?.source}}},l.parameters={...l.parameters,docs:{...l.parameters?.docs,source:{originalSource:`{
  name: "AI Answer",
  args: {
    variant: "ai",
    isLatest: true,
    reasoning: "The user is asking about queue status. I should check for SLA risks first, then look at agent availability. Billing queue shows a projected breach in ~8 minutes based on current call volume and agent capacity. James R. is the best candidate to re-route since he'll be free in ~90 seconds.",
    content: [{
      type: "text",
      text: "You're right to flag it. Here's the snapshot:"
    }, {
      type: "list",
      items: ["Calls in queue: 12 (↑4 from 10 min ago)", "Longest wait: 6:48", "Agents available: 2 of 6", "SLA at risk: Billing queue – projected breach in ~8 minutes"]
    }, {
      type: "text",
      text: "James R. finishes his current call in about 90 seconds. Routing him straight to Billing would close the gap before the breach."
    }]
  }
}`,...l.parameters?.docs?.source}}},u=[`User`,`AI`]}))();export{l as AI,c as User,u as __namedExportsOrder,s as default};