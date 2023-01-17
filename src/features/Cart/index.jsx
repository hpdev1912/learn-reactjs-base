import { Box, Container, Grid, makeStyles, Paper } from '@material-ui/core';
import CartItem from 'features/Product/components/CartItem';
import CartTotal from 'features/Product/components/CartTotal';
import React from 'react';
import { useSelector } from 'react-redux';
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
}));

function CartFeature(props) {
  const classes = useStyles();
  const cartItemList = useSelector(cartItemSelector);

  const cartTotal = useSelector(cartTotalSelector);

  return (
    <Box className={classes.root}>
      <Container>
        <Paper elevation={0}>
          <Grid container>
            <Grid item xs={9} className={classes.left}>
              {cartItemList.map((item) => (
                <CartItem key={item.id} product={item} />
              ))}
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
