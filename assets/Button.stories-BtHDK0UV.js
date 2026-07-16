import{i as e}from"./preload-helper-xPQekRTU.js";import{t}from"./iframe-MTOO4ZUc.js";import{H as n,I as r,S as i,c as a,g as o,i as s,m as c,n as l,r as u,t as d,v as f}from"./Button-DjOWTt0A.js";var p,m,h,g,_,v,y,b,x,S,C,w,T;e((()=>{u(),l(),p=t(),m={title:`Components/Button`,component:d,parameters:{layout:`centered`},argTypes:{variant:{control:`select`,options:[`primary`,`secondary`,`ghost`,`destructive`]},size:{control:`select`,options:[`sm`,`md`,`lg`]},iconOnly:{control:`boolean`},disabled:{control:`boolean`}}},h={args:{variant:`primary`,size:`md`,children:`Button`,disabled:!1}},g={render:()=>(0,p.jsxs)(`div`,{style:{display:`flex`,gap:12,alignItems:`center`},children:[(0,p.jsx)(d,{variant:`primary`,children:`Primary`}),(0,p.jsx)(d,{variant:`secondary`,children:`Secondary`}),(0,p.jsx)(d,{variant:`ghost`,children:`Ghost`}),(0,p.jsx)(d,{variant:`destructive`,children:`Destructive`})]})},_={render:()=>(0,p.jsxs)(`div`,{style:{display:`flex`,gap:12,alignItems:`center`},children:[(0,p.jsx)(d,{variant:`primary`,size:`sm`,children:`Small`}),(0,p.jsx)(d,{variant:`primary`,size:`md`,children:`Medium`}),(0,p.jsx)(d,{variant:`primary`,size:`lg`,children:`Large`})]})},v={render:()=>(0,p.jsxs)(`div`,{style:{display:`flex`,gap:12,alignItems:`center`},children:[(0,p.jsx)(d,{variant:`primary`,leftIcon:(0,p.jsx)(i,{}),children:`Add item`}),(0,p.jsx)(d,{variant:`secondary`,leftIcon:(0,p.jsx)(r,{}),children:`Export`}),(0,p.jsx)(d,{variant:`ghost`,leftIcon:(0,p.jsx)(c,{}),children:`AI`}),(0,p.jsx)(d,{variant:`destructive`,leftIcon:(0,p.jsx)(a,{}),children:`Delete`})]})},y={render:()=>(0,p.jsxs)(`div`,{style:{display:`flex`,gap:12,alignItems:`center`},children:[(0,p.jsx)(d,{variant:`primary`,rightIcon:(0,p.jsx)(n,{}),children:`Next`}),(0,p.jsx)(d,{variant:`secondary`,rightIcon:(0,p.jsx)(n,{}),children:`Next`}),(0,p.jsx)(d,{variant:`ghost`,rightIcon:(0,p.jsx)(n,{}),children:`Next`})]})},b={render:()=>(0,p.jsxs)(`div`,{style:{display:`flex`,gap:12,alignItems:`center`},children:[(0,p.jsx)(d,{variant:`primary`,leftIcon:(0,p.jsx)(c,{}),rightIcon:(0,p.jsx)(n,{}),children:`Generate`}),(0,p.jsx)(d,{variant:`secondary`,leftIcon:(0,p.jsx)(r,{}),rightIcon:(0,p.jsx)(n,{}),children:`Export all`})]})},x={render:()=>(0,p.jsxs)(`div`,{style:{display:`flex`,gap:12,alignItems:`center`},children:[(0,p.jsx)(d,{variant:`secondary`,size:`sm`,leftIcon:(0,p.jsx)(i,{}),children:`Small (12px icon)`}),(0,p.jsx)(d,{variant:`secondary`,size:`md`,leftIcon:(0,p.jsx)(i,{}),children:`Medium (16px icon)`}),(0,p.jsx)(d,{variant:`secondary`,size:`lg`,leftIcon:(0,p.jsx)(i,{}),children:`Large (16px icon)`})]})},S={render:()=>(0,p.jsxs)(`div`,{style:{display:`flex`,flexDirection:`column`,gap:16},children:[(0,p.jsxs)(`div`,{style:{display:`flex`,gap:8,alignItems:`center`},children:[(0,p.jsx)(d,{variant:`ghost`,size:`sm`,iconOnly:!0,"aria-label":`Search`,children:(0,p.jsx)(f,{})}),(0,p.jsx)(d,{variant:`ghost`,size:`md`,iconOnly:!0,"aria-label":`Search`,children:(0,p.jsx)(f,{})}),(0,p.jsx)(d,{variant:`ghost`,size:`lg`,iconOnly:!0,"aria-label":`Search`,children:(0,p.jsx)(f,{})})]}),(0,p.jsxs)(`div`,{style:{display:`flex`,gap:8,alignItems:`center`},children:[(0,p.jsx)(d,{variant:`primary`,size:`md`,iconOnly:!0,"aria-label":`Add`,children:(0,p.jsx)(i,{})}),(0,p.jsx)(d,{variant:`secondary`,size:`md`,iconOnly:!0,"aria-label":`Settings`,children:(0,p.jsx)(o,{})}),(0,p.jsx)(d,{variant:`ghost`,size:`md`,iconOnly:!0,"aria-label":`Close`,children:(0,p.jsx)(s,{})}),(0,p.jsx)(d,{variant:`destructive`,size:`md`,iconOnly:!0,"aria-label":`Delete`,children:(0,p.jsx)(a,{})})]}),(0,p.jsxs)(`div`,{style:{display:`flex`,gap:8,alignItems:`center`},children:[(0,p.jsx)(d,{variant:`primary`,size:`md`,iconOnly:!0,disabled:!0,"aria-label":`Add`,children:(0,p.jsx)(i,{})}),(0,p.jsx)(d,{variant:`secondary`,size:`md`,iconOnly:!0,disabled:!0,"aria-label":`Settings`,children:(0,p.jsx)(o,{})}),(0,p.jsx)(d,{variant:`ghost`,size:`md`,iconOnly:!0,disabled:!0,"aria-label":`Close`,children:(0,p.jsx)(s,{})}),(0,p.jsx)(d,{variant:`destructive`,size:`md`,iconOnly:!0,disabled:!0,"aria-label":`Delete`,children:(0,p.jsx)(a,{})})]})]})},C={render:()=>(0,p.jsxs)(`div`,{style:{display:`flex`,gap:12,alignItems:`center`},children:[(0,p.jsx)(d,{variant:`primary`,disabled:!0,children:`Primary`}),(0,p.jsx)(d,{variant:`secondary`,disabled:!0,children:`Secondary`}),(0,p.jsx)(d,{variant:`ghost`,disabled:!0,children:`Ghost`}),(0,p.jsx)(d,{variant:`destructive`,disabled:!0,children:`Destructive`})]})},w={render:()=>{let e=[`primary`,`secondary`,`ghost`,`destructive`];return(0,p.jsx)(`div`,{style:{display:`flex`,flexDirection:`column`,gap:16},children:[`sm`,`md`,`lg`].map(t=>(0,p.jsx)(`div`,{style:{display:`flex`,gap:12,alignItems:`center`},children:e.map(e=>(0,p.jsx)(d,{variant:e,size:t,leftIcon:(0,p.jsx)(i,{}),children:e.charAt(0).toUpperCase()+e.slice(1)},e))},t))})}},h.parameters={...h.parameters,docs:{...h.parameters?.docs,source:{originalSource:`{
  args: {
    variant: 'primary',
    size: 'md',
    children: 'Button',
    disabled: false
  }
}`,...h.parameters?.docs?.source}}},g.parameters={...g.parameters,docs:{...g.parameters?.docs,source:{originalSource:`{
  render: () => <div style={{
    display: 'flex',
    gap: 12,
    alignItems: 'center'
  }}>
      <Button variant="primary">Primary</Button>
      <Button variant="secondary">Secondary</Button>
      <Button variant="ghost">Ghost</Button>
      <Button variant="destructive">Destructive</Button>
    </div>
}`,...g.parameters?.docs?.source}}},_.parameters={..._.parameters,docs:{..._.parameters?.docs,source:{originalSource:`{
  render: () => <div style={{
    display: 'flex',
    gap: 12,
    alignItems: 'center'
  }}>
      <Button variant="primary" size="sm">Small</Button>
      <Button variant="primary" size="md">Medium</Button>
      <Button variant="primary" size="lg">Large</Button>
    </div>
}`,..._.parameters?.docs?.source}}},v.parameters={...v.parameters,docs:{...v.parameters?.docs,source:{originalSource:`{
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
}`,...v.parameters?.docs?.source}}},y.parameters={...y.parameters,docs:{...y.parameters?.docs,source:{originalSource:`{
  render: () => <div style={{
    display: 'flex',
    gap: 12,
    alignItems: 'center'
  }}>
      <Button variant="primary" rightIcon={<ChevronRight />}>Next</Button>
      <Button variant="secondary" rightIcon={<ChevronRight />}>Next</Button>
      <Button variant="ghost" rightIcon={<ChevronRight />}>Next</Button>
    </div>
}`,...y.parameters?.docs?.source}}},b.parameters={...b.parameters,docs:{...b.parameters?.docs,source:{originalSource:`{
  render: () => <div style={{
    display: 'flex',
    gap: 12,
    alignItems: 'center'
  }}>
      <Button variant="primary" leftIcon={<Sparkles />} rightIcon={<ChevronRight />}>Generate</Button>
      <Button variant="secondary" leftIcon={<Download />} rightIcon={<ChevronRight />}>Export all</Button>
    </div>
}`,...b.parameters?.docs?.source}}},x.parameters={...x.parameters,docs:{...x.parameters?.docs,source:{originalSource:`{
  render: () => <div style={{
    display: 'flex',
    gap: 12,
    alignItems: 'center'
  }}>
      <Button variant="secondary" size="sm" leftIcon={<Plus />}>Small (12px icon)</Button>
      <Button variant="secondary" size="md" leftIcon={<Plus />}>Medium (16px icon)</Button>
      <Button variant="secondary" size="lg" leftIcon={<Plus />}>Large (16px icon)</Button>
    </div>
}`,...x.parameters?.docs?.source}}},S.parameters={...S.parameters,docs:{...S.parameters?.docs,source:{originalSource:`{
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
}`,...S.parameters?.docs?.source}}},C.parameters={...C.parameters,docs:{...C.parameters?.docs,source:{originalSource:`{
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
}`,...C.parameters?.docs?.source}}},w.parameters={...w.parameters,docs:{...w.parameters?.docs,source:{originalSource:`{
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
}`,...w.parameters?.docs?.source}}},T=[`Playground`,`Variants`,`Sizes`,`WithLeftIcon`,`WithRightIcon`,`WithBothIcons`,`IconSizes`,`IconOnly`,`Disabled`,`Matrix`]}))();export{C as Disabled,S as IconOnly,x as IconSizes,w as Matrix,h as Playground,_ as Sizes,g as Variants,b as WithBothIcons,v as WithLeftIcon,y as WithRightIcon,T as __namedExportsOrder,m as default};