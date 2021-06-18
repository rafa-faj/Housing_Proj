import React, { FunctionComponent, useEffect } from 'react';
import {TriggerPageView} from '@components/ga'

const Custom404: FunctionComponent = () => {

  useEffect(()=>{
    TriggerPageView('404')
  }, [])

  return <h1>404 - Page not found</h1>;
};

export default Custom404;
