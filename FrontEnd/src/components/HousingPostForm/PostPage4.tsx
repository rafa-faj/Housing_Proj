import React, { FunctionComponent } from 'react';
import * as z from 'zod';
import { WizardFormStep, ToggleGroup } from '@basics';
import { preferences as preferencesConstList } from '@constants';

export const page4Schema = z.object({
  preferences: z.string().array(),
});

export type Page4Store = z.infer<typeof page4Schema>;

export const page4InitialStore: Page4Store = {
  preferences: [],
};

const PostPage4: FunctionComponent<WizardFormStep<Page4Store>> = ({
  preferences,
  setStore,
}) => {
  return (
    <ToggleGroup
      label="Please select from the following options to promote what type of person you are looking for to apply for this listing."
      content={preferencesConstList}
      initialSelected={preferences}
      onSelect={({ label, selected }) => {
        if (selected) {
          setStore({
            preferences: preferences ? [...preferences, label] : [label],
          });
        } else {
          setStore({
            preferences: preferences?.filter((amenity) => amenity !== label),
          });
        }
      }}
      center
    />
  );
};

export default PostPage4 as FunctionComponent;
