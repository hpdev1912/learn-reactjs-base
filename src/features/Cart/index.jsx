import { Box, Button, Container, Grid, makeStyles, Paper } from '@material-ui/core';
import CartItem from 'features/Product/components/CartItem';
import CartTotal from 'features/Product/components/CartTotal';
import React from 'react';
import { useSelector } from 'react-redux';
import { useHistory } from 'react-router-dom';
import { cartItemSelector, cartTotalSelector } from './selectors';

const useStyles = makeStyles((theme) => ({
  root: {
    paddingBottom: theme.spacing(3),
  },
  left: {
    width: '400px',
    padding: theme.spacing(1.5),
    borderRight: `1px solid ${theme.palette.grey[300]}`,
  },
  right: {
    flex: '1 1 0',
    padding: theme.spacing(1.5),
  },
  emptyCartContainer: {
    backgroundColor: '#F8F8F8',
    display: 'flex',
    alignItems: 'center',
    paddingBottom: theme.spacing(2),
  },
  emptyCartImg: {
    margin: 'auto',
  },
  button: {
    display: 'block',
    margin: 'auto',
  },
}));

function CartFeature(props) {
  const classes = useStyles();
  const history = useHistory();
  const cartItemList = useSelector(cartItemSelector);

  const cartTotal = useSelector(cartTotalSelector);

  const isCartEmpty = cartItemList.length === 0;

  const handleContinueShoppingClick = () => {
    history.push('/products');
  };

  const emptyCartComponent = (
    <Box className={classes.emptyCartContainer}>
      <Box className={classes.emptyCartImg}>
        <img src="https://mir-s3-cdn-cf.behance.net/projects/404/95974e121862329.Y3JvcCw5MjIsNzIxLDAsMTM5.png" alt="" />
        <Button className={classes.button} variant="contained" color="primary" onClick={handleContinueShoppingClick}>
          Tiếp tục mua sắm
        </Button>
      </Box>
    </Box>
  );

  return (
    <Box className={classes.root}>
      <Container>
        <Paper elevation={0}>
          <Grid container>
            <Grid item xs={9} className={classes.left}>
              {!isCartEmpty
                ? cartItemList.map((item) => <CartItem key={item.id} product={item} />)
                : emptyCartComponent}
            </Grid>
            <Grid item xs={3} className={classes.right}>
              <CartTotal totalPice={cartTotal} />
            </Grid>
          </Grid>
        </Paper>
      </Container>
    </Box>
  );
}

CartFeature.propTypes = {};

export default CartFeature;
