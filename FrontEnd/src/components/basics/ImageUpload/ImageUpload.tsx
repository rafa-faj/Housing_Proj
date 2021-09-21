import React, { FunctionComponent, ChangeEvent, useState } from 'react';
import { Form, Row } from 'react-bootstrap';
import { FilledImage, Button } from '@basics';
import * as z from 'zod';
import { imageUpload, miscIcons } from '@icons';
import styles from './ImageUpload.module.scss';
import cn from 'classnames';
import { useRandomID } from '@hooks';

interface UploadButtonProps {
  onChange: (e: ChangeEvent<HTMLInputElement>) => void;
}

const UploadButton: FunctionComponent<UploadButtonProps> = ({ onChange }) => (
  <div className={styles.imageInputWrapper}>
    <label htmlFor="imageUpload" className={styles.imageInputLabel}>
      <imageUpload.Add />
    </label>
    <input
      id="imageUpload"
      type="file"
      onChange={onChange}
      multiple
      accept="image/png, image/jpeg"
      className={styles.imageInput}
    />
  </div>
);

interface IndividualImageProps {
  index: number;
  file: File;
  onDelete: (currentIndex: number) => void;
}

const IndividualImage: FunctionComponent<IndividualImageProps> = ({
  index,
  file,
  onDelete,
}) => {
  const fileUrl = URL.createObjectURL(file);
  const buttonID = useRandomID(undefined);
  return (
    <div className={styles.singleImage} id={buttonID}>
      <div className={styles.deleteWrapperBackground}>
        <Button
          variant="wrapper"
          className={styles.deleteWrapper}
          onClick={() => onDelete(index)}
        >
          <imageUpload.Delete className={styles.delete} />
        </Button>
      </div>
      <FilledImage
        src={fileUrl}
        alt={'uploaded images'}
        className={styles.roundImage}
      />
    </div>
  );
};

interface ImageUploadProps {
  arrayHandler?: (photos: File[]) => any;
  initialFiles: File[];
  isInvalid?: boolean;
  error?: string | z.ZodIssue;
}

/* The Beautiful Image Uploader
Notes: the limit of this uploader is 6 due to how it was designed. 
It has a fixed width and height and would resize based on different screen sizes.
Usage: to use it, simply provide it with an optional arrayHandler for handling the files updated inside the image uploader
*/
const ImageUpload: FunctionComponent<ImageUploadProps> = ({
  arrayHandler,
  isInvalid,
  error,
  initialFiles = [],
}) => {
  const UploadSizeLimit = 6;
  const [files, setFiles] = useState<File[]>(initialFiles);
  const onChange = (e: ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files.length) {
      let newFiles = [...files, ...Array.from(e.target.files)].slice(
        0,
        UploadSizeLimit,
      );
      setFiles(newFiles); // only keep 6 files if user attempt to upload more than 6
      if (arrayHandler) {
        arrayHandler(newFiles);
      }
      e.target.value = ''; // set the value to empty string so that we allow people upload the same images multiple times
    }
  };
  const onDelete = (currentIndex: number) => {
    let newFiles = files.filter((file, index) => index !== currentIndex);
    setFiles(newFiles);
    if (arrayHandler) {
      arrayHandler(newFiles);
    }
  };

  return (
    <div className={styles.contentWrapper}>
      <Row className={styles.imagesWrapper}>
        {files.map((file, index) => (
          <IndividualImage
            file={file}
            index={index}
            onDelete={onDelete}
            key={index}
          />
        ))}
        {files.length !== UploadSizeLimit &&
          (files.length ? (
            <div className={cn(styles.singleImage, 'd-flex')}>
              <UploadButton onChange={onChange} />
            </div>
          ) : (
            <UploadButton onChange={onChange} />
          ))}
      </Row>
      <div className={cn(styles.error)}>
        {error && <miscIcons.alert className={styles.inputStatus} />}
        {error && <Form.Label>Please upload at least 2 pictures.</Form.Label>}
      </div>
    </div>
  );
};

export default ImageUpload;
