import React, { FunctionComponent, ChangeEvent, useState } from 'react';
import { Row, Col } from 'react-bootstrap';
import { FilledImage } from '@basics';
import { imageUpload } from '@icons';
import styles from './ImageUpload.module.scss';
import cn from 'classnames';

interface UploadButtonProps {
  handleChange: (e: ChangeEvent<HTMLInputElement>) => void;
}

const UploadButton: FunctionComponent<UploadButtonProps> = ({
  handleChange,
}) => (
  <div className={styles.image_input_wrapper}>
    <label htmlFor="image_upload" className={styles.image_input_label}>
      <imageUpload.Add />
    </label>
    <input
      id="image_upload"
      type="file"
      onChange={handleChange}
      multiple
      accept="image/*"
      className={styles.image_input}
    />
  </div>
);

const ImageUpload: FunctionComponent = () => {
  const [files, setFiles] = useState<File[]>([]);
  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files.length) {
      setFiles([...files, ...Array.from(e.target.files)].slice(0, 6));
      e.target.value = '';
    }
  };
  return (
    <Row className={styles.images_wrapper}>
      {files.map((file, index) => (
        <div
          className={cn(
            styles.single_image,
            index % 3 === 1 ? 'mx-3' : undefined,
          )}
        >
          <FilledImage
            src={URL.createObjectURL(file)}
            alt={'uploaded images'}
          />
        </div>
      ))}
      {files.length !== 6 &&
        (files.length ? (
          <div className={cn(styles.single_image, 'd-flex')}>
            <UploadButton handleChange={handleChange} />
          </div>
        ) : (
          <UploadButton handleChange={handleChange} />
        ))}
    </Row>
  );
};

export default ImageUpload;
