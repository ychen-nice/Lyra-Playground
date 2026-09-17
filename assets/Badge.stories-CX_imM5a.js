import{i as e,s as t}from"./preload-helper-xPQekRTU.js";import{c as n,nn as r,s as i,t as a}from"./iframe-Ma6eBC3s.js";import{n as o,t as s}from"./Badge-BAdS7t68.js";function c({label:e,children:t}){return(0,m.jsxs)(`label`,{style:{display:`flex`,flexDirection:`column`,gap:`var(--lyra-spacing-1)`},children:[(0,m.jsx)(`span`,{className:`lyra-body-sm-em`,style:{color:`var(--lyra-color-fg-secondary)`},children:e}),t]})}function l({label:e,value:t,onChange:n,options:r}){return(0,m.jsx)(c,{label:e,children:(0,m.jsx)(`div`,{style:{display:`flex`,gap:`var(--lyra-spacing-3)`},children:r.map(e=>(0,m.jsxs)(`label`,{style:{display:`flex`,alignItems:`center`,gap:`var(--lyra-spacing-1)`,cursor:`pointer`},children:[(0,m.jsx)(`input`,{type:`radio`,checked:t===e.value,onChange:()=>n(e.value)}),(0,m.jsx)(`span`,{className:`lyra-body-md`,children:e.label??e.value})]},e.value))})})}function u({label:e,checked:t,onChange:n}){return(0,m.jsxs)(`label`,{style:{display:`flex`,alignItems:`center`,gap:`var(--lyra-spacing-2)`,cursor:`pointer`},children:[(0,m.jsx)(`input`,{type:`checkbox`,checked:t,onChange:e=>n(e.target.checked)}),(0,m.jsx)(`span`,{className:`lyra-body-md`,children:e})]})}function d(e){return e.type===`label`?e.labelSize:e.size}function f(){let[e,t]=(0,p.useState)(`label`),[r,i]=(0,p.useState)(`subtle`),[a,o]=(0,p.useState)(`large`),[d,f]=(0,p.useState)(`large`),[g,_]=(0,p.useState)(!1),[v,y]=(0,p.useState)(!1),b=e===`label`?d:a;return(0,m.jsxs)(`div`,{style:{display:`flex`,flexDirection:`column`,gap:`var(--lyra-spacing-4)`},children:[(0,m.jsxs)(`div`,{style:{display:`flex`,flexWrap:`wrap`,alignItems:`flex-start`,gap:`var(--lyra-spacing-6)`,padding:`var(--lyra-spacing-4)`,borderRadius:`var(--lyra-radius-md)`,border:`1px solid var(--lyra-color-border-subtle)`,background:`var(--lyra-color-bg-surface-container-subtle)`},children:[(0,m.jsx)(l,{label:`Type`,value:e,onChange:t,options:[{value:`label`,label:`Label`},{value:`counter`,label:`Value`},{value:`icon`,label:`Icon`}]}),(0,m.jsx)(l,{label:`Color Style`,value:r,onChange:i,options:[{value:`subtle`},{value:`strong`}]}),e===`label`?(0,m.jsx)(l,{label:`Size`,value:d,onChange:f,options:[{value:`large`},{value:`medium`}]}):(0,m.jsx)(l,{label:`Size`,value:a,onChange:o,options:[{value:`large`},{value:`medium`},{value:`small`}]}),e===`label`&&(0,m.jsx)(c,{label:`Icons`,children:(0,m.jsxs)(`div`,{style:{display:`flex`,gap:`var(--lyra-spacing-3)`},children:[(0,m.jsx)(u,{label:`Leading`,checked:g,onChange:_}),(0,m.jsx)(u,{label:`Trailing`,checked:v,onChange:y})]})})]}),(0,m.jsx)(`div`,{style:{display:`flex`,flexWrap:`wrap`,gap:`var(--lyra-spacing-2)`},children:h.map((t,i)=>e===`icon`?(0,m.jsx)(s,{type:`icon`,colorStyle:r,size:b,color:t,icon:(0,m.jsx)(n,{})},t):e===`counter`?(0,m.jsx)(s,{type:`counter`,colorStyle:r,size:b,color:t,children:i+1},t):(0,m.jsx)(s,{type:`label`,colorStyle:r,size:b,color:t,leadingIcon:g?(0,m.jsx)(n,{}):void 0,trailingIcon:v?(0,m.jsx)(n,{}):void 0,children:t[0].toUpperCase()+t.slice(1)},t))})]})}var p,m,h,g,_,v,y,b,x,S,C,w,T;e((()=>{p=t(r(),1),i(),o(),m=a(),h=[`slate`,`red`,`orange`,`yellow`,`lime`,`green`,`teal`,`blue`,`purple`,`pink`],g={title:`Components/Badge`,component:s,parameters:{layout:`padded`},argTypes:{color:{control:`select`,options:h},colorStyle:{control:`radio`,options:[`subtle`,`strong`]},size:{control:`radio`,options:[`large`,`medium`,`small`],if:{arg:`type`,neq:`label`}},labelSize:{name:`size`,control:`radio`,options:[`large`,`medium`],description:`The label type has no small size`,if:{arg:`type`,eq:`label`}},type:{options:[`label`,`counter`,`icon`],control:{type:`radio`,labels:{label:`Label`,counter:`Value`,icon:`Icon`}}},children:{control:`text`},showLeadingIcon:{control:`boolean`,name:`Leading Icon`,description:`Adds a leading icon (label type only)`,if:{arg:`type`,eq:`label`}},showTrailingIcon:{control:`boolean`,name:`Trailing Icon`,description:`Adds a trailing icon (label type only)`,if:{arg:`type`,eq:`label`}}},args:{color:`slate`,colorStyle:`subtle`,size:`large`,labelSize:`large`,type:`label`,children:`Label`,showLeadingIcon:!1,showTrailingIcon:!1}},_={name:`Default`,render:({children:e,showLeadingIcon:t,showTrailingIcon:r,labelSize:i,...a})=>{let o=d({...a,labelSize:i});if(a.type===`icon`)return(0,m.jsx)(s,{...a,size:o,icon:(0,m.jsx)(n,{})});if(a.type===`counter`){let t=e===`Label`?`9`:e;return(0,m.jsx)(s,{...a,size:o,children:t})}return(0,m.jsx)(s,{...a,size:o,leadingIcon:t?(0,m.jsx)(n,{}):void 0,trailingIcon:r?(0,m.jsx)(n,{}):void 0,children:e})}},v={name:`All Colors`,parameters:{controls:{disable:!0}},render:()=>(0,m.jsx)(f,{})},y={name:`Subtle vs. Strong`,parameters:{controls:{disable:!0}},render:()=>(0,m.jsxs)(`div`,{style:{display:`flex`,flexDirection:`column`,gap:`var(--lyra-spacing-3)`},children:[(0,m.jsx)(`div`,{style:{display:`flex`,flexWrap:`wrap`,gap:`var(--lyra-spacing-2)`},children:h.map(e=>(0,m.jsx)(s,{color:e,colorStyle:`subtle`,children:e[0].toUpperCase()+e.slice(1)},e))}),(0,m.jsx)(`div`,{style:{display:`flex`,flexWrap:`wrap`,gap:`var(--lyra-spacing-2)`},children:h.map(e=>(0,m.jsx)(s,{color:e,colorStyle:`strong`,children:e[0].toUpperCase()+e.slice(1)},e))})]})},b={name:`Label — Sizes`,parameters:{controls:{disable:!0}},render:()=>(0,m.jsxs)(`div`,{style:{display:`flex`,alignItems:`center`,gap:`var(--lyra-spacing-3)`},children:[(0,m.jsx)(s,{type:`label`,size:`large`,children:`Large`}),(0,m.jsx)(s,{type:`label`,size:`medium`,children:`Medium`})]})},x={name:`Label — With Icons`,parameters:{controls:{disable:!0}},render:()=>(0,m.jsxs)(`div`,{style:{display:`flex`,alignItems:`center`,gap:`var(--lyra-spacing-3)`},children:[(0,m.jsx)(s,{type:`label`,leadingIcon:(0,m.jsx)(n,{}),children:`Leading`}),(0,m.jsx)(s,{type:`label`,trailingIcon:(0,m.jsx)(n,{}),children:`Trailing`}),(0,m.jsx)(s,{type:`label`,leadingIcon:(0,m.jsx)(n,{}),trailingIcon:(0,m.jsx)(n,{}),children:`Both`})]})},S={name:`Counter — Sizes`,parameters:{controls:{disable:!0}},render:()=>(0,m.jsxs)(`div`,{style:{display:`flex`,alignItems:`center`,gap:`var(--lyra-spacing-3)`},children:[(0,m.jsx)(s,{type:`counter`,size:`large`,children:`9`}),(0,m.jsx)(s,{type:`counter`,size:`medium`,children:`9`}),(0,m.jsx)(s,{type:`counter`,size:`small`,children:`9`}),(0,m.jsx)(s,{type:`counter`,size:`large`,children:`99+`})]})},C={name:`Icon — Sizes`,parameters:{controls:{disable:!0}},render:()=>(0,m.jsxs)(`div`,{style:{display:`flex`,alignItems:`center`,gap:`var(--lyra-spacing-3)`},children:[(0,m.jsx)(s,{type:`icon`,size:`large`,icon:(0,m.jsx)(n,{})}),(0,m.jsx)(s,{type:`icon`,size:`medium`,icon:(0,m.jsx)(n,{})}),(0,m.jsx)(s,{type:`icon`,size:`small`,icon:(0,m.jsx)(n,{})})]})},w={name:`All Types`,parameters:{controls:{disable:!0}},render:()=>(0,m.jsxs)(`div`,{style:{display:`flex`,alignItems:`center`,gap:`var(--lyra-spacing-3)`},children:[(0,m.jsx)(s,{type:`label`,color:`blue`,children:`Label`}),(0,m.jsx)(s,{type:`counter`,color:`blue`,children:`9`}),(0,m.jsx)(s,{type:`icon`,color:`blue`,icon:(0,m.jsx)(n,{})})]})},_.parameters={..._.parameters,docs:{..._.parameters?.docs,source:{originalSource:`{
  name: "Default",
  render: ({
    children,
    showLeadingIcon,
    showTrailingIcon,
    labelSize,
    ...args
  }) => {
    const size = resolveSize({
      ...args,
      labelSize
    });
    if (args.type === 'icon') return <Badge {...args} size={size} icon={<X />} />;
    if (args.type === 'counter') {
      const content = children === 'Label' ? '9' : children;
      return <Badge {...args} size={size}>{content}</Badge>;
    }
    return <Badge {...args} size={size} leadingIcon={showLeadingIcon ? <X /> : undefined} trailingIcon={showTrailingIcon ? <X /> : undefined}>
        {children}
      </Badge>;
  }
}`,..._.parameters?.docs?.source}}},v.parameters={...v.parameters,docs:{...v.parameters?.docs,source:{originalSource:`{
  name: "All Colors",
  parameters: {
    controls: {
      disable: true
    }
  },
  render: () => <AllColorsDemo />
}`,...v.parameters?.docs?.source}}},y.parameters={...y.parameters,docs:{...y.parameters?.docs,source:{originalSource:`{
  name: "Subtle vs. Strong",
  parameters: {
    controls: {
      disable: true
    }
  },
  render: () => <div style={{
    display: 'flex',
    flexDirection: 'column',
    gap: 'var(--lyra-spacing-3)'
  }}>
      <div style={{
      display: 'flex',
      flexWrap: 'wrap',
      gap: 'var(--lyra-spacing-2)'
    }}>
        {COLORS.map(color => <Badge key={color} color={color} colorStyle="subtle">{color[0].toUpperCase() + color.slice(1)}</Badge>)}
      </div>
      <div style={{
      display: 'flex',
      flexWrap: 'wrap',
      gap: 'var(--lyra-spacing-2)'
    }}>
        {COLORS.map(color => <Badge key={color} color={color} colorStyle="strong">{color[0].toUpperCase() + color.slice(1)}</Badge>)}
      </div>
    </div>
}`,...y.parameters?.docs?.source}}},b.parameters={...b.parameters,docs:{...b.parameters?.docs,source:{originalSource:`{
  name: "Label — Sizes",
  parameters: {
    controls: {
      disable: true
    }
  },
  render: () => <div style={{
    display: 'flex',
    alignItems: 'center',
    gap: 'var(--lyra-spacing-3)'
  }}>
      <Badge type="label" size="large">Large</Badge>
      <Badge type="label" size="medium">Medium</Badge>
    </div>
}`,...b.parameters?.docs?.source}}},x.parameters={...x.parameters,docs:{...x.parameters?.docs,source:{originalSource:`{
  name: "Label — With Icons",
  parameters: {
    controls: {
      disable: true
    }
  },
  render: () => <div style={{
    display: 'flex',
    alignItems: 'center',
    gap: 'var(--lyra-spacing-3)'
  }}>
      <Badge type="label" leadingIcon={<X />}>Leading</Badge>
      <Badge type="label" trailingIcon={<X />}>Trailing</Badge>
      <Badge type="label" leadingIcon={<X />} trailingIcon={<X />}>Both</Badge>
    </div>
}`,...x.parameters?.docs?.source}}},S.parameters={...S.parameters,docs:{...S.parameters?.docs,source:{originalSource:`{
  name: "Counter — Sizes",
  parameters: {
    controls: {
      disable: true
    }
  },
  render: () => <div style={{
    display: 'flex',
    alignItems: 'center',
    gap: 'var(--lyra-spacing-3)'
  }}>
      <Badge type="counter" size="large">9</Badge>
      <Badge type="counter" size="medium">9</Badge>
      <Badge type="counter" size="small">9</Badge>
      <Badge type="counter" size="large">99+</Badge>
    </div>
}`,...S.parameters?.docs?.source}}},C.parameters={...C.parameters,docs:{...C.parameters?.docs,source:{originalSource:`{
  name: "Icon — Sizes",
  parameters: {
    controls: {
      disable: true
    }
  },
  render: () => <div style={{
    display: 'flex',
    alignItems: 'center',
    gap: 'var(--lyra-spacing-3)'
  }}>
      <Badge type="icon" size="large" icon={<X />} />
      <Badge type="icon" size="medium" icon={<X />} />
      <Badge type="icon" size="small" icon={<X />} />
    </div>
}`,...C.parameters?.docs?.source}}},w.parameters={...w.parameters,docs:{...w.parameters?.docs,source:{originalSource:`{
  name: "All Types",
  parameters: {
    controls: {
      disable: true
    }
  },
  render: () => <div style={{
    display: 'flex',
    alignItems: 'center',
    gap: 'var(--lyra-spacing-3)'
  }}>
      <Badge type="label" color="blue">Label</Badge>
      <Badge type="counter" color="blue">9</Badge>
      <Badge type="icon" color="blue" icon={<X />} />
    </div>
}`,...w.parameters?.docs?.source}}},T=[`Default`,`AllColors`,`SubtleVsStrong`,`LabelSizes`,`LabelWithIcons`,`CounterSizes`,`IconSizes`,`AllTypes`]}))();export{v as AllColors,w as AllTypes,S as CounterSizes,_ as Default,C as IconSizes,b as LabelSizes,x as LabelWithIcons,y as SubtleVsStrong,T as __namedExportsOrder,g as default};