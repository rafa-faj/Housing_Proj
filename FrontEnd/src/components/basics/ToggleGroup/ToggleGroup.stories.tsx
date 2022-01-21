import { amenityIcons } from '@icons';
import { StoryTemplate } from '@utils';
import { ComponentProps } from 'react';
import ToggleGroup from './ToggleGroup';

export default {
  title: 'ToggleGroup',
  component: ToggleGroup,
};

const Template = StoryTemplate<
  ComponentProps<typeof ToggleGroup>,
  typeof ToggleGroup
>(ToggleGroup);

export const Default = Template.bind({});
Default.args = {
  content: ['hello', 'aloha'],
};

export const ToggleWithIcon = Template.bind({});
ToggleWithIcon.args = {
  content: [{ icon: amenityIcons.DogFriendly, label: 'Dog Friendly' }],
};
