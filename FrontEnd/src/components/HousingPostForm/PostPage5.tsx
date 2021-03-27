import React from 'react';
import * as z from 'zod';
import { Container, Row, Col } from 'react-bootstrap';
import ImageUploader from 'homehub-images-upload';
import { WizardFormStep } from '../basics/WizardForm/WizardForm';
import styles from './HousingPostForm.module.scss';

export const page5Schema = z.object({
  pictures: z.array(z.any()).min(1, 'You need to add some pictures!'),
});

export interface Page5Store {
  pictures: File[];
}

export const page5InitialStore: Page5Store = {
  pictures: [],
};

const PostPage5: React.FC<WizardFormStep<Page5Store>> = ({
  pictures,
  validations,
  setStore,
}) => {
  return (
    <Container>
      <Row className={styles.title}>Upload photos of your place</Row>

      <Row>
        <ImageUploader
          withIcon
          withPreview
          label=""
          onChange={(p) => {
            setStore({ pictures: [...p] });
          }}
          defaultFiles={pictures}
          defaultImages={pictures?.map((picture) =>
            URL.createObjectURL(picture),
          )}
          imgExtension={['.jpg', '.png', '.jpeg']}
          maxFileSize={5242880}
          className={styles.imageUploader}
          buttonText="+"
          buttonClassName={`${styles.uploaderBtn} btn-primary`}
          errorClass={styles.error}
        />
      </Row>
      <div className={styles.error}>{validations?.pictures?.error}</div>
    </Container>
  );
};

export default PostPage5 as React.FC;
