import { moduleMetadata, type Meta, type StoryObj } from '@storybook/angular-vite';
import { NanoButtonComponent } from '@nanojjg/nano-ui-components';

const meta: Meta<NanoButtonComponent> = {
  title: 'Components/Button',
  component: NanoButtonComponent,
  decorators: [moduleMetadata({ imports: [NanoButtonComponent] })],
  tags: ['autodocs'],
  args: {
    label: 'Guardar cambios',
    variant: 'primary',
    size: 'md',
    disabled: false,
    fullWidth: false,
  },
  argTypes: {
    fullWidthHostClass: { table: { disable: true } },
    variant: { control: 'select', options: ['primary', 'secondary', 'outline', 'ghost', 'danger'] },
    size: { control: 'select', options: ['sm', 'md', 'lg'] },
    type: { control: 'select', options: ['button', 'submit', 'reset'] },
    label: { control: 'text' },
    disabled: { control: 'boolean' },
    fullWidth: { control: 'boolean' },
  },
};

export default meta;
type Story = StoryObj<NanoButtonComponent>;

export const Playground: Story = {};

export const Variants: Story = {
  render: () => ({
    template: `
      <div style="display:flex;flex-wrap:wrap;align-items:center;gap:10px">
        <nano-button variant="primary" label="Primary"></nano-button>
        <nano-button variant="secondary" label="Secondary"></nano-button>
        <nano-button variant="outline" label="Outline"></nano-button>
        <nano-button variant="ghost" label="Ghost"></nano-button>
        <nano-button variant="danger" label="Danger"></nano-button>
      </div>
    `,
  }),
};

export const Sizes: Story = {
  render: () => ({
    template: `
      <div style="display:flex;align-items:center;gap:10px">
        <nano-button size="sm" label="Small"></nano-button>
        <nano-button size="md" label="Medium"></nano-button>
        <nano-button size="lg" label="Large"></nano-button>
      </div>
    `,
  }),
};

export const Disabled: Story = {
  args: { disabled: true },
};
