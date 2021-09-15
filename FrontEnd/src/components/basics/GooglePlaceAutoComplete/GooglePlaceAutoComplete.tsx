import React, { useState } from 'react';
import PlacesAutocomplete, { PropTypes } from 'react-places-autocomplete';
import { Input, Body2 } from '@basics';
import { Form, FormControlProps } from 'react-bootstrap';
import * as z from 'zod';
import styles from './GooglePlaceAutoComplete.module.scss';
import { miscIcons } from '@icons';
import cn from 'classnames';

interface GooglePlaceAutoCompleteProps extends Partial<PropTypes> {
  className?: string;
  error?: string | z.ZodIssue; // Will make the input border red as well
  isInvalid?: boolean;
  defaultAddress?: string;
}

const GooglePlaceAutoComplete: React.FC<GooglePlaceAutoCompleteProps> = ({
  onChange,
  onSelect,
  defaultAddress = '',
  error,
  isInvalid,
}) => {
  const [address, setAddress] = useState<string>(defaultAddress);

  return (
    <div className={styles.wrapper}>
      <PlacesAutocomplete
        value={address}
        onChange={(address) => {
          setAddress(address);
          console.log('changing: ' + address);
          if (onChange) {
            onChange(address);
          }
        }}
        onSelect={(address) => {
          setAddress(address);
          if (onSelect) {
            onSelect(address, '');
          }
        }}
      >
        {({ getInputProps, suggestions, getSuggestionItemProps }) => (
          <div className={styles.body}>
            <Input
              icon={{ icon: miscIcons.LocationIcon }}
              {...getInputProps({
                placeholder: 'Select your address',
                className: styles.input,
              })}
              className={cn({ [styles.invalid]: isInvalid || error })}
            ></Input>
            <div className={styles.suggestionWrapper}>
              {suggestions.map((suggestion) => (
                // TODO: Missing "key" prop for element in iterator
                <div
                  {...getSuggestionItemProps(suggestion, {
                    className: cn(styles.suggestion),
                  })}
                >
                  <Body2 className={styles.body2}>
                    {suggestion.description}
                  </Body2>
                </div>
              ))}
            </div>
          </div>
        )}
      </PlacesAutocomplete>
      {error && <Form.Label className={cn(styles.error)}>{error}</Form.Label>}
    </div>
  );
};

export default GooglePlaceAutoComplete;
