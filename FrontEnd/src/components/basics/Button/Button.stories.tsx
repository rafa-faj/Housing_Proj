import React, { ComponentProps } from 'react';

import { Story } from '@storybook/react';

import Button, { ButtonVariant, ButtonSize } from './Button';

export default {
  title: 'Button',
  component: Button,
};

const Template: Story<ComponentProps<typeof Button>> = (args) => (
  <Button {...args} />
);

export const FirstStory = Template.bind({});
FirstStory.args = {
  size: ButtonSize.Primary,
  variant: ButtonVariant.Solid,
};

export const SecondStory = Template.bind({});
SecondStory.args = {
  size: ButtonSize.Secondary,
  variant: ButtonVariant.Outline,
};
