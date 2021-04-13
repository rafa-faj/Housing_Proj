// TODO change this to use the "Autocomplete" component in MaterialUI
import React, { useState, useEffect, useRef, FunctionComponent } from 'react';
import { Form } from 'react-bootstrap';
import BootstrapDropdown, * as BootstrapDropdownMetadata from 'react-bootstrap/Dropdown';
import * as z from 'zod';
import { useClickAwayListener } from '@hooks';
import cn from 'classnames';
import styles from './Dropdown.module.scss';
import RequiredAsterisk from '../RequiredAsterisk';

interface DropdownProps extends BootstrapDropdownMetadata.DropdownProps {
  options: string[];
  initialSelected?: string;
  label?: string;
  labelClassName?: string;
  error?: string | z.ZodIssue; // Will make the input border red as well
  errorClassName?: string;
  placeholder?: string;
  isInvalid?: boolean;
  isValid?: boolean;
  required?: boolean;
  noFilter?: boolean; // Will make the user unable to filter through the options by typing in the dropdown's input
  inlineText?: string;
  inlineTextClassName?: string;
}

const Dropdown: FunctionComponent<DropdownProps> = ({
  label,
  labelClassName,
  error,
  errorClassName,
  initialSelected,
  placeholder,
  isInvalid,
  isValid, // only provide this if you want a green checkmark. Should only be provided when multiple dropdowns are working in unison
  required,
  noFilter,
  inlineText,
  inlineTextClassName,
  className,
  options,
  onSelect,
  ...dropdownProps
}) => {
  const [selected, setSelected] = useState<string | undefined>(initialSelected);
  const [isEmpty, setIsEmpty] = useState<boolean>(!selected || selected === '');
  const [isFocused, setIsFocused] = useState<boolean>(false);
  const [filter, setFilter] = useState<string | undefined>();
  const [filteredOptions, setFilteredOptions] = useState<string[]>(options);

  const dropdownRef = useRef<HTMLElement>();
  const dropdownMenuRef = useRef<HTMLDivElement>(null);
  useClickAwayListener(
    [dropdownRef, dropdownMenuRef],
    () => setFilter(undefined),
    !noFilter,
  );

  const updateIsEmpty = (s?: string | null) => {
    if (s) setIsEmpty(!s || s === '');
    else setIsEmpty(!selected || selected === '');
  };

  useEffect(() => {
    const filtered = options.filter(
      (option) => option.toLowerCase().includes(filter?.toLowerCase() || ''), // TODO for some reason filtering with a space causes issues?
    );
    setFilteredOptions(filtered);
  }, [filter, options]);

  return (
    <Form.Group>
      {(label || required) && (
        <Form.Label className={cn(styles.label, labelClassName)}>
          {label} {required && <RequiredAsterisk />}
        </Form.Label>
      )}

      <div className="d-flex">
        <BootstrapDropdown
          onSelect={(s, e) => {
            setSelected(s || undefined);
            updateIsEmpty(s);
            setFilter(undefined);

            if (onSelect) onSelect(s, e);
          }}
          ref={dropdownRef}
          className={cn(styles.dropdown, className)}
          {...dropdownProps}
        >
          <BootstrapDropdown.Toggle
            variant="no-show"
            className={styles.toggle}
            onFocus={() => setIsFocused(true)}
            onBlur={() => setIsFocused(false)}
          >
            <div className="d-flex flex-nowrap">
              <Form.Control
                value={filter !== undefined ? filter : selected || ''}
                placeholder={placeholder}
                className={cn(styles.straightenRight, {
                  [styles.unfilled]: isEmpty && !isFocused,
                  [styles.filled]: !isEmpty || isFocused,
                  [styles.invalid]: isInvalid || error,
                })}
                isValid={isValid}
                readOnly={noFilter}
                onChange={(e) => {
                  if (!noFilter) setFilter(e.target.value);
                }}
                onFocus={() => {
                  if (!noFilter) setFilter('');
                }}
              />

              <div
                className={cn('btn', styles.dropBtn, {
                  [styles.dropBtnUnfilled]: isEmpty && !isFocused,
                  [styles.dropBtnFilled]: !isEmpty || isFocused,
                  [styles.dropBtnInvalid]: isInvalid || error,
                })}
              >
                <div className={styles.dropBtnArrow} />
              </div>
            </div>
          </BootstrapDropdown.Toggle>

          <BootstrapDropdown.Menu ref={dropdownMenuRef}>
            {filteredOptions.map((option) => (
              <BootstrapDropdown.Item key={option} eventKey={option}>
                {option}
              </BootstrapDropdown.Item>
            ))}
          </BootstrapDropdown.Menu>
        </BootstrapDropdown>

        {inlineText && (
          <div className={cn(styles.inlineText, inlineTextClassName)}>
            {inlineText}
          </div>
        )}
      </div>

      {error && (
        <Form.Label className={cn(styles.error, errorClassName)}>
          {error}
        </Form.Label>
      )}
    </Form.Group>
  );
};

export default Dropdown;
