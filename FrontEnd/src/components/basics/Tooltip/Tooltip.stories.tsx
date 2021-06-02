import React, { ComponentProps } from 'react';
import { Story } from '@storybook/react';
import Tooltip from './Tooltip';

export default {
  title: 'Tooltip',
  component: Tooltip,
};

const Template: Story<ComponentProps<typeof Tooltip>> = (args) => (
  <Tooltip {...args} />
);

// export const Default = Template.bind({});

export const SimpleText = Template.bind({});
SimpleText.args = {
  children: <div>Hello there!</div>,
  title: 'You should see me when you hover over me!',
};

export const LongText = Template.bind({});
LongText.args = {
  children: <h5>Hello there!</h5>,
  title:
    'You should see me when you hover over me!. The width of this tooltip should also be thinner than it should be in reality since I am\
     setting the max width on all screen sizes (though it does probably differ on different screen sizes by using breakpoints) so that it\
     will match the design better. Hopefully it works well and you are smiling at this. Dope.',
};

export const HiddenIcon = Template.bind({});
HiddenIcon.args = {
  children: <h5>Hello there!</h5>,
  title: 'You should see me when you hover over me!',
  hideInfoIcon: true,
};

export const LongOpenText = Template.bind({});
LongOpenText.args = {
  children: <h5>Hello there!</h5>,
  title:
    'You should see me when you hover over me!. The width of this tooltip should also be thinner than it should be in reality since I am\
     setting the max width on all screen sizes (though it does probably differ on different screen sizes by using breakpoints) so that it\
     will match the design better. Hopefully it works well and you are smiling at this. Dope.',
  open: true,
};

export const Open = Template.bind({});
Open.args = {
  children: <h5>Hola there!</h5>,
  title: 'This should be constantly open',
  open: true,
};
