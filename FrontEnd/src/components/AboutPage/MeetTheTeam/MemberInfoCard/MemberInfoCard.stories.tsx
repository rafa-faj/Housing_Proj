import React, { ComponentProps } from 'react';
import { Story } from '@storybook/react';
import MemberInfoCard from './MemberInfoCard';

export default {
  title: 'AboutPage/MemberInfoCard',
  component: MemberInfoCard,
};

const Template: Story<ComponentProps<typeof MemberInfoCard>> = (args) => (
  <MemberInfoCard {...args} />
);

// export const Default = Template.bind({});
