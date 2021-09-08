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

export const BathAmenity = Template.bind({});
BathAmenity.args = {
  selected: ['Bath'],
  useCol: true,
};

export const TwoAmenities = Template.bind({});
TwoAmenities.args = {
  selected: ['Balcony / Patio', 'Dog Friendly'],
  useCol: true,
};

export const MixedTypes = Template.bind({});
MixedTypes.args = {
  selected: ['On-site Movie Theater', 'Glass Ceilings'],
};
