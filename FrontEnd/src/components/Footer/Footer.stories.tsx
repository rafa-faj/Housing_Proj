import React, { ComponentProps } from 'react';
import { Story } from '@storybook/react';
import Footer from './Footer';

export default {
  title: 'Footer',
  component: Footer,
};

const Template: Story<ComponentProps<typeof Footer>> = (args) => (
  <Footer {...args} />
);

export const Default = Template.bind({});
