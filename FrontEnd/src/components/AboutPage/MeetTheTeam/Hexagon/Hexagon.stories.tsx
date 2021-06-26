import React, { ComponentProps } from 'react';
import { Story } from '@storybook/react';
import Hexagon from './Hexagon';

export default {
  title: 'AboutPage/Hexagon',
  component: Hexagon,
};

const Template: Story<ComponentProps<typeof Hexagon>> = (args) => (
  <Hexagon {...args} />
);

// export const Default = Template.bind({});
