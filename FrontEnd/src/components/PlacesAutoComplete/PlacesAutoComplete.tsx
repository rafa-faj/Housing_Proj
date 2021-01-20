import React, { useState, FunctionComponent } from 'react';
import PlacesAutocomplete from 'react-places-autocomplete';
import { Input, InputProps } from '@basics';
import styles from './PlacesAutoComplete.module.scss';
// import { useSelector, useDispatch } from 'react-redux';
// import { setPost, selectPost } from '@redux';
// import { getDurationInMinutes } from '../apis/google';

interface PathProps extends Omit<InputProps, 'onChange' | 'onSelect'> {
  onChange?: (value: string) => void;
  onSelect?: (value: string) => void;
  initialAddress?: string;
}

const AutoComplete: FunctionComponent<PathProps> = ({
  className = '',
  onChange,
  onSelect,
  initialAddress = '',
  ...inputProps
}) => {
  const [address, setAddress] = useState<string>(initialAddress);
  // TODO
  // (add) => {
  //   dispatch(setPost(['address', add]));
  //   getDurationInMinutes(add).then((distance: any) => {
  //     dispatch(setPost(['distance', distance ? distance : 'unknown']));
  //   });
  // }
  return (
    <PlacesAutocomplete
      value={address}
      onChange={(value) => {
        setAddress(value);
        if (onChange) onChange(value);
      }}
      onSelect={(value) => {
        // TODO this gets called even when a user doesn't select one of the dropdown suggestions
        setAddress(value);
        if (onSelect) onSelect(value);
      }}
    >
      {({ getInputProps, suggestions, getSuggestionItemProps, loading }) => (
        <>
          <Input
            {...getInputProps({
              placeholder: 'Search Places ...',
              className,
            })}
            {...inputProps}
          >
            <div>
              {loading && <div>Loading...</div>}
              {suggestions.map((suggestion) => (
                <div
                  {...getSuggestionItemProps(suggestion, {
                    className: styles.suggestion,
                  })}
                  key={suggestion.description}
                >
                  {suggestion.description}
                </div>
              ))}
            </div>
          </Input>
        </>
      )}
    </PlacesAutocomplete>
  );
};

export default AutoComplete;
