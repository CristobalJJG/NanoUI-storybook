import { moduleMetadata, type Meta, type StoryObj } from '@storybook/angular-vite';
import { NanoCardComponent } from '@nanojjg/nano-ui-components';

const meta: Meta<NanoCardComponent> = {
  title: 'Components/Card',
  component: NanoCardComponent,
  decorators: [moduleMetadata({ imports: [NanoCardComponent] })],
  tags: ['autodocs'],
  args: {
    heading: 'Workspace settings',
    description: 'Manage your team and preferences.',
    padding: 'md',
    interactive: false,
  },
  argTypes: {
    heading: { control: 'text' },
    description: { control: 'text' },
    padding: { control: 'select', options: ['sm', 'md', 'lg'] },
    interactive: { control: 'boolean' },
  },
  render: (args) => ({
    props: args,
    template: `
      <nano-card [heading]="heading" [description]="description" [padding]="padding" [interactive]="interactive">
        <p style="margin:0">Invite people, assign roles, and keep project access up to date.</p>
        <div uiCardFooter style="display:flex;align-items:center;justify-content:space-between;padding-top:14px;border-top:1px solid #ffffff12">
          <span style="color:#94a3b8;font-size:11px">4 members</span>
          <span style="color:#a7a4ff;font-size:11px;font-weight:600">Manage team →</span>
        </div>
      </nano-card>
    `,
  }),
};

export default meta;
type Story = StoryObj<NanoCardComponent>;

export const Playground: Story = {};

export const Compact: Story = {
  args: { heading: 'Quick stats', description: '', padding: 'sm' },
};

export const Interactive: Story = {
  args: { interactive: true },
};
