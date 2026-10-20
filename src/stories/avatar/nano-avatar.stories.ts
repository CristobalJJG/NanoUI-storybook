import { moduleMetadata, type Meta, type StoryObj } from '@storybook/angular-vite';
import { NanoAvatarComponent } from '@nanojjg/nano-ui-components';

const meta: Meta<NanoAvatarComponent> = {
  title: 'Components/Avatar',
  component: NanoAvatarComponent,
  decorators: [moduleMetadata({ imports: [NanoAvatarComponent] })],
  tags: ['autodocs'],
  args: {
    name: 'María López',
    src: '',
    size: 'md',
    status: '',
  },
  argTypes: {
    name: { control: 'text' },
    src: { control: 'text' },
    size: { control: 'select', options: ['sm', 'md', 'lg', 'xl'] },
    status: { control: 'select', options: ['', 'online', 'away', 'offline'] },
  },
};

export default meta;
type Story = StoryObj<NanoAvatarComponent>;

export const Playground: Story = {};

export const Sizes: Story = {
  render: () => ({
    template: `
      <div style="display:flex;align-items:center;gap:14px">
        <nano-avatar name="Alex Chen" size="sm"></nano-avatar>
        <nano-avatar name="María López" size="md"></nano-avatar>
        <nano-avatar name="Sam Rivera" size="lg"></nano-avatar>
        <nano-avatar name="Nano Design" size="xl"></nano-avatar>
      </div>
    `,
  }),
};

export const Presence: Story = {
  render: () => ({
    template: `
      <div style="display:flex;align-items:center;gap:14px">
        <nano-avatar name="Online User" status="online"></nano-avatar>
        <nano-avatar name="Away User" status="away"></nano-avatar>
        <nano-avatar name="Offline User" status="offline"></nano-avatar>
        <nano-avatar name="No Status"></nano-avatar>
      </div>
    `,
  }),
};
