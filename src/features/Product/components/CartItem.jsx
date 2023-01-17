import { yupResolver } from '@hookform/resolvers/yup';
import { Box, Button, Checkbox, makeStyles, Typography } from '@material-ui/core';
import QuantityField from 'components/FormControl/QuantityFiled';
import { STATIC_HOST, THUMBNAIL_PLACEHOLDER } from 'constants/index';
import PropTypes from 'prop-types';
import React, { useEffect, useState } from 'react';
import { useForm, useWatch } from 'react-hook-form';
import { formatPrice } from 'utils';
import * as yup from 'yup';

import DeleteIcon from '@material-ui/icons/Delete';
import { useDispatch } from 'react-redux';
import { checkout, removeFromCart, setQuantity } from 'features/Cart/cartSlice';
const useStyles = makeStyles((theme) => ({
  root: {
    display: 'flex',
  },

  boxInfo: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
  },

  tempPrice: {
    fontWeight: 'bold',
    color: 'red',
  },
}));

function CartItem({ product = {}, cartTotalChange = null }) {
  const classes = useStyles();
  const thumbnailUrl = product.product.thumbnail
    ? `${STATIC_HOST}${product.product.thumbnail.url}`
    : THUMBNAIL_PLACEHOLDER;
  const [itemTotalPrice, setItemTotalPrice] = useState(() => {
    return product.quantity * product.product.salePrice;
  });
  const [checked, setChecked] = useState(false);

  const dispatch = useDispatch();

  const handleChange = (event) => {
    setChecked(event.target.checked);
    dispatch(checkout(product.id));
  };

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
      quantity: product.quantity,
    },
    resolver: yupResolver(schema),
  });

  const { setValue, register, watch, control } = form;

  const quantityFieldValue = useWatch({ control, name: 'quantity' });

  useEffect(() => {
    setValue('quantity', quantityFieldValue);
    setItemTotalPrice(quantityFieldValue * product.product.salePrice);
    dispatch(setQuantity({ id: product.id, quantity: quantityFieldValue }));
  }, [setValue, setItemTotalPrice, quantityFieldValue, product.product.salePrice, dispatch, product.id]);

  const handleRemoveCartItem = () => {
    dispatch(removeFromCart(product.id));
  };

  return (
    <Box padding={1} className={classes.root}>
      <Checkbox
        checked={checked}
        color="primary"
        inputProps={{ 'aria-label': 'secondary checkbox' }}
        onChange={handleChange}
      />
      <Box padding={1} maxWidth="100px">
        <img src={thumbnailUrl} alt={product.product.name} width="100%" />
      </Box>
      <Box className={classes.boxInfo}>
        <Typography variant="body2">{product.product.name}</Typography>

        <Typography variant="body2">
          <Box component="span" fontSize="16px" fontWeight="bold" mr={1}>
            {formatPrice(product.product.salePrice)}
          </Box>
        </Typography>
        <QuantityField name="quantity" form={form} register={register} watch={watch} control={control} />
        <Button onClick={handleRemoveCartItem}>
          <DeleteIcon />
        </Button>

        <Typography variant="body2" className={classes.tempPrice}>
          {formatPrice(itemTotalPrice)}
        </Typography>
      </Box>
    </Box>
  );
}

CartItem.propTypes = {
  product: PropTypes.object,
  cartTotalChange: PropTypes.func,
};

export default CartItem;