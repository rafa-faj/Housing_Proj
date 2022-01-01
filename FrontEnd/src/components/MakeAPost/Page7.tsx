import {
  ImageUpload,
  RequiredAsterisk,
  Subtitle2,
  WizardFormStep,
} from '@basics';
import { isRunningServer } from '@utils';
import cn from 'classnames';
import React, { FunctionComponent } from 'react';
import * as z from 'zod';
import styles from './Page.module.scss';

export const page7Schema = z.object({
  photos: z
    .array(isRunningServer() ? z.any() : z.instanceof(File)) // TODO(cris): find more elegant solution rather than server side check.(https://github.com/blitz-js/blitz/discussions/2292#discussioncomment-826778)
    .min(2),
});

export type Page7Store = z.infer<typeof page7Schema>;

export const page7InitialStore: Page7Store = {
  photos: [],
};

const Page7: FunctionComponent<WizardFormStep<Page7Store>> = ({
  photos,
  validations,
  setStore,
}) => (
  <div className={styles.pageHeight}>
    <Subtitle2 className={styles.subtitle2}>Pictures</Subtitle2>
    <div className="mb-2">
      <Subtitle2 className={cn(styles.subtitle2, styles.sectionSubtitle2)}>
        Please upload 2 - 6 images for the listing <RequiredAsterisk />
      </Subtitle2>
    </div>
    <div className="d-flex justify-content-center">
      <ImageUpload
        initialFiles={photos || []}
        error={validations?.photos?.error}
        photosHandler={(photos) => setStore({ photos })}
      />
    </div>
  </div>
);
export default Page7 as FunctionComponent;
