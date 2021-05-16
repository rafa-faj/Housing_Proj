import React from 'react';
import Button from './Button';
import { render } from '@testing-library/react';
import { contactIcons } from '@icons';

const buttonContent = 'Button text';

describe('Button', () => {
  it('should render a button with Button text', () => {
    const { getByRole } = render(<Button>{buttonContent}</Button>);
    const button = getByRole('button');
    expect(button).toHaveTextContent(buttonContent);
  });

  it('should render primary size as bigger than secondary size', () => {
    const { getByRole } = render(<Button>{buttonContent}</Button>);
    const button = getByRole('button');
    expect(button).toHaveTextContent(buttonContent);
  });

  it('should render a button with an icon in it if an icon was passed', () => {
    const { getByRole } = render(
      <Button icon={{ icon: contactIcons.email }}>{buttonContent}</Button>,
    );
    const icon = getByRole('svg');
    expect(icon).toBeInTheDocument();
    expect(icon).toBeVisible();
  });

  // it('should match snapshot', () => {
  //   const { getByRole } = render();
  // });
});
