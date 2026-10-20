import { moduleMetadata, type Meta, type StoryObj } from '@storybook/angular-vite';
import { NanoAlertComponent } from '@nanojjg/nano-ui-components';

const meta: Meta<NanoAlertComponent> = {
  title: 'Components/Alert',
  component: NanoAlertComponent,
  decorators: [moduleMetadata({ imports: [NanoAlertComponent] })],
  tags: ['autodocs'],
  args: {
    variant: 'info',
    title: 'Heads up',
    message: 'This is an informational message for the current context.',
    dismissible: false,
  },
  argTypes: {
    variant: { control: 'select', options: ['info', 'success', 'warning', 'danger'] },
    title: { control: 'text' },
    message: { control: 'text' },
    dismissible: { control: 'boolean' },
  },
};

export default meta;
type Story = StoryObj<NanoAlertComponent>;

export const Playground: Story = {};

export const Variants: Story = {
  render: () => ({
    template: `
      <div style="display:grid;gap:10px">
        <nano-alert variant="info" title="Information" message="A helpful note for your users."></nano-alert>
        <nano-alert variant="success" title="Saved" message="Your changes were saved successfully."></nano-alert>
        <nano-alert variant="warning" title="Attention" message="Review these details before continuing."></nano-alert>
        <nano-alert variant="danger" title="Something went wrong" message="Please try again in a moment."></nano-alert>
      </div>
    `,
  }),
};

export const Dismissible: Story = {
  args: { dismissible: true },
};
