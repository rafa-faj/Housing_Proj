import React, { FunctionComponent, useState } from 'react';
import { Form, Col, FormControlProps } from 'react-bootstrap';
import styles from './TextArea.module.scss';
import { Body2 } from '@basics';
import * as z from 'zod';
import cn from 'classnames';
import { Icon as IconType, miscIcons } from '@icons';
import { useRandomID } from '@hooks';

interface TextAreaProps extends FormControlProps {
  maxLength: number;
  label?: string;
  error?: string | z.ZodIssue; // Will make the input border red as well
  controlId?: string;
  defaultContent?: string;
  placeHolder?: string;
  className?: string;
  isInvalid?: boolean;
}

const TextArea: FunctionComponent<TextAreaProps> = ({
  maxLength,
  label,
  error,
  controlId,
  isInvalid,
  defaultContent = '',
  readOnly,
  placeHolder = '',
  onChange,
  className,
}) => {
  const randomID = useRandomID(controlId);
  const [content, setContent] = useState<string>(defaultContent);

  // contentLength contains the length of content without any whitespace (excluding spaces)
  const [contentLength, setContentLength] = useState<number>(0);

  // bulletpoints keeps track of if the textarea is in bulletpoints mode
  const [bulletpoints, setBulletpoints] = useState<Boolean>(false);

  // dynamicMaxLength is dependent on how much whitespace (excluding spaces) there are in the content
  const dynamicMaxLength = maxLength + (content.length - contentLength);

  const handleKeyDown = (e: React.KeyboardEvent<HTMLTextAreaElement>) => {
    if (!bulletpoints) {
      // Possibly change to check for shift + 8 instead?
      if (e.key === '*') {
        e.preventDefault();
        setBulletpoints(true);
        setContentLength((prevLength) => prevLength + 2);

        if (contentLength === 0 || content[content.length - 1] === '\n') {
          setContent((prevContent) => prevContent + '* ');
        } else if (contentLength + 2 <= dynamicMaxLength) {
          setContent((prevContent) => prevContent + '\n* ');
        }
      } else if (e.key === 'Backspace' || e.key === 'Delete') {
        if (content[content.length - 1] === '\n') {
          const lastNewlineIndex = content.lastIndexOf(
            '\n',
            content.length - 2,
          );

          if (lastNewlineIndex === -1) {
            return;
          }

          const isBulletpointLine =
            content.charAt(lastNewlineIndex + 1) === '*';

          if (isBulletpointLine) {
            setBulletpoints(true);
          }
        }
      }
    } else if (bulletpoints) {
      if (e.key === 'Backspace' || e.key === 'Delete') {
        if (content[content.length - 1] === '*') {
          setBulletpoints(false);
        }
      } else if (e.key === 'Enter' && contentLength + 2 <= maxLength) {
        e.preventDefault();
        setContentLength((prevLength) => prevLength + 2);
        setContent((prevContent) => prevContent + '\n* ');
      } else if (e.key === '*') {
        e.preventDefault();
        setBulletpoints(false);
        setContentLength((prevLength) => prevLength + 1);
        setContent((prevContent) => prevContent + '\n');
      }
    }
  };

  const handleOnChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    if (e) {
      // Regex to remove all whitespace (excluding spaces) from content
      const noWhitespaceContent = e.target.value.replace(/[^\S ]/g, '');

      // Only count characters, not whitespace (excluding spaces)
      setContentLength(noWhitespaceContent.length);
      setContent(e.target.value);
    }

    if (onChange) onChange(e);
  };

  return (
    <Form.Row className={className}>
      <Form.Group as={Col} controlId={randomID} className="pl-0">
        {label && <Form.Label className={styles.label}>{label}</Form.Label>}
        <div className={styles.formControlWrapper}>
          <Form.Control
            placeholder={placeHolder}
            readOnly={readOnly}
            as="textarea"
            className={cn(styles.content, {
              [styles.unfilled]: content.length === 0,
              [styles.readOnly]: readOnly,
              [styles.invalid]: isInvalid || error,
            })}
            type="text"
            maxLength={dynamicMaxLength}
            value={content}
            onKeyDown={handleKeyDown}
            onChange={handleOnChange}
          />
          <Body2
            className={cn(styles.charCheck, {
              [styles.charCheckError]: error,
            })}
          >
            {contentLength}/{maxLength.toString()}
          </Body2>
        </div>
        {error && <miscIcons.alert className={styles.inputStatus} />}
        {error && <Form.Label className={styles.error}>{error}</Form.Label>}
      </Form.Group>
    </Form.Row>
  );
};

export default TextArea;
