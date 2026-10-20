import { moduleMetadata, type Meta, type StoryObj } from '@storybook/angular-vite';
import { NanoTextInputComponent } from '@nanojjg/nano-ui-components';

const meta: Meta<NanoTextInputComponent> = {
  title: 'Components/Text input',
  component: NanoTextInputComponent,
  decorators: [moduleMetadata({ imports: [NanoTextInputComponent] })],
  tags: ['autodocs'],
  args: {
    label: 'Email address',
    type: 'email',
    placeholder: 'you@example.com',
    hint: 'We will only use this to contact you about your account.',
    value: '',
    required: false,
    disabled: false,
    error: '',
  },
  argTypes: {
    type: {
      control: 'select',
      options: ['text', 'email', 'password', 'search', 'url', 'tel', 'number', 'date', 'time', 'datetime-local', 'month', 'week', 'color'],
    },
    label: { control: 'text' },
    placeholder: { control: 'text' },
    hint: { control: 'text' },
    error: { control: 'text' },
    required: { control: 'boolean' },
    disabled: { control: 'boolean' },
  },
};

export default meta;
type Story = StoryObj<NanoTextInputComponent>;

export const Playground: Story = {};

export const ValidationError: Story = {
  args: {
    label: 'Username',
    type: 'text',
    value: 'nano_user',
    hint: '',
    error: 'This username is already taken.',
  },
};

export const Disabled: Story = {
  args: {
    label: 'Account ID',
    value: 'usr_8f42d1',
    disabled: true,
    hint: 'This value cannot be changed.',
  },
};
