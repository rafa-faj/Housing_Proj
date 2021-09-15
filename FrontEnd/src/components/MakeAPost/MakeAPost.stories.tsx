import React, { ComponentProps } from 'react';
import { StoryTemplate } from '@utils';
import MakeAPost from './MakeAPost';

export default {
  title: 'MakeAPost',
  component: MakeAPost,
};

const Template = StoryTemplate<
  ComponentProps<typeof MakeAPost>,
  typeof MakeAPost
>(MakeAPost);

export const Default = Template.bind({});
