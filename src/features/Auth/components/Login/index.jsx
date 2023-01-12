import { unwrapResult } from '@reduxjs/toolkit';
import { login } from 'features/Auth/userSlice';
import { useSnackbar } from 'notistack';
import PropTypes from 'prop-types';
import React from 'react';
import { useDispatch } from 'react-redux';
import LoginForm from '../LoginForm';

function Login({ closeDialog }) {
  const dispatch = useDispatch();
  const { enqueueSnackbar } = useSnackbar();
  const handleFormSubmit = async (values) => {
    try {
      //auto set username by email
      const action = login(values);

      const resultAction = await dispatch(action);

      //easy way for get result form action
      unwrapResult(resultAction);
      //close Dialog
      if (closeDialog) closeDialog();
    } catch (err) {
      // showToast('error', `Fetch failed: ${err.message}`)
      console.log('Fail to Login', err);
      enqueueSnackbar(err.message, { variant: 'error' });
    }
  };

  return (
    <div>
      <LoginForm onSubmit={handleFormSubmit} />
    </div>
  );
}

Login.propTypes = {
  handleClose: PropTypes.func,
};

export default Login;
