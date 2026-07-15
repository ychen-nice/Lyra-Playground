import{i as e}from"./preload-helper-xPQekRTU.js";import{o as t,t as n}from"./iframe-BuEzijNE.js";var r,i,a,o,s,c,l,u,d;e((()=>{t(),r=n(),i={title:`Foundation/Typography`,parameters:{layout:`padded`,controls:{disable:!0},actions:{disable:!0},forceLight:!0}},a=[{class:`lyra-heading-xl`,label:`Heading XL`,specimen:`The quick brown fox`},{class:`lyra-heading-lg`,label:`Heading LG`,specimen:`The quick brown fox`},{class:`lyra-heading-md`,label:`Heading MD`,specimen:`The quick brown fox`},{class:`lyra-heading-sm`,label:`Heading SM`,specimen:`The quick brown fox`},{class:`lyra-heading-xs`,label:`Heading XS`,specimen:`The quick brown fox`},{class:`lyra-body-lg`,label:`Body LG`,specimen:`The quick brown fox jumps over the lazy dog`},{class:`lyra-body-lg-em`,label:`Body LG Emphasized`,specimen:`The quick brown fox jumps over the lazy dog`},{class:`lyra-body-md`,label:`Body MD`,specimen:`The quick brown fox jumps over the lazy dog`},{class:`lyra-body-md-em`,label:`Body MD Emphasized`,specimen:`The quick brown fox jumps over the lazy dog`},{class:`lyra-body-sm`,label:`Body SM`,specimen:`The quick brown fox jumps over the lazy dog`},{class:`lyra-body-sm-em`,label:`Body SM Emphasized`,specimen:`The quick brown fox jumps over the lazy dog`},{class:`lyra-label`,label:`Label`,specimen:`The quick brown fox jumps over the lazy dog`}],o=new Set([`lyra-body-lg`,`lyra-label`]),s={fontSize:`0.6875rem`,fontFamily:`Inter, sans-serif`,color:`rgba(0,0,0,0.4)`,letterSpacing:`0.06em`,textTransform:`uppercase`,fontWeight:500},c={name:`All Styles`,render:()=>(0,r.jsxs)(`div`,{style:{maxWidth:800,margin:`0 auto`,fontFamily:`Inter, sans-serif`},children:[(0,r.jsx)(`h1`,{style:{fontFamily:`Inter, sans-serif`,fontSize:11,fontWeight:600,letterSpacing:`0.08em`,textTransform:`uppercase`,color:`rgba(0,0,0,0.35)`,marginBottom:32},children:`Lyra Type Scale`}),(0,r.jsx)(`div`,{style:{display:`grid`,gridTemplateColumns:`180px 1fr 56px 56px 80px 96px`,gap:`0 16px`,paddingBottom:8,borderBottom:`1px solid rgba(0,0,0,0.08)`,marginBottom:4},children:[`Style`,`Specimen`,`Size`,`Weight`,`Line Ht`,`Tracking`].map(e=>(0,r.jsx)(`span`,{style:s,children:e},e))}),a.map(({class:e,label:t,specimen:n})=>{let i=document.createElement(`span`);i.className=e,document.body.appendChild(i);let a=getComputedStyle(i),c=a.fontSize,l=a.fontWeight,u=a.lineHeight,d=a.letterSpacing;return document.body.removeChild(i),(0,r.jsxs)(`div`,{children:[o.has(e)&&(0,r.jsx)(`div`,{style:{borderTop:`1px solid rgba(0,0,0,0.08)`,margin:`4px 0`}}),(0,r.jsxs)(`div`,{style:{display:`grid`,gridTemplateColumns:`180px 1fr 56px 56px 80px 96px`,gap:`0 16px`,alignItems:`baseline`,padding:`10px 0`,borderBottom:`1px solid rgba(0,0,0,0.05)`},children:[(0,r.jsxs)(`span`,{style:{...s,textTransform:`none`,letterSpacing:0,fontSize:`0.75rem`,color:`rgba(0,0,0,0.45)`},children:[t,(0,r.jsx)(`br`,{}),(0,r.jsxs)(`code`,{style:{fontSize:10,background:`rgba(0,0,0,0.05)`,padding:`1px 4px`,borderRadius:3,letterSpacing:0},children:[`.`,e]})]}),(0,r.jsx)(`span`,{className:e,style:{color:`rgba(0,0,0,0.85)`},children:n}),(0,r.jsx)(`span`,{style:s,children:c}),(0,r.jsx)(`span`,{style:s,children:l}),(0,r.jsx)(`span`,{style:s,children:u}),(0,r.jsx)(`span`,{style:s,children:d})]})]},e)})]})},l={name:`Headings`,render:()=>(0,r.jsx)(`div`,{style:{maxWidth:600,margin:`0 auto`,display:`flex`,flexDirection:`column`,gap:24},children:a.filter(e=>e.class.startsWith(`lyra-heading`)).map(({class:e,label:t})=>(0,r.jsxs)(`div`,{children:[(0,r.jsx)(`p`,{style:s,children:t}),(0,r.jsx)(`p`,{className:e,style:{color:`rgba(0,0,0,0.85)`,marginTop:4},children:`AI Assistant — How can I help?`})]},e))})},u={name:`Body`,render:()=>(0,r.jsx)(`div`,{style:{maxWidth:600,margin:`0 auto`,display:`flex`,flexDirection:`column`,gap:24},children:a.filter(e=>e.class.startsWith(`lyra-body`)||e.class===`lyra-label`).map(({class:e,label:t})=>(0,r.jsxs)(`div`,{children:[(0,r.jsx)(`p`,{style:s,children:t}),(0,r.jsx)(`p`,{className:e,style:{color:`rgba(0,0,0,0.85)`,marginTop:4},children:`Sentiment analysis on his last 3 calls shows he's using filler phrases under pressure and pausing too long during account lookups.`})]},e))})},c.parameters={...c.parameters,docs:{...c.parameters?.docs,source:{originalSource:`{
  name: "All Styles",
  render: () => <div style={{
    maxWidth: 800,
    margin: "0 auto",
    fontFamily: "Inter, sans-serif"
  }}>
      <h1 style={{
      fontFamily: "Inter, sans-serif",
      fontSize: 11,
      fontWeight: 600,
      letterSpacing: "0.08em",
      textTransform: "uppercase",
      color: "rgba(0,0,0,0.35)",
      marginBottom: 32
    }}>
        Lyra Type Scale
      </h1>

      {/* Header row */}
      <div style={{
      display: "grid",
      gridTemplateColumns: "180px 1fr 56px 56px 80px 96px",
      gap: "0 16px",
      paddingBottom: 8,
      borderBottom: "1px solid rgba(0,0,0,0.08)",
      marginBottom: 4
    }}>
        {["Style", "Specimen", "Size", "Weight", "Line Ht", "Tracking"].map(h => <span key={h} style={meta}>{h}</span>)}
      </div>

      {SCALE.map(({
      class: cls,
      label,
      specimen
    }) => {
      const el = document.createElement("span");
      el.className = cls;
      document.body.appendChild(el);
      const cs = getComputedStyle(el);
      const size = cs.fontSize;
      const weight = cs.fontWeight;
      const lineH = cs.lineHeight;
      const tracking = cs.letterSpacing;
      document.body.removeChild(el);
      return <div key={cls}>
            {DIVIDER_BEFORE.has(cls) && <div style={{
          borderTop: "1px solid rgba(0,0,0,0.08)",
          margin: "4px 0"
        }} />}
            <div style={{
          display: "grid",
          gridTemplateColumns: "180px 1fr 56px 56px 80px 96px",
          gap: "0 16px",
          alignItems: "baseline",
          padding: "10px 0",
          borderBottom: "1px solid rgba(0,0,0,0.05)"
        }}>
              <span style={{
            ...meta,
            textTransform: "none",
            letterSpacing: 0,
            fontSize: "0.75rem",
            color: "rgba(0,0,0,0.45)"
          }}>
                {label}
                <br />
                <code style={{
              fontSize: 10,
              background: "rgba(0,0,0,0.05)",
              padding: "1px 4px",
              borderRadius: 3,
              letterSpacing: 0
            }}>.{cls}</code>
              </span>
              <span className={cls} style={{
            color: "rgba(0,0,0,0.85)"
          }}>{specimen}</span>
              <span style={meta}>{size}</span>
              <span style={meta}>{weight}</span>
              <span style={meta}>{lineH}</span>
              <span style={meta}>{tracking}</span>
            </div>
          </div>;
    })}
    </div>
}`,...c.parameters?.docs?.source}}},l.parameters={...l.parameters,docs:{...l.parameters?.docs,source:{originalSource:`{
  name: "Headings",
  render: () => <div style={{
    maxWidth: 600,
    margin: "0 auto",
    display: "flex",
    flexDirection: "column",
    gap: 24
  }}>
      {SCALE.filter(s => s.class.startsWith("lyra-heading")).map(({
      class: cls,
      label
    }) => <div key={cls}>
          <p style={meta}>{label}</p>
          <p className={cls} style={{
        color: "rgba(0,0,0,0.85)",
        marginTop: 4
      }}>AI Assistant — How can I help?</p>
        </div>)}
    </div>
}`,...l.parameters?.docs?.source}}},u.parameters={...u.parameters,docs:{...u.parameters?.docs,source:{originalSource:`{
  name: "Body",
  render: () => <div style={{
    maxWidth: 600,
    margin: "0 auto",
    display: "flex",
    flexDirection: "column",
    gap: 24
  }}>
      {SCALE.filter(s => s.class.startsWith("lyra-body") || s.class === "lyra-label").map(({
      class: cls,
      label
    }) => <div key={cls}>
          <p style={meta}>{label}</p>
          <p className={cls} style={{
        color: "rgba(0,0,0,0.85)",
        marginTop: 4
      }}>
            Sentiment analysis on his last 3 calls shows he's using filler phrases under pressure and pausing too long during account lookups.
          </p>
        </div>)}
    </div>
}`,...u.parameters?.docs?.source}}},d=[`AllStyles`,`Headings`,`Body`]}))();export{c as AllStyles,u as Body,l as Headings,d as __namedExportsOrder,i as default};