import React, { ComponentProps } from 'react';
import { Story } from '@storybook/react';
import FallbackIcon from './Fallback';

export default {
  title: 'FallbackIcon',
  component: FallbackIcon,
};

const Template: Story<ComponentProps<typeof FallbackIcon>> = (args) => (
  <FallbackIcon {...args} />
);

export const Default = Template.bind({});

export const Amenity = Template.bind({});
Amenity.args = {
  amenity: 'Bath',
};

export const FakeAmenity = Template.bind({});
FakeAmenity.args = {
  amenity: 'Glass Floors',
};
