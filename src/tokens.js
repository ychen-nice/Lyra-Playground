// Single source of truth for all Lyra design tokens.
// Foundation stories (Colors, Effects) display these; preview.jsx injects them as CSS vars.

// lightRef/darkRef hold the *reference token name* (e.g. "slate/25", "brand/500")
// for any value whose source in Figma is a reference to a base (or another
// semantic) token, rather than a hand-picked literal — Colors.stories.jsx shows
// this name instead of the resolved value for those. Tokens with no ref were
// literal rgba()/hex values in the source (e.g. opacity-based overlays) and have
// no base token to point to.
export const SEMANTIC_SECTIONS = [
  { title: 'Surface', prefix: 'bg/surface/', tokens: [
    { name: 'base',             light: '#FFFFFF',                  dark: '#1F1F1E',                lightRef: 'white',      darkRef: 'gray/900',   desc: 'Primary content area that all other containers sit on top of. The lightest structural surface.' },
    { name: 'container',        light: '#FFFFFF',                  dark: '#1F1F1E',                lightRef: 'white',      darkRef: 'gray/900',   desc: 'Main containers background — for panels and cards.' },
    { name: 'container-subtle', light: '#FBFCFE',                  dark: '#262626',                lightRef: 'slate/25',   darkRef: 'gray/800',   desc: 'A subtle container background for panels and cards that need a slight differentiation from the background.' },
    { name: 'overlay',          light: '#FFFFFF',                  dark: '#2E2E2E',                lightRef: 'white',      darkRef: 'gray/700',   desc: 'Floating panels, dropdowns, popovers, and tooltips that float above page content.' },
    { name: 'canvas',           light: '#FBFCFE',                  dark: '#141414',                lightRef: 'slate/25',   darkRef: 'gray/950',   desc: 'Background for visual content areas such as flowcharts and diagrams.' },
    { name: 'shell',            light: '#F3F5F7',                  dark: '#2E2E2E',                lightRef: 'slate/50',   darkRef: 'gray/700',   desc: 'Background for the suite shell — top bar, side navigation and surrounding content area.' },
    { name: 'backdrop',         light: 'rgba(0,0,0,0.24)',         dark: 'rgba(0,0,0,0.24)',       desc: 'The dim mask behind modals, drawers, and overlays.' },
    { name: 'inverse',          light: '#323740',                  dark: '#E9EDF1',                lightRef: 'slate/800',  darkRef: 'slate/100',  desc: 'Dark background for inverted panels, inverted tooltips, and elements requiring high contrast against a light surface.' },
  ]},
  { title: 'Background', prefix: 'bg/', tokens: [
    { name: 'primary',          light: '#166CCA',                  dark: '#166CCA',                lightRef: 'brand/500',  darkRef: 'brand/500',  desc: 'Primary action color — primary buttons, key branded elements.' },
    { name: 'destructive',      light: '#C93232',                  dark: '#C93232',                lightRef: 'red/500',    darkRef: 'red/500',    desc: 'Background for destructive interactive controls.' },
    { name: 'secondary',        light: '#FFFFFF',                  dark: 'rgba(255,255,255,0.04)', lightRef: 'white',      desc: 'Secondary buttons & interactive areas.' },
    { name: 'field',            light: '#FFFFFF',                  dark: 'rgba(255,255,255,0.04)', lightRef: 'white',      desc: 'Input fields, text areas and any receptive surface that accepts user-entered data.' },
    { name: 'ai',               light: 'rgba(143,115,227,0.04)',   dark: 'rgba(143,115,227,0.08)', desc: 'Background for AI-related elements such as content summarization and recommendations.' },
    { name: 'ai-gradient-start',light: '#7B61FF',                  dark: '#7B61FF',                desc: 'AI orb conic gradient start color.' },
    { name: 'ai-gradient-end',  light: '#3B82F6',                  dark: '#3B82F6',                desc: 'AI orb conic gradient end color.' },
    { name: 'control',          light: '#FFFFFF',                  dark: '#1F1F1E',                lightRef: 'white',      darkRef: 'gray/900',   desc: 'Compact interactive elements — checkbox, radio button, switch, or track.' },
    { name: 'control-subtle',   light: 'rgba(0,0,0,0.02)',         dark: 'rgba(255,255,255,0.04)', desc: 'A low-opacity control background. Adapts to any background by design.' },
    { name: 'disabled',         light: 'rgba(0,0,0,0.06)',         dark: 'rgba(255,255,255,0.04)', desc: 'Opacity-based background for interactive elements with a fill.' },
    { name: 'none',             light: 'rgba(0,0,0,0)',            dark: 'rgba(255,255,255,0)',    desc: 'Transparent background. Use in interactive elements that don\'t have a visible fill.' },
  ]},
  { title: 'Active Background', prefix: 'bg/active/', tokens: [
    { name: 'strong',   light: '#166CCA',              dark: '#4896EC',               lightRef: 'brand/500', darkRef: 'brand/400', desc: 'High contrast active state — checkboxes, toggle switches and pressed controls.' },
    { name: 'moderate', light: '#D3E6FD',              dark: 'rgba(72,150,236,0.2)',  lightRef: 'brand/200', desc: 'Selected and active states for navigation and menus.' },
    { name: 'subtle',   light: '#ECF4FE',              dark: 'rgba(72,150,236,0.12)', lightRef: 'brand/50',  desc: 'A soft active state for active chips, cards and grid rows.' },
  ]},
  { title: 'Conversation', prefix: 'bg/conversation/', tokens: [
    // Dark references bg/secondary itself (a semantic-to-semantic reference,
    // not a base color) rather than a hand-picked value.
    { name: 'AI',       light: '#F3F5F7',              dark: 'rgba(255,255,255,0.04)', lightRef: 'slate/50', darkRef: 'bg/secondary', desc: '' },
    { name: 'agent',    light: '#E5EEFF',              dark: 'rgba(44,138,242,0.18)',  lightRef: 'blue/50',  desc: '' },
    { name: 'customer', light: '#DEF7E1',              dark: '#0F2A13',                lightRef: 'green/50', darkRef: 'green/900',   desc: '' },
    { name: 'user',     light: '#E5EEFF',              dark: 'rgba(44,138,242,0.18)',  lightRef: 'blue/50',  desc: '' },
  ]},
  { title: 'Foreground', prefix: 'fg/', tokens: [
    { name: 'default',          light: 'rgba(0,0,0,0.8)',          dark: 'rgba(255,255,255,0.8)',  desc: 'Primary text and icons.' },
    { name: 'secondary',        light: 'rgba(0,0,0,0.6)',          dark: 'rgba(255,255,255,0.6)',  desc: 'Supporting text — captions, helper text, placeholders and metadata.' },
    { name: 'action',           light: '#66717F',                  dark: '#ACB7C3',                lightRef: 'slate/500',  darkRef: 'slate/300',  desc: 'Interactive affordance color for actionable text, icon buttons.' },
    { name: 'disabled',         light: 'rgba(0,0,0,0.3)',          dark: 'rgba(255,255,255,0.2)',  desc: 'Opacity-based disabled foreground.' },
    { name: 'link',             light: '#185BA4',                  dark: '#A7D0FE',                lightRef: 'brand/600',  darkRef: 'brand/300',  desc: 'Inline hyperlinks within body text or paragraphs.' },
    { name: 'inverse',          light: '#FFFFFF',                  dark: '#1F1F1E',                lightRef: 'white',      darkRef: 'gray/900',   desc: 'Text and icons on dark backgrounds.' },
    { name: 'inverse-disabled', light: 'rgba(255,255,255,0.3)',    dark: 'rgba(0,0,0,0.3)',        desc: 'Disabled interactive text or icons on dark backgrounds.' },
    { name: 'on-primary',       light: '#FFFFFF',                  dark: '#FFFFFF',                lightRef: 'white',      darkRef: 'white',      desc: 'Foreground on primary backgrounds.' },
    { name: 'on-destructive',   light: '#FFFFFF',                  dark: '#FFFFFF',                lightRef: 'white',      darkRef: 'white',      desc: 'Foreground on destructive elements.' },
  ]},
  { title: 'Active Foreground', prefix: 'fg/active/', tokens: [
    { name: 'strong', light: '#185BA4', dark: '#A7D0FE', lightRef: 'brand/600', darkRef: 'brand/300', desc: 'High-emphasis active text & icons.' },
    { name: 'subtle', light: '#F6FAFE', dark: '#0C2845', lightRef: 'brand/25',  darkRef: 'brand/900', desc: 'Softer active text & icons indication.' },
  ]},
  { title: 'Border', prefix: 'border/', tokens: [
    { name: 'subtle',   light: 'rgba(0,0,0,0.1)',          dark: 'rgba(255,255,255,0.1)',  desc: 'Barely visible separator — used mostly for dividers between surface regions.' },
    { name: 'soft',     light: 'rgba(0,0,0,0.16)',         dark: 'rgba(255,255,255,0.16)', desc: 'Standard border for interactive controls and panels.' },
    { name: 'medium',   light: 'rgba(0,0,0,0.32)',         dark: 'rgba(255,255,255,0.32)', desc: 'Emphasis border — when a border requires stronger definition.' },
    { name: 'strong',   light: 'rgba(0,0,0,0.46)',         dark: 'rgba(255,255,255,0.46)', desc: 'High-contrast border for maximum definition.' },
    { name: 'disabled', light: 'rgba(0,0,0,0.1)',          dark: 'rgba(255,255,255,0.1)',  desc: 'Opacity-based disabled control border.' },
    { name: 'none',     light: 'rgba(0,0,0,0)',            dark: 'rgba(255,255,255,0)',    desc: 'Transparent border.' },
    { name: 'active',   light: '#185BA4',                  dark: '#4896EC',                lightRef: 'brand/600',  darkRef: 'brand/400',  desc: 'Active or selected state border.' },
    { name: 'field-ai', light: '#4E39A8',                  dark: '#AD9FE9',                lightRef: 'purple/600', darkRef: 'purple/300', desc: '' },
    // Light was a translucent white in the previous build — the source is
    // actually a reference to solid white, not a hand-picked opacity value.
    { name: 'inverse',  light: '#FFFFFF',                  dark: 'rgba(0,0,0,0.8)',        lightRef: 'white',      desc: 'Border for use on dark or inverted backgrounds.' },
  ]},
  { title: 'Focus', prefix: 'border/focus/', tokens: [
    { name: 'default', light: '#185BA4',                dark: '#F9CF46',                lightRef: 'brand/600',  darkRef: 'yellow/300', desc: 'Standard keyboard focus ring for all interactive elements.' },
    { name: 'inverse', light: '#F9CF46',                dark: '#185BA4',                lightRef: 'yellow/300', darkRef: 'brand/600',  desc: 'Focus ring for elements on dark or inverted surfaces.' },
    { name: 'ring',    light: 'rgba(44,138,242,0.25)', dark: 'rgba(44,138,242,0.25)', desc: 'Translucent glow layer applied alongside the focus ring.' },
  ]},
  { title: 'Status', prefix: 'status/', tokens: [
    { name: 'success-strong',  light: '#197E26',              dark: '#73CD7F',               lightRef: 'green/500', darkRef: 'green/300', desc: 'Success text, icons, and borders.' },
    { name: 'success-medium',  light: '#73CD7F',              dark: '#197E26',               lightRef: 'green/300', darkRef: 'green/500', desc: 'Moderate success color.' },
    // Dark was a solid hex in the previous build — the source is a literal
    // translucent overlay, not a base-token reference.
    { name: 'success-subtle',  light: '#EBFAED',              dark: 'rgba(33,116,44,0.2)',  lightRef: 'green/25',  desc: 'Success backgrounds.' },
    { name: 'info-strong',     light: '#3163C9',              dark: '#789FED',               lightRef: 'blue/500',  darkRef: 'blue/300',  desc: 'Informational text, icons, and borders.' },
    { name: 'info-medium',     light: '#789FED',              dark: '#3163C9',               lightRef: 'blue/300',  darkRef: 'blue/500',  desc: 'Moderate info color.' },
    { name: 'info-subtle',     light: '#F0F5FF',              dark: 'rgba(37,88,193,0.2)',   lightRef: 'blue/25',   desc: 'Info backgrounds.' },
    { name: 'critical-strong', light: '#C93232',              dark: '#FF7A7A',               lightRef: 'red/500',   darkRef: 'red/300',   desc: 'Error and critical text, icons, and borders.' },
    { name: 'critical-medium', light: '#FF7A7A',              dark: '#C93232',               lightRef: 'red/300',   darkRef: 'red/500',   desc: 'Moderate critical color.' },
    { name: 'critical-subtle', light: '#FFF0F0',              dark: 'rgba(227,69,69,0.12)',  lightRef: 'red/25',    desc: 'Error backgrounds.' },
    { name: 'warning-strong',  light: '#906A00',              dark: '#F9CF46',               lightRef: 'yellow/500',darkRef: 'yellow/300',desc: 'Warning text, icons, and borders.' },
    { name: 'warning-medium',  light: '#F9CF46',              dark: '#906A00',               lightRef: 'yellow/300',darkRef: 'yellow/500',desc: 'Moderate warning color.' },
    { name: 'warning-subtle',  light: '#FFFAE0',              dark: 'rgba(142,104,0,0.2)',   lightRef: 'yellow/25', desc: 'Warning backgrounds.' },
  ]},
  // Each accent color now carries four tokens instead of two ("soft"/"strong"
  // bg-only) — a subtle pairing (tinted bg + matching readable text) and a
  // strong pairing (solid, saturated bg + matching light text), each with its
  // own bg/fg half so both sides always land pre-paired for contrast.
  { title: 'Accent', prefix: 'accent/', tokens: [
    { name: 'slate-subtle-bg',  light: '#F3F5F7', dark: '#414950',  lightRef: 'slate/50',  darkRef: 'slate/700', desc: 'A subtle slate background paired with a matching subtle-fg token.' },
    { name: 'slate-subtle-fg',  light: '#66717F', dark: '#D0D6DC',  lightRef: 'slate/500', darkRef: 'slate/200', desc: 'A slate foreground paired with a matching subtle-bg token.' },
    { name: 'slate-strong-bg',  light: '#66717F', dark: '#ACB7C3',  lightRef: 'slate/500', darkRef: 'slate/300', desc: 'A strong slate background paired with a matching subtle-fg token.' },
    { name: 'slate-strong-fg',  light: '#FBFCFE', dark: '#323740',  lightRef: 'slate/25',  darkRef: 'slate/800', desc: 'A slate foreground paired with a matching subtle-bg token.' },
    { name: 'red-subtle-bg',    light: '#FFEBEB', dark: '#8A1F1F',  lightRef: 'red/50',    darkRef: 'red/700',   desc: 'A subtle red background paired with a matching red-subtle-fg token.' },
    { name: 'red-subtle-fg',    light: '#C93232', dark: '#FFB8B8',  lightRef: 'red/500',   darkRef: 'red/200',   desc: 'A red foreground paired with a matching red-subtle-bg token.' },
    { name: 'red-strong-bg',    light: '#C93232', dark: '#FF7A7A',  lightRef: 'red/500',   darkRef: 'red/300',   desc: 'A strong red background paired with a matching red-subtle-fg token.' },
    { name: 'red-strong-fg',    light: '#FFF0F0', dark: '#430F0F',  lightRef: 'red/25',    darkRef: 'red/900',   desc: 'A red foreground paired with a matching red-subtle-bg token.' },
    { name: 'orange-subtle-bg', light: '#FFECDB', dark: '#63360D',  lightRef: 'orange/50',  darkRef: 'orange/700', desc: 'A subtle orange background paired with a matching subtle-fg token.' },
    { name: 'orange-subtle-fg', light: '#AE5300', dark: '#F9A45A',  lightRef: 'orange/500', darkRef: 'orange/300', desc: 'A orange foreground paired with a matching subtle-bg token.' },
    { name: 'orange-strong-bg', light: '#F9A45A', dark: '#F9A45A',  lightRef: 'orange/300', darkRef: 'orange/300', desc: 'A strong orange background paired with a matching subtle-fg token.' },
    { name: 'orange-strong-fg', light: '#4F2C0D', dark: '#4F2C0D',  lightRef: 'orange/800', darkRef: 'orange/800', desc: 'A orange foreground paired with a matching subtle-bg token.' },
    { name: 'yellow-subtle-bg', light: '#FFF7C7', dark: '#513D15',  lightRef: 'yellow/50',  darkRef: 'yellow/700', desc: 'A subtle yellow background paired with a matching subtle-fg token.' },
    { name: 'yellow-subtle-fg', light: '#906A00', dark: '#F9CF46',  lightRef: 'yellow/500', darkRef: 'yellow/300', desc: 'A yellow foreground paired with a matching subtle-bg token.' },
    { name: 'yellow-strong-bg', light: '#F9CF46', dark: '#F9CF46',  lightRef: 'yellow/300', darkRef: 'yellow/300', desc: 'A strong yellow background paired with a matching subtle-fg token.' },
    { name: 'yellow-strong-fg', light: '#674B13', dark: '#3D3014',  lightRef: 'yellow/600', darkRef: 'yellow/800', desc: 'A yellow foreground paired with a matching subtle-bg token.' },
    { name: 'lime-subtle-bg',   light: '#EEFBD0', dark: '#3A5413',  lightRef: 'lime/50',   darkRef: 'lime/700',  desc: 'A subtle lime background paired with a matching subtle-fg token.' },
    { name: 'lime-subtle-fg',   light: '#507C07', dark: '#A6D349',  lightRef: 'lime/500',  darkRef: 'lime/300',  desc: 'A lime foreground paired with a matching subtle-bg token.' },
    { name: 'lime-strong-bg',   light: '#A6D349', dark: '#A6D349',  lightRef: 'lime/300',  darkRef: 'lime/300',  desc: 'A strong lime background paired with a matching subtle-fg token.' },
    { name: 'lime-strong-fg',   light: '#2E430F', dark: '#2E430F',  lightRef: 'lime/800',  darkRef: 'lime/800',  desc: 'A lime foreground paired with a matching subtle-bg token.' },
    { name: 'green-subtle-bg',  light: '#DEF7E1', dark: '#1B4C22',  lightRef: 'green/50',  darkRef: 'green/700', desc: 'A subtle green background paired with a matching subtle-fg token.' },
    { name: 'green-subtle-fg',  light: '#197E26', dark: '#73CD7F',  lightRef: 'green/500', darkRef: 'green/300', desc: 'A green foreground paired with a matching subtle-bg token.' },
    { name: 'green-strong-bg',  light: '#197E26', dark: '#73CD7F',  lightRef: 'green/500', darkRef: 'green/300', desc: 'A strong green background paired with a matching subtle-fg token.' },
    { name: 'green-strong-fg',  light: '#EBFAED', dark: '#153C1B',  lightRef: 'green/25',  darkRef: 'green/800', desc: 'A green foreground paired with a matching subtle-bg token.' },
    { name: 'teal-subtle-bg',   light: '#D8F1F3', dark: '#194D52',  lightRef: 'teal/50',   darkRef: 'teal/700',  desc: 'A subtle teal background paired with a matching subtle-fg token.' },
    { name: 'teal-subtle-fg',   light: '#057680', dark: '#65C5CD',  lightRef: 'teal/500',  darkRef: 'teal/300',  desc: 'A teal foreground paired with a matching subtle-bg token.' },
    { name: 'teal-strong-bg',   light: '#65C5CD', dark: '#65C5CD',  lightRef: 'teal/300',  darkRef: 'teal/300',  desc: 'A strong teal background paired with a matching subtle-fg token.' },
    { name: 'teal-strong-fg',   light: '#173B3F', dark: '#173B3F',  lightRef: 'teal/800',  darkRef: 'teal/800',  desc: 'A teal foreground paired with a matching subtle-bg token.' },
    { name: 'blue-subtle-bg',   light: '#E5EEFF', dark: '#1F3B75',  lightRef: 'blue/50',   darkRef: 'blue/700',  desc: 'A subtle blue background paired with a matching subtle-fg token.' },
    { name: 'blue-subtle-fg',   light: '#3163C9', dark: '#B9CEF8',  lightRef: 'blue/500',  darkRef: 'blue/200',  desc: 'A blue foreground paired with a matching subtle-bg token.' },
    { name: 'blue-strong-bg',   light: '#3163C9', dark: '#789FED',  lightRef: 'blue/500',  darkRef: 'blue/300',  desc: 'A strong blue background paired with a matching subtle-fg token.' },
    { name: 'blue-strong-fg',   light: '#F0F5FF', dark: '#192E57',  lightRef: 'blue/25',   darkRef: 'blue/800',  desc: 'A blue foreground paired with a matching subtle-bg token.' },
    { name: 'purple-subtle-bg', light: '#EFEBFF', dark: '#42308D',  lightRef: 'purple/50',  darkRef: 'purple/700', desc: 'A subtle purple background paired with a matching subtle-fg token.' },
    { name: 'purple-subtle-fg', light: '#6E56CC', dark: '#D1C9F2',  lightRef: 'purple/500', darkRef: 'purple/200', desc: 'A purple foreground paired with a matching subtle-bg token.' },
    { name: 'purple-strong-bg', light: '#6E56CC', dark: '#AD9FE9',  lightRef: 'purple/500', darkRef: 'purple/300', desc: 'A strong purple background paired with a matching subtle-fg token.' },
    { name: 'purple-strong-fg', light: '#F7F5FF', dark: '#31265F',  lightRef: 'purple/25',  darkRef: 'purple/800', desc: 'A purple foreground paired with a matching subtle-bg token.' },
    { name: 'pink-subtle-bg',   light: '#FFEBF8', dark: '#702055',  lightRef: 'pink/50',   darkRef: 'pink/700',  desc: 'A subtle pink background paired with a matching subtle-fg token.' },
    { name: 'pink-subtle-fg',   light: '#BF2D8D', dark: '#EE9DD3',  lightRef: 'pink/500',  darkRef: 'pink/300',  desc: 'A pink foreground paired with a matching subtle-bg token.' },
    { name: 'pink-strong-bg',   light: '#EE9DD3', dark: '#EE9DD3',  lightRef: 'pink/300',  darkRef: 'pink/300',  desc: 'A strong pink background paired with a matching subtle-fg token.' },
    { name: 'pink-strong-fg',   light: '#702055', dark: '#4F173C',  lightRef: 'pink/700',  darkRef: 'pink/800',  desc: 'A pink foreground paired with a matching subtle-bg token.' },
  ]},
  { title: 'Interactive States', prefix: 'state/', tokens: [
    { name: 'bg/hover-opacity',           light: 'rgba(0,0,0,0.04)',    dark: 'rgba(255,255,255,0.06)',  desc: '' },
    { name: 'bg/pressed-opacity',         light: 'rgba(0,0,0,0.08)',    dark: 'rgba(255,255,255,0.12)',  desc: '' },
    { name: 'bg/hover-secondary',         light: '#FBFCFE',             dark: 'rgba(255,255,255,0.1)',   lightRef: 'slate/25',  desc: '' },
    { name: 'bg/pressed-secondary',       light: '#F3F5F7',             dark: 'rgba(255,255,255,0.16)',  lightRef: 'slate/50',  desc: '' },
    { name: 'bg/hover-active-subtle',     light: '#E3EEFC',             dark: 'rgba(72,150,236,0.18)',   lightRef: 'brand/100', desc: '' },
    { name: 'bg/pressed-active-subtle',   light: '#D3E6FD',             dark: 'rgba(72,150,236,0.24)',   lightRef: 'brand/200', desc: '' },
    { name: 'bg/hover-active-strong',     light: '#185BA4',             dark: '#A7D0FE',                 lightRef: 'brand/600', darkRef: 'brand/300', desc: '' },
    { name: 'bg/pressed-active-strong',   light: '#164479',             dark: '#D3E6FD',                 lightRef: 'brand/700', darkRef: 'brand/200', desc: '' },
    { name: 'bg/hover-primary',           light: '#185BA4',             dark: '#185BA4',                 lightRef: 'brand/600', darkRef: 'brand/600', desc: '' },
    { name: 'bg/pressed-primary',         light: '#164479',             dark: '#164479',                 lightRef: 'brand/700', darkRef: 'brand/700', desc: '' },
    { name: 'bg/hover-critical-strong',   light: '#A32424',             dark: '#A32424',                 lightRef: 'red/600',   darkRef: 'red/600',   desc: '' },
    { name: 'bg/pressed-critical-strong', light: '#8A1F1F',             dark: '#8A1F1F',                 lightRef: 'red/700',   darkRef: 'red/700',   desc: '' },
    { name: 'bg/hover-critical-subtle',   light: '#FFEBEB',             dark: 'rgba(227,69,69,0.18)',    lightRef: 'red/50',    desc: '' },
    { name: 'bg/pressed-critical-subtle', light: '#FFE0E0',             dark: 'rgba(227,69,69,0.24)',    lightRef: 'red/100',   desc: '' },
    { name: 'border/hover-neutral',       light: 'rgba(0,0,0,0.8)',     dark: 'rgba(255,255,255,0.8)',   desc: '' },
  ]},
];

export const SIZE_SECTIONS = [
  { title: 'Spacing', prefix: 'lyra/spacing/', tokens: [
    {n:'0',v:0},{n:'05',v:2},{n:'1',v:4},{n:'2',v:8},{n:'3',v:12},{n:'4',v:16},
    {n:'5',v:20},{n:'6',v:24},{n:'7',v:28},{n:'8',v:32},{n:'9',v:36},{n:'10',v:40},
  ]},
  { title: 'Border Radius', prefix: 'lyra/radius/', tokens: [
    {n:'none',v:0},{n:'xs',v:4},{n:'sm',v:6},{n:'md',v:8},{n:'lg',v:12},{n:'xl',v:16},{n:'round',v:999},
  ]},
  { title: 'Border Width', prefix: 'lyra/border/', tokens: [
    {n:'none',v:0},{n:'default',v:1},{n:'md',v:2},{n:'lg',v:4},
  ]},
  { title: 'Control Height', prefix: 'lyra/control-height/', tokens: [
    {n:'2xs',v:16},{n:'xs',v:20},{n:'sm',v:24},{n:'md',v:32},{n:'lg',v:36},{n:'xl',v:40},
  ]},
  { title: 'Icon Size', prefix: 'lyra/icon-size/', tokens: [
    {n:'xs',v:12},{n:'sm',v:16},{n:'md',v:20},{n:'lg',v:24},
  ]},
  { title: 'Row Height', prefix: 'lyra/row-height/', tokens: [
    {n:'sm',v:32},{n:'md',v:36},{n:'lg',v:40},{n:'xl',v:48},{n:'2xl',v:56},
  ]},
];

export const SHADOWS = [
  { name: 'lyra/shadow/xl',   value: '0px 20px 40px rgba(0, 0, 0, 0.12)', desc: 'Large modals, full-page drawers, or floating panels that dominate the viewport.' },
  { name: 'lyra/shadow/lg',   value: '0px 12px 24px rgba(0, 0, 0, 0.08)', desc: 'Dialogs, side panels, and dropdown menus with significant elevation.' },
  { name: 'lyra/shadow/md',   value: '0px 4px 12px rgba(0, 0, 0, 0.06)',  desc: 'Cards, popovers, and tooltips that sit above the page surface.' },
  { name: 'lyra/shadow/sm',   value: '0px 2px 6px rgba(0, 0, 0, 0.04)',   desc: 'Subtle lift for interactive cards, chips, and inline controls.' },
  { name: 'lyra/shadow/none', value: 'none',                               desc: 'No shadow. Use to explicitly remove elevation from an element.' },
];
