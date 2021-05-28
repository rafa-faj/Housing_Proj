import React, { ComponentProps } from 'react';
import { Story } from '@storybook/react';
import ImageDropdown from './ImageDropdown';

export default {
  title: 'ImageDropdown',
  component: ImageDropdown,
};

const Template: Story<ComponentProps<typeof ImageDropdown>> = (args) => (
  <ImageDropdown {...args} />
);

export const Default = Template.bind({});
