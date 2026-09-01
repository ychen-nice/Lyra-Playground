import{i as e,s as t}from"./preload-helper-xPQekRTU.js";import{F as n,o as r,t as i}from"./iframe-RNbPRStA.js";import{n as a,t as o}from"./lucide-react-BqxH3MG6.js";function s({color:e=`slate`,colorStyle:t=`subtle`,size:n=`large`,type:r=`label`,leadingIcon:i,trailingIcon:a,icon:o,children:s}){let u=`var(--lyra-color-accent-${e}-${t}-bg)`,m=`var(--lyra-color-accent-${e}-${t}-fg)`,h=t===`strong`?`var(--lyra-color-border-inverse)`:`var(--lyra-color-border-subtle)`;if(r===`label`){let e=d[n]??d.large;return(0,l.jsxs)(`div`,{style:{display:`inline-flex`,alignItems:`center`,justifyContent:`center`,gap:`var(--lyra-spacing-1)`,height:e.height,minWidth:e.minWidth,padding:`0 6px`,borderRadius:`var(--lyra-radius-sm)`,background:u,boxSizing:`border-box`},children:[i&&(0,l.jsx)(`span`,{style:{display:`flex`,flexShrink:0,width:e.iconSize,height:e.iconSize,color:m},children:(0,c.cloneElement)(i,{size:`100%`})}),(0,l.jsx)(`span`,{className:e.textClass,style:{color:m,overflow:`hidden`,textOverflow:`ellipsis`,whiteSpace:`nowrap`,...e.textStyle??{}},children:s}),a&&(0,l.jsx)(`span`,{style:{display:`flex`,flexShrink:0,width:e.iconSize,height:e.iconSize,color:m},children:(0,c.cloneElement)(a,{size:`100%`})})]})}if(r===`icon`){let e=p[n]??p.large;return(0,l.jsx)(`div`,{style:{display:`inline-flex`,alignItems:`center`,justifyContent:`center`,height:e.height,width:e.height,minWidth:e.minWidth,borderRadius:`var(--lyra-radius-round)`,background:u,border:`1px solid ${h}`,boxSizing:`border-box`,flexShrink:0},children:o&&(0,l.jsx)(`span`,{style:{display:`flex`,flexShrink:0,width:e.iconSize,height:e.iconSize,color:m},children:(0,c.cloneElement)(o,{size:`100%`})})})}let g=f[n]??f.large;return(0,l.jsx)(`div`,{style:{display:`inline-flex`,alignItems:`center`,justifyContent:`center`,height:g.height,minWidth:g.minWidth,padding:`0 var(--lyra-spacing-1)`,borderRadius:`var(--lyra-radius-round)`,background:u,border:`1px solid ${h}`,boxSizing:`border-box`},children:(0,l.jsx)(`span`,{className:g.textClass,style:{color:m,overflow:`hidden`,textOverflow:`ellipsis`,whiteSpace:`nowrap`,...g.textStyle??{}},children:s})})}var c,l,u,d,f,p,m=e((()=>{c=t(n(),1),r(),l=i(),u={fontFamily:`Inter, sans-serif`,fontSize:10,lineHeight:`16px`,fontWeight:500,letterSpacing:`0.2px`},d={large:{height:`var(--lyra-control-height-sm)`,minWidth:24,iconSize:16,textClass:`lyra-body-md-em`},medium:{height:`var(--lyra-control-height-xs)`,minWidth:20,iconSize:12,textClass:`lyra-body-sm-em`}},f={large:{height:`var(--lyra-control-height-sm)`,minWidth:24,textClass:`lyra-body-md-em`},medium:{height:`var(--lyra-control-height-xs)`,minWidth:20,textClass:`lyra-body-sm-em`},small:{height:`var(--lyra-control-height-2xs)`,minWidth:16,textStyle:u}},p={large:{height:`var(--lyra-control-height-sm)`,minWidth:24,iconSize:16},medium:{height:`var(--lyra-control-height-xs)`,minWidth:20,iconSize:12},small:{height:`var(--lyra-control-height-2xs)`,minWidth:16,iconSize:12}},s.__docgenInfo={description:``,methods:[],displayName:`Badge`,props:{color:{defaultValue:{value:`'slate'`,computed:!1},required:!1},colorStyle:{defaultValue:{value:`'subtle'`,computed:!1},required:!1},size:{defaultValue:{value:`'large'`,computed:!1},required:!1},type:{defaultValue:{value:`'label'`,computed:!1},required:!1}}}}));function h(e){return e.type===`label`?e.labelSize:e.size}var g,_,v,y,b,x,S,C,w,T,E,D;e((()=>{o(),m(),g=i(),_=[`slate`,`red`,`orange`,`yellow`,`lime`,`green`,`teal`,`blue`,`purple`,`pink`],v={title:`Components/Badge`,component:s,parameters:{layout:`padded`},argTypes:{color:{control:`select`,options:_},colorStyle:{control:`radio`,options:[`subtle`,`strong`]},size:{control:`radio`,options:[`large`,`medium`,`small`],if:{arg:`type`,neq:`label`}},labelSize:{name:`size`,control:`radio`,options:[`large`,`medium`],description:`The label type has no small size`,if:{arg:`type`,eq:`label`}},type:{options:[`label`,`counter`,`icon`],control:{type:`radio`,labels:{label:`Label`,counter:`Value`,icon:`Icon`}}},children:{control:`text`},showLeadingIcon:{control:`boolean`,name:`Leading Icon`,description:`Adds a leading icon (label type only)`,if:{arg:`type`,eq:`label`}},showTrailingIcon:{control:`boolean`,name:`Trailing Icon`,description:`Adds a trailing icon (label type only)`,if:{arg:`type`,eq:`label`}}},args:{color:`slate`,colorStyle:`subtle`,size:`large`,labelSize:`large`,type:`label`,children:`Label`,showLeadingIcon:!1,showTrailingIcon:!1}},y={name:`Default`,render:({children:e,showLeadingIcon:t,showTrailingIcon:n,labelSize:r,...i})=>{let o=h({...i,labelSize:r});if(i.type===`icon`)return(0,g.jsx)(s,{...i,size:o,icon:(0,g.jsx)(a,{})});if(i.type===`counter`){let t=e===`Label`?`9`:e;return(0,g.jsx)(s,{...i,size:o,children:t})}return(0,g.jsx)(s,{...i,size:o,leadingIcon:t?(0,g.jsx)(a,{}):void 0,trailingIcon:n?(0,g.jsx)(a,{}):void 0,children:e})}},b={name:`All Colors`,argTypes:{color:{table:{disable:!0}}},render:({children:e,showLeadingIcon:t,showTrailingIcon:n,labelSize:r,...i})=>{let o=h({...i,labelSize:r});return(0,g.jsx)(`div`,{style:{display:`flex`,flexWrap:`wrap`,gap:`var(--lyra-spacing-2)`},children:_.map((e,r)=>i.type===`icon`?(0,g.jsx)(s,{...i,size:o,color:e,icon:(0,g.jsx)(a,{})},e):i.type===`counter`?(0,g.jsx)(s,{...i,size:o,color:e,children:r+1},e):(0,g.jsx)(s,{...i,size:o,color:e,leadingIcon:t?(0,g.jsx)(a,{}):void 0,trailingIcon:n?(0,g.jsx)(a,{}):void 0,children:e[0].toUpperCase()+e.slice(1)},e))})}},x={name:`Subtle vs. Strong`,parameters:{controls:{disable:!0}},render:()=>(0,g.jsxs)(`div`,{style:{display:`flex`,flexDirection:`column`,gap:`var(--lyra-spacing-3)`},children:[(0,g.jsx)(`div`,{style:{display:`flex`,flexWrap:`wrap`,gap:`var(--lyra-spacing-2)`},children:_.map(e=>(0,g.jsx)(s,{color:e,colorStyle:`subtle`,children:e[0].toUpperCase()+e.slice(1)},e))}),(0,g.jsx)(`div`,{style:{display:`flex`,flexWrap:`wrap`,gap:`var(--lyra-spacing-2)`},children:_.map(e=>(0,g.jsx)(s,{color:e,colorStyle:`strong`,children:e[0].toUpperCase()+e.slice(1)},e))})]})},S={name:`Label — Sizes`,parameters:{controls:{disable:!0}},render:()=>(0,g.jsxs)(`div`,{style:{display:`flex`,alignItems:`center`,gap:`var(--lyra-spacing-3)`},children:[(0,g.jsx)(s,{type:`label`,size:`large`,children:`Large`}),(0,g.jsx)(s,{type:`label`,size:`medium`,children:`Medium`})]})},C={name:`Label — With Icons`,parameters:{controls:{disable:!0}},render:()=>(0,g.jsxs)(`div`,{style:{display:`flex`,alignItems:`center`,gap:`var(--lyra-spacing-3)`},children:[(0,g.jsx)(s,{type:`label`,leadingIcon:(0,g.jsx)(a,{}),children:`Leading`}),(0,g.jsx)(s,{type:`label`,trailingIcon:(0,g.jsx)(a,{}),children:`Trailing`}),(0,g.jsx)(s,{type:`label`,leadingIcon:(0,g.jsx)(a,{}),trailingIcon:(0,g.jsx)(a,{}),children:`Both`})]})},w={name:`Counter — Sizes`,parameters:{controls:{disable:!0}},render:()=>(0,g.jsxs)(`div`,{style:{display:`flex`,alignItems:`center`,gap:`var(--lyra-spacing-3)`},children:[(0,g.jsx)(s,{type:`counter`,size:`large`,children:`9`}),(0,g.jsx)(s,{type:`counter`,size:`medium`,children:`9`}),(0,g.jsx)(s,{type:`counter`,size:`small`,children:`9`}),(0,g.jsx)(s,{type:`counter`,size:`large`,children:`99+`})]})},T={name:`Icon — Sizes`,parameters:{controls:{disable:!0}},render:()=>(0,g.jsxs)(`div`,{style:{display:`flex`,alignItems:`center`,gap:`var(--lyra-spacing-3)`},children:[(0,g.jsx)(s,{type:`icon`,size:`large`,icon:(0,g.jsx)(a,{})}),(0,g.jsx)(s,{type:`icon`,size:`medium`,icon:(0,g.jsx)(a,{})}),(0,g.jsx)(s,{type:`icon`,size:`small`,icon:(0,g.jsx)(a,{})})]})},E={name:`All Types`,parameters:{controls:{disable:!0}},render:()=>(0,g.jsxs)(`div`,{style:{display:`flex`,alignItems:`center`,gap:`var(--lyra-spacing-3)`},children:[(0,g.jsx)(s,{type:`label`,color:`blue`,children:`Label`}),(0,g.jsx)(s,{type:`counter`,color:`blue`,children:`9`}),(0,g.jsx)(s,{type:`icon`,color:`blue`,icon:(0,g.jsx)(a,{})})]})},y.parameters={...y.parameters,docs:{...y.parameters?.docs,source:{originalSource:`{
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
}`,...y.parameters?.docs?.source}}},b.parameters={...b.parameters,docs:{...b.parameters?.docs,source:{originalSource:`{
  name: "All Colors",
  argTypes: {
    // Overridden per badge below — the shared color control doesn't apply here.
    color: {
      table: {
        disable: true
      }
    }
  },
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
    return <div style={{
      display: 'flex',
      flexWrap: 'wrap',
      gap: 'var(--lyra-spacing-2)'
    }}>
        {COLORS.map((color, i) => {
        if (args.type === 'icon') return <Badge key={color} {...args} size={size} color={color} icon={<X />} />;
        if (args.type === 'counter') return <Badge key={color} {...args} size={size} color={color}>{i + 1}</Badge>;
        return <Badge key={color} {...args} size={size} color={color} leadingIcon={showLeadingIcon ? <X /> : undefined} trailingIcon={showTrailingIcon ? <X /> : undefined}>
              {color[0].toUpperCase() + color.slice(1)}
            </Badge>;
      })}
      </div>;
  }
}`,...b.parameters?.docs?.source}}},x.parameters={...x.parameters,docs:{...x.parameters?.docs,source:{originalSource:`{
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
}`,...x.parameters?.docs?.source}}},S.parameters={...S.parameters,docs:{...S.parameters?.docs,source:{originalSource:`{
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
}`,...S.parameters?.docs?.source}}},C.parameters={...C.parameters,docs:{...C.parameters?.docs,source:{originalSource:`{
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
}`,...C.parameters?.docs?.source}}},w.parameters={...w.parameters,docs:{...w.parameters?.docs,source:{originalSource:`{
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
}`,...w.parameters?.docs?.source}}},T.parameters={...T.parameters,docs:{...T.parameters?.docs,source:{originalSource:`{
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
}`,...T.parameters?.docs?.source}}},E.parameters={...E.parameters,docs:{...E.parameters?.docs,source:{originalSource:`{
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
}`,...E.parameters?.docs?.source}}},D=[`Default`,`AllColors`,`SubtleVsStrong`,`LabelSizes`,`LabelWithIcons`,`CounterSizes`,`IconSizes`,`AllTypes`]}))();export{b as AllColors,E as AllTypes,w as CounterSizes,y as Default,T as IconSizes,S as LabelSizes,C as LabelWithIcons,x as SubtleVsStrong,D as __namedExportsOrder,v as default};