import { moduleMetadata, type Meta, type StoryObj } from '@storybook/angular-vite';
import { NanoCheckboxComponent } from '@nanojjg/nano-ui-components';

const meta: Meta<NanoCheckboxComponent> = {
  title: 'Components/Checkbox',
  component: NanoCheckboxComponent,
  decorators: [moduleMetadata({ imports: [NanoCheckboxComponent] })],
  tags: ['autodocs'],
  args: {
    label: 'Accept the terms',
    description: 'Required to create your account.',
    checked: false,
    disabled: false,
    indeterminate: false,
  },
  argTypes: {
    label: { control: 'text' },
    description: { control: 'text' },
    checked: { control: 'boolean' },
    disabled: { control: 'boolean' },
    indeterminate: { control: 'boolean' },
  },
};

export default meta;
type Story = StoryObj<NanoCheckboxComponent>;

export const Playground: Story = {};

export const Checked: Story = {
  args: { checked: true },
};

export const Disabled: Story = {
  args: { checked: true, disabled: true },
};

export const Indeterminate: Story = {
  args: { indeterminate: true },
};
