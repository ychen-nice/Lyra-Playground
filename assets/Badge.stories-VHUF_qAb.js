import{i as e,s as t}from"./preload-helper-xPQekRTU.js";import{F as n,o as r,t as i}from"./iframe-hGbdeTbq.js";import{n as a,t as o}from"./lucide-react-DMBC9Wcd.js";function s({color:e=`slate`,colorStyle:t=`subtle`,size:n=`large`,type:r=`label`,leadingIcon:i,trailingIcon:a,icon:o,children:s}){let u=`var(--lyra-color-accent-${e}-${t}-bg)`,m=`var(--lyra-color-accent-${e}-${t}-fg)`,h=t===`strong`?`var(--lyra-color-border-inverse)`:`var(--lyra-color-border-subtle)`;if(r===`label`){let e=d[n]??d.large;return(0,l.jsxs)(`div`,{style:{display:`inline-flex`,alignItems:`center`,justifyContent:`center`,gap:`var(--lyra-spacing-1)`,height:e.height,minWidth:e.minWidth,padding:`0 6px`,borderRadius:`var(--lyra-radius-sm)`,background:u,boxSizing:`border-box`},children:[i&&(0,l.jsx)(`span`,{style:{display:`flex`,flexShrink:0,width:e.iconSize,height:e.iconSize,color:m},children:(0,c.cloneElement)(i,{size:`100%`})}),(0,l.jsx)(`span`,{className:e.textClass,style:{color:m,overflow:`hidden`,textOverflow:`ellipsis`,whiteSpace:`nowrap`,...e.textStyle??{}},children:s}),a&&(0,l.jsx)(`span`,{style:{display:`flex`,flexShrink:0,width:e.iconSize,height:e.iconSize,color:m},children:(0,c.cloneElement)(a,{size:`100%`})})]})}if(r===`icon`){let e=p[n]??p.large;return(0,l.jsx)(`div`,{style:{display:`inline-flex`,alignItems:`center`,justifyContent:`center`,height:e.height,width:e.height,minWidth:e.minWidth,borderRadius:`var(--lyra-radius-round)`,background:u,border:`1px solid ${h}`,boxSizing:`border-box`,flexShrink:0},children:o&&(0,l.jsx)(`span`,{style:{display:`flex`,flexShrink:0,width:e.iconSize,height:e.iconSize,color:m},children:(0,c.cloneElement)(o,{size:`100%`})})})}let g=f[n]??f.large;return(0,l.jsx)(`div`,{style:{display:`inline-flex`,alignItems:`center`,justifyContent:`center`,height:g.height,minWidth:g.minWidth,padding:`0 var(--lyra-spacing-1)`,borderRadius:`var(--lyra-radius-round)`,background:u,border:`1px solid ${h}`,boxSizing:`border-box`},children:(0,l.jsx)(`span`,{className:g.textClass,style:{color:m,overflow:`hidden`,textOverflow:`ellipsis`,whiteSpace:`nowrap`,...g.textStyle??{}},children:s})})}var c,l,u,d,f,p,m=e((()=>{c=t(n(),1),r(),l=i(),u={fontFamily:`Inter, sans-serif`,fontSize:10,lineHeight:`16px`,fontWeight:500,letterSpacing:`0.2px`},d={large:{height:`var(--lyra-control-height-sm)`,minWidth:24,iconSize:16,textClass:`lyra-body-md-em`},medium:{height:`var(--lyra-control-height-xs)`,minWidth:20,iconSize:12,textClass:`lyra-body-sm-em`}},f={large:{height:`var(--lyra-control-height-sm)`,minWidth:24,textClass:`lyra-body-md-em`},medium:{height:`var(--lyra-control-height-xs)`,minWidth:20,textClass:`lyra-body-sm-em`},small:{height:`var(--lyra-control-height-2xs)`,minWidth:16,textStyle:u}},p={large:{height:`var(--lyra-control-height-sm)`,minWidth:24,iconSize:16},medium:{height:`var(--lyra-control-height-xs)`,minWidth:20,iconSize:12},small:{height:`var(--lyra-control-height-2xs)`,minWidth:16,iconSize:12}},s.__docgenInfo={description:``,methods:[],displayName:`Badge`,props:{color:{defaultValue:{value:`'slate'`,computed:!1},required:!1},colorStyle:{defaultValue:{value:`'subtle'`,computed:!1},required:!1},size:{defaultValue:{value:`'large'`,computed:!1},required:!1},type:{defaultValue:{value:`'label'`,computed:!1},required:!1}}}}));function h({label:e,children:t}){return(0,x.jsxs)(`label`,{style:{display:`flex`,flexDirection:`column`,gap:`var(--lyra-spacing-1)`},children:[(0,x.jsx)(`span`,{className:`lyra-body-sm-em`,style:{color:`var(--lyra-color-fg-secondary)`},children:e}),t]})}function g({label:e,value:t,onChange:n,options:r}){return(0,x.jsx)(h,{label:e,children:(0,x.jsx)(`div`,{style:{display:`flex`,gap:`var(--lyra-spacing-3)`},children:r.map(e=>(0,x.jsxs)(`label`,{style:{display:`flex`,alignItems:`center`,gap:`var(--lyra-spacing-1)`,cursor:`pointer`},children:[(0,x.jsx)(`input`,{type:`radio`,checked:t===e.value,onChange:()=>n(e.value)}),(0,x.jsx)(`span`,{className:`lyra-body-md`,children:e.label??e.value})]},e.value))})})}function _({label:e,checked:t,onChange:n}){return(0,x.jsxs)(`label`,{style:{display:`flex`,alignItems:`center`,gap:`var(--lyra-spacing-2)`,cursor:`pointer`},children:[(0,x.jsx)(`input`,{type:`checkbox`,checked:t,onChange:e=>n(e.target.checked)}),(0,x.jsx)(`span`,{className:`lyra-body-md`,children:e})]})}function v(e){return e.type===`label`?e.labelSize:e.size}function y(){let[e,t]=(0,b.useState)(`label`),[n,r]=(0,b.useState)(`subtle`),[i,o]=(0,b.useState)(`large`),[c,l]=(0,b.useState)(`large`),[u,d]=(0,b.useState)(!1),[f,p]=(0,b.useState)(!1),m=e===`label`?c:i;return(0,x.jsxs)(`div`,{style:{display:`flex`,flexDirection:`column`,gap:`var(--lyra-spacing-4)`},children:[(0,x.jsxs)(`div`,{style:{display:`flex`,flexWrap:`wrap`,alignItems:`flex-start`,gap:`var(--lyra-spacing-6)`,padding:`var(--lyra-spacing-4)`,borderRadius:`var(--lyra-radius-md)`,border:`1px solid var(--lyra-color-border-subtle)`,background:`var(--lyra-color-bg-surface-container-subtle)`},children:[(0,x.jsx)(g,{label:`Type`,value:e,onChange:t,options:[{value:`label`,label:`Label`},{value:`counter`,label:`Value`},{value:`icon`,label:`Icon`}]}),(0,x.jsx)(g,{label:`Color Style`,value:n,onChange:r,options:[{value:`subtle`},{value:`strong`}]}),e===`label`?(0,x.jsx)(g,{label:`Size`,value:c,onChange:l,options:[{value:`large`},{value:`medium`}]}):(0,x.jsx)(g,{label:`Size`,value:i,onChange:o,options:[{value:`large`},{value:`medium`},{value:`small`}]}),e===`label`&&(0,x.jsx)(h,{label:`Icons`,children:(0,x.jsxs)(`div`,{style:{display:`flex`,gap:`var(--lyra-spacing-3)`},children:[(0,x.jsx)(_,{label:`Leading`,checked:u,onChange:d}),(0,x.jsx)(_,{label:`Trailing`,checked:f,onChange:p})]})})]}),(0,x.jsx)(`div`,{style:{display:`flex`,flexWrap:`wrap`,gap:`var(--lyra-spacing-2)`},children:S.map((t,r)=>e===`icon`?(0,x.jsx)(s,{type:`icon`,colorStyle:n,size:m,color:t,icon:(0,x.jsx)(a,{})},t):e===`counter`?(0,x.jsx)(s,{type:`counter`,colorStyle:n,size:m,color:t,children:r+1},t):(0,x.jsx)(s,{type:`label`,colorStyle:n,size:m,color:t,leadingIcon:u?(0,x.jsx)(a,{}):void 0,trailingIcon:f?(0,x.jsx)(a,{}):void 0,children:t[0].toUpperCase()+t.slice(1)},t))})]})}var b,x,S,C,w,T,E,D,O,k,A,j,M;e((()=>{b=t(n(),1),o(),m(),x=i(),S=[`slate`,`red`,`orange`,`yellow`,`lime`,`green`,`teal`,`blue`,`purple`,`pink`],C={title:`Components/Badge`,component:s,parameters:{layout:`padded`},argTypes:{color:{control:`select`,options:S},colorStyle:{control:`radio`,options:[`subtle`,`strong`]},size:{control:`radio`,options:[`large`,`medium`,`small`],if:{arg:`type`,neq:`label`}},labelSize:{name:`size`,control:`radio`,options:[`large`,`medium`],description:`The label type has no small size`,if:{arg:`type`,eq:`label`}},type:{options:[`label`,`counter`,`icon`],control:{type:`radio`,labels:{label:`Label`,counter:`Value`,icon:`Icon`}}},children:{control:`text`},showLeadingIcon:{control:`boolean`,name:`Leading Icon`,description:`Adds a leading icon (label type only)`,if:{arg:`type`,eq:`label`}},showTrailingIcon:{control:`boolean`,name:`Trailing Icon`,description:`Adds a trailing icon (label type only)`,if:{arg:`type`,eq:`label`}}},args:{color:`slate`,colorStyle:`subtle`,size:`large`,labelSize:`large`,type:`label`,children:`Label`,showLeadingIcon:!1,showTrailingIcon:!1}},w={name:`Default`,render:({children:e,showLeadingIcon:t,showTrailingIcon:n,labelSize:r,...i})=>{let o=v({...i,labelSize:r});if(i.type===`icon`)return(0,x.jsx)(s,{...i,size:o,icon:(0,x.jsx)(a,{})});if(i.type===`counter`){let t=e===`Label`?`9`:e;return(0,x.jsx)(s,{...i,size:o,children:t})}return(0,x.jsx)(s,{...i,size:o,leadingIcon:t?(0,x.jsx)(a,{}):void 0,trailingIcon:n?(0,x.jsx)(a,{}):void 0,children:e})}},T={name:`All Colors`,parameters:{controls:{disable:!0}},render:()=>(0,x.jsx)(y,{})},E={name:`Subtle vs. Strong`,parameters:{controls:{disable:!0}},render:()=>(0,x.jsxs)(`div`,{style:{display:`flex`,flexDirection:`column`,gap:`var(--lyra-spacing-3)`},children:[(0,x.jsx)(`div`,{style:{display:`flex`,flexWrap:`wrap`,gap:`var(--lyra-spacing-2)`},children:S.map(e=>(0,x.jsx)(s,{color:e,colorStyle:`subtle`,children:e[0].toUpperCase()+e.slice(1)},e))}),(0,x.jsx)(`div`,{style:{display:`flex`,flexWrap:`wrap`,gap:`var(--lyra-spacing-2)`},children:S.map(e=>(0,x.jsx)(s,{color:e,colorStyle:`strong`,children:e[0].toUpperCase()+e.slice(1)},e))})]})},D={name:`Label — Sizes`,parameters:{controls:{disable:!0}},render:()=>(0,x.jsxs)(`div`,{style:{display:`flex`,alignItems:`center`,gap:`var(--lyra-spacing-3)`},children:[(0,x.jsx)(s,{type:`label`,size:`large`,children:`Large`}),(0,x.jsx)(s,{type:`label`,size:`medium`,children:`Medium`})]})},O={name:`Label — With Icons`,parameters:{controls:{disable:!0}},render:()=>(0,x.jsxs)(`div`,{style:{display:`flex`,alignItems:`center`,gap:`var(--lyra-spacing-3)`},children:[(0,x.jsx)(s,{type:`label`,leadingIcon:(0,x.jsx)(a,{}),children:`Leading`}),(0,x.jsx)(s,{type:`label`,trailingIcon:(0,x.jsx)(a,{}),children:`Trailing`}),(0,x.jsx)(s,{type:`label`,leadingIcon:(0,x.jsx)(a,{}),trailingIcon:(0,x.jsx)(a,{}),children:`Both`})]})},k={name:`Counter — Sizes`,parameters:{controls:{disable:!0}},render:()=>(0,x.jsxs)(`div`,{style:{display:`flex`,alignItems:`center`,gap:`var(--lyra-spacing-3)`},children:[(0,x.jsx)(s,{type:`counter`,size:`large`,children:`9`}),(0,x.jsx)(s,{type:`counter`,size:`medium`,children:`9`}),(0,x.jsx)(s,{type:`counter`,size:`small`,children:`9`}),(0,x.jsx)(s,{type:`counter`,size:`large`,children:`99+`})]})},A={name:`Icon — Sizes`,parameters:{controls:{disable:!0}},render:()=>(0,x.jsxs)(`div`,{style:{display:`flex`,alignItems:`center`,gap:`var(--lyra-spacing-3)`},children:[(0,x.jsx)(s,{type:`icon`,size:`large`,icon:(0,x.jsx)(a,{})}),(0,x.jsx)(s,{type:`icon`,size:`medium`,icon:(0,x.jsx)(a,{})}),(0,x.jsx)(s,{type:`icon`,size:`small`,icon:(0,x.jsx)(a,{})})]})},j={name:`All Types`,parameters:{controls:{disable:!0}},render:()=>(0,x.jsxs)(`div`,{style:{display:`flex`,alignItems:`center`,gap:`var(--lyra-spacing-3)`},children:[(0,x.jsx)(s,{type:`label`,color:`blue`,children:`Label`}),(0,x.jsx)(s,{type:`counter`,color:`blue`,children:`9`}),(0,x.jsx)(s,{type:`icon`,color:`blue`,icon:(0,x.jsx)(a,{})})]})},w.parameters={...w.parameters,docs:{...w.parameters?.docs,source:{originalSource:`{
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
}`,...w.parameters?.docs?.source}}},T.parameters={...T.parameters,docs:{...T.parameters?.docs,source:{originalSource:`{
  name: "All Colors",
  parameters: {
    controls: {
      disable: true
    }
  },
  render: () => <AllColorsDemo />
}`,...T.parameters?.docs?.source}}},E.parameters={...E.parameters,docs:{...E.parameters?.docs,source:{originalSource:`{
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
}`,...E.parameters?.docs?.source}}},D.parameters={...D.parameters,docs:{...D.parameters?.docs,source:{originalSource:`{
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
}`,...D.parameters?.docs?.source}}},O.parameters={...O.parameters,docs:{...O.parameters?.docs,source:{originalSource:`{
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
}`,...O.parameters?.docs?.source}}},k.parameters={...k.parameters,docs:{...k.parameters?.docs,source:{originalSource:`{
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
}`,...k.parameters?.docs?.source}}},A.parameters={...A.parameters,docs:{...A.parameters?.docs,source:{originalSource:`{
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
}`,...A.parameters?.docs?.source}}},j.parameters={...j.parameters,docs:{...j.parameters?.docs,source:{originalSource:`{
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
}`,...j.parameters?.docs?.source}}},M=[`Default`,`AllColors`,`SubtleVsStrong`,`LabelSizes`,`LabelWithIcons`,`CounterSizes`,`IconSizes`,`AllTypes`]}))();export{T as AllColors,j as AllTypes,k as CounterSizes,w as Default,A as IconSizes,D as LabelSizes,O as LabelWithIcons,E as SubtleVsStrong,M as __namedExportsOrder,C as default};