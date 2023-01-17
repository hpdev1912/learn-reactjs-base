import React from 'react';
import PropTypes from 'prop-types';
import { Box, Button, makeStyles, Typography } from '@material-ui/core';
import { formatPrice } from 'utils';

const useStyles = makeStyles((theme) => ({
  root: {},

  box: {
    display: 'flex',
    justifyContent: 'space-between',

    marginBottom: theme.spacing(2),
  },

  totalPriceBox: {
    paddingTop: theme.spacing(1),
    borderTop: `1px solid ${theme.palette.grey[200]}`,
  },
}));

function CartTotal({ totalPice = 0 }) {
  const classes = useStyles();
  return (
    <Box>
      <Box className={classes.box}>
        <Typography>Tạm Tính</Typography>
        <Typography>{formatPrice(totalPice)}</Typography>
      </Box>
      <Box className={classes.box}>
        <Typography>Giảm giá</Typography>
        <Typography>0 đ</Typography>
      </Box>
      <Box className={`${classes.box} ${classes.totalPriceBox}`}>
        <Typography>Tổng tiền</Typography>
        <Typography>{formatPrice(totalPice)}</Typography>
      </Box>

      <Button type="submit" variant="contained" color="primary" size="large" style={{ width: '280px' }}>
        Mua Hàng
      </Button>
    </Box>
  );
}

CartTotal.propTypes = {
  totalPice: PropTypes.number,
};

export default CartTotal;
