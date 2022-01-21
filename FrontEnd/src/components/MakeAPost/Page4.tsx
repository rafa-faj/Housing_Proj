import {
  Input,
  RequiredAsterisk,
  Subtitle2,
  Tooltip,
  WizardFormStep,
} from '@basics';
import { NON_EMPTY_ERR_MSG } from '@constants';
import { miscIcons } from '@icons';
import React, { FunctionComponent } from 'react';
import * as z from 'zod';
import styles from './Page.module.scss';

export const page4Schema = z.object({
  rentCost: z
    .string()
    .nonempty(NON_EMPTY_ERR_MSG)
    .regex(/^\d+$/, 'only numbers allowed'),
  utilityCost: z.string().regex(/^$|^\d+$/, 'only numbers allowed'),
});

export type Page4Store = z.infer<typeof page4Schema>;

export const page4InitialStore: Page4Store = {
  rentCost: '',
  utilityCost: '',
};

const utilities = [
  'Gas/electricty',
  'Cable/internet',
  'Renter’s insurance',
  'Water & Wastewater depend on usage',
  'Trash & Recycling/Trash Pickup',
  'Pest Control',
];

const utilityList = utilities.map((utility) => {
  return <li>{utility}</li>;
});

const utilityInfo = (
  <div>
    <div>Utilities might include</div>
    {utilityList}
  </div>
);

const Page4: FunctionComponent<WizardFormStep<Page4Store>> = ({
  setStore,
  validations,
  rentCost,
  utilityCost,
}) => {
  const costInput = (type: keyof Page4Store, value?: string) => (
    <div className={'d-flex'}>
      <Input
        icon={{ icon: miscIcons.dollar }}
        placeholder={'--'}
        onChange={(e) => setStore({ [type]: e.target.value })}
        error={validations?.[type]?.error}
        value={value}
      />
      <span className={styles.text}>per month per person</span>
    </div>
  );

  const rentCostUI = (
    <div className={styles.section}>
      <h5 className={styles.title}>
        What is the monthly rent per person for this room? <RequiredAsterisk />
      </h5>
      {costInput('rentCost', rentCost)}
    </div>
  );

  const utilityCostUI = (
    <div className={styles.lastSection}>
      <h5 className={styles.title3}>
        What is the monthly cost of utilities per person for this room?
      </h5>
      <h6 className={styles.title}>
        (Utility cost could vary A LOT from ~$50 per person per month to $200
        per house per month)
      </h6>
      {costInput('utilityCost', utilityCost)}
      <Tooltip
        isSingleLine={false}
        title={utilityInfo}
        className={styles.marginTop}
        placement="bottom-start"
        maxWidth={450}
      >
        <div>What does “utilities” mean?</div>
      </Tooltip>
    </div>
  );

  return (
    <div className={styles.pageHeight}>
      <Subtitle2 className={styles.subtitle2}>Price range</Subtitle2>
      <div className={styles.description}>
        {rentCostUI}
        {utilityCostUI}
      </div>
    </div>
  );
};

export default Page4 as FunctionComponent;
