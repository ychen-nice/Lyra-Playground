import{i as e,s as t}from"./preload-helper-xPQekRTU.js";import{F as n,o as r,t as i}from"./iframe-s5i7c9vk.js";import{B as a,H as o,nt as s,t as c,v as l}from"./lucide-react-D70tKxRn.js";var u=e((()=>{}));function d({item:e,selected:t,onSelect:n}){let[r,i]=(0,p.useState)(!1),{label:a,icon:o,disabled:c,error:l}=e,u=c?`var(--lyra-color-fg-disabled)`:t?`var(--lyra-color-fg-active-strong)`:`var(--lyra-color-fg-default)`;return(0,m.jsxs)(`button`,{type:`button`,role:`tab`,"aria-selected":t,disabled:c,onClick:()=>n(e.id),onMouseEnter:()=>i(!0),onMouseLeave:()=>i(!1),className:`lyra-tab`,style:{flex:`var(--lyra-tab-flex, none)`,display:`flex`,alignItems:`center`,justifyContent:`center`,gap:`var(--lyra-spacing-2)`,height:`var(--lyra-row-height-xl)`,padding:`0 var(--lyra-spacing-5)`,border:`none`,borderBottom:`${h} solid ${t?`var(--lyra-color-border-active)`:r&&!c?`var(--lyra-color-border-strong)`:`transparent`}`,cursor:c?`not-allowed`:`pointer`,whiteSpace:`nowrap`},children:[o&&(0,m.jsx)(`span`,{style:{display:`flex`,flexShrink:0,width:`var(--lyra-icon-size-sm)`,height:`var(--lyra-icon-size-sm)`,color:u},children:(0,p.cloneElement)(o,{size:`100%`})}),(0,m.jsx)(`span`,{className:t?`lyra-body-md-em`:`lyra-body-md`,style:{color:u},children:a}),l&&(0,m.jsx)(`span`,{style:{display:`flex`,flexShrink:0,color:`var(--lyra-color-status-critical-strong)`},children:(0,m.jsx)(s,{size:14})})]})}function f({items:e=[],value:t,defaultValue:n,onChange:r,alignment:i=`left`}){let[a,o]=(0,p.useState)(n??e[0]?.id),s=t??a,c=e=>{o(e),r?.(e)};return(0,m.jsx)(`div`,{role:`tablist`,style:{display:`flex`,width:i===`fit`?`100%`:`auto`,borderBottom:`1px solid var(--lyra-color-border-subtle)`,"--lyra-tab-flex":i===`fit`?`1 0 0`:`none`},children:e.map(e=>(0,m.jsx)(d,{item:e,selected:e.id===s,onSelect:c},e.id))})}var p,m,h,g=e((()=>{p=t(n(),1),c(),r(),u(),m=i(),h=`var(--lyra-border-lg)`,f.__docgenInfo={description:``,methods:[],displayName:`Tabs`,props:{items:{defaultValue:{value:`[]`,computed:!1},required:!1},alignment:{defaultValue:{value:`'left'`,computed:!1},required:!1}}}}));function _(){let[e,t]=(0,v.useState)(`overview`);return(0,y.jsxs)(`div`,{style:{display:`flex`,flexDirection:`column`,gap:`var(--lyra-spacing-4)`},children:[(0,y.jsx)(f,{items:x,value:e,onChange:t}),(0,y.jsxs)(`p`,{className:`lyra-body-md`,style:{color:`var(--lyra-color-fg-secondary)`},children:[`Active tab: `,(0,y.jsx)(`strong`,{children:e})]})]})}var v,y,b,x,S,C,w,T,E,D,O;e((()=>{v=t(n(),1),c(),g(),r(),y=i(),b={size:14},x=[{id:`overview`,label:`Overview`,icon:(0,y.jsx)(a,{...b})},{id:`files`,label:`Files`,icon:(0,y.jsx)(o,{...b})},{id:`settings`,label:`Settings`,icon:(0,y.jsx)(l,{...b})}],S={title:`Components/Tabs`,component:f,parameters:{layout:`padded`},argTypes:{alignment:{control:`radio`,options:[`left`,`fit`],description:`"left" sizes tabs to their content and left-aligns them; "fit" stretches tabs to divide the full width evenly`},showError:{control:`boolean`,name:`Show Error (Files tab)`,description:`Toggles the error indicator on the "Files" tab`},items:{control:!1,table:{disable:!0}},value:{control:!1,table:{disable:!0}},onChange:{control:!1,table:{disable:!0}}},args:{alignment:`left`,showError:!1}},C={name:`Default`,render:({showError:e,...t})=>(0,y.jsx)(f,{...t,items:x.map(t=>t.id===`files`?{...t,error:e}:t)})},w={name:`Alignment — Fit`,render:e=>(0,y.jsx)(f,{...e,items:x,alignment:`fit`})},T={name:`No Icons`,render:e=>(0,y.jsx)(f,{...e,items:x.map(({icon:e,...t})=>t)})},E={name:`Disabled & Error States`,render:e=>(0,y.jsx)(f,{...e,items:[{id:`overview`,label:`Overview`,icon:(0,y.jsx)(a,{...b})},{id:`files`,label:`Files`,icon:(0,y.jsx)(o,{...b}),error:!0},{id:`settings`,label:`Settings`,icon:(0,y.jsx)(l,{...b}),disabled:!0}]})},D={name:`Controlled`,parameters:{controls:{disable:!0}},render:()=>(0,y.jsx)(_,{})},C.parameters={...C.parameters,docs:{...C.parameters?.docs,source:{originalSource:`{
  name: 'Default',
  render: ({
    showError,
    ...args
  }) => <Tabs {...args} items={BASE_ITEMS.map(item => item.id === 'files' ? {
    ...item,
    error: showError
  } : item)} />
}`,...C.parameters?.docs?.source}}},w.parameters={...w.parameters,docs:{...w.parameters?.docs,source:{originalSource:`{
  name: 'Alignment — Fit',
  render: args => <Tabs {...args} items={BASE_ITEMS} alignment="fit" />
}`,...w.parameters?.docs?.source}}},T.parameters={...T.parameters,docs:{...T.parameters?.docs,source:{originalSource:`{
  name: 'No Icons',
  render: args => <Tabs {...args} items={BASE_ITEMS.map(({
    icon,
    ...item
  }) => item)} />
}`,...T.parameters?.docs?.source}}},E.parameters={...E.parameters,docs:{...E.parameters?.docs,source:{originalSource:`{
  name: 'Disabled & Error States',
  render: args => <Tabs {...args} items={[{
    id: 'overview',
    label: 'Overview',
    icon: <Folder {...ICON_PROPS} />
  }, {
    id: 'files',
    label: 'Files',
    icon: <FileText {...ICON_PROPS} />,
    error: true
  }, {
    id: 'settings',
    label: 'Settings',
    icon: <Settings {...ICON_PROPS} />,
    disabled: true
  }]} />
}`,...E.parameters?.docs?.source}}},D.parameters={...D.parameters,docs:{...D.parameters?.docs,source:{originalSource:`{
  name: 'Controlled',
  parameters: {
    controls: {
      disable: true
    }
  },
  render: () => <ControlledTabsDemo />
}`,...D.parameters?.docs?.source}}},O=[`Default`,`FitAlignment`,`NoIcons`,`WithDisabledAndError`,`Controlled`]}))();export{D as Controlled,C as Default,w as FitAlignment,T as NoIcons,E as WithDisabledAndError,O as __namedExportsOrder,S as default};