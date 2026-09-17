import{i as e,s as t}from"./preload-helper-xPQekRTU.js";import{F as n,o as r,t as i}from"./iframe-CWO9uZYx.js";import{H as a,gt as o,n as s,t as c}from"./lucide-react-CKKK6GMi.js";import{n as l,t as u}from"./Button-BF7Wpy0w.js";import{n as d,t as f}from"./Badge-CYq2dm8_.js";var p=e((()=>{}));function m({color:e}){return(0,y.jsx)(o,{size:12,style:{flexShrink:0,color:e}})}function h({label:e,color:t,onClick:n,chevron:r=!0,flavor:i=`neutral`}){return(0,y.jsxs)(`button`,{type:`button`,className:`lyra-query-chip-segment lyra-query-chip-segment--${i} lyra-body-md`,onClick:n,style:{display:`flex`,alignItems:`center`,gap:`var(--lyra-spacing-1)`,height:`var(--lyra-control-height-md)`,padding:`0 var(--lyra-spacing-2)`,color:t,whiteSpace:`nowrap`},children:[(0,y.jsx)(`span`,{style:{overflow:`hidden`,textOverflow:`ellipsis`},children:e}),r&&(0,y.jsx)(m,{})]})}function g({label:e,color:t,chevron:n=!1}){return(0,y.jsxs)(`span`,{className:`lyra-body-md`,style:{display:`flex`,alignItems:`center`,gap:`var(--lyra-spacing-1)`,height:`var(--lyra-control-height-md)`,padding:`0 var(--lyra-spacing-2)`,color:t,whiteSpace:`nowrap`},children:[(0,y.jsx)(`span`,{style:{overflow:`hidden`,textOverflow:`ellipsis`},children:e}),n&&(0,y.jsx)(m,{})]})}function _({status:e=`inactive`,filterName:t=`Filter`,mandatory:n=!1,showIcon:r=!1,icon:i,showOperator:a=!1,operator:o=`Equal`,value:c=`select...`,removable:l=!0,onFilterClick:d,onOperatorClick:p,onValueClick:_,onRemove:x}){let S=b[e]??b.inactive,C=e===`active`,w=e===`error`,T=e===`readOnly`,E=e===`disabled`,D=e===`inactiveShort`,O=e===`inactive`,k=w?`var(--lyra-color-status-critical-strong)`:C?`var(--lyra-color-fg-active-strong)`:E?`var(--lyra-color-fg-disabled)`:`var(--lyra-color-fg-default)`,A=l&&[`inactive`,`inactiveShort`,`active`,`error`].includes(e),j=w?`error`:C?`active`:`neutral`;return(0,y.jsxs)(`div`,{style:{position:`relative`,display:`inline-flex`},children:[w&&(0,y.jsx)(`span`,{style:{position:`absolute`,left:-6,top:-6,display:`flex`,zIndex:1},children:(0,y.jsx)(f,{color:`red`,colorStyle:`strong`,type:`counter`,size:`small`,children:`!`})}),(0,y.jsxs)(`div`,{style:{display:`inline-flex`,alignItems:`center`,height:`var(--lyra-control-height-md)`,maxWidth:480,borderRadius:`var(--lyra-radius-md)`,background:S.background,border:S.border?`1px solid ${S.border}`:`none`,overflow:`hidden`,boxSizing:`border-box`},children:[r&&i&&(0,y.jsx)(`span`,{style:{display:`flex`,flexShrink:0,width:16,height:16,marginLeft:`var(--lyra-spacing-2)`,color:k},children:(0,v.cloneElement)(i,{size:`100%`})}),D?(0,y.jsx)(h,{label:(0,y.jsxs)(y.Fragment,{children:[t,n&&(0,y.jsx)(`span`,{style:{color:`var(--lyra-color-status-critical-strong)`},children:` *`})]}),color:`var(--lyra-color-fg-default)`,onClick:d,flavor:`neutral`}):E?(0,y.jsxs)(`span`,{style:{display:`flex`,alignItems:`center`,gap:`var(--lyra-spacing-1)`,padding:`0 var(--lyra-spacing-2)`,whiteSpace:`nowrap`},children:[(0,y.jsx)(`span`,{className:`lyra-body-md-em`,style:{color:k},children:t}),(0,y.jsx)(m,{color:k})]}):(0,y.jsxs)(y.Fragment,{children:[(0,y.jsx)(`span`,{className:`lyra-body-md-em`,style:{color:k,padding:`0 0 0 var(--lyra-spacing-2)`,whiteSpace:`nowrap`},children:t}),(0,y.jsx)(`span`,{className:`lyra-body-md-em`,style:{color:k,padding:`0 var(--lyra-spacing-1) 0 0`},children:`:`})]}),a&&!E&&!D&&(T?(0,y.jsx)(g,{label:o,color:`var(--lyra-color-fg-default)`}):(0,y.jsx)(h,{label:o,color:k,onClick:p,flavor:j})),!E&&!D&&(T?(0,y.jsx)(g,{label:c,color:`var(--lyra-color-fg-default)`,chevron:!0}):(0,y.jsx)(h,{label:c,color:O?`var(--lyra-color-fg-default)`:k,onClick:_,flavor:j})),A&&(0,y.jsx)(`span`,{style:{display:`flex`,alignItems:`center`,paddingRight:`var(--lyra-spacing-1)`},children:(0,y.jsx)(u,{variant:`ghost`,size:`sm`,iconOnly:!0,"aria-label":`Remove ${t} filter`,onClick:x,children:(0,y.jsx)(s,{})})})]})]})}var v,y,b,x=e((()=>{v=t(n(),1),c(),l(),d(),r(),p(),y=i(),b={inactive:{background:`var(--lyra-color-bg-control-subtle)`,border:`var(--lyra-color-border-soft)`},inactiveShort:{background:`var(--lyra-color-bg-control-subtle)`,border:`var(--lyra-color-border-soft)`},active:{background:`var(--lyra-color-bg-active-subtle)`,border:`var(--lyra-color-border-active)`},error:{background:`var(--lyra-color-status-critical-subtle)`,border:`var(--lyra-color-status-critical-strong)`},readOnly:{background:`var(--lyra-color-bg-none)`,border:`var(--lyra-color-border-soft)`},disabled:{background:`var(--lyra-color-bg-disabled)`,border:null}},_.__docgenInfo={description:``,methods:[],displayName:`QueryChip`,props:{status:{defaultValue:{value:`'inactive'`,computed:!1},required:!1},filterName:{defaultValue:{value:`'Filter'`,computed:!1},required:!1},mandatory:{defaultValue:{value:`false`,computed:!1},required:!1},showIcon:{defaultValue:{value:`false`,computed:!1},required:!1},showOperator:{defaultValue:{value:`false`,computed:!1},required:!1},operator:{defaultValue:{value:`'Equal'`,computed:!1},required:!1},value:{defaultValue:{value:`'select...'`,computed:!1},required:!1},removable:{defaultValue:{value:`true`,computed:!1},required:!1}}}}));function S(){return(0,C.jsxs)(`div`,{style:{display:`flex`,flexWrap:`wrap`,gap:`var(--lyra-spacing-2)`,alignItems:`center`},children:[(0,C.jsx)(_,{status:`active`,filterName:`Status`,showOperator:!0,value:`Open`}),(0,C.jsx)(_,{status:`active`,filterName:`Owner`,showOperator:!0,operator:`Is`,value:`Jordan`}),(0,C.jsx)(_,{status:`error`,filterName:`Due date`,showOperator:!0,value:`Value`}),(0,C.jsx)(_,{status:`inactiveShort`})]})}var C,w,T,E,D,O,k,A,j;e((()=>{c(),x(),C=i(),w={title:`Components/QueryChip`,component:_,parameters:{layout:`padded`},argTypes:{status:{control:`select`,options:[`inactive`,`inactiveShort`,`active`,`error`,`readOnly`,`disabled`]},filterName:{control:`text`},operator:{control:`text`},value:{control:`text`},showOperator:{control:`boolean`},showIcon:{control:`boolean`},removable:{control:`boolean`},mandatory:{control:`boolean`,description:`Shows a red "*" — only visible in the inactiveShort (filter-picker) step`}},args:{status:`inactive`,filterName:`Filter`,operator:`Equal`,value:`select...`,showOperator:!0,showIcon:!1,removable:!0,mandatory:!1}},T={name:`Default`,render:e=>(0,C.jsx)(_,{...e,icon:e.showIcon?(0,C.jsx)(a,{}):void 0})},E={name:`All Statuses`,parameters:{controls:{disable:!0}},render:()=>(0,C.jsxs)(`div`,{style:{display:`flex`,flexDirection:`column`,gap:`var(--lyra-spacing-3)`,alignItems:`flex-start`},children:[(0,C.jsx)(_,{status:`inactive`}),(0,C.jsx)(_,{status:`inactiveShort`,mandatory:!0}),(0,C.jsx)(_,{status:`active`,value:`Value`}),(0,C.jsx)(_,{status:`error`,value:`Value`}),(0,C.jsx)(_,{status:`readOnly`,value:`Value`}),(0,C.jsx)(_,{status:`disabled`})]})},D={name:`With Operator`,parameters:{controls:{disable:!0}},render:()=>(0,C.jsxs)(`div`,{style:{display:`flex`,flexDirection:`column`,gap:`var(--lyra-spacing-3)`,alignItems:`flex-start`},children:[(0,C.jsx)(_,{status:`inactive`,showOperator:!0}),(0,C.jsx)(_,{status:`active`,showOperator:!0,value:`Value`}),(0,C.jsx)(_,{status:`error`,showOperator:!0,value:`Value`}),(0,C.jsx)(_,{status:`readOnly`,showOperator:!0,value:`Value`})]})},O={name:`With Leading Icon`,parameters:{controls:{disable:!0}},render:()=>(0,C.jsxs)(`div`,{style:{display:`flex`,flexDirection:`column`,gap:`var(--lyra-spacing-3)`,alignItems:`flex-start`},children:[(0,C.jsx)(_,{status:`active`,showIcon:!0,icon:(0,C.jsx)(a,{}),showOperator:!0,value:`Value`}),(0,C.jsx)(_,{status:`inactive`,showIcon:!0,icon:(0,C.jsx)(a,{}),showOperator:!0})]})},k={name:`Not Removable`,parameters:{controls:{disable:!0}},render:()=>(0,C.jsx)(_,{status:`active`,showOperator:!0,value:`Value`,removable:!1})},A={name:`Filter Bar (composed)`,parameters:{controls:{disable:!0}},render:()=>(0,C.jsx)(S,{})},T.parameters={...T.parameters,docs:{...T.parameters?.docs,source:{originalSource:`{
  name: "Default",
  render: args => <QueryChip {...args} icon={args.showIcon ? <Folder /> : undefined} />
}`,...T.parameters?.docs?.source}}},E.parameters={...E.parameters,docs:{...E.parameters?.docs,source:{originalSource:`{
  name: "All Statuses",
  parameters: {
    controls: {
      disable: true
    }
  },
  render: () => <div style={{
    display: 'flex',
    flexDirection: 'column',
    gap: 'var(--lyra-spacing-3)',
    alignItems: 'flex-start'
  }}>
      <QueryChip status="inactive" />
      <QueryChip status="inactiveShort" mandatory />
      <QueryChip status="active" value="Value" />
      <QueryChip status="error" value="Value" />
      <QueryChip status="readOnly" value="Value" />
      <QueryChip status="disabled" />
    </div>
}`,...E.parameters?.docs?.source}}},D.parameters={...D.parameters,docs:{...D.parameters?.docs,source:{originalSource:`{
  name: "With Operator",
  parameters: {
    controls: {
      disable: true
    }
  },
  render: () => <div style={{
    display: 'flex',
    flexDirection: 'column',
    gap: 'var(--lyra-spacing-3)',
    alignItems: 'flex-start'
  }}>
      <QueryChip status="inactive" showOperator />
      <QueryChip status="active" showOperator value="Value" />
      <QueryChip status="error" showOperator value="Value" />
      <QueryChip status="readOnly" showOperator value="Value" />
    </div>
}`,...D.parameters?.docs?.source}}},O.parameters={...O.parameters,docs:{...O.parameters?.docs,source:{originalSource:`{
  name: "With Leading Icon",
  parameters: {
    controls: {
      disable: true
    }
  },
  render: () => <div style={{
    display: 'flex',
    flexDirection: 'column',
    gap: 'var(--lyra-spacing-3)',
    alignItems: 'flex-start'
  }}>
      <QueryChip status="active" showIcon icon={<Folder />} showOperator value="Value" />
      <QueryChip status="inactive" showIcon icon={<Folder />} showOperator />
    </div>
}`,...O.parameters?.docs?.source}}},k.parameters={...k.parameters,docs:{...k.parameters?.docs,source:{originalSource:`{
  name: "Not Removable",
  parameters: {
    controls: {
      disable: true
    }
  },
  render: () => <QueryChip status="active" showOperator value="Value" removable={false} />
}`,...k.parameters?.docs?.source}}},A.parameters={...A.parameters,docs:{...A.parameters?.docs,source:{originalSource:`{
  name: "Filter Bar (composed)",
  parameters: {
    controls: {
      disable: true
    }
  },
  render: () => <FilterBarDemo />
}`,...A.parameters?.docs?.source}}},j=[`Default`,`AllStatuses`,`WithOperator`,`WithIcon`,`NotRemovable`,`FilterBar`]}))();export{E as AllStatuses,T as Default,A as FilterBar,k as NotRemovable,O as WithIcon,D as WithOperator,j as __namedExportsOrder,w as default};