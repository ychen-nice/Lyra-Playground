import Grid from './Grid';
import Button from './Button';
import { LinkCellRenderer } from './BaseGrid';

export default {
  title: 'Components/Grid',
  component: Grid,
  parameters: { layout: 'padded' },
};

const columnDefs = [
  { field: 'name', headerName: 'Name', cellRenderer: LinkCellRenderer, flex: 1 },
  { field: 'status', headerName: 'Status', flex: 1 },
  { field: 'owner', headerName: 'Owner', flex: 1 },
];

const rowData = Array.from({ length: 240 }, (_, i) => ({
  name: `Item ${i + 1}`,
  status: ['Active', 'Pending', 'Closed'][i % 3],
  owner: ['Alex', 'Jordan', 'Sam'][i % 3],
}));

export const Default = {
  render: () => (
    <div style={{ width: 700, height: 500 }}>
      <Grid
        title="Items"
        actionsSlot={<Button variant="ghost" size="md">Action</Button>}
        columnDefs={columnDefs}
        rowData={rowData}
        pageSize={20}
      />
    </div>
  ),
};

export const Frameless = {
  render: () => (
    <div style={{ width: 700, height: 500 }}>
      <Grid
        title="Items"
        showFrame={false}
        actionsSlot={<Button variant="ghost" size="md">Action</Button>}
        columnDefs={columnDefs}
        rowData={rowData}
        pageSize={20}
      />
    </div>
  ),
};
