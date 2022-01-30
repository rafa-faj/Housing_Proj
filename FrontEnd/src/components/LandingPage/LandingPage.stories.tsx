import React, { ComponentProps } from 'react';
import Landing from './LandingPage';
import { StoryTemplate } from '@utils';

export default {
  title: 'Landing',
  component: Landing,
};

const Template = StoryTemplate<ComponentProps<typeof Landing>, typeof Landing>(
  Landing,
);

export const Default = Template.bind({});
