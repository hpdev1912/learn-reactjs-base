import { unwrapResult } from '@reduxjs/toolkit';
import { register } from 'features/Auth/userSlice';
import { useSnackbar } from 'notistack';
import PropTypes from 'prop-types';
import React from 'react';
import { useDispatch } from 'react-redux';
import RegisterForm from '../RegisterForm';

function Register({ closeDialog }) {
  const dispatch = useDispatch();
  const { enqueueSnackbar } = useSnackbar();
  const handleFormSubmit = async (values) => {
    try {
      //auto set username by email
      values.username = values.email;
      const action = register(values);

      const resultAction = await dispatch(action);

      //easy way for get result form action
      unwrapResult(resultAction);
      //close Dialog
      if (closeDialog) closeDialog();
      //show snackbar
      enqueueSnackbar('Register successfully!!!', { variant: 'success' });
    } catch (err) {
      // showToast('error', `Fetch failed: ${err.message}`)
      console.log('Fail to register', err);
      enqueueSnackbar(err.message, { variant: 'error' });
    }
  };

  return (
    <div>
      <RegisterForm onSubmit={handleFormSubmit} />
    </div>
  );
}

Register.propTypes = {
  handleClose: PropTypes.func,
};

export default Register;
