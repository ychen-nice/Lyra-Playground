import{i as e}from"./preload-helper-xPQekRTU.js";import{t}from"./iframe-B-rkrNyl.js";import{n,t as r}from"./PageHeader-C5BqUlp-.js";import{n as i,t as a}from"./Tabs-2w_bX8gn.js";function o(e,t){return Array.from({length:e},(e,n)=>{let r=n+1>=t&&t>0?`link`:`label`;return{label:d[n]??`Level ${n+1}`,type:r,href:r===`link`?`#`:void 0}})}function s(e){let{levelCount:t,linksStartAt:n,...i}=e;return(0,c.jsx)(r,{...i,levels:o(t,n)})}var c,l,u,d,f,p,m,h,g,_,v,y,b;e((()=>{n(),i(),c=t(),l=[{id:`section1`,label:`Tab Section`},{id:`section2`,label:`Tab Section`},{id:`section3`,label:`Tab Section`},{id:`section4`,label:`Tab Section`}],u=8,d=[`Home`,`Products`,`Electronics`,`Computers`,`Laptops`,`Gaming`,`Budget`,`Refurbished`],f={title:`Content Panel/Page Header`,component:r,parameters:{layout:`padded`},argTypes:{title:{control:`text`,description:`Page title text`},levelCount:{control:{type:`range`,min:0,max:u,step:1},description:`Number of breadcrumb levels (0 = title only)`,table:{category:`Breadcrumb`}},linksStartAt:{control:{type:`range`,min:1,max:u,step:1},description:`Links start at this level (levels before it are labels, 1 = all links)`,table:{category:`Breadcrumb`}},showSideNavTrigger:{control:`boolean`,description:`Show/hide the sidebar toggle icon`},sidenavTriggerIcon:{control:`radio`,options:[`menu`,`panel-left-open`],description:`Icon for the sidebar toggle button`},showBreadcrumb:{control:`boolean`,description:`Show/hide the breadcrumb hierarchy`},showStatusBadge:{control:`boolean`,description:`Show/hide the status badge`},statusBadgeLabel:{control:`text`,description:`Status badge label`},showAiTrigger:{control:`boolean`,description:`Show/hide the AI button`},levels:{control:!1,table:{disable:!0}},_sidebarOpen:{control:!1,table:{disable:!0}},headerMiddleSlot:{control:!1,table:{disable:!0}},headerActionsSlot:{control:!1,table:{disable:!0}},breadcrumbSlot:{control:!1,table:{disable:!0}},tabsSlot:{control:!1,table:{disable:!0}}},args:{title:`Page Title`,levelCount:1,linksStartAt:1,showSideNavTrigger:!0,sidenavTriggerIcon:`panel-left-open`,showBreadcrumb:!0,showStatusBadge:!1,statusBadgeLabel:`Active`,showAiTrigger:!0}},p={name:`Default`,render:e=>(0,c.jsx)(s,{...e})},m={name:`With Status Badge`,render:e=>(0,c.jsx)(s,{...e}),args:{showStatusBadge:!0}},h={name:`No Side Nav Trigger`,render:e=>(0,c.jsx)(s,{...e}),args:{showSideNavTrigger:!1,showBreadcrumb:!1}},g={name:`No AI Trigger`,render:e=>(0,c.jsx)(s,{...e}),args:{showAiTrigger:!1}},_={name:`Many Levels (≥ 4)`,render:e=>(0,c.jsx)(s,{...e}),args:{levelCount:5,linksStartAt:1,title:`Product Detail`}},v={name:`With Tabs`,render:e=>(0,c.jsx)(s,{...e,tabsSlot:(0,c.jsx)(a,{items:l,variant:`flush`})})},y={name:`Full Featured`,render:e=>(0,c.jsx)(s,{...e}),args:{showStatusBadge:!0,showSideNavTrigger:!0,showBreadcrumb:!0,showAiTrigger:!0,title:`Case Management`,levelCount:1,linksStartAt:1,statusBadgeLabel:`Active`}},p.parameters={...p.parameters,docs:{...p.parameters?.docs,source:{originalSource:`{
  name: "Default",
  render: args => <HeaderStory {...args} />
}`,...p.parameters?.docs?.source}}},m.parameters={...m.parameters,docs:{...m.parameters?.docs,source:{originalSource:`{
  name: "With Status Badge",
  render: args => <HeaderStory {...args} />,
  args: {
    showStatusBadge: true
  }
}`,...m.parameters?.docs?.source}}},h.parameters={...h.parameters,docs:{...h.parameters?.docs,source:{originalSource:`{
  name: "No Side Nav Trigger",
  render: args => <HeaderStory {...args} />,
  args: {
    showSideNavTrigger: false,
    showBreadcrumb: false
  }
}`,...h.parameters?.docs?.source}}},g.parameters={...g.parameters,docs:{...g.parameters?.docs,source:{originalSource:`{
  name: "No AI Trigger",
  render: args => <HeaderStory {...args} />,
  args: {
    showAiTrigger: false
  }
}`,...g.parameters?.docs?.source}}},_.parameters={..._.parameters,docs:{..._.parameters?.docs,source:{originalSource:`{
  name: "Many Levels (≥ 4)",
  render: args => <HeaderStory {...args} />,
  args: {
    levelCount: 5,
    linksStartAt: 1,
    title: "Product Detail"
  }
}`,..._.parameters?.docs?.source}}},v.parameters={...v.parameters,docs:{...v.parameters?.docs,source:{originalSource:`{
  name: "With Tabs",
  render: args => <HeaderStory {...args} tabsSlot={<Tabs items={TAB_ITEMS} variant="flush" />} />
}`,...v.parameters?.docs?.source}}},y.parameters={...y.parameters,docs:{...y.parameters?.docs,source:{originalSource:`{
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
}`,...y.parameters?.docs?.source}}},b=[`Default`,`WithStatusBadge`,`NoSideNav`,`NoAiTrigger`,`ManyLevels`,`WithTabs`,`FullFeatured`]}))();export{p as Default,y as FullFeatured,_ as ManyLevels,g as NoAiTrigger,h as NoSideNav,m as WithStatusBadge,v as WithTabs,b as __namedExportsOrder,f as default};