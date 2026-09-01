import{i as e,s as t}from"./preload-helper-xPQekRTU.js";import{F as n,o as r,t as i}from"./iframe-RNbPRStA.js";import{H as a,gt as o,it as s,n as c,t as l}from"./lucide-react-BqxH3MG6.js";import{n as u,t as d}from"./Button-DoiMcNPk.js";var f=e((()=>{}));function p({color:e}){return(0,v.jsx)(o,{size:12,style:{flexShrink:0,color:e}})}function m({label:e,color:t,onClick:n,chevron:r=!0,flavor:i=`neutral`}){return(0,v.jsxs)(`button`,{type:`button`,className:`lyra-query-chip-segment lyra-query-chip-segment--${i} lyra-body-md`,onClick:n,style:{display:`flex`,alignItems:`center`,gap:`var(--lyra-spacing-1)`,height:`var(--lyra-control-height-md)`,padding:`0 var(--lyra-spacing-2)`,color:t,whiteSpace:`nowrap`},children:[(0,v.jsx)(`span`,{style:{overflow:`hidden`,textOverflow:`ellipsis`},children:e}),r&&(0,v.jsx)(p,{})]})}function h({label:e,color:t,chevron:n=!1}){return(0,v.jsxs)(`span`,{className:`lyra-body-md`,style:{display:`flex`,alignItems:`center`,gap:`var(--lyra-spacing-1)`,height:`var(--lyra-control-height-md)`,padding:`0 var(--lyra-spacing-2)`,color:t,whiteSpace:`nowrap`},children:[(0,v.jsx)(`span`,{style:{overflow:`hidden`,textOverflow:`ellipsis`},children:e}),n&&(0,v.jsx)(p,{})]})}function g({status:e=`inactive`,filterName:t=`Filter`,mandatory:n=!1,showIcon:r=!1,icon:i,showOperator:a=!1,operator:o=`Equal`,value:l=`select...`,removable:u=!0,onFilterClick:f,onOperatorClick:g,onValueClick:b,onRemove:x}){let S=y[e]??y.inactive,C=e===`active`,w=e===`error`,T=e===`readOnly`,E=e===`disabled`,D=e===`inactiveShort`,O=e===`inactive`,k=w?`var(--lyra-color-status-critical-strong)`:C?`var(--lyra-color-fg-active-strong)`:E?`var(--lyra-color-fg-disabled)`:`var(--lyra-color-fg-default)`,A=u&&[`inactive`,`inactiveShort`,`active`,`error`].includes(e),j=w?`error`:C?`active`:`neutral`;return(0,v.jsxs)(`div`,{style:{position:`relative`,display:`inline-flex`},children:[w&&(0,v.jsx)(`span`,{style:{position:`absolute`,left:-6,top:-6,display:`flex`,zIndex:1,color:`var(--lyra-color-status-critical-strong)`,background:`var(--lyra-color-bg-surface-base)`,borderRadius:`var(--lyra-radius-round)`},children:(0,v.jsx)(s,{size:12,fill:`var(--lyra-color-status-critical-strong)`,stroke:`var(--lyra-color-bg-surface-base)`})}),(0,v.jsxs)(`div`,{style:{display:`inline-flex`,alignItems:`center`,height:`var(--lyra-control-height-md)`,maxWidth:480,borderRadius:`var(--lyra-radius-md)`,background:S.background,border:S.border?`1px solid ${S.border}`:`none`,overflow:`hidden`,boxSizing:`border-box`},children:[r&&i&&(0,v.jsx)(`span`,{style:{display:`flex`,flexShrink:0,width:16,height:16,marginLeft:`var(--lyra-spacing-2)`,color:k},children:(0,_.cloneElement)(i,{size:`100%`})}),D?(0,v.jsx)(m,{label:(0,v.jsxs)(v.Fragment,{children:[t,n&&(0,v.jsx)(`span`,{style:{color:`var(--lyra-color-status-critical-strong)`},children:` *`})]}),color:`var(--lyra-color-fg-default)`,onClick:f,flavor:`neutral`}):E?(0,v.jsxs)(`span`,{style:{display:`flex`,alignItems:`center`,gap:`var(--lyra-spacing-1)`,padding:`0 var(--lyra-spacing-2)`,whiteSpace:`nowrap`},children:[(0,v.jsx)(`span`,{className:`lyra-body-md-em`,style:{color:k},children:t}),(0,v.jsx)(p,{color:k})]}):(0,v.jsxs)(v.Fragment,{children:[(0,v.jsx)(`span`,{className:`lyra-body-md-em`,style:{color:k,padding:`0 0 0 var(--lyra-spacing-2)`,whiteSpace:`nowrap`},children:t}),(0,v.jsx)(`span`,{className:`lyra-body-md-em`,style:{color:k,padding:`0 var(--lyra-spacing-1) 0 0`},children:`:`})]}),a&&!E&&!D&&(T?(0,v.jsx)(h,{label:o,color:`var(--lyra-color-fg-default)`}):(0,v.jsx)(m,{label:o,color:k,onClick:g,flavor:j})),!E&&!D&&(T?(0,v.jsx)(h,{label:l,color:`var(--lyra-color-fg-default)`,chevron:!0}):(0,v.jsx)(m,{label:l,color:O?`var(--lyra-color-fg-default)`:k,onClick:b,flavor:j})),A&&(0,v.jsx)(`span`,{style:{display:`flex`,alignItems:`center`,paddingRight:`var(--lyra-spacing-1)`},children:(0,v.jsx)(d,{variant:`ghost`,size:`sm`,iconOnly:!0,"aria-label":`Remove ${t} filter`,onClick:x,children:(0,v.jsx)(c,{})})})]})]})}var _,v,y,b=e((()=>{_=t(n(),1),l(),u(),r(),f(),v=i(),y={inactive:{background:`var(--lyra-color-bg-control-subtle)`,border:`var(--lyra-color-border-soft)`},inactiveShort:{background:`var(--lyra-color-bg-control-subtle)`,border:`var(--lyra-color-border-soft)`},active:{background:`var(--lyra-color-bg-active-subtle)`,border:`var(--lyra-color-border-active)`},error:{background:`var(--lyra-color-status-critical-subtle)`,border:`var(--lyra-color-status-critical-strong)`},readOnly:{background:`var(--lyra-color-bg-none)`,border:`var(--lyra-color-border-soft)`},disabled:{background:`var(--lyra-color-bg-disabled)`,border:null}},g.__docgenInfo={description:``,methods:[],displayName:`QueryChip`,props:{status:{defaultValue:{value:`'inactive'`,computed:!1},required:!1},filterName:{defaultValue:{value:`'Filter'`,computed:!1},required:!1},mandatory:{defaultValue:{value:`false`,computed:!1},required:!1},showIcon:{defaultValue:{value:`false`,computed:!1},required:!1},showOperator:{defaultValue:{value:`false`,computed:!1},required:!1},operator:{defaultValue:{value:`'Equal'`,computed:!1},required:!1},value:{defaultValue:{value:`'select...'`,computed:!1},required:!1},removable:{defaultValue:{value:`true`,computed:!1},required:!1}}}}));function x(){return(0,S.jsxs)(`div`,{style:{display:`flex`,flexWrap:`wrap`,gap:`var(--lyra-spacing-2)`,alignItems:`center`},children:[(0,S.jsx)(g,{status:`active`,filterName:`Status`,showOperator:!0,value:`Open`}),(0,S.jsx)(g,{status:`active`,filterName:`Owner`,showOperator:!0,operator:`Is`,value:`Jordan`}),(0,S.jsx)(g,{status:`error`,filterName:`Due date`,showOperator:!0,value:`Value`}),(0,S.jsx)(g,{status:`inactiveShort`})]})}var S,C,w,T,E,D,O,k,A;e((()=>{l(),b(),S=i(),C={title:`Components/QueryChip`,component:g,parameters:{layout:`padded`},argTypes:{status:{control:`select`,options:[`inactive`,`inactiveShort`,`active`,`error`,`readOnly`,`disabled`]},filterName:{control:`text`},operator:{control:`text`},value:{control:`text`},showOperator:{control:`boolean`},showIcon:{control:`boolean`},removable:{control:`boolean`},mandatory:{control:`boolean`,description:`Shows a red "*" — only visible in the inactiveShort (filter-picker) step`}},args:{status:`inactive`,filterName:`Filter`,operator:`Equal`,value:`select...`,showOperator:!0,showIcon:!1,removable:!0,mandatory:!1}},w={name:`Default`,render:e=>(0,S.jsx)(g,{...e,icon:e.showIcon?(0,S.jsx)(a,{}):void 0})},T={name:`All Statuses`,parameters:{controls:{disable:!0}},render:()=>(0,S.jsxs)(`div`,{style:{display:`flex`,flexDirection:`column`,gap:`var(--lyra-spacing-3)`,alignItems:`flex-start`},children:[(0,S.jsx)(g,{status:`inactive`}),(0,S.jsx)(g,{status:`inactiveShort`,mandatory:!0}),(0,S.jsx)(g,{status:`active`,value:`Value`}),(0,S.jsx)(g,{status:`error`,value:`Value`}),(0,S.jsx)(g,{status:`readOnly`,value:`Value`}),(0,S.jsx)(g,{status:`disabled`})]})},E={name:`With Operator`,parameters:{controls:{disable:!0}},render:()=>(0,S.jsxs)(`div`,{style:{display:`flex`,flexDirection:`column`,gap:`var(--lyra-spacing-3)`,alignItems:`flex-start`},children:[(0,S.jsx)(g,{status:`inactive`,showOperator:!0}),(0,S.jsx)(g,{status:`active`,showOperator:!0,value:`Value`}),(0,S.jsx)(g,{status:`error`,showOperator:!0,value:`Value`}),(0,S.jsx)(g,{status:`readOnly`,showOperator:!0,value:`Value`})]})},D={name:`With Leading Icon`,parameters:{controls:{disable:!0}},render:()=>(0,S.jsxs)(`div`,{style:{display:`flex`,flexDirection:`column`,gap:`var(--lyra-spacing-3)`,alignItems:`flex-start`},children:[(0,S.jsx)(g,{status:`active`,showIcon:!0,icon:(0,S.jsx)(a,{}),showOperator:!0,value:`Value`}),(0,S.jsx)(g,{status:`inactive`,showIcon:!0,icon:(0,S.jsx)(a,{}),showOperator:!0})]})},O={name:`Not Removable`,parameters:{controls:{disable:!0}},render:()=>(0,S.jsx)(g,{status:`active`,showOperator:!0,value:`Value`,removable:!1})},k={name:`Filter Bar (composed)`,parameters:{controls:{disable:!0}},render:()=>(0,S.jsx)(x,{})},w.parameters={...w.parameters,docs:{...w.parameters?.docs,source:{originalSource:`{
  name: "Default",
  render: args => <QueryChip {...args} icon={args.showIcon ? <Folder /> : undefined} />
}`,...w.parameters?.docs?.source}}},T.parameters={...T.parameters,docs:{...T.parameters?.docs,source:{originalSource:`{
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
}`,...T.parameters?.docs?.source}}},E.parameters={...E.parameters,docs:{...E.parameters?.docs,source:{originalSource:`{
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
}`,...E.parameters?.docs?.source}}},D.parameters={...D.parameters,docs:{...D.parameters?.docs,source:{originalSource:`{
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
}`,...D.parameters?.docs?.source}}},O.parameters={...O.parameters,docs:{...O.parameters?.docs,source:{originalSource:`{
  name: "Not Removable",
  parameters: {
    controls: {
      disable: true
    }
  },
  render: () => <QueryChip status="active" showOperator value="Value" removable={false} />
}`,...O.parameters?.docs?.source}}},k.parameters={...k.parameters,docs:{...k.parameters?.docs,source:{originalSource:`{
  name: "Filter Bar (composed)",
  parameters: {
    controls: {
      disable: true
    }
  },
  render: () => <FilterBarDemo />
}`,...k.parameters?.docs?.source}}},A=[`Default`,`AllStatuses`,`WithOperator`,`WithIcon`,`NotRemovable`,`FilterBar`]}))();export{T as AllStatuses,w as Default,k as FilterBar,O as NotRemovable,D as WithIcon,E as WithOperator,A as __namedExportsOrder,C as default};