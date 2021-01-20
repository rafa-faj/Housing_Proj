import React, { FunctionComponent } from 'react';
import * as z from 'zod';
import { Container } from 'react-bootstrap';
import { WizardFormStep, Input } from '@basics';

export const page6Schema = z.object({
  roomDescription: z
    .string()
    .min(1, 'You need to provide an description for your room!')
    .max(600, 'Your description can only have maximum of 600 characters'),
});

export type Page6Store = z.infer<typeof page6Schema>;

export const page6InitialStore: Page6Store = {
  roomDescription: '',
};

const PostPage6: FunctionComponent<WizardFormStep<Page6Store>> = ({
  roomDescription,
  validations,
  setStore,
}) => {
  return (
    <Container>
      <Input
        label="What's your room like?"
        as="textarea"
        value={roomDescription}
        placeholder="Use this section to fill in any additional details!"
        rows={10}
        onChange={(e) => setStore({ roomDescription: e.target.value })}
        isValid={validations?.roomDescription?.success}
        error={validations?.roomDescription?.error}
        required
      />
    </Container>
  );
};

export default PostPage6 as FunctionComponent;
