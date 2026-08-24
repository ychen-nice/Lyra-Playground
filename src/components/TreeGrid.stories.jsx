import { useState } from 'react';
import { Folder, FileText, Database, Users, Settings } from 'lucide-react';
import TreeGrid from './TreeGrid';
import '../styles/typography.css';

const iconProps = { size: 14 };

const SAMPLE_DATA = [
  {
    id: 'reporting', label: 'Reporting', info: '12 items', icon: <Folder {...iconProps} />,
    children: [
      { id: 'reporting-qbr', label: 'Quarterly Business Review.pptx', info: 'Edited 2d ago', icon: <FileText {...iconProps} /> },
      { id: 'reporting-csat', label: 'CSAT Trends.xlsx', info: 'Edited 5d ago', icon: <FileText {...iconProps} /> },
      {
        id: 'reporting-dashboards', label: 'Dashboards', info: '3 items', icon: <Folder {...iconProps} />,
        children: [
          { id: 'reporting-dashboards-overview', label: 'Overview', info: 'Live', icon: <Database {...iconProps} /> },
          { id: 'reporting-dashboards-sla', label: 'SLA Tracker', info: 'Live', icon: <Database {...iconProps} /> },
          { id: 'reporting-dashboards-anomaly', label: 'Anomaly Log', info: 'Draft', icon: <Database {...iconProps} /> },
        ],
      },
    ],
  },
  {
    id: 'people', label: 'People', info: '2 items', icon: <Folder {...iconProps} />,
    children: [
      { id: 'people-roster', label: 'Agent Roster.csv', info: 'Edited 1w ago', icon: <Users {...iconProps} /> },
      { id: 'people-staffing', label: 'Staffing Forecast.xlsx', info: 'Edited 3d ago', icon: <FileText {...iconProps} /> },
    ],
  },
  { id: 'settings', label: 'Workspace Settings', info: 'Updated today', icon: <Settings {...iconProps} /> },
];

export default {
  title: 'Content Panel/Tree Grid',
  component: TreeGrid,
  parameters: { layout: 'padded' },
  argTypes: {
    selectionMode: {
      control: 'radio',
      options: ['none', 'single', 'multiple'],
      description: 'Row selection mode — checkboxes appear in the hierarchy column',
    },
    showIcons:      { control: 'boolean', description: 'Show/hide the per-item icon' },
    showInfoColumn: { control: 'boolean', description: 'Show/hide the second (info) column' },
    hierarchyHeader: { control: 'text', description: 'Header label for the hierarchy column' },
    infoHeader:      { control: 'text', description: 'Header label for the info column' },
    defaultExpandAll: { control: 'boolean', description: 'Whether all branches start expanded' },
    height:          { control: 'number', description: 'Grid height in px' },
    selectableParent: {
      control: 'boolean',
      name: 'Selectable Parent',
      description: 'Whether folders (not just leaves) can be picked — in single-select a non-selectable folder just expands/collapses on click; in multi-select it also loses its checkbox',
    },
    showMenuColumn:  { control: 'boolean', description: 'Show/hide the third (row menu) column' },
    showSearch:      { control: 'boolean', description: 'Show a "contains" search field above the tree' },
    searchPlaceholder: { control: 'text', description: 'Placeholder text for the search field' },
    data:            { control: false, table: { disable: true } },
    selectedIds:     { control: false, table: { disable: true } },
    onSelectionChange: { control: false, table: { disable: true } },
    onMenuAction:    { control: false, table: { disable: true } },
    // Driven by the toolbar's global "Direction" toggle (see decorators
    // below) rather than a per-story control.
    rtl:             { control: false, table: { disable: true } },
  },
  args: {
    selectionMode:    'multiple',
    showIcons:        true,
    showInfoColumn:   true,
    hierarchyHeader:  'Name',
    infoHeader:       'Info',
    defaultExpandAll: true,
    height:           360,
    selectableParent: true,
    showMenuColumn:   false,
    showSearch:       false,
    searchPlaceholder: 'Search',
  },
  decorators: [
    (Story, context) => {
      context.args.rtl = context.globals.direction === 'rtl';
      return <Story />;
    },
  ],
};

export const Default = {
  name: 'Default',
  render: (args) => <TreeGrid {...args} data={SAMPLE_DATA} />,
};

export const SingleSelect = {
  name: 'Single Select',
  render: (args) => <TreeGrid {...args} data={SAMPLE_DATA} />,
  args: { selectionMode: 'single' },
};

export const SingleSelectLeavesOnly = {
  name: 'Single Select — Leaves Only',
  render: (args) => <TreeGrid {...args} data={SAMPLE_DATA} />,
  args: { selectionMode: 'single', selectableParent: false },
};

export const MultiSelectLeavesOnly = {
  name: 'Multi Select — Leaves Only',
  render: (args) => <TreeGrid {...args} data={SAMPLE_DATA} />,
  args: { selectionMode: 'multiple', selectableParent: false },
};

export const NoSelection = {
  name: 'No Selection',
  render: (args) => <TreeGrid {...args} data={SAMPLE_DATA} />,
  args: { selectionMode: 'none' },
};

export const NoIcons = {
  name: 'No Icons',
  render: (args) => <TreeGrid {...args} data={SAMPLE_DATA} />,
  args: { showIcons: false },
};

export const HierarchyOnly = {
  name: 'Hierarchy Column Only',
  render: (args) => <TreeGrid {...args} data={SAMPLE_DATA} />,
  args: { showInfoColumn: false },
};

export const WithSearch = {
  name: 'With Search',
  render: (args) => <TreeGrid {...args} data={SAMPLE_DATA} />,
  args: { showSearch: true },
};

export const WithMenuColumn = {
  name: 'With Menu Column',
  render: (args) => (
    <TreeGrid {...args} data={SAMPLE_DATA} onMenuAction={(action, row) => alert(`${action}: ${row.label}`)} />
  ),
  args: { showMenuColumn: true },
};

function Field({ label, children }) {
  return (
    <label style={{ display: 'flex', flexDirection: 'column', gap: 'var(--lyra-spacing-1)' }}>
      <span className="lyra-body-sm-em" style={{ color: 'var(--lyra-color-fg-secondary)' }}>{label}</span>
      {children}
    </label>
  );
}

function CheckboxField({ label, checked, onChange }) {
  return (
    <label style={{ display: 'flex', alignItems: 'center', gap: 'var(--lyra-spacing-2)', cursor: 'pointer' }}>
      <input type="checkbox" checked={checked} onChange={(e) => onChange(e.target.checked)} />
      <span className="lyra-body-md">{label}</span>
    </label>
  );
}

const SELECT_STYLE = {
  height: 'var(--lyra-control-height-md)',
  padding: '0 var(--lyra-spacing-2)',
  borderRadius: 'var(--lyra-radius-md)',
  border: '1px solid var(--lyra-color-border-soft)',
  background: 'var(--lyra-color-bg-field)',
  color: 'var(--lyra-color-fg-default)',
  fontFamily: 'Inter, sans-serif',
  fontSize: '0.875rem',
};

function TreeGridDemo() {
  const [selectionMode, setSelectionMode] = useState('multiple');
  const [showIcons, setShowIcons] = useState(true);
  const [showInfoColumn, setShowInfoColumn] = useState(true);
  const [showMenuColumn, setShowMenuColumn] = useState(false);
  const [selectableParent, setSelectableParent] = useState(true);
  const [showSearch, setShowSearch] = useState(false);
  const [rtl, setRtl] = useState(false);

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 'var(--lyra-spacing-4)' }}>
      <div style={{
        display: 'flex', flexWrap: 'wrap', alignItems: 'flex-end', gap: 'var(--lyra-spacing-6)',
        padding: 'var(--lyra-spacing-4)', borderRadius: 'var(--lyra-radius-md)',
        border: '1px solid var(--lyra-color-border-subtle)', background: 'var(--lyra-color-bg-surface-container-subtle)',
      }}>
        <Field label="Selection Mode">
          <select style={SELECT_STYLE} value={selectionMode} onChange={(e) => setSelectionMode(e.target.value)}>
            <option value="none">None</option>
            <option value="single">Single</option>
            <option value="multiple">Multiple</option>
          </select>
        </Field>
        <CheckboxField label="Show Icons" checked={showIcons} onChange={setShowIcons} />
        <CheckboxField label="Show Info Column" checked={showInfoColumn} onChange={setShowInfoColumn} />
        <CheckboxField label="Show Menu Column" checked={showMenuColumn} onChange={setShowMenuColumn} />
        <CheckboxField label="Selectable Parent" checked={selectableParent} onChange={setSelectableParent} />
        <CheckboxField label="Show Search" checked={showSearch} onChange={setShowSearch} />
        <CheckboxField label="Right to Left" checked={rtl} onChange={setRtl} />
      </div>
      <TreeGrid
        // Remounts (fresh expand/selection/search state) whenever selection
        // mode changes, or search is switched off — turning search off
        // should show every row again, not leave a stale filter applied
        // underneath the now-hidden search field.
        key={`${selectionMode}-${showSearch}-${rtl}`}
        data={SAMPLE_DATA}
        selectionMode={selectionMode}
        showIcons={showIcons}
        showInfoColumn={showInfoColumn}
        showMenuColumn={showMenuColumn}
        selectableParent={selectableParent}
        showSearch={showSearch}
        rtl={rtl}
        onMenuAction={(action, row) => alert(`${action}: ${row.label}`)}
      />
    </div>
  );
}

export const InteractiveDemo = {
  name: 'Interactive Demo',
  parameters: { controls: { disable: true } },
  render: () => <TreeGridDemo />,
};
