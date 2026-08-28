import BaseGrid, { LinkCellRenderer } from './BaseGrid';

export default {
  title: 'Components/BaseGrid',
  component: BaseGrid,
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
    <BaseGrid columnDefs={columnDefs} rowData={rowData} pageSize={20} height={500} />
  ),
};

export const NoPagination = {
  name: 'No Pagination',
  render: () => (
    <BaseGrid columnDefs={columnDefs} rowData={rowData.slice(0, 8)} showPagination={false} height={400} />
  ),
};
