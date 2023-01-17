import { yupResolver } from '@hookform/resolvers/yup';
import { Button } from '@material-ui/core';
import QuantityField from 'components/FormControl/QuantityFiled';
import PropTypes from 'prop-types';
import React from 'react';
import { useForm } from 'react-hook-form';
import * as yup from 'yup';

function AddToCartForm({ onSubmit = null }) {
  const schema = yup.object({
    quantity: yup
      .number()
      .required('Please enter quantity')
      .min(1, 'Minimum value is 1')
      .max(15, 'Maximum value is 15')
      .typeError('Please enter a number'),
  });

  const form = useForm({
    defaultValues: {
      quantity: 1,
    },
    resolver: yupResolver(schema),
  });

  const { register, watch, control } = form;

  const handleSubmit = async (values) => {
    if (onSubmit) {
      await onSubmit(values);
    }
  };

  return (
    <form onSubmit={form.handleSubmit(handleSubmit)}>
      <QuantityField
        name="quantity"
        label="Quantity"
        form={form}
        isFullWidth={true}
        register={register}
        watch={watch}
        control={control}
      />

      <Button type="submit" variant="contained" color="primary" size="large" style={{ width: '250px' }}>
        Add to cart
      </Button>
    </form>
  );
}

AddToCartForm.propTypes = {
  onSubmit: PropTypes.func,
};

export default AddToCartForm;
