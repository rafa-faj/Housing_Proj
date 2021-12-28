import React, { FunctionComponent } from 'react';
import CheckBoxButton, { CheckBoxButtonProps } from './CheckBox';
import { Row, Col } from 'react-bootstrap';

export interface CheckBoxGroupProps {
  buttonProps: CheckBoxButtonProps[];
}

const CheckBoxGroup: FunctionComponent<CheckBoxGroupProps> = ({
  buttonProps,
}) => {
  return (
    <Row className="w-100">
      {buttonProps.map((props) => (
        <Col xs={6} md={4} key={props.value}>
          <CheckBoxButton {...props} />
        </Col>
      ))}
    </Row>
  );
};

export default CheckBoxGroup;
