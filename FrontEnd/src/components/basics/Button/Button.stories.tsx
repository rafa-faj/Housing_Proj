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

const joinObjects = <T extends {}>(...objects: T[]) =>
  objects.reduce((prev, cur) => ({ ...prev, ...cur }), {});

const mapIconObjectToStorybookMapping = (
  iconObject: IconObject,
): StorybookMapping =>
  Object.entries(iconObject).reduce((prev, cur) => {
    const [curKey, curIcon] = cur;
    return { ...prev, [curKey]: { icon: curIcon } };
  }, {});

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

export const DefaultWithSimpleIcon = Template.bind({});
DefaultWithSimpleIcon.args = {
  icon: { icon: largeAmenitiesIcons.petsFriendly, config: { fill: '#ffffff' } },
};
