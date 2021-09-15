import React, { FunctionComponent } from 'react';
import * as z from 'zod';
import { WizardFormStep, TextArea, Subtitle2 } from '@basics';
import { NON_EMPTY_ERR_MSG } from '../../constants';
import styles from './Page.module.scss';
import cn from 'classnames';

export const page8Schema = z.object({
  placeDescription: z.string().nonempty(NON_EMPTY_ERR_MSG),
});

export const page8InitialStore: Page8Store = {
  placeDescription: '',
};

export type Page8Store = z.infer<typeof page8Schema>;

const Page8: FunctionComponent<
  WizardFormStep<Page8Store> & { validations: any }
> = ({ setStore, validations, placeDescription }) => (
  <div className={styles.pageHeight}>
    <Subtitle2 className={styles.subtitle2}>Other information</Subtitle2>
    <div className="mb-2">
      <Subtitle2 className={cn(styles.subtitle2, styles.sectionSubtitle2)}>
        Please add a description of the room and home
        <span className={styles.required}>*</span>
      </Subtitle2>
    </div>
    <div className="d-flex justify-content-center">
      <TextArea
        maxLength={600}
        defaultContent={placeDescription}
        error={validations?.placeDescription?.error as string}
        placeHolder="• Who is the roommate/ suitemate? Hobby? Major? Lifestyle? &#13;• What’s nearby the place?&#13;• Any pets? &#13;• Any allergy? &#13;• Any other special accommodation? &#13;• Literally anything you want people to know before you live with them..."
        className={styles.textArea}
        onChange={(e) => setStore({ placeDescription: e.target.value })}
      />
    </div>
  </div>
);
export default Page8 as FunctionComponent;
