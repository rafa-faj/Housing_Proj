import React, { ComponentProps } from 'react';
import { Story } from '@storybook/react';
import ImageUpload from './ImageUpload';

export default {
  title: 'ImageUpload',
  component: ImageUpload,
};

const Template: Story<ComponentProps<typeof ImageUpload>> = (args) => (
  <ImageUpload {...args} />
);

export const Default = Template.bind({});
Default.args = { initialFiles: [] };
