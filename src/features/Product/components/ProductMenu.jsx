import { Box, Link, makeStyles } from '@material-ui/core';
import React from 'react';
import { NavLink, useRouteMatch } from 'react-router-dom';

const useStyles = makeStyles((theme) => ({
  root: {
    display: ' flex',
    flexFlow: 'row nowrap',
    justifyContent: 'center',
    alignItems: 'center',

    padding: 0,
    listStyleType: 'none',

    '& > li': {
      padding: theme.spacing(2, 4),
    },
    '& > li > a': {
      color: theme.palette.grey[700],
    },
    '& > li > a.active': {
      color: theme.palette.primary.main,
      textDecoration: 'underline',
    },
  },
}));

function ProductMenu() {
  const { url } = useRouteMatch();
  const classes = useStyles();
  return (
    <Box component="ul" className={classes.root}>
      <li>
        <Link component={NavLink} to={url} exact>
          Description
        </Link>
      </li>
      <li>
        <Link component={NavLink} to={`${url}/additional`} exact>
          Additional information
        </Link>
      </li>
      <li>
        <Link component={NavLink} to={`${url}/review`} exact>
          Review
        </Link>
      </li>
    </Box>
  );
}

ProductMenu.propTypes = {};

export default ProductMenu;
