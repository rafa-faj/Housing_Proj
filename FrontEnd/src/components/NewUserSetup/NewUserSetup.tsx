import React, { FunctionComponent } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import Page1, { Page1Store, page1InitialStore, page1Schema } from './Page1';
import Page2, { Page2Store, page2InitialStore, page2Schema } from './Page2';
import { WizardForm } from '@basics';
import { createUser } from '@apis';
import { useUser } from '@hooks';
import { selectShowNewUserPopup, endNewUserFlow } from '@redux';

type CreateUserParam = Parameters<typeof createUser>[0];
type Store = Page1Store & Page2Store;

const schemas = [page1Schema, page2Schema];

const NewUserSetup: FunctionComponent = () => {
  const dispatch = useDispatch();
  const { name, email } = useSelector(selectShowNewUserPopup);
  const { mutate: mutateUser } = useUser();

  // Only render NewUserSetup if currently in the NewUserFlow. This is
  // necessary so that the initialStore will contain the actual name and
  // email instead of undefined (which is name/email's initial state)
  const show = !!(name && email);
  if (!show) return null;

  const handleSubmit = async (userInfo: CreateUserParam) => {
    try {
      await createUser(userInfo);
      mutateUser();
      return true;
    } catch {
      // TODO eventually handle error here by displaying to the user
      return false;
    }
  };

  return (
    <WizardForm<Store>
      show={show}
      onHide={() => dispatch(endNewUserFlow())}
      onSubmit={handleSubmit}
      title="Set up your account"
      initialStore={[{ ...page1InitialStore, name, email }, page2InitialStore]}
      schemas={schemas}
      hideExitButton
    >
      <Page1 />
      <Page2 />
    </WizardForm>
  );
};

export default NewUserSetup;
