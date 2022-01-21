import React, { ComponentProps } from 'react';
import { Story } from '@storybook/react';
import Loading from './Loading';

export default {
  title: 'Loading',
  component: Loading,
};

const Template: Story<ComponentProps<typeof Loading>> = (args) => (
  <Loading {...args} />
);

export const Default = Template.bind({});
Default.args = {
  text: 'Getting your post ready...',
};
