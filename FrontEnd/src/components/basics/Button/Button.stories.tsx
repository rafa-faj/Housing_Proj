import React, { ComponentProps } from 'react';
import { Story } from '@storybook/react';
import Button from './Button';
import {
  contactIcons,
  miscIcons,
  largeAmenitiesIcons,
  Icon,
  IconObject,
} from '@icons';

type StorybookMapping = { [key: string]: { icon: Icon } };

/**
 * { ...object1, ...object2 }, but for many objects.
 */
const joinObjects = <T extends {}>(...objects: T[]) =>
  objects.reduce((prev, cur) => ({ ...prev, ...cur }), {});

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
  miscIcons,
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
  <Button {...args} children={args.children || 'Click me!'} />
);

export const Default = Template.bind({});

export const SimpleIcon = Template.bind({});
SimpleIcon.args = {
  icon: { icon: largeAmenitiesIcons.petsFriendly, config: { fill: '#ffffff' } },
};

export const LongLabel = Template.bind({});
LongLabel.args = {
  children:
    'This is a button with a very long label that is used for testing in storybook. Go ahead and click me! Tada!',
};
