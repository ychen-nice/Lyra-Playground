import{i as e}from"./preload-helper-xPQekRTU.js";import{t}from"./iframe-BuEzijNE.js";import{n,t as r}from"./PageHeader-C2G7zaR-.js";function i(e,t){return Array.from({length:e},(e,n)=>{let r=n+1>=t&&t>0?`link`:`label`;return{label:c[n]??`Level ${n+1}`,type:r,href:r===`link`?`#`:void 0}})}function a(e){let{levelCount:t,linksStartAt:n,...a}=e;return(0,o.jsx)(r,{...a,levels:i(t,n)})}var o,s,c,l,u,d,f,p,m,h,g;e((()=>{n(),o=t(),s=8,c=[`Home`,`Products`,`Electronics`,`Computers`,`Laptops`,`Gaming`,`Budget`,`Refurbished`],l={title:`Content Panel/Page Header`,component:r,parameters:{layout:`padded`},argTypes:{title:{control:`text`,description:`Page title text`},levelCount:{control:{type:`range`,min:0,max:s,step:1},description:`Number of breadcrumb levels (0 = title only)`,table:{category:`Breadcrumb`}},linksStartAt:{control:{type:`range`,min:1,max:s,step:1},description:`Links start at this level (levels before it are labels, 1 = all links)`,table:{category:`Breadcrumb`}},showSideNavTrigger:{control:`boolean`,description:`Show/hide the sidebar toggle icon`},showBreadcrumb:{control:`boolean`,description:`Show/hide the breadcrumb hierarchy`},showStatusBadge:{control:`boolean`,description:`Show/hide the status badge`},statusBadgeLabel:{control:`text`,description:`Status badge label`},showAiTrigger:{control:`boolean`,description:`Show/hide the AI button`},levels:{control:!1,table:{disable:!0}},_sidebarOpen:{control:!1,table:{disable:!0}},headerMiddleSlot:{control:!1,table:{disable:!0}},headerActionsSlot:{control:!1,table:{disable:!0}},breadcrumbSlot:{control:!1,table:{disable:!0}}},args:{title:`Page Title`,levelCount:1,linksStartAt:1,showSideNavTrigger:!0,showBreadcrumb:!0,showStatusBadge:!1,statusBadgeLabel:`Active`,showAiTrigger:!0}},u={name:`Default`,render:e=>(0,o.jsx)(a,{...e})},d={name:`With Status Badge`,render:e=>(0,o.jsx)(a,{...e}),args:{showStatusBadge:!0}},f={name:`No Side Nav Trigger`,render:e=>(0,o.jsx)(a,{...e}),args:{showSideNavTrigger:!1,showBreadcrumb:!1}},p={name:`No AI Trigger`,render:e=>(0,o.jsx)(a,{...e}),args:{showAiTrigger:!1}},m={name:`Many Levels (≥ 4)`,render:e=>(0,o.jsx)(a,{...e}),args:{levelCount:5,linksStartAt:1,title:`Product Detail`}},h={name:`Full Featured`,render:e=>(0,o.jsx)(a,{...e}),args:{showStatusBadge:!0,showSideNavTrigger:!0,showBreadcrumb:!0,showAiTrigger:!0,title:`Case Management`,levelCount:1,linksStartAt:1,statusBadgeLabel:`Active`}},u.parameters={...u.parameters,docs:{...u.parameters?.docs,source:{originalSource:`{
  name: "Default",
  render: args => <HeaderStory {...args} />
}`,...u.parameters?.docs?.source}}},d.parameters={...d.parameters,docs:{...d.parameters?.docs,source:{originalSource:`{
  name: "With Status Badge",
  render: args => <HeaderStory {...args} />,
  args: {
    showStatusBadge: true
  }
}`,...d.parameters?.docs?.source}}},f.parameters={...f.parameters,docs:{...f.parameters?.docs,source:{originalSource:`{
  name: "No Side Nav Trigger",
  render: args => <HeaderStory {...args} />,
  args: {
    showSideNavTrigger: false,
    showBreadcrumb: false
  }
}`,...f.parameters?.docs?.source}}},p.parameters={...p.parameters,docs:{...p.parameters?.docs,source:{originalSource:`{
  name: "No AI Trigger",
  render: args => <HeaderStory {...args} />,
  args: {
    showAiTrigger: false
  }
}`,...p.parameters?.docs?.source}}},m.parameters={...m.parameters,docs:{...m.parameters?.docs,source:{originalSource:`{
  name: "Many Levels (≥ 4)",
  render: args => <HeaderStory {...args} />,
  args: {
    levelCount: 5,
    linksStartAt: 1,
    title: "Product Detail"
  }
}`,...m.parameters?.docs?.source}}},h.parameters={...h.parameters,docs:{...h.parameters?.docs,source:{originalSource:`{
  name: "Full Featured",
  render: args => <HeaderStory {...args} />,
  args: {
    showStatusBadge: true,
    showSideNavTrigger: true,
    showBreadcrumb: true,
    showAiTrigger: true,
    title: "Case Management",
    levelCount: 1,
    linksStartAt: 1,
    statusBadgeLabel: "Active"
  }
}`,...h.parameters?.docs?.source}}},g=[`Default`,`WithStatusBadge`,`NoSideNav`,`NoAiTrigger`,`ManyLevels`,`FullFeatured`]}))();export{u as Default,h as FullFeatured,m as ManyLevels,p as NoAiTrigger,f as NoSideNav,d as WithStatusBadge,g as __namedExportsOrder,l as default};