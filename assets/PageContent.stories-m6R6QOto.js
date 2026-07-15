import{i as e,s as t}from"./preload-helper-xPQekRTU.js";import{F as n,t as r}from"./iframe-BuEzijNE.js";import{a as i,i as a,n as o,r as s}from"./DashboardList-B_zp4a42.js";import{n as c,t as l}from"./PageHeader-C2G7zaR-.js";function u(e){let[t,n]=m();return(0,f.useEffect)(()=>{let e=v(t.contentBreakpoint);e!==t.contentBreakpoint&&n({contentBreakpoint:e})},[t.contentBreakpoint]),(0,p.jsx)(e,{})}function d(e){return Array.from({length:e},(e,t)=>({label:y[t]??`Level ${t+1}`,type:`link`,href:`#`}))}var f,p,m,h,g,_,v,y,b,x,S,C,w,T,E,D;e((()=>{f=t(n(),1),i(),c(),s(),p=r(),{useArgs:m}=__STORYBOOK_MODULE_PREVIEW_API__,h=8,g=400,_=1600,v=e=>Math.max(g,Math.min(_,e??960)),y=[`Dashboards`,`Products`,`Electronics`,`Computers`,`Laptops`,`Gaming`,`Budget`,`Refurbished`],b={title:`Content Panel`,component:a,parameters:{layout:`padded`,docs:{description:{component:`Content shell container (Figma 2338:2667). Hosts a PageHeader at the top and optionally an InternalSidebar.`}}},decorators:[e=>(0,p.jsx)(`div`,{style:{height:`480px`},children:(0,p.jsx)(e,{})})],argTypes:{levelCount:{control:{type:`range`,min:0,max:h,step:1},description:`Number of breadcrumb levels (0 = title only)`,table:{category:`Breadcrumb`}},showSideNavTrigger:{control:`boolean`,description:`Show the sidebar toggle button in the header`,table:{category:`Header`}},showAiTrigger:{control:`boolean`,description:`Show the AI button in the header`,table:{category:`Header`}},showStatusBadge:{control:`boolean`,description:`Show a status badge next to the page title`,table:{category:`Header`}},statusBadgeLabel:{control:`text`,description:`Label for the status badge`,table:{category:`Header`}},contentBreakpoint:{control:`number`,description:`Min content area width (px) before sidebar auto-closes [400–1600]`,table:{category:`Sidebar`}}},args:{levelCount:1,showSideNavTrigger:!0,showAiTrigger:!0,showStatusBadge:!1,statusBadgeLabel:`Active`,contentBreakpoint:720}},x={name:`Interactive V1`,decorators:[u],render:e=>(0,p.jsx)(a,{header:(0,p.jsx)(l,{levels:d(e.levelCount),showSideNavTrigger:e.showSideNavTrigger,showAiTrigger:e.showAiTrigger,showStatusBadge:e.showStatusBadge,statusBadgeLabel:e.statusBadgeLabel}),contentBreakpoint:v(e.contentBreakpoint)})},S={name:`Header + Sidebar Opened`,render:e=>(0,p.jsx)(a,{header:(0,p.jsx)(l,{levels:d(e.levelCount)}),sidebar:(0,p.jsx)(o,{}),sidebarState:`opened`})},C={name:`Header + Sidebar Overlay`,render:e=>(0,p.jsx)(a,{header:(0,p.jsx)(l,{levels:d(e.levelCount)}),sidebar:(0,p.jsx)(o,{}),sidebarState:`overlay`})},w={name:`Sidebar — Hidden`,render:()=>(0,p.jsx)(a,{sidebar:(0,p.jsx)(o,{}),sidebarState:`hidden`}),argTypes:{levelCount:{table:{disable:!0}}}},T={name:`Sidebar — Opened`,render:()=>(0,p.jsx)(a,{sidebar:(0,p.jsx)(o,{}),sidebarState:`opened`}),argTypes:{levelCount:{table:{disable:!0}}}},E={name:`Sidebar — Overlay`,render:()=>(0,p.jsx)(a,{sidebar:(0,p.jsx)(o,{}),sidebarState:`overlay`}),argTypes:{levelCount:{table:{disable:!0}}}},x.parameters={...x.parameters,docs:{...x.parameters?.docs,source:{originalSource:`{
  name: "Interactive V1",
  decorators: [ClampBreakpointDecorator],
  render: args => <PageContent header={<PageHeader levels={buildLevels(args.levelCount)} showSideNavTrigger={args.showSideNavTrigger} showAiTrigger={args.showAiTrigger} showStatusBadge={args.showStatusBadge} statusBadgeLabel={args.statusBadgeLabel} />} contentBreakpoint={clampBreakpoint(args.contentBreakpoint)} />
}`,...x.parameters?.docs?.source}}},S.parameters={...S.parameters,docs:{...S.parameters?.docs,source:{originalSource:`{
  name: "Header + Sidebar Opened",
  render: args => <PageContent header={<PageHeader levels={buildLevels(args.levelCount)} />} sidebar={<DashboardList />} sidebarState="opened" />
}`,...S.parameters?.docs?.source}}},C.parameters={...C.parameters,docs:{...C.parameters?.docs,source:{originalSource:`{
  name: "Header + Sidebar Overlay",
  render: args => <PageContent header={<PageHeader levels={buildLevels(args.levelCount)} />} sidebar={<DashboardList />} sidebarState="overlay" />
}`,...C.parameters?.docs?.source}}},w.parameters={...w.parameters,docs:{...w.parameters?.docs,source:{originalSource:`{
  name: "Sidebar — Hidden",
  render: () => <PageContent sidebar={<DashboardList />} sidebarState="hidden" />,
  argTypes: {
    levelCount: {
      table: {
        disable: true
      }
    }
  }
}`,...w.parameters?.docs?.source}}},T.parameters={...T.parameters,docs:{...T.parameters?.docs,source:{originalSource:`{
  name: "Sidebar — Opened",
  render: () => <PageContent sidebar={<DashboardList />} sidebarState="opened" />,
  argTypes: {
    levelCount: {
      table: {
        disable: true
      }
    }
  }
}`,...T.parameters?.docs?.source}}},E.parameters={...E.parameters,docs:{...E.parameters?.docs,source:{originalSource:`{
  name: "Sidebar — Overlay",
  render: () => <PageContent sidebar={<DashboardList />} sidebarState="overlay" />,
  argTypes: {
    levelCount: {
      table: {
        disable: true
      }
    }
  }
}`,...E.parameters?.docs?.source}}},D=[`WithHeader`,`HeaderAndSidebarOpened`,`HeaderAndSidebarOverlay`,`SidebarHidden`,`SidebarOpened`,`SidebarOverlay`]}))();export{S as HeaderAndSidebarOpened,C as HeaderAndSidebarOverlay,w as SidebarHidden,T as SidebarOpened,E as SidebarOverlay,x as WithHeader,D as __namedExportsOrder,b as default};