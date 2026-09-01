import{i as e,s as t}from"./preload-helper-xPQekRTU.js";import{F as n,t as r}from"./iframe-hGbdeTbq.js";import{X as i,nt as a,t as o,u as s,v as c}from"./lucide-react-DMBC9Wcd.js";import{n as l,t as u}from"./Button-S079eTwH.js";function d(e){return Array.from(e.querySelectorAll(`[data-toolbar-item="true"]`)).filter(e=>e.getAttribute(`data-disabled`)!==`true`)}function f(e){return(0,v.useEffect)(()=>{let t=e.current;if(!t)return;let n=d(t);n.length>0&&!n.some(e=>e.tabIndex===0)&&n.forEach((e,t)=>{e.tabIndex=t===0?0:-1})}),(0,v.useCallback)(t=>{let n=e.current;n&&d(n).forEach(e=>{e.tabIndex=e===t.target?0:-1})},[e])}function p({orientation:e=`horizontal`,loopFocus:t=!0,disabled:n=!1,withBackground:r=!0,leftSlot:i,rightSlot:a,children:o}){let s=(0,v.useRef)(null),c=f(s),l=(0,v.useCallback)(r=>{if(n)return;let i=s.current;if(!i)return;let a=d(i);if(a.length===0)return;let o=a.indexOf(document.activeElement),c=e===`horizontal`?`ArrowRight`:`ArrowDown`,l=e===`horizontal`?`ArrowLeft`:`ArrowUp`,u=e=>{let n=o===-1?0:o+e;n=t?(n+a.length)%a.length:Math.max(0,Math.min(a.length-1,n)),a[n]?.focus()};r.key===c?(r.preventDefault(),u(1)):r.key===l?(r.preventDefault(),u(-1)):r.key===`Home`?(r.preventDefault(),a[0]?.focus()):r.key===`End`&&(r.preventDefault(),a[a.length-1]?.focus())},[n,e,t]);return(0,y.jsx)(b.Provider,{value:{orientation:e,disabled:n},children:(0,y.jsx)(`div`,{ref:s,role:`toolbar`,"aria-orientation":e,"aria-disabled":n||void 0,"data-orientation":e,"data-disabled":n||void 0,onKeyDown:l,onFocus:c,style:{display:`flex`,flexDirection:e===`horizontal`?`row`:`column`,alignItems:e===`horizontal`?`center`:`stretch`,gap:`var(--lyra-spacing-6)`,height:e===`horizontal`?`var(--lyra-row-height-2xl)`:void 0,padding:`var(--lyra-spacing-3) var(--lyra-spacing-4)`,borderBottom:`1px solid var(--lyra-color-border-subtle)`,background:r?`var(--lyra-color-bg-control-subtle)`:`var(--lyra-color-bg-none)`,boxSizing:`border-box`,width:`100%`,overflow:`clip`},children:o??(0,y.jsxs)(y.Fragment,{children:[(0,y.jsx)(`div`,{style:{display:`flex`,flex:`1 0 0`,gap:`var(--lyra-spacing-4)`,height:`100%`,alignItems:`center`,minWidth:0},children:i??(0,y.jsx)(`span`,{className:`lyra-body-md-em`,style:{flex:`1 0 0`,minWidth:0,color:`var(--lyra-color-fg-default)`,overflow:`hidden`,textOverflow:`ellipsis`,whiteSpace:`nowrap`},children:`Title`})}),(0,y.jsx)(`div`,{style:{display:`flex`,gap:`var(--lyra-spacing-2)`,alignItems:`center`,justifyContent:`flex-end`,flexShrink:0},children:a??(0,y.jsx)(h,{children:`Button`})})]})})})}function m({disabled:e=!1,children:t,style:n}){let r=(0,v.useContext)(b);return(0,y.jsx)(`div`,{role:`group`,"data-orientation":r.orientation,"data-disabled":e||void 0,style:{display:`flex`,flexDirection:r.orientation===`horizontal`?`row`:`column`,alignItems:`center`,gap:`var(--lyra-spacing-2)`,...n},children:t})}function h({disabled:e=!1,focusableWhenDisabled:t=!0,children:n,...r}){let i=(0,v.useContext)(b),a=e||i.disabled;return(0,y.jsx)(u,{...r,disabled:a,"data-toolbar-item":`true`,"data-disabled":a||void 0,"data-orientation":i.orientation,"data-focusable":t||void 0,tabIndex:-1,children:n})}function g({disabled:e=!1,children:t,style:n,...r}){let i=(0,v.useContext)(b),a=e||i.disabled;return(0,y.jsx)(`a`,{...r,"aria-disabled":a||void 0,"data-toolbar-item":`true`,"data-disabled":a||void 0,"data-orientation":i.orientation,tabIndex:-1,className:`lyra-body-md`,style:{color:a?`var(--lyra-color-fg-disabled)`:`var(--lyra-color-fg-action)`,pointerEvents:a?`none`:void 0,textDecoration:`none`,...n},children:t})}function _({orientation:e}){let t=(0,v.useContext)(b),n=e??(t.orientation===`horizontal`?`vertical`:`horizontal`);return(0,y.jsx)(`div`,{role:`separator`,"aria-orientation":n,"data-orientation":n,style:n===`vertical`?{width:1,alignSelf:`stretch`,flexShrink:0,background:`var(--lyra-color-border-subtle)`}:{height:1,width:`100%`,flexShrink:0,background:`var(--lyra-color-border-subtle)`}})}var v,y,b,x=e((()=>{v=t(n(),1),l(),y=r(),b=(0,v.createContext)({orientation:`horizontal`,disabled:!1}),p.Group=m,p.Button=h,p.Link=g,p.Separator=_,p.__docgenInfo={description:``,methods:[{name:`Group`,docblock:null,modifiers:[`static`],params:[{name:`{ disabled = false, children, style }`,optional:!1,type:null}],returns:null},{name:`Button`,docblock:null,modifiers:[`static`],params:[{name:`{
  disabled = false,
  // Base UI keeps a disabled item reachable by keyboard by default — this project's
  // Button ties its visual disabled state to the native \`disabled\` attribute, which
  // also removes it from the tab order, so that exact behavior isn't reproduced here;
  // the prop is accepted for API parity and documented rather than silently dropped.
  focusableWhenDisabled = true,
  children,
  ...rest
}`,optional:!1,type:null}],returns:null},{name:`Link`,docblock:null,modifiers:[`static`],params:[{name:`{ disabled = false, children, style, ...rest }`,optional:!1,type:null}],returns:null},{name:`Separator`,docblock:null,modifiers:[`static`],params:[{name:`{ orientation }`,optional:!1,type:null}],returns:null}],displayName:`Root`,props:{orientation:{defaultValue:{value:`'horizontal'`,computed:!1},required:!1},loopFocus:{defaultValue:{value:`true`,computed:!1},required:!1},disabled:{defaultValue:{value:`false`,computed:!1},required:!1},withBackground:{defaultValue:{value:`true`,computed:!1},required:!1}}}})),S,C,w,T,E,D,O,k,A;e((()=>{o(),x(),l(),S=r(),C={title:`Components/Toolbar`,component:p,parameters:{layout:`padded`},argTypes:{withBackground:{control:`boolean`,description:`Tinted (bg-control-subtle) vs. transparent background`},orientation:{control:`radio`,options:[`horizontal`,`vertical`]},loopFocus:{control:`boolean`,description:`Arrow-key focus wraps at the toolbar's boundary`},disabled:{control:`boolean`}},args:{withBackground:!0,orientation:`horizontal`,loopFocus:!0,disabled:!1}},w={name:`Default`,render:e=>(0,S.jsx)(p,{...e,leftSlot:(0,S.jsx)(`span`,{className:`lyra-body-md-em`,children:`240 items`}),rightSlot:(0,S.jsxs)(S.Fragment,{children:[(0,S.jsx)(p.Button,{variant:`ghost`,size:`md`,leftIcon:(0,S.jsx)(c,{size:16}),children:`Share`}),(0,S.jsx)(p.Button,{variant:`ghost`,size:`md`,leftIcon:(0,S.jsx)(i,{size:16}),children:`Export`})]})})},T={name:`No Background`,args:{withBackground:!1},render:e=>(0,S.jsx)(p,{...e,leftSlot:(0,S.jsx)(`span`,{className:`lyra-body-md-em`,children:`240 items`}),rightSlot:(0,S.jsxs)(S.Fragment,{children:[(0,S.jsx)(p.Button,{variant:`ghost`,size:`md`,leftIcon:(0,S.jsx)(c,{size:16}),children:`Share`}),(0,S.jsx)(p.Button,{variant:`ghost`,size:`md`,leftIcon:(0,S.jsx)(i,{size:16}),children:`Export`})]})})},E={name:`Custom Actions`,render:e=>(0,S.jsx)(p,{...e,leftSlot:(0,S.jsx)(`span`,{className:`lyra-body-md-em`,children:`Session — 240 items`}),rightSlot:(0,S.jsxs)(S.Fragment,{children:[(0,S.jsx)(p.Button,{variant:`ghost`,size:`md`,leftIcon:(0,S.jsx)(i,{size:16}),children:`Export`}),(0,S.jsx)(p.Button,{variant:`primary`,size:`md`,children:`Save`})]})})},D={name:`Composed (Groups + Separator)`,render:e=>(0,S.jsxs)(p,{...e,children:[(0,S.jsxs)(p.Group,{children:[(0,S.jsx)(p.Button,{variant:`ghost`,size:`md`,iconOnly:!0,"aria-label":`Copy`,children:(0,S.jsx)(a,{size:16})}),(0,S.jsx)(p.Button,{variant:`ghost`,size:`md`,iconOnly:!0,"aria-label":`Share`,children:(0,S.jsx)(c,{size:16})})]}),(0,S.jsx)(p.Separator,{}),(0,S.jsxs)(p.Group,{children:[(0,S.jsx)(p.Button,{variant:`ghost`,size:`md`,iconOnly:!0,"aria-label":`Download`,children:(0,S.jsx)(i,{size:16})}),(0,S.jsx)(p.Button,{variant:`ghost`,size:`md`,iconOnly:!0,"aria-label":`Delete`,children:(0,S.jsx)(s,{size:16})})]}),(0,S.jsx)(`div`,{style:{flex:`1 0 0`}}),(0,S.jsx)(p.Link,{href:`#`,children:`Learn more`})]})},O={name:`Vertical Orientation`,args:{orientation:`vertical`},render:e=>(0,S.jsx)(`div`,{style:{width:240},children:(0,S.jsx)(p,{...e,children:(0,S.jsxs)(p.Group,{style:{width:`100%`},children:[(0,S.jsx)(p.Button,{variant:`ghost`,size:`md`,children:`First`}),(0,S.jsx)(p.Button,{variant:`ghost`,size:`md`,children:`Second`}),(0,S.jsx)(p.Button,{variant:`ghost`,size:`md`,children:`Third`})]})})})},k={name:`Disabled Item`,render:e=>(0,S.jsx)(p,{...e,children:(0,S.jsxs)(p.Group,{children:[(0,S.jsx)(p.Button,{variant:`ghost`,size:`md`,children:`First`}),(0,S.jsx)(p.Button,{variant:`ghost`,size:`md`,disabled:!0,children:`Disabled`}),(0,S.jsx)(p.Button,{variant:`ghost`,size:`md`,children:`Third`})]})})},w.parameters={...w.parameters,docs:{...w.parameters?.docs,source:{originalSource:`{
  name: "Default",
  render: args => <Toolbar {...args} leftSlot={<span className="lyra-body-md-em">240 items</span>} rightSlot={<>
          <Toolbar.Button variant="ghost" size="md" leftIcon={<Share2 size={16} />}>Share</Toolbar.Button>
          <Toolbar.Button variant="ghost" size="md" leftIcon={<Download size={16} />}>Export</Toolbar.Button>
        </>} />
}`,...w.parameters?.docs?.source}}},T.parameters={...T.parameters,docs:{...T.parameters?.docs,source:{originalSource:`{
  name: "No Background",
  args: {
    withBackground: false
  },
  render: args => <Toolbar {...args} leftSlot={<span className="lyra-body-md-em">240 items</span>} rightSlot={<>
          <Toolbar.Button variant="ghost" size="md" leftIcon={<Share2 size={16} />}>Share</Toolbar.Button>
          <Toolbar.Button variant="ghost" size="md" leftIcon={<Download size={16} />}>Export</Toolbar.Button>
        </>} />
}`,...T.parameters?.docs?.source}}},E.parameters={...E.parameters,docs:{...E.parameters?.docs,source:{originalSource:`{
  name: "Custom Actions",
  render: args => <Toolbar {...args} leftSlot={<span className="lyra-body-md-em">Session — 240 items</span>} rightSlot={<>
          <Toolbar.Button variant="ghost" size="md" leftIcon={<Download size={16} />}>Export</Toolbar.Button>
          <Toolbar.Button variant="primary" size="md">Save</Toolbar.Button>
        </>} />
}`,...E.parameters?.docs?.source}}},D.parameters={...D.parameters,docs:{...D.parameters?.docs,source:{originalSource:`{
  name: "Composed (Groups + Separator)",
  render: args => <Toolbar {...args}>
      <Toolbar.Group>
        <Toolbar.Button variant="ghost" size="md" iconOnly aria-label="Copy"><Copy size={16} /></Toolbar.Button>
        <Toolbar.Button variant="ghost" size="md" iconOnly aria-label="Share"><Share2 size={16} /></Toolbar.Button>
      </Toolbar.Group>
      <Toolbar.Separator />
      <Toolbar.Group>
        <Toolbar.Button variant="ghost" size="md" iconOnly aria-label="Download"><Download size={16} /></Toolbar.Button>
        <Toolbar.Button variant="ghost" size="md" iconOnly aria-label="Delete"><Trash2 size={16} /></Toolbar.Button>
      </Toolbar.Group>
      <div style={{
      flex: '1 0 0'
    }} />
      <Toolbar.Link href="#">Learn more</Toolbar.Link>
    </Toolbar>
}`,...D.parameters?.docs?.source}}},O.parameters={...O.parameters,docs:{...O.parameters?.docs,source:{originalSource:`{
  name: "Vertical Orientation",
  args: {
    orientation: "vertical"
  },
  render: args => <div style={{
    width: 240
  }}>
      <Toolbar {...args}>
        <Toolbar.Group style={{
        width: '100%'
      }}>
          <Toolbar.Button variant="ghost" size="md">First</Toolbar.Button>
          <Toolbar.Button variant="ghost" size="md">Second</Toolbar.Button>
          <Toolbar.Button variant="ghost" size="md">Third</Toolbar.Button>
        </Toolbar.Group>
      </Toolbar>
    </div>
}`,...O.parameters?.docs?.source}}},k.parameters={...k.parameters,docs:{...k.parameters?.docs,source:{originalSource:`{
  name: "Disabled Item",
  render: args => <Toolbar {...args}>
      <Toolbar.Group>
        <Toolbar.Button variant="ghost" size="md">First</Toolbar.Button>
        <Toolbar.Button variant="ghost" size="md" disabled>Disabled</Toolbar.Button>
        <Toolbar.Button variant="ghost" size="md">Third</Toolbar.Button>
      </Toolbar.Group>
    </Toolbar>
}`,...k.parameters?.docs?.source}}},A=[`Default`,`NoBackground`,`CustomActions`,`ComposedWithGroups`,`Vertical`,`DisabledItem`]}))();export{D as ComposedWithGroups,E as CustomActions,w as Default,k as DisabledItem,T as NoBackground,O as Vertical,A as __namedExportsOrder,C as default};