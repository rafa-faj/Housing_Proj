import React, { ComponentProps } from 'react';
import { Story } from '@storybook/react';
import ToggleSwitchBar from './ToggleSwitchBar';

export default {
  title: 'ToggleSwitchBar',
  component: ToggleSwitchBar,
};

const Template: Story<ComponentProps<typeof ToggleSwitchBar>> = (args) => (
  <ToggleSwitchBar {...args} />
);

export const Default = Template.bind({});
Default.args = {
  onSwitchLeft: () => {},
  onSwitchRight: () => {},
  leftText: 'item1',
  rightText: 'item2',
};
