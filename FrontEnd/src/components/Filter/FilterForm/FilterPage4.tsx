import React from 'react';
import { Container, Row, Col, Button, Form } from 'react-bootstrap';
import * as z from 'zod';
import { Interval, Month } from '../../../constants';
import { moveInSelect } from '../../../utils';
import { WizardFormStep, Dropdown } from '@basics';
import styles from './FilterForm.module.scss';

export const page4Schema = z
  .object({
    earlyInterval: z.nativeEnum(Interval),
    earlyMonth: z.nativeEnum(Month),
    lateInterval: z.nativeEnum(Interval),
    lateMonth: z.nativeEnum(Month),
    stayPeriod: z.number().min(1, 'Stay for a month at least!'),
  })
  .refine(
    (vals) =>
      // TODO make this validation work
      moveInSelect(
        vals.earlyMonth as string,
        vals.earlyInterval as string,
        vals.lateMonth as string,
        vals.lateInterval as string,
      ),
    {
      message: 'The given interval is invalid!',
      path: ['lateMonth'],
    },
  );

export type Page4Store = z.infer<typeof page4Schema>;

export const page4InitialStore: Page4Store = {
  earlyInterval: Interval.Anytime,
  earlyMonth: Month.Anytime,
  lateInterval: Interval.Anytime,
  lateMonth: Month.Anytime,
  stayPeriod: 0,
};

const FilterPage4: React.FC<WizardFormStep<Page4Store>> = ({
  earlyInterval,
  earlyMonth,
  lateInterval,
  lateMonth,
  stayPeriod,
  validations,
  setStore,
}) => {
  return (
    <Container>
      <Row className={styles.title}>Rental Dates</Row>

      <br />

      <Form.Row className="m-2">
        <Col>
          <Form.Label className={styles.word}>
            When would you like to move in?
          </Form.Label>
        </Col>
      </Form.Row>
      <Form.Row className="m-2">
        <Col md={2}>
          <Form.Label className={`${styles.word} my-2`}>From</Form.Label>
        </Col>
        <Col md={3}>
          <Dropdown
            options={Object.keys(Interval)}
            initialSelected={earlyInterval}
            placeholder="Date"
            isValid={validations?.earlyInterval?.success}
            error={validations?.earlyInterval?.error}
            onSelect={(s, e) =>
              setStore({
                earlyInterval:
                  s !== null ? Interval[s as keyof typeof Interval] : undefined,
              })
            }
          />
        </Col>
        <Col>
          <Dropdown
            options={Object.keys(Month)}
            initialSelected={earlyMonth}
            placeholder="Month"
            isValid={validations?.earlyMonth?.success}
            error={validations?.earlyMonth?.error}
            onSelect={(s, e) =>
              setStore({
                earlyMonth:
                  s !== null ? Month[s as keyof typeof Month] : undefined,
              })
            }
          />
        </Col>
      </Form.Row>
      <Form.Row className="m-2">
        <Col md={2}>
          <Form.Label className={`${styles.word} my-2`}>To</Form.Label>
        </Col>
        <Col md={3}>
          <Dropdown
            options={Object.keys(Interval)}
            initialSelected={lateInterval}
            placeholder="Date"
            isValid={validations?.lateInterval?.success}
            error={validations?.lateInterval?.error}
            onSelect={(s, e) =>
              setStore({
                lateInterval:
                  s !== null ? Interval[s as keyof typeof Interval] : undefined,
              })
            }
          />
        </Col>
        <Col>
          <Dropdown
            options={Object.keys(Month)}
            initialSelected={lateMonth}
            placeholder="Month"
            isValid={validations?.lateMonth?.success}
            error={validations?.lateMonth?.error}
            onSelect={(s, e) =>
              setStore({
                lateMonth:
                  s !== null ? Month[s as keyof typeof Month] : undefined,
              })
            }
          />
        </Col>
      </Form.Row>

      <Form.Row className="m-2 mt-4">
        <Col md={12}>
          <Dropdown
            label="For How Long?"
            options={[
              '1',
              '2',
              '3',
              '4',
              '5',
              '6',
              '7',
              '8',
              '9',
              '10',
              '11',
              '12',
            ]}
            initialSelected={stayPeriod?.toString()}
            inlineText="Months"
            isValid={validations?.stayPeriod?.success}
            error={validations?.stayPeriod?.error}
            onSelect={(s, e) =>
              setStore({ stayPeriod: s !== null ? parseInt(s) : undefined })
            }
          />
        </Col>
      </Form.Row>
    </Container>
  );
};

export default FilterPage4 as React.FC;
