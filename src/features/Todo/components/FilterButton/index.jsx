import React from 'react';
import PropTypes from 'prop-types';

const FilterButton = ({ buttonName, handleFilterClick }) => {
  const handleButtonClick = (buttonName) => {
    if (!handleFilterClick) return;

    handleFilterClick(buttonName);
  };
  return (
    <div>
      <button className="filter-button" onClick={handleButtonClick}>
        {buttonName}
      </button>
    </div>
  );
};

FilterButton.propTypes = {
  buttonName: PropTypes.string,
};

export default FilterButton;
