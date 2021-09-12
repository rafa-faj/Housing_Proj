import React, { ComponentProps } from 'react';
import FallbackIcon from './Fallback';
import { StoryTemplate } from '@utils';

export default {
  title: 'FallbackIcon',
  component: FallbackIcon,
};

const Template = StoryTemplate<
  ComponentProps<typeof FallbackIcon>,
  typeof FallbackIcon
>(FallbackIcon);

export const Default = Template.bind({});

export const Amenity = Template.bind({});
Amenity.args = {
  amenity: 'Bath',
};

export const FakeAmenity = Template.bind({});
FakeAmenity.args = {
  amenity: 'Glass Floors',
};
