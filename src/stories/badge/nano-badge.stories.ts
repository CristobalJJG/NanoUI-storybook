import { moduleMetadata, type Meta, type StoryObj } from '@storybook/angular-vite';
import { NanoBadgeComponent } from '@nanojjg/nano-ui-components';

const meta: Meta<NanoBadgeComponent> = {
  title: 'Components/Badge',
  component: NanoBadgeComponent,
  decorators: [moduleMetadata({ imports: [NanoBadgeComponent] })],
  tags: ['autodocs'],
  args: {
    label: 'In progress',
    variant: 'primary',
    size: 'md',
    dot: false,
    pill: true,
  },
  argTypes: {
    label: { control: 'text' },
    variant: { control: 'select', options: ['neutral', 'primary', 'success', 'warning', 'danger', 'info'] },
    size: { control: 'select', options: ['sm', 'md'] },
    dot: { control: 'boolean' },
    pill: { control: 'boolean' },
  },
};

export default meta;
type Story = StoryObj<NanoBadgeComponent>;

export const Playground: Story = {};

export const Statuses: Story = {
  render: () => ({
    template: `
      <div style="display:flex;flex-wrap:wrap;align-items:center;gap:8px">
        <nano-badge variant="neutral" label="Draft"></nano-badge>
        <nano-badge variant="primary" label="In progress" dot></nano-badge>
        <nano-badge variant="success" label="Complete" dot></nano-badge>
        <nano-badge variant="warning" label="Needs review"></nano-badge>
        <nano-badge variant="danger" label="Blocked"></nano-badge>
        <nano-badge variant="info" label="New"></nano-badge>
      </div>
    `,
  }),
};

export const Sizes: Story = {
  render: () => ({
    template: `
      <div style="display:flex;align-items:center;gap:8px">
        <nano-badge size="sm" variant="primary" label="Small"></nano-badge>
        <nano-badge size="md" variant="primary" label="Medium"></nano-badge>
        <nano-badge size="md" variant="primary" label="Square" [pill]="false"></nano-badge>
      </div>
    `,
  }),
};
