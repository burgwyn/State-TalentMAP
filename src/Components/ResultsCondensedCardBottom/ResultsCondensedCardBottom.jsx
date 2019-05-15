import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { get } from 'lodash';
import { Flag } from 'flag';
import CondensedCardData from '../CondensedCardData';
import { POSITION_DETAILS, FAVORITE_POSITIONS_ARRAY } from '../../Constants/PropTypes';
import Favorite from '../../Containers/Favorite';
import BidListButton from '../../Containers/BidListButton';
import PermissionsWrapper from '../../Containers/PermissionsWrapper';
import ResultsCondensedCardStats from '../ResultsCondensedCardStats';
import CompareCheck from '../CompareCheck';

class ResultsCondensedCardBottom extends Component {
  constructor(props) {
    super(props);
    this.renderStats = this.renderStats.bind(this);
    this.renderBidListButton = this.renderBidListButton.bind(this);
  }
  renderStats() {
    const { showBidCount, position } = this.props;
    return showBidCount ?
      <ResultsCondensedCardStats bidStatisticsArray={position.bid_statistics} />
    :
    null;
  }
  renderBidListButton() {
    const { showBidListButton, position } = this.props;
    return showBidListButton ?
      <PermissionsWrapper permissions="bidder">
        <BidListButton
          id={position.id}
          disabled={!get(position, 'availability.availability', true)}
        />
      </PermissionsWrapper>
    :
    null;
  }
  render() {
    const { position,
        favorites,
        favoritesPV,
        refreshFavorites,
        useShortFavButton,
        showCompareButton,
        isProjectedVacancy,
      } = this.props;
    return (
      <div className="condensed-card-bottom-container">
        <div className="usa-grid-full condensed-card-bottom">
          <Flag
            name="flags.bidding"
            render={this.renderStats}
          />
          <CondensedCardData position={position} />
          <div className="usa-grid-full condensed-card-buttons-section">
            <Favorite
              useLongText
              hideText={useShortFavButton}
              hasBorder
              refKey={position.id}
              isPV={position.isPV}
              compareArray={position.isPV ? favoritesPV : favorites}
              useButtonClass={!useShortFavButton}
              useButtonClassSecondary={useShortFavButton}
              refresh={refreshFavorites}
            />
            <Flag
              name="flags.bidding"
              render={this.renderBidListButton}
            />
            {
              showCompareButton && !isProjectedVacancy &&
              <CompareCheck as="div" refKey={position.position_number} />
            }
          </div>
        </div>
      </div>
    );
  }
}

ResultsCondensedCardBottom.propTypes = {
  position: POSITION_DETAILS.isRequired,
  favorites: FAVORITE_POSITIONS_ARRAY.isRequired,
  favoritesPV: FAVORITE_POSITIONS_ARRAY.isRequired,
  refreshFavorites: PropTypes.bool,
  showBidListButton: PropTypes.bool,
  showBidCount: PropTypes.bool,
  useShortFavButton: PropTypes.bool,
  showCompareButton: PropTypes.bool,
  isProjectedVacancy: PropTypes.bool,
};

ResultsCondensedCardBottom.defaultProps = {
  type: 'default',
  refreshFavorites: false,
  showBidListButton: false,
  showBidCount: true,
  useShortFavButton: false,
  showCompareButton: false,
  isProjectedVacancy: false,
};

export default ResultsCondensedCardBottom;
