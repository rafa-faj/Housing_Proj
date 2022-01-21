import { ComponentProps } from 'react';
import StickyBar from './StickyBar';
import { Alert, Button } from '@basics';
import { StoryTemplate } from '@utils';

export default {
  title: 'StickyBar',
  component: StickyBar,
};

const Template = StoryTemplate<
  ComponentProps<typeof StickyBar>,
  typeof StickyBar
>(StickyBar);

export const Default = Template.bind({});
Default.args = {
  children: (
    <>
      <Alert
        variant="success"
        title="Alert Title"
        text="Text"
        buttonText="button"
      />
      <Button>hello</Button>
    </>
  ),
  title: 'You should see me when you hover over me!',
  hideInfoIcon: true,
  isSingleLine: false,
};
