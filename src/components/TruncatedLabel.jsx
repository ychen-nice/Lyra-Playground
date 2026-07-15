import { useState, useRef } from 'react';
import Tooltip from './Tooltip';

// A single-line, ellipsis-truncating label that shows a tooltip with the full text —
// but only when the text is actually clipped. Truncation can't be known ahead of time
// (it depends on the rendered width at the moment), so it's measured lazily on hover
// (scrollWidth > clientWidth) rather than tracked continuously.
export default function TruncatedLabel({ children, className, style, side = 'right' }) {
  const [hovered, setHovered] = useState(false);
  const [isTruncated, setIsTruncated] = useState(false);
  const ref = useRef(null);

  const handleMouseEnter = () => {
    setHovered(true);
    const el = ref.current;
    if (el) setIsTruncated(el.scrollWidth > el.clientWidth);
  };

  return (
    <span
      ref={ref}
      className={className}
      style={{ overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap', ...style }}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={() => setHovered(false)}
    >
      {children}
      {hovered && isTruncated && <Tooltip label={children} anchorRef={ref} side={side} />}
    </span>
  );
}
