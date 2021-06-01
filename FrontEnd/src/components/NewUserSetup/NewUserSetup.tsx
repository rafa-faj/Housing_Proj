import React, { FunctionComponent } from 'react';
import { useDispatch } from 'react-redux';
import Page1, { Page1Store, page1InitialStore, page1Schema } from './Page1';
import Page2, { Page2Store, page2InitialStore, page2Schema } from './Page2';
import { WizardForm } from '@basics';
import { createUser } from '@apis';
import {
  endNewUserFlow,
  useShowNewUserPopup,
  useShouldShowLogin,
} from '@redux';

type Store = Page1Store & Page2Store;

const schemas = [page1Schema, page2Schema];

const NewUserSetup: FunctionComponent = () => {
  const dispatch = useDispatch();
  const showNewUserPopup = useShowNewUserPopup();
  const shouldShowLogin = useShouldShowLogin();

  if (!showNewUserPopup) return null;

  return (
    <WizardForm<Store>
      show={!!showNewUserPopup && !shouldShowLogin}
      onHide={() => console.log('todo, shouldnt have an onHide for this...')}
      onSubmit={(data) => {
        console.log('clicked, set up new user');
        console.log(data);

        // Currently no way for users to select a profile photo. the backend will pick one at random.
        createUser({ ...data, profilePhoto: '' }).then(() =>
          dispatch(endNewUserFlow()),
        );

        return true;
      }}
      title="Set up your account"
      initialStore={[
        {
          ...page1InitialStore,
          name: showNewUserPopup.name,
          email: showNewUserPopup.email,
        },
        page2InitialStore,
      ]}
      schemas={schemas}
    >
      <Page1 />
      <Page2 />
    </WizardForm>
  );
};

export default NewUserSetup;
