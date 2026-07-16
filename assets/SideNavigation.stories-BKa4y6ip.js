import{i as e,s as t}from"./preload-helper-xPQekRTU.js";import{F as n,t as r}from"./iframe-MTOO4ZUc.js";import{n as i,r as a}from"./SideNavigation-BeSbUQyM.js";function o({initialMinimized:e,trigger:t}){let[n,r]=(0,s.useState)(e);return(0,s.useEffect)(()=>{r(e)},[e]),(0,c.jsx)(i,{minimized:n,triggerVisibility:t===`floating-hover`?`hover`:`always`,version:t===`top`?`v2`:`v1`,onToggle:()=>r(e=>!e)})}var s,c,l,u,d,f,p;e((()=>{s=t(n(),1),a(),c=r(),l={title:`Shell/Side Navigation`,component:i,parameters:{layout:`centered`},argTypes:{minimized:{control:`boolean`,description:`Minimized mode — shows icons only`},trigger:{control:`radio`,options:[`floating`,`floating-hover`,`top`],description:`floating = v1 always, floating-hover = v1 on hover, top = v2 inline`}},args:{minimized:!1,trigger:`floating`},decorators:[e=>(0,c.jsx)(`div`,{style:{position:`relative`,display:`inline-block`,overflow:`visible`,minHeight:200},children:(0,c.jsx)(e,{})})]},u={name:`Open`,render:e=>(0,c.jsx)(o,{initialMinimized:!1,trigger:e.trigger}),args:{minimized:!1}},d={name:`Minimized`,render:e=>(0,c.jsx)(o,{initialMinimized:!0,trigger:e.trigger}),args:{minimized:!0}},f={name:`Interactive (toggle via control)`,render:e=>(0,c.jsx)(o,{initialMinimized:e.minimized,trigger:e.trigger})},u.parameters={...u.parameters,docs:{...u.parameters?.docs,source:{originalSource:`{
  name: 'Open',
  render: args => <InteractiveNav initialMinimized={false} trigger={args.trigger} />,
  args: {
    minimized: false
  }
}`,...u.parameters?.docs?.source}}},d.parameters={...d.parameters,docs:{...d.parameters?.docs,source:{originalSource:`{
  name: 'Minimized',
  render: args => <InteractiveNav initialMinimized={true} trigger={args.trigger} />,
  args: {
    minimized: true
  }
}`,...d.parameters?.docs?.source}}},f.parameters={...f.parameters,docs:{...f.parameters?.docs,source:{originalSource:`{
  name: 'Interactive (toggle via control)',
  render: args => <InteractiveNav initialMinimized={args.minimized} trigger={args.trigger} />
}`,...f.parameters?.docs?.source}}},p=[`Open`,`Minimized`,`Interactive`]}))();export{f as Interactive,d as Minimized,u as Open,p as __namedExportsOrder,l as default};