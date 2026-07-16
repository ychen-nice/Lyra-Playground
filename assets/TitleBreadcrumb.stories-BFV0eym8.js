import{i as e}from"./preload-helper-xPQekRTU.js";import{t}from"./iframe-MTOO4ZUc.js";import{n,t as r}from"./TitleBreadcrumb-BmqexS8u.js";function i(e,t){return Array.from({length:e},(e,n)=>{let r=n+1>=t&&t>0?`link`:`label`;return{label:c[n]??`Level ${n+1}`,type:r,href:r===`link`?`#`:void 0}})}function a(e){let{levelCount:t,linksStartAt:n,title:a,showStatusBadge:s,statusBadgeLabel:c}=e;return(0,o.jsx)(r,{levels:i(t,n),title:a,showStatusBadge:s,statusBadgeLabel:c})}var o,s,c,l,u,d,f,p,m,h;e((()=>{n(),o=t(),s=8,c=[`Home`,`Products`,`Electronics`,`Computers`,`Laptops`,`Gaming`,`Budget`,`Refurbished`],l={title:`Navigation/Title Breadcrumb`,component:r,parameters:{layout:`fullscreen`},decorators:[e=>(0,o.jsx)(`div`,{style:{padding:`var(--lyra-spacing-4) var(--lyra-spacing-8)`},children:(0,o.jsx)(e,{})})],argTypes:{title:{control:`text`,description:`Current page title`,table:{category:`Title`}},showStatusBadge:{control:`boolean`,description:`Show the green status badge`,table:{category:`Title`}},statusBadgeLabel:{control:`text`,description:`Status badge text`,table:{category:`Title`}},levelCount:{control:{type:`range`,min:0,max:s,step:1},description:`Number of breadcrumb levels (0 = title only)`,table:{category:`Breadcrumb`}},linksStartAt:{control:{type:`range`,min:1,max:s,step:1},description:`Links start at this level (levels before it are labels, 1 = all links)`,table:{category:`Breadcrumb`}},levels:{control:!1},breadcrumbSlot:{control:!1}},args:{title:`Page Title`,showStatusBadge:!1,statusBadgeLabel:`Active`,levelCount:3,linksStartAt:1}},u={name:`Default`,render:e=>(0,o.jsx)(a,{...e})},d={name:`With Status Badge`,render:e=>(0,o.jsx)(a,{...e}),args:{showStatusBadge:!0}},f={name:`Title Only`,render:e=>(0,o.jsx)(a,{...e}),args:{levelCount:0}},p={name:`Many Levels (≥ 4)`,render:e=>(0,o.jsx)(a,{...e}),args:{levelCount:6,linksStartAt:1,title:`Current Page`}},m={name:`Width Simulation`,render:e=>{let{levelCount:t,linksStartAt:n,title:a,showStatusBadge:s,statusBadgeLabel:c}=e,l=i(t,n);return(0,o.jsx)(`div`,{style:{display:`flex`,flexDirection:`column`,gap:32},children:[700,400,220].map(e=>(0,o.jsxs)(`div`,{children:[(0,o.jsxs)(`div`,{style:{fontSize:11,color:`var(--lyra-color-fg-secondary)`,marginBottom:6},children:[e,`px`]}),(0,o.jsx)(`div`,{style:{width:e,padding:`0 var(--lyra-spacing-8)`,borderBottom:`var(--lyra-border-default) solid var(--lyra-color-border-subtle)`,height:`4.5rem`,display:`flex`,alignItems:`center`,boxSizing:`border-box`,background:`var(--lyra-color-bg-surface-base)`},children:(0,o.jsx)(r,{levels:l,title:a,showStatusBadge:s,statusBadgeLabel:c})})]},e))})},args:{levelCount:5,linksStartAt:1,title:`Current Page`}},u.parameters={...u.parameters,docs:{...u.parameters?.docs,source:{originalSource:`{
  name: 'Default',
  render: args => <BreadcrumbStory {...args} />
}`,...u.parameters?.docs?.source}}},d.parameters={...d.parameters,docs:{...d.parameters?.docs,source:{originalSource:`{
  name: 'With Status Badge',
  render: args => <BreadcrumbStory {...args} />,
  args: {
    showStatusBadge: true
  }
}`,...d.parameters?.docs?.source}}},f.parameters={...f.parameters,docs:{...f.parameters?.docs,source:{originalSource:`{
  name: 'Title Only',
  render: args => <BreadcrumbStory {...args} />,
  args: {
    levelCount: 0
  }
}`,...f.parameters?.docs?.source}}},p.parameters={...p.parameters,docs:{...p.parameters?.docs,source:{originalSource:`{
  name: 'Many Levels (≥ 4)',
  render: args => <BreadcrumbStory {...args} />,
  args: {
    levelCount: 6,
    linksStartAt: 1,
    title: 'Current Page'
  }
}`,...p.parameters?.docs?.source}}},m.parameters={...m.parameters,docs:{...m.parameters?.docs,source:{originalSource:`{
  name: 'Width Simulation',
  render: args => {
    const {
      levelCount,
      linksStartAt,
      title,
      showStatusBadge,
      statusBadgeLabel
    } = args;
    const levels = buildLevels(levelCount, linksStartAt);
    return <div style={{
      display: 'flex',
      flexDirection: 'column',
      gap: 32
    }}>
        {[700, 400, 220].map(w => <div key={w}>
            <div style={{
          fontSize: 11,
          color: 'var(--lyra-color-fg-secondary)',
          marginBottom: 6
        }}>
              {w}px
            </div>
            <div style={{
          width: w,
          padding: '0 var(--lyra-spacing-8)',
          borderBottom: 'var(--lyra-border-default) solid var(--lyra-color-border-subtle)',
          height: '4.5rem',
          display: 'flex',
          alignItems: 'center',
          boxSizing: 'border-box',
          background: 'var(--lyra-color-bg-surface-base)'
        }}>
              <Breadcrumb levels={levels} title={title} showStatusBadge={showStatusBadge} statusBadgeLabel={statusBadgeLabel} />
            </div>
          </div>)}
      </div>;
  },
  args: {
    levelCount: 5,
    linksStartAt: 1,
    title: 'Current Page'
  }
}`,...m.parameters?.docs?.source}}},h=[`Default`,`WithStatusBadge`,`TitleOnly`,`ManyLevels`,`WidthSimulation`]}))();export{u as Default,p as ManyLevels,f as TitleOnly,m as WidthSimulation,d as WithStatusBadge,h as __namedExportsOrder,l as default};