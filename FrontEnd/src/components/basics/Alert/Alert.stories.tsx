import { StoryTemplate } from '@utils';
import { ComponentProps } from 'react';
import Alert from './Alert';

export default {
  title: 'Alert',
  component: Alert,
};

const Template = StoryTemplate<ComponentProps<typeof Alert>, typeof Alert>(
  Alert,
);

export const DefaultWithTitle = Template.bind({});
DefaultWithTitle.args = {
  variant: 'success',
  title: 'Alert Title',
  text: 'Text',
};

export const DefaultWithoutTitle = Template.bind({});
DefaultWithoutTitle.args = {
  variant: 'success',
  title: '',
  text: 'Text',
};

export const TextBtnWithTitle = Template.bind({});
TextBtnWithTitle.args = {
  variant: 'success',
  title: 'Alert Title',
  text: 'Text',
  button: 'button',
};

export const TextBtnWithoutTitle = Template.bind({});
TextBtnWithoutTitle.args = {
  variant: 'success',
  title: '',
  text: 'Text',
  button: 'button',
};

export const LongAlert = Template.bind({});
LongAlert.args = {
  variant: 'success',
  title: 'This is a very long alert, very very long long long',
  text: 'Text',
};
