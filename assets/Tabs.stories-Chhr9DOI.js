import{i as e,s as t}from"./preload-helper-xPQekRTU.js";import{F as n,o as r,t as i}from"./iframe-hGbdeTbq.js";import{H as a,W as o,b as s,t as c}from"./lucide-react-DMBC9Wcd.js";import{n as l,t as u}from"./Tabs-C2vn1fX1.js";function d(){let[e,t]=(0,f.useState)(`overview`);return(0,p.jsxs)(`div`,{style:{display:`flex`,flexDirection:`column`,gap:`var(--lyra-spacing-4)`},children:[(0,p.jsx)(u,{items:h,value:e,onChange:t}),(0,p.jsxs)(`p`,{className:`lyra-body-md`,style:{color:`var(--lyra-color-fg-secondary)`},children:[`Active tab: `,(0,p.jsx)(`strong`,{children:e})]})]})}var f,p,m,h,g,_,v,y,b,x,S,C,w;e((()=>{f=t(n(),1),c(),l(),r(),p=i(),m={size:14},h=[{id:`overview`,label:`Overview`,icon:(0,p.jsx)(a,{...m})},{id:`files`,label:`Files`,icon:(0,p.jsx)(o,{...m})},{id:`settings`,label:`Settings`,icon:(0,p.jsx)(s,{...m})}],g={title:`Components/Tabs`,component:u,parameters:{layout:`padded`},argTypes:{alignment:{control:`radio`,options:[`left`,`fit`],description:`"left" sizes tabs to their content and left-aligns them; "fit" stretches tabs to divide the full width evenly. Only valid with the "default" variant — the control is hidden for "flush".`,if:{arg:`variant`,eq:`default`}},showError:{control:`boolean`,name:`Show Error (Files tab)`,description:`Toggles the error indicator on the "Files" tab`},variant:{control:`radio`,options:[`default`,`flush`],description:`"default" pads each tab horizontally; "flush" removes that padding and uses a larger gap between tabs instead`},showIcons:{control:`boolean`,description:`Toggles the leading icon on every tab`},items:{control:!1,table:{disable:!0}},value:{control:!1,table:{disable:!0}},onChange:{control:!1,table:{disable:!0}}},args:{alignment:`left`,variant:`default`,showError:!1}},_={name:`Demo`,args:{variant:`default`,showIcons:!0},render:({showError:e,showIcons:t,...n})=>(0,p.jsx)(u,{...n,items:h.map(n=>{let{icon:r,...i}=n;return{...t?n:i,...n.id===`files`?{error:e}:{}}})})},v={name:`Default`,render:({showError:e,...t})=>(0,p.jsx)(u,{...t,items:h.map(t=>t.id===`files`?{...t,error:e}:t)})},y={name:`Variant — Flush`,args:{variant:`flush`},render:e=>(0,p.jsx)(u,{...e,items:h})},b={name:`Alignment — Fit`,args:{alignment:`fit`},render:e=>(0,p.jsx)(u,{...e,items:h})},x={name:`No Icons`,render:e=>(0,p.jsx)(u,{...e,items:h.map(({icon:e,...t})=>t)})},S={name:`Disabled & Error States`,render:e=>(0,p.jsx)(u,{...e,items:[{id:`overview`,label:`Overview`,icon:(0,p.jsx)(a,{...m})},{id:`files`,label:`Files`,icon:(0,p.jsx)(o,{...m}),error:!0},{id:`settings`,label:`Settings`,icon:(0,p.jsx)(s,{...m}),disabled:!0}]})},C={name:`Controlled`,parameters:{controls:{disable:!0}},render:()=>(0,p.jsx)(d,{})},_.parameters={..._.parameters,docs:{..._.parameters?.docs,source:{originalSource:`{
  name: 'Demo',
  args: {
    variant: 'default',
    showIcons: true
  },
  render: ({
    showError,
    showIcons,
    ...args
  }) => <Tabs {...args} items={BASE_ITEMS.map(item => {
    const {
      icon,
      ...rest
    } = item;
    return {
      ...(showIcons ? item : rest),
      ...(item.id === 'files' ? {
        error: showError
      } : {})
    };
  })} />
}`,..._.parameters?.docs?.source}}},v.parameters={...v.parameters,docs:{...v.parameters?.docs,source:{originalSource:`{
  name: 'Default',
  render: ({
    showError,
    ...args
  }) => <Tabs {...args} items={BASE_ITEMS.map(item => item.id === 'files' ? {
    ...item,
    error: showError
  } : item)} />
}`,...v.parameters?.docs?.source}}},y.parameters={...y.parameters,docs:{...y.parameters?.docs,source:{originalSource:`{
  name: 'Variant — Flush',
  args: {
    variant: 'flush'
  },
  render: args => <Tabs {...args} items={BASE_ITEMS} />
}`,...y.parameters?.docs?.source}}},b.parameters={...b.parameters,docs:{...b.parameters?.docs,source:{originalSource:`{
  name: 'Alignment — Fit',
  args: {
    alignment: 'fit'
  },
  render: args => <Tabs {...args} items={BASE_ITEMS} />
}`,...b.parameters?.docs?.source}}},x.parameters={...x.parameters,docs:{...x.parameters?.docs,source:{originalSource:`{
  name: 'No Icons',
  render: args => <Tabs {...args} items={BASE_ITEMS.map(({
    icon,
    ...item
  }) => item)} />
}`,...x.parameters?.docs?.source}}},S.parameters={...S.parameters,docs:{...S.parameters?.docs,source:{originalSource:`{
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
}`,...S.parameters?.docs?.source}}},C.parameters={...C.parameters,docs:{...C.parameters?.docs,source:{originalSource:`{
  name: 'Controlled',
  parameters: {
    controls: {
      disable: true
    }
  },
  render: () => <ControlledTabsDemo />
}`,...C.parameters?.docs?.source}}},w=[`Demo`,`Default`,`FlushVariant`,`FitAlignment`,`NoIcons`,`WithDisabledAndError`,`Controlled`]}))();export{C as Controlled,v as Default,_ as Demo,b as FitAlignment,y as FlushVariant,x as NoIcons,S as WithDisabledAndError,w as __namedExportsOrder,g as default};