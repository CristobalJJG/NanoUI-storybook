import { moduleMetadata, type Meta, type StoryObj } from '@storybook/angular-vite';
import { NanoTextareaComponent } from '@nanojjg/nano-ui-components';

const meta: Meta<NanoTextareaComponent> = {
  title: 'Components/Textarea',
  component: NanoTextareaComponent,
  decorators: [moduleMetadata({ imports: [NanoTextareaComponent] })],
  tags: ['autodocs'],
  args: {
    label: 'Project description',
    placeholder: 'Tell us a little about your project...',
    hint: 'A short summary is enough.',
    value: '',
    rows: 4,
    resize: 'vertical',
    required: false,
    disabled: false,
    error: '',
  },
  argTypes: {
    label: { control: 'text' },
    placeholder: { control: 'text' },
    hint: { control: 'text' },
    error: { control: 'text' },
    rows: { control: { type: 'number', min: 2, max: 12 } },
    resize: { control: 'select', options: ['none', 'vertical', 'both'] },
    required: { control: 'boolean' },
    disabled: { control: 'boolean' },
  },
};

export default meta;
type Story = StoryObj<NanoTextareaComponent>;

export const Playground: Story = {};

export const ValidationError: Story = {
  args: { error: 'Please add a short description.', hint: '' },
};

export const Disabled: Story = {
  args: { value: 'This field is read-only.', disabled: true },
};
