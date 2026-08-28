import Panel from './Panel';
import BaseGrid from './BaseGrid';

// A Panel with a BaseGrid filling its content area — the standard way a data
// table shows up inside the app shell (toolbar title + actions above, grid +
// its own pagination footer below).
export default function Grid({
  title,
  actionsSlot,
  showFrame = true,
  showToolbar = true,
  columnDefs,
  rowData,
  showPagination = true,
  pageSize = 100,
  ...baseGridProps
}) {
  return (
    <Panel title={title} actionsSlot={actionsSlot} showFrame={showFrame} showToolbar={showToolbar}>
      <BaseGrid
        columnDefs={columnDefs}
        rowData={rowData}
        showPagination={showPagination}
        pageSize={pageSize}
        height="100%"
        {...baseGridProps}
      />
    </Panel>
  );
}
