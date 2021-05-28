import React, { ComponentProps } from 'react';
import { Story } from '@storybook/react';
import Amenities from './Amenities';

export default {
  title: 'Amenities',
  component: Amenities,
};

const Template: Story<ComponentProps<typeof Amenities>> = (args) => (
  <Amenities {...args} />
);

export const Default = Template.bind({});
