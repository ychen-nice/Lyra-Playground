import{i as e,s as t}from"./preload-helper-xPQekRTU.js";import{F as n,t as r}from"./iframe-RNbPRStA.js";import{n as i,r as a}from"./SideNavigation-iAHNF990.js";function o({initialMinimized:e,trigger:t}){let[n,r]=(0,c.useState)(e);return(0,c.useEffect)(()=>{r(e)},[e]),(0,l.jsx)(i,{minimized:n,triggerVisibility:t===`floating-hover`?`hover`:`always`,version:t===`top`?`v2`:`v1`,onToggle:()=>r(e=>!e)})}function s(){return(0,l.jsxs)(`div`,{style:{position:`relative`,width:700,height:480,background:`var(--lyra-color-bg-surface-shell, #f3f5f7)`,borderRadius:`var(--lyra-radius-lg)`,overflow:`hidden`},children:[(0,l.jsx)(`div`,{style:{position:`absolute`,top:0,left:12,right:12,bottom:12,background:`var(--lyra-color-bg-surface-base, #ffffff)`,border:`1px solid var(--lyra-color-border-subtle, rgba(0,0,0,0.1))`,borderRadius:`var(--lyra-radius-lg)`,boxShadow:`var(--lyra-shadow-sm)`}}),(0,l.jsx)(`div`,{style:{position:`absolute`,top:1,left:0,bottom:13,zIndex:10,width:320,overflow:`hidden`},children:(0,l.jsx)(`div`,{style:{height:`100%`,width:`fit-content`,borderRight:`1px solid var(--lyra-color-border-subtle, rgba(0,0,0,0.1))`,boxShadow:`var(--lyra-shadow-xl)`,background:`var(--lyra-color-bg-surface-shell, #f3f5f7)`},children:(0,l.jsx)(i,{minimized:!1,showToggle:!1})})})]})}var c,l,u,d,f,p,m,h;e((()=>{c=t(n(),1),a(),l=r(),u={title:`Shell/Side Navigation`,component:i,parameters:{layout:`centered`},argTypes:{minimized:{control:`boolean`,description:`Minimized mode — shows icons only`},trigger:{control:`radio`,options:[`floating`,`floating-hover`,`top`],description:`floating = v1 always, floating-hover = v1 on hover, top = v2 inline`}},args:{minimized:!1,trigger:`floating`},decorators:[e=>(0,l.jsx)(`div`,{style:{position:`relative`,display:`inline-block`,overflow:`visible`,minHeight:200},children:(0,l.jsx)(e,{})})]},d={name:`Open`,render:e=>(0,l.jsx)(o,{initialMinimized:!1,trigger:e.trigger}),args:{minimized:!1}},f={name:`Minimized`,render:e=>(0,l.jsx)(o,{initialMinimized:!0,trigger:e.trigger}),args:{minimized:!0}},p={name:`Interactive (toggle via control)`,render:e=>(0,l.jsx)(o,{initialMinimized:e.minimized,trigger:e.trigger})},m={name:`Open — Overlay`,render:()=>(0,l.jsx)(s,{})},d.parameters={...d.parameters,docs:{...d.parameters?.docs,source:{originalSource:`{
  name: 'Open',
  render: args => <InteractiveNav initialMinimized={false} trigger={args.trigger} />,
  args: {
    minimized: false
  }
}`,...d.parameters?.docs?.source}}},f.parameters={...f.parameters,docs:{...f.parameters?.docs,source:{originalSource:`{
  name: 'Minimized',
  render: args => <InteractiveNav initialMinimized={true} trigger={args.trigger} />,
  args: {
    minimized: true
  }
}`,...f.parameters?.docs?.source}}},p.parameters={...p.parameters,docs:{...p.parameters?.docs,source:{originalSource:`{
  name: 'Interactive (toggle via control)',
  render: args => <InteractiveNav initialMinimized={args.minimized} trigger={args.trigger} />
}`,...p.parameters?.docs?.source}}},m.parameters={...m.parameters,docs:{...m.parameters?.docs,source:{originalSource:`{
  name: 'Open — Overlay',
  render: () => <OverlayDemo />
}`,...m.parameters?.docs?.source}}},h=[`Open`,`Minimized`,`Interactive`,`OpenOverlay`]}))();export{p as Interactive,f as Minimized,d as Open,m as OpenOverlay,h as __namedExportsOrder,u as default};