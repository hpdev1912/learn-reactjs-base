import { Tab, Tabs } from '@material-ui/core';
import PropTypes from 'prop-types';
import React from 'react';

function ProductSort({ currentSort, onChange }) {
  const handleSortChange = (event, newValue) => {
    if (onChange) onChange(newValue);
  };
  return (
    <Tabs
      value={currentSort}
      indicatorColor="primary"
      textColor="primary"
      onChange={handleSortChange}
      aria-label="disabled tabs example"
    >
      <Tab label="Giá thấp đến cao" value="salePrice:ASC" />
      <Tab label="Giá cao đến thấp" value="salePrice:DESC" />
    </Tabs>
  );
}

ProductSort.propTypes = {
  currentSort: PropTypes.string.isRequired,
  onChange: PropTypes.func,
};

export default ProductSort;
