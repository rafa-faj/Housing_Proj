import React, { ComponentProps } from 'react';
import { Story } from '@storybook/react';
import Button from './Button';
import { contactIcons, largeAmenitiesIcons, Icon, IconObject } from '@icons';
import { joinObjects } from '@utils';

type StorybookMapping = { [key: string]: { icon: Icon } };

/**
 * Changes an object from icon object { iconLabel: IconComponent }
 * to { iconLabel: { icon: IconComponent } }, which is the format
 * of the icon parameter in Button.
 */
const mapIconObjectToStorybookMapping = (
  iconObject: IconObject,
): StorybookMapping =>
  Object.entries(iconObject).reduce((prev, cur) => {
    const [curKey, curIcon] = cur;
    return { ...prev, [curKey]: { icon: curIcon } };
  }, {});

/**
 * Icons that will be in the storybook icon dropdown.
 */
const selectableIcons = joinObjects<IconObject>(
  contactIcons,
  largeAmenitiesIcons,
);

export default {
  title: 'Button',
  component: Button,
  argTypes: {
    // Provide icon selection in storybook
    icon: {
      options: Object.keys(selectableIcons),
      mapping: mapIconObjectToStorybookMapping(selectableIcons),
    },
  },
};

const Template: Story<ComponentProps<typeof Button>> = (args) => (
  <Button {...args} />
);

export const Default = Template.bind({});
Default.args = {
  children: 'Click me!',
};

export const SimpleIcon = Template.bind({});
SimpleIcon.args = {
  icon: { icon: largeAmenitiesIcons.petsFriendly, config: { fill: '#ffffff' } },
  children: 'Click me!',
};

export const LongLabel = Template.bind({});
LongLabel.args = {
  children:
    'This is a button with a very long label that is used for testing in storybook. Go ahead and click me! Tada!',
};

export const Wrapper = Template.bind({});
Wrapper.args = {
  variant: 'wrapper',
  icon: { icon: largeAmenitiesIcons.petsFriendly },
};
