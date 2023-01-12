import React from 'react';
import PropTypes from 'prop-types';

import Album from '../Album';
import './styles.scss';

const AlbumList = ({ albumList }) => {
  return (
    <ul className="album-list">
      {albumList.map((album) => (
        <li key={album.id}>
          <Album album={album} />
        </li>
      ))}
    </ul>
  );
};

AlbumList.propTypes = {
  albumList: PropTypes.array.isRequired,
};

export default AlbumList;
