import React from 'react';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';

const BidderPortfolioViewMore = ({ className, useLink, onClick, isExpanded }) => {
  const text = isExpanded ? 'Hide' : 'View More';
  const link = '/profile/dashboard/';
  return (
    <div>
      {
      useLink ?
        <div className="view-more-link-centered">
          <Link to={link}>
            {text}
          </Link>
        </div>
        :
        <div
          className={`usa-grid-full current-user-section-container
          view-more-link-centered section-padded-inner-container-narrow`}
        >
          <button onClick={onClick} className={className}>
            {text}
          </button>
        </div>
    }
    </div>
  );
};

BidderPortfolioViewMore.propTypes = {
  className: PropTypes.string,
  useLink: PropTypes.bool,
  onClick: PropTypes.func.isRequired,
  isExpanded: PropTypes.bool.isRequired,
};

BidderPortfolioViewMore.defaultProps = {
  className: 'unstyled-button',
  useLink: false,
};

export default BidderPortfolioViewMore;
