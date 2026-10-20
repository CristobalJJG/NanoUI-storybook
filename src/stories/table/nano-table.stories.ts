import { moduleMetadata, type Meta, type StoryObj } from '@storybook/angular-vite';
import { NanoTableComponent } from '@nanojjg/nano-ui-components';

const meta: Meta<NanoTableComponent> = {
  title: 'Components/Table',
  component: NanoTableComponent,
  decorators: [moduleMetadata({ imports: [NanoTableComponent] })],
  tags: ['autodocs'],
  args: {
    columns: [
      { header: 'ID', key: 'id' },
      { header: 'Name', key: 'name' },
      { header: 'Status', key: 'status' },
      {
        header: 'Actions', key: 'actions', render: () => {
          const btn = document.createElement('button');
          btn.innerText = 'Edit';
          btn.className = 'btn-edit';
          return btn;
        }
      }
    ],
    data: [
      { id: 1, name: 'Item One', status: 'Active' },
      { id: 2, name: 'Item Two', status: 'Pending' },
      { id: 3, name: 'Item Three', status: 'Inactive' },
    ],
  },
};

export default meta;
type Story = StoryObj<NanoTableComponent>;

export const Default: Story = {};

export const WithActions: Story = {
  args: {
    columns: [
      { header: 'ID', key: 'id' },
      { header: 'Name', key: 'name' },
      {
        header: 'Actions', key: 'actions', render: () => {
          const btn = document.createElement('button');
          btn.innerText = 'Delete';
          btn.className = 'btn-delete';
          return btn;
        }
      }
    ],
    data: [
      { id: 1, name: 'Delete Me' },
      { id: 2, name: 'Keep Me' },
    ],
  },
};

export const WithSvg: Story = {
  args: {
    columns: [
      { header: 'ID', key: 'id' },
      {
        // The column renderer must return a string or an HTMLElement (see TableColumn),
        // so the icon is wrapped in a span instead of returning the SVG element itself.
        header: 'Icon', key: 'icon', render: () => {
          const icon = document.createElement('span');
          icon.className = 'icon';
          icon.innerHTML =
            '<svg viewBox="0 0 24 24" width="14" height="14"><circle cx="12" cy="12" r="10" fill="currentColor" /></svg>';
          return icon;
        }
      }
    ],
    data: [
      { id: 1, icon: 'circle' },
      { id: 2, icon: 'circle' },
    ],
  },
};
