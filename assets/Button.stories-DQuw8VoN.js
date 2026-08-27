import{i as e,s as t}from"./preload-helper-xPQekRTU.js";import{F as n,t as r}from"./iframe-s5i7c9vk.js";import{J as i,R as a,b as o,c as s,ft as c,g as l,it as u,n as d,t as f,u as p,v as m,w as h}from"./lucide-react-D70tKxRn.js";import{n as g,t as _}from"./Button-DubO8Csb.js";function v(){let[e,t]=(0,y.useState)({bold:!0,italic:!1,underline:!1}),n=e=>t(t=>({...t,[e]:!t[e]}));return(0,b.jsxs)(`div`,{style:{display:`flex`,gap:4},children:[(0,b.jsx)(_,{variant:`toggle`,size:`md`,iconOnly:!0,"aria-label":`Bold`,active:e.bold,onClick:()=>n(`bold`),children:(0,b.jsx)(c,{})}),(0,b.jsx)(_,{variant:`toggle`,size:`md`,iconOnly:!0,"aria-label":`Italic`,active:e.italic,onClick:()=>n(`italic`),children:(0,b.jsx)(a,{})}),(0,b.jsx)(_,{variant:`toggle`,size:`md`,iconOnly:!0,"aria-label":`Underline`,active:e.underline,onClick:()=>n(`underline`),children:(0,b.jsx)(s,{})})]})}var y,b,x,S,C,w,T,E,D,O,k,A,j,M,N,P;e((()=>{y=t(n(),1),f(),g(),b=r(),x={title:`Components/Button`,component:_,parameters:{layout:`centered`},argTypes:{variant:{control:`select`,options:[`primary`,`secondary`,`ghost`,`destructive`,`toggle`]},size:{control:`select`,options:[`sm`,`md`,`lg`]},iconOnly:{control:`boolean`},disabled:{control:`boolean`},active:{control:`boolean`,description:"`toggle` variant only — the pressed/on look"}}},S={args:{variant:`primary`,size:`md`,children:`Button`,disabled:!1}},C={render:()=>(0,b.jsxs)(`div`,{style:{display:`flex`,gap:12,alignItems:`center`},children:[(0,b.jsx)(_,{variant:`primary`,children:`Primary`}),(0,b.jsx)(_,{variant:`secondary`,children:`Secondary`}),(0,b.jsx)(_,{variant:`ghost`,children:`Ghost`}),(0,b.jsx)(_,{variant:`destructive`,children:`Destructive`}),(0,b.jsx)(_,{variant:`toggle`,children:`Toggle`})]})},w={render:()=>(0,b.jsxs)(`div`,{style:{display:`flex`,gap:12,alignItems:`center`},children:[(0,b.jsx)(_,{variant:`toggle`,children:`Off`}),(0,b.jsx)(_,{variant:`toggle`,active:!0,children:`On`}),(0,b.jsx)(_,{variant:`toggle`,disabled:!0,children:`Disabled`})]})},T={name:`Toggle (interactive group)`,parameters:{controls:{disable:!0}},render:()=>(0,b.jsx)(v,{})},E={render:()=>(0,b.jsxs)(`div`,{style:{display:`flex`,gap:12,alignItems:`center`},children:[(0,b.jsx)(_,{variant:`primary`,size:`sm`,children:`Small`}),(0,b.jsx)(_,{variant:`primary`,size:`md`,children:`Medium`}),(0,b.jsx)(_,{variant:`primary`,size:`lg`,children:`Large`})]})},D={render:()=>(0,b.jsxs)(`div`,{style:{display:`flex`,gap:12,alignItems:`center`},children:[(0,b.jsx)(_,{variant:`primary`,leftIcon:(0,b.jsx)(h,{}),children:`Add item`}),(0,b.jsx)(_,{variant:`secondary`,leftIcon:(0,b.jsx)(i,{}),children:`Export`}),(0,b.jsx)(_,{variant:`ghost`,leftIcon:(0,b.jsx)(l,{}),children:`AI`}),(0,b.jsx)(_,{variant:`destructive`,leftIcon:(0,b.jsx)(p,{}),children:`Delete`})]})},O={render:()=>(0,b.jsxs)(`div`,{style:{display:`flex`,gap:12,alignItems:`center`},children:[(0,b.jsx)(_,{variant:`primary`,rightIcon:(0,b.jsx)(u,{}),children:`Next`}),(0,b.jsx)(_,{variant:`secondary`,rightIcon:(0,b.jsx)(u,{}),children:`Next`}),(0,b.jsx)(_,{variant:`ghost`,rightIcon:(0,b.jsx)(u,{}),children:`Next`})]})},k={render:()=>(0,b.jsxs)(`div`,{style:{display:`flex`,gap:12,alignItems:`center`},children:[(0,b.jsx)(_,{variant:`primary`,leftIcon:(0,b.jsx)(l,{}),rightIcon:(0,b.jsx)(u,{}),children:`Generate`}),(0,b.jsx)(_,{variant:`secondary`,leftIcon:(0,b.jsx)(i,{}),rightIcon:(0,b.jsx)(u,{}),children:`Export all`})]})},A={render:()=>(0,b.jsxs)(`div`,{style:{display:`flex`,gap:12,alignItems:`center`},children:[(0,b.jsx)(_,{variant:`secondary`,size:`sm`,leftIcon:(0,b.jsx)(h,{}),children:`Small (12px icon)`}),(0,b.jsx)(_,{variant:`secondary`,size:`md`,leftIcon:(0,b.jsx)(h,{}),children:`Medium (16px icon)`}),(0,b.jsx)(_,{variant:`secondary`,size:`lg`,leftIcon:(0,b.jsx)(h,{}),children:`Large (16px icon)`})]})},j={render:()=>(0,b.jsxs)(`div`,{style:{display:`flex`,flexDirection:`column`,gap:16},children:[(0,b.jsxs)(`div`,{style:{display:`flex`,gap:8,alignItems:`center`},children:[(0,b.jsx)(_,{variant:`ghost`,size:`sm`,iconOnly:!0,"aria-label":`Search`,children:(0,b.jsx)(o,{})}),(0,b.jsx)(_,{variant:`ghost`,size:`md`,iconOnly:!0,"aria-label":`Search`,children:(0,b.jsx)(o,{})}),(0,b.jsx)(_,{variant:`ghost`,size:`lg`,iconOnly:!0,"aria-label":`Search`,children:(0,b.jsx)(o,{})})]}),(0,b.jsxs)(`div`,{style:{display:`flex`,gap:8,alignItems:`center`},children:[(0,b.jsx)(_,{variant:`primary`,size:`md`,iconOnly:!0,"aria-label":`Add`,children:(0,b.jsx)(h,{})}),(0,b.jsx)(_,{variant:`secondary`,size:`md`,iconOnly:!0,"aria-label":`Settings`,children:(0,b.jsx)(m,{})}),(0,b.jsx)(_,{variant:`ghost`,size:`md`,iconOnly:!0,"aria-label":`Close`,children:(0,b.jsx)(d,{})}),(0,b.jsx)(_,{variant:`destructive`,size:`md`,iconOnly:!0,"aria-label":`Delete`,children:(0,b.jsx)(p,{})})]}),(0,b.jsxs)(`div`,{style:{display:`flex`,gap:8,alignItems:`center`},children:[(0,b.jsx)(_,{variant:`primary`,size:`md`,iconOnly:!0,disabled:!0,"aria-label":`Add`,children:(0,b.jsx)(h,{})}),(0,b.jsx)(_,{variant:`secondary`,size:`md`,iconOnly:!0,disabled:!0,"aria-label":`Settings`,children:(0,b.jsx)(m,{})}),(0,b.jsx)(_,{variant:`ghost`,size:`md`,iconOnly:!0,disabled:!0,"aria-label":`Close`,children:(0,b.jsx)(d,{})}),(0,b.jsx)(_,{variant:`destructive`,size:`md`,iconOnly:!0,disabled:!0,"aria-label":`Delete`,children:(0,b.jsx)(p,{})})]})]})},M={render:()=>(0,b.jsxs)(`div`,{style:{display:`flex`,gap:12,alignItems:`center`},children:[(0,b.jsx)(_,{variant:`primary`,disabled:!0,children:`Primary`}),(0,b.jsx)(_,{variant:`secondary`,disabled:!0,children:`Secondary`}),(0,b.jsx)(_,{variant:`ghost`,disabled:!0,children:`Ghost`}),(0,b.jsx)(_,{variant:`destructive`,disabled:!0,children:`Destructive`})]})},N={render:()=>{let e=[`primary`,`secondary`,`ghost`,`destructive`];return(0,b.jsx)(`div`,{style:{display:`flex`,flexDirection:`column`,gap:16},children:[`sm`,`md`,`lg`].map(t=>(0,b.jsx)(`div`,{style:{display:`flex`,gap:12,alignItems:`center`},children:e.map(e=>(0,b.jsx)(_,{variant:e,size:t,leftIcon:(0,b.jsx)(h,{}),children:e.charAt(0).toUpperCase()+e.slice(1)},e))},t))})}},S.parameters={...S.parameters,docs:{...S.parameters?.docs,source:{originalSource:`{
  args: {
    variant: 'primary',
    size: 'md',
    children: 'Button',
    disabled: false
  }
}`,...S.parameters?.docs?.source}}},C.parameters={...C.parameters,docs:{...C.parameters?.docs,source:{originalSource:`{
  render: () => <div style={{
    display: 'flex',
    gap: 12,
    alignItems: 'center'
  }}>
      <Button variant="primary">Primary</Button>
      <Button variant="secondary">Secondary</Button>
      <Button variant="ghost">Ghost</Button>
      <Button variant="destructive">Destructive</Button>
      <Button variant="toggle">Toggle</Button>
    </div>
}`,...C.parameters?.docs?.source}}},w.parameters={...w.parameters,docs:{...w.parameters?.docs,source:{originalSource:`{
  render: () => <div style={{
    display: 'flex',
    gap: 12,
    alignItems: 'center'
  }}>
      <Button variant="toggle">Off</Button>
      <Button variant="toggle" active>On</Button>
      <Button variant="toggle" disabled>Disabled</Button>
    </div>
}`,...w.parameters?.docs?.source}}},T.parameters={...T.parameters,docs:{...T.parameters?.docs,source:{originalSource:`{
  name: 'Toggle (interactive group)',
  parameters: {
    controls: {
      disable: true
    }
  },
  render: () => <ToggleGroupDemo />
}`,...T.parameters?.docs?.source}}},E.parameters={...E.parameters,docs:{...E.parameters?.docs,source:{originalSource:`{
  render: () => <div style={{
    display: 'flex',
    gap: 12,
    alignItems: 'center'
  }}>
      <Button variant="primary" size="sm">Small</Button>
      <Button variant="primary" size="md">Medium</Button>
      <Button variant="primary" size="lg">Large</Button>
    </div>
}`,...E.parameters?.docs?.source}}},D.parameters={...D.parameters,docs:{...D.parameters?.docs,source:{originalSource:`{
  render: () => <div style={{
    display: 'flex',
    gap: 12,
    alignItems: 'center'
  }}>
      <Button variant="primary" leftIcon={<Plus />}>Add item</Button>
      <Button variant="secondary" leftIcon={<Download />}>Export</Button>
      <Button variant="ghost" leftIcon={<Sparkles />}>AI</Button>
      <Button variant="destructive" leftIcon={<Trash2 />}>Delete</Button>
    </div>
}`,...D.parameters?.docs?.source}}},O.parameters={...O.parameters,docs:{...O.parameters?.docs,source:{originalSource:`{
  render: () => <div style={{
    display: 'flex',
    gap: 12,
    alignItems: 'center'
  }}>
      <Button variant="primary" rightIcon={<ChevronRight />}>Next</Button>
      <Button variant="secondary" rightIcon={<ChevronRight />}>Next</Button>
      <Button variant="ghost" rightIcon={<ChevronRight />}>Next</Button>
    </div>
}`,...O.parameters?.docs?.source}}},k.parameters={...k.parameters,docs:{...k.parameters?.docs,source:{originalSource:`{
  render: () => <div style={{
    display: 'flex',
    gap: 12,
    alignItems: 'center'
  }}>
      <Button variant="primary" leftIcon={<Sparkles />} rightIcon={<ChevronRight />}>Generate</Button>
      <Button variant="secondary" leftIcon={<Download />} rightIcon={<ChevronRight />}>Export all</Button>
    </div>
}`,...k.parameters?.docs?.source}}},A.parameters={...A.parameters,docs:{...A.parameters?.docs,source:{originalSource:`{
  render: () => <div style={{
    display: 'flex',
    gap: 12,
    alignItems: 'center'
  }}>
      <Button variant="secondary" size="sm" leftIcon={<Plus />}>Small (12px icon)</Button>
      <Button variant="secondary" size="md" leftIcon={<Plus />}>Medium (16px icon)</Button>
      <Button variant="secondary" size="lg" leftIcon={<Plus />}>Large (16px icon)</Button>
    </div>
}`,...A.parameters?.docs?.source}}},j.parameters={...j.parameters,docs:{...j.parameters?.docs,source:{originalSource:`{
  render: () => <div style={{
    display: 'flex',
    flexDirection: 'column',
    gap: 16
  }}>
      {/* Sizes */}
      <div style={{
      display: 'flex',
      gap: 8,
      alignItems: 'center'
    }}>
        <Button variant="ghost" size="sm" iconOnly aria-label="Search"><Search /></Button>
        <Button variant="ghost" size="md" iconOnly aria-label="Search"><Search /></Button>
        <Button variant="ghost" size="lg" iconOnly aria-label="Search"><Search /></Button>
      </div>
      {/* Variants */}
      <div style={{
      display: 'flex',
      gap: 8,
      alignItems: 'center'
    }}>
        <Button variant="primary" size="md" iconOnly aria-label="Add"><Plus /></Button>
        <Button variant="secondary" size="md" iconOnly aria-label="Settings"><Settings /></Button>
        <Button variant="ghost" size="md" iconOnly aria-label="Close"><X /></Button>
        <Button variant="destructive" size="md" iconOnly aria-label="Delete"><Trash2 /></Button>
      </div>
      {/* Disabled */}
      <div style={{
      display: 'flex',
      gap: 8,
      alignItems: 'center'
    }}>
        <Button variant="primary" size="md" iconOnly disabled aria-label="Add"><Plus /></Button>
        <Button variant="secondary" size="md" iconOnly disabled aria-label="Settings"><Settings /></Button>
        <Button variant="ghost" size="md" iconOnly disabled aria-label="Close"><X /></Button>
        <Button variant="destructive" size="md" iconOnly disabled aria-label="Delete"><Trash2 /></Button>
      </div>
    </div>
}`,...j.parameters?.docs?.source}}},M.parameters={...M.parameters,docs:{...M.parameters?.docs,source:{originalSource:`{
  render: () => <div style={{
    display: 'flex',
    gap: 12,
    alignItems: 'center'
  }}>
      <Button variant="primary" disabled>Primary</Button>
      <Button variant="secondary" disabled>Secondary</Button>
      <Button variant="ghost" disabled>Ghost</Button>
      <Button variant="destructive" disabled>Destructive</Button>
    </div>
}`,...M.parameters?.docs?.source}}},N.parameters={...N.parameters,docs:{...N.parameters?.docs,source:{originalSource:`{
  render: () => {
    const variants = ['primary', 'secondary', 'ghost', 'destructive'];
    const sizes = ['sm', 'md', 'lg'];
    return <div style={{
      display: 'flex',
      flexDirection: 'column',
      gap: 16
    }}>
        {sizes.map(size => <div key={size} style={{
        display: 'flex',
        gap: 12,
        alignItems: 'center'
      }}>
            {variants.map(variant => <Button key={variant} variant={variant} size={size} leftIcon={<Plus />}>
                {variant.charAt(0).toUpperCase() + variant.slice(1)}
              </Button>)}
          </div>)}
      </div>;
  }
}`,...N.parameters?.docs?.source}}},P=[`Playground`,`Variants`,`Toggle`,`ToggleGroup`,`Sizes`,`WithLeftIcon`,`WithRightIcon`,`WithBothIcons`,`IconSizes`,`IconOnly`,`Disabled`,`Matrix`]}))();export{M as Disabled,j as IconOnly,A as IconSizes,N as Matrix,S as Playground,E as Sizes,w as Toggle,T as ToggleGroup,C as Variants,k as WithBothIcons,D as WithLeftIcon,O as WithRightIcon,P as __namedExportsOrder,x as default};