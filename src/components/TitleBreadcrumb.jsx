// Figma node: 17643:45205  "Page Header" — breadcrumb + title block
//
// Extracts the left title slot from PageHeader into a reusable component so it
// can be placed in the header, a sidebar, or any other context.
//
// Layout (same row, matches PageHeader exactly):
//   [breadcrumb levels /]  [Title]  [optional badge]
//
// Responsive breadcrumb logic is delegated to BreadcrumbBar. This component
// observes its own container width and the title's natural width, then passes
// the remaining space to BreadcrumbBar — the same arithmetic PageHeader uses,
// but encapsulated here so no parent measurement is needed.

import { useState, useRef, useLayoutEffect } from 'react';
import { flushSync } from 'react-dom';
import '../styles/breadcrumb.css';
import '../styles/typography.css';
import BreadcrumbBar from './BreadcrumbBar';

const GAP2 = 8; // --lyra-spacing-2 gap between breadcrumb and title

export default function Breadcrumb({
  // Breadcrumb trail — parent levels above the current page
  levels           = [],           // Array<{ label: string, type: 'label'|'link', href?: string }>
  // Current page title
  title            = 'Page Title',
  // Status badge
  showStatusBadge  = false,
  statusBadgeLabel = 'Active',
  // Layout: 'inline' (breadcrumb and title share one row) | 'stacked' (breadcrumb above title)
  layout           = 'inline',
  // In stacked mode: element rendered at the start of the breadcrumb row (e.g. a sidenav trigger)
  sidenavSlot      = null,
  // Escape hatch: override breadcrumb rendering entirely (e.g. pass a custom BreadcrumbBar)
  breadcrumbSlot,
  // When provided by a parent (e.g. PageHeader), skip self-measurement and use this directly.
  // Eliminates the second render cycle caused by the container ResizeObserver firing after the
  // parent sets an explicit width on the wrapper.
  bcAvailWidth: externalBcAvailWidth,
}) {
  const containerRef = useRef(null);
  const titleRef     = useRef(null);
  const [containerW, setContainerW] = useState(null);
  const [titleW, setTitleW]         = useState(0);

  const isExternal = externalBcAvailWidth != null;

  // Self-measure container — skipped when parent provides bcAvailWidth
  useLayoutEffect(() => {
    if (isExternal) return;
    const el = containerRef.current;
    if (!el) return;
    const ro = new ResizeObserver(entries => flushSync(() => setContainerW(entries[0].contentRect.width)));
    ro.observe(el);
    setContainerW(el.getBoundingClientRect().width);
    return () => ro.disconnect();
  }, [isExternal]);

  // Self-measure title — skipped when parent provides bcAvailWidth
  useLayoutEffect(() => {
    if (isExternal) return;
    const el = titleRef.current;
    if (!el) return;
    const ro = new ResizeObserver(() => flushSync(() => setTitleW(el.getBoundingClientRect().width)));
    ro.observe(el);
    setTitleW(el.getBoundingClientRect().width);
    return () => ro.disconnect();
  }, [isExternal]);

  const hasLevels    = levels.length > 0;
  const bcAvailWidth = isExternal
    ? externalBcAvailWidth
    : (containerW != null
      ? layout === 'stacked'
        ? Math.max(0, containerW)
        : Math.max(0, containerW - titleW - (hasLevels ? GAP2 : 0))
      : null);

  const bcLevels = levels.map(l => l.label);
  const bcItems  = levels.map(l => ({ type: l.type, href: l.href }));

  const titleBlock = (
    <div
      ref={titleRef}
      style={{ display: 'flex', flexWrap: 'wrap', gap: '8px 16px', alignItems: 'center', flexShrink: 0 }}
    >
      <span className="lyra-heading-lg" style={{
        color:        'var(--lyra-color-fg-default)',
        whiteSpace:   'nowrap',
        overflow:     'hidden',
        textOverflow: 'ellipsis',
      }}>
        {title}
      </span>

      {showStatusBadge && (
        <div style={{
          display:      'flex',
          alignItems:   'center',
          height:       24,
          padding:      '0 var(--lyra-spacing-2)',
          borderRadius: 'var(--lyra-radius-md)',
          background:   'var(--lyra-color-accent-green-soft)',
          flexShrink:   0,
        }}>
          <span className="lyra-body-md-em" style={{
            color:        'var(--lyra-color-accent-green-strong)',
            whiteSpace:   'nowrap',
            overflow:     'hidden',
            textOverflow: 'ellipsis',
            maxWidth:     176,
          }}>
            {statusBadgeLabel}
          </span>
        </div>
      )}
    </div>
  );

  const breadcrumbBlock = hasLevels && (
    <div style={{ flexShrink: 0 }}>
      {breadcrumbSlot || (
        <BreadcrumbBar
          levels={bcLevels}
          items={bcItems}
          availableWidth={bcAvailWidth}
          itemClassName={layout === 'stacked' ? 'lyra-body-md' : 'lyra-body-lg'}
        />
      )}
    </div>
  );

  if (layout === 'stacked') {
    return (
      <div
        ref={containerRef}
        style={{
          display:       'flex',
          flexDirection: 'column',
          alignItems:    'flex-start',
          gap:           0,
          width:         '100%',
          minWidth:      0,
        }}
      >
        {hasLevels && (
          <div style={{ height: '2rem', display: 'flex', alignItems: 'center', flexShrink: 0 }}>
            {breadcrumbSlot || (
              <BreadcrumbBar
                levels={bcLevels}
                items={bcItems}
                availableWidth={bcAvailWidth}
                itemClassName="lyra-body-md"
              />
            )}
          </div>
        )}
        {titleBlock}
      </div>
    );
  }

  return (
    <div
      ref={containerRef}
      style={{
        display:    'flex',
        gap:        'var(--lyra-spacing-2)',
        alignItems: 'center',
        height:     'var(--lyra-control-height-lg)',
        width:      '100%',
        minWidth:   0,
      }}
    >
      {breadcrumbBlock}
      {titleBlock}
    </div>
  );
}
