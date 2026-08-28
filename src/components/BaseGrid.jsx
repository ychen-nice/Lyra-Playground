import { useCallback, useEffect, useRef, useState } from 'react';
import { ChevronLeft, ChevronRight, ChevronsLeft, ChevronsRight, ChevronUp, ChevronDown } from 'lucide-react';
import { ModuleRegistry, AllCommunityModule, themeQuartz } from 'ag-grid-community';
import { AgGridReact } from 'ag-grid-react';
import Button from './Button';
import '../styles/typography.css';
import '../styles/dataGrid.css';

ModuleRegistry.registerModules([AllCommunityModule]);

// Figma: https://www.figma.com/design/qyCq4jUOrpYcpHhpNCdgA5/Lyra-Foundations--V1-?node-id=17148-42867
// ag-grid's Theming API takes CSS values directly, so every param below points
// straight at a Lyra token rather than a literal color/size — same approach as
// TreeGrid's own themeQuartz.withParams usage.
const baseGridTheme = themeQuartz.withParams({
  backgroundColor:            'var(--lyra-color-bg-surface-base)',
  foregroundColor:            'var(--lyra-color-fg-default)',
  borderColor:                'var(--lyra-color-border-subtle)',
  wrapperBorder:              false,
  rowBorder:                  true,
  columnBorder:               false,
  headerRowBorder:            { color: 'var(--lyra-color-border-soft)', width: '1px' },
  fontFamily:                 'Inter, sans-serif',
  fontSize:                   '0.875rem', // matches lyra-body-md — body cells only; the header label uses HeaderLabel's own lyra-body-md-em class instead of these theme font params
  headerBackgroundColor:      'var(--lyra-color-bg-none)',
  rowHeight:                  'var(--lyra-row-height-lg)', // 40px
  headerHeight:               'var(--lyra-row-height-xl)', // 48px
  cellHorizontalPadding:      'var(--lyra-spacing-4)',
  rowHoverColor:              'var(--lyra-color-state-bg-hover-opacity)',
  selectedRowBackgroundColor: 'var(--lyra-color-bg-active-subtle)',
  accentColor:                'var(--lyra-color-bg-active-strong)',
});

// Renders the column header label with the actual lyra-body-md-em class
// rather than approximating it via separate Theming API font params (which
// take literal numbers/strings, not classes) — guarantees the header always
// matches the typography system exactly, byte for byte. Replacing ag-grid's
// default header rendering also replaces its built-in click-to-sort handling,
// so that's reimplemented here via params.progressSort/column.getSort, the
// same mechanism ag-grid's own default header component uses internally.
function HeaderLabel(params) {
  const [sort, setSort] = useState(params.column.getSort());

  useEffect(() => {
    const onSortChanged = () => setSort(params.column.getSort());
    params.column.addEventListener('sortChanged', onSortChanged);
    return () => params.column.removeEventListener('sortChanged', onSortChanged);
  }, [params.column]);

  const sortable = params.enableSorting;

  return (
    <span
      className="lyra-body-md-em"
      onClick={sortable ? (e) => params.progressSort(e.shiftKey) : undefined}
      style={{
        display: 'flex', alignItems: 'center', gap: 'var(--lyra-spacing-1)',
        color: 'var(--lyra-color-fg-default)',
        cursor: sortable ? 'pointer' : 'default',
        userSelect: 'none',
      }}
    >
      {params.displayName}
      {sort === 'asc' && <ChevronUp size={14} />}
      {sort === 'desc' && <ChevronDown size={14} />}
    </span>
  );
}

// Reusable "link" cell renderer for columns whose values should read as
// hyperlinks (per the design's Link Text cell variant) — pass as a column's
// `cellRenderer`.
export function LinkCellRenderer({ value }) {
  return (
    <span className="lyra-body-md lyra-grid-link-cell" style={{ color: 'var(--lyra-color-fg-link)', cursor: 'pointer' }}>
      {value}
    </span>
  );
}

// Bespoke pagination footer (per the design's _grid/pagination — first/prev/next/last
// ghost icon buttons, a page indicator, and a row-range summary) rather than ag-grid's
// own built-in pagination panel, to match the design exactly.
function PaginationBar({ page, pageCount, pageSize, rowCount, onPageChange }) {
  const from = rowCount === 0 ? 0 : page * pageSize + 1;
  const to = Math.min((page + 1) * pageSize, rowCount);
  return (
    <div style={{
      display: 'flex', alignItems: 'center', justifyContent: 'space-between',
      height: 'var(--lyra-row-height-xl)',
      padding: '0 var(--lyra-spacing-3)',
      borderTop: '1px solid var(--lyra-color-border-subtle)',
      boxSizing: 'border-box', flexShrink: 0,
    }}>
      <div style={{ display: 'flex', alignItems: 'center', gap: 'var(--lyra-spacing-2)' }}>
        <Button variant="ghost" size="sm" iconOnly aria-label="First page" disabled={page === 0} onClick={() => onPageChange(0)}>
          <ChevronsLeft size={16} />
        </Button>
        <Button variant="ghost" size="sm" iconOnly aria-label="Previous page" disabled={page === 0} onClick={() => onPageChange(page - 1)}>
          <ChevronLeft size={16} />
        </Button>
        <span className="lyra-body-md" style={{ color: 'var(--lyra-color-fg-default)' }}>
          Page {page + 1} of {Math.max(pageCount, 1)}
        </span>
        <Button variant="ghost" size="sm" iconOnly aria-label="Next page" disabled={page >= pageCount - 1} onClick={() => onPageChange(page + 1)}>
          <ChevronRight size={16} />
        </Button>
        <Button variant="ghost" size="sm" iconOnly aria-label="Last page" disabled={page >= pageCount - 1} onClick={() => onPageChange(pageCount - 1)}>
          <ChevronsRight size={16} />
        </Button>
      </div>
      <span className="lyra-body-md" style={{ color: 'var(--lyra-color-fg-default)' }}>
        {from}-{to} of {rowCount}
      </span>
    </div>
  );
}

export default function BaseGrid({
  columnDefs,
  rowData,
  showPagination = true,
  pageSize = 100,
  height = 400,
  ...gridProps
}) {
  const gridRef = useRef(null);
  const [paginationState, setPaginationState] = useState({ page: 0, pageCount: 0, rowCount: 0 });

  // ag-grid drives its own pagination state internally — this just mirrors it
  // into React state so the bespoke PaginationBar below can render it, rather
  // than the grid's own built-in (differently styled) pagination panel.
  const syncPaginationState = useCallback(() => {
    const api = gridRef.current?.api;
    if (!api) return;
    setPaginationState({
      page: api.paginationGetCurrentPage(),
      pageCount: api.paginationGetTotalPages(),
      rowCount: api.paginationGetRowCount(),
    });
  }, []);

  return (
    <div style={{ display: 'flex', flexDirection: 'column', height, width: '100%' }}>
      <div style={{ flex: '1 0 0', minHeight: 0 }}>
        <AgGridReact
          ref={gridRef}
          theme={baseGridTheme}
          columnDefs={columnDefs}
          rowData={rowData}
          pagination={showPagination}
          paginationPageSize={pageSize}
          suppressPaginationPanel
          defaultColDef={{ resizable: true, sortable: true, headerComponent: HeaderLabel }}
          onGridReady={syncPaginationState}
          onPaginationChanged={syncPaginationState}
          {...gridProps}
        />
      </div>
      {showPagination && (
        <PaginationBar
          page={paginationState.page}
          pageCount={paginationState.pageCount}
          pageSize={pageSize}
          rowCount={paginationState.rowCount}
          onPageChange={(page) => gridRef.current?.api.paginationGoToPage(page)}
        />
      )}
    </div>
  );
}
