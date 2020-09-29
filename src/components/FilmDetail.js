/* eslint-disable react/prop-types */
import React from 'react';
import PropTypes from 'prop-types';

import styles from './FilmDetail.module.css';

import FilmSummary from './FilmSummary';

function FilmDetail(props) {
  return (
    <div className={styles.detail}>
      <div className={styles.poster}>
        <img
          alt={props.title}
          src={`http://image.tmdb.org/t/p/w185${props.poster_path}`}
        />
      </div>
      <div>
        <FilmSummary {...props} />
        <hr />
        <p>{props.overview}</p>
      </div>
    </div>
  );
}

// Copy and extend FilmSummary's PropTypes
FilmDetail.propTypes = {
  ...FilmSummary.propTypes,
  overview: PropTypes.string.isRequired,
  poster_path: PropTypes.string,
};

FilmDetail.defaultProps = { ...FilmSummary.defaultProps };

export default FilmDetail;
