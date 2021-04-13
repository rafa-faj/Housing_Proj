import React, { FunctionComponent } from 'react';
import { Container, Row, Col, Form } from 'react-bootstrap';
import * as z from 'zod';
import { WizardFormStep, Input } from '@basics';
import styles from './FilterForm.module.scss';
import cn from 'classnames';

export const page1Schema = z.object({
  distance: z.number().positive('Make sure distance is positive.'),
});

export type Page1Store = z.infer<typeof page1Schema>;

export const page1InitialStore: Page1Store = {
  distance: 20,
};

const FilterPage1: FunctionComponent<WizardFormStep<Page1Store>> = ({
  distance,
  validations,
  setStore,
}) => {
  return (
    <Container>
      <Row className={styles.title}>Distance to School</Row>

      <br />

      <Form.Row className="mb-2">
        <Col>
          <Form inline className="justify-content-center">
            <Form.Label className={styles.word}>Less than&nbsp;</Form.Label>
            <Input
              value={distance}
              type="number"
              onChange={(e) =>
                setStore({
                  distance: e.target.value
                    ? parseInt(e.target.value)
                    : undefined,
                })
              }
              className={cn(styles.shortInput, 'mb-2')}
              isValid={validations?.distance?.success}
              isInvalid={
                validations?.distance && !validations?.distance?.success
              }
            />
            <Form.Label className={styles.word}>&nbsp;mins.</Form.Label>
            <Form.Label className={styles.word}>
              &nbsp;public transportation to Price Center
            </Form.Label>
          </Form>
        </Col>
      </Form.Row>
    </Container>
  );
};

export default FilterPage1 as FunctionComponent;
