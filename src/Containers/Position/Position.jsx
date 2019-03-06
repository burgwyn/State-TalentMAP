import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { push } from 'react-router-redux';
import { withRouter } from 'react-router';
import PositionDetails from '../../Components/PositionDetails/PositionDetails';
// Actions
import { positionDetailsFetchData } from '../../actions/positionDetails';
import { putHighlightedPosition, deleteHighlightPosition } from '../../actions/highlightPosition';
import { getLastRouteLink } from '../../actions/routerLocations';
import { bidListFetchData } from '../../actions/bidList';
import {
  editDescriptionContent,
  editPocContent,
  editWebsiteContent,
  resetMessages,
} from '../../actions/descriptionEdit';

import { LOGIN_REDIRECT } from '../../login/routes';
import { DEFAULT_HIGHLIGHT_POSITION } from '../../Constants/DefaultProps';
import {
  POSITION_DETAILS,
  ROUTER_LOCATIONS,
  USER_PROFILE,
  BID_LIST,
  BID_LIST_TOGGLE_HAS_ERRORED,
  BID_LIST_TOGGLE_SUCCESS,
  DESCRIPTION_EDIT_HAS_ERRORED,
  EMPTY_FUNCTION,
  HIGHLIGHT_POSITION,
} from '../../Constants/PropTypes';

class Position extends Component {
  constructor(props) {
    super(props);
    this.editDescriptionContent = this.editDescriptionContent.bind(this);
    this.editPocContent = this.editPocContent.bind(this);
    this.editWebsiteContent = this.editWebsiteContent.bind(this);
  }

  componentWillMount() {
    if (!this.props.isAuthorized()) {
      this.props.onNavigateTo(LOGIN_REDIRECT);
    } else {
      this.getDetails(this.props.match.params.id);
      this.props.fetchBidList();
    }
  }

  getDetails(id) {
    this.props.fetchData(id);
  }

  editDescriptionContent(content) {
    this.props.editDescriptionContent(this.props.positionDetails.description.id, content);
  }

  editPocContent(content) {
    this.props.editPocContent(this.props.positionDetails.description.id, content);
  }

  editWebsiteContent(content) {
    this.props.editWebsiteContent(this.props.positionDetails.description.id, content);
  }

  render() {
    const {
      positionDetails,
      isLoading,
      hasErrored,
      routerLocations,
      userProfile,
      userProfileIsLoading,
      bidList,
      bidListHasErrored,
      bidListIsLoading,
      bidListToggleHasErrored,
      bidListToggleIsLoading,
      bidListToggleSuccess,
      descriptionEditHasErrored,
      descriptionEditIsLoading,
      descriptionEditSuccess,
      resetDescriptionEditMessages,
      highlightPosition,
      onHighlight,
    } = this.props;

    return (
      <PositionDetails
        details={positionDetails}
        isLoading={isLoading}
        hasErrored={hasErrored}
        goBackLink={getLastRouteLink(routerLocations)}
        userProfile={userProfile}
        userProfileIsLoading={userProfileIsLoading}
        bidList={bidList}
        bidListHasErrored={bidListHasErrored}
        bidListIsLoading={bidListIsLoading}
        bidListToggleHasErrored={bidListToggleHasErrored}
        bidListToggleIsLoading={bidListToggleIsLoading}
        bidListToggleSuccess={bidListToggleSuccess}
        editDescriptionContent={this.editDescriptionContent}
        editPocContent={this.editPocContent}
        editWebsiteContent={this.editWebsiteContent}
        descriptionEditHasErrored={descriptionEditHasErrored}
        descriptionEditIsLoading={descriptionEditIsLoading}
        descriptionEditSuccess={descriptionEditSuccess}
        resetDescriptionEditMessages={resetDescriptionEditMessages}
        highlightPosition={highlightPosition}
        onHighlight={onHighlight}
      />
    );
  }
}

Position.contextTypes = {
  router: PropTypes.object,
};

Position.propTypes = {
  onNavigateTo: PropTypes.func.isRequired,
  match: PropTypes.shape({
    params: PropTypes.shape({
      id: PropTypes.string,
    }),
  }).isRequired,
  fetchData: PropTypes.func,
  hasErrored: PropTypes.bool,
  isLoading: PropTypes.bool,
  positionDetails: POSITION_DETAILS,
  isAuthorized: PropTypes.func.isRequired,
  routerLocations: ROUTER_LOCATIONS,
  userProfile: USER_PROFILE,
  userProfileIsLoading: PropTypes.bool,
  fetchBidList: PropTypes.func,
  bidListHasErrored: PropTypes.bool,
  bidListIsLoading: PropTypes.bool,
  bidList: BID_LIST,
  bidListToggleHasErrored: BID_LIST_TOGGLE_HAS_ERRORED,
  bidListToggleIsLoading: PropTypes.bool,
  bidListToggleSuccess: BID_LIST_TOGGLE_SUCCESS,
  editDescriptionContent: PropTypes.func.isRequired,
  editPocContent: PropTypes.func.isRequired,
  editWebsiteContent: PropTypes.func.isRequired,
  descriptionEditHasErrored: DESCRIPTION_EDIT_HAS_ERRORED,
  descriptionEditIsLoading: PropTypes.bool,
  descriptionEditSuccess: PropTypes.bool,
  resetDescriptionEditMessages: PropTypes.func.isRequired,
  highlightPosition: HIGHLIGHT_POSITION,
  onHighlight: PropTypes.func.isRequired,
};

Position.defaultProps = {
  positionDetails: {},
  fetchData: EMPTY_FUNCTION,
  hasErrored: false,
  isLoading: true,
  routerLocations: [],
  userProfile: {},
  userProfileIsLoading: false,
  fetchBidList: EMPTY_FUNCTION,
  bidList: { results: [] },
  bidListHasErrored: false,
  bidListIsLoading: false,
  bidListToggleHasErrored: false,
  bidListToggleIsLoading: false,
  bidListToggleSuccess: false,
  editDescriptionContent: EMPTY_FUNCTION,
  editPocContent: EMPTY_FUNCTION,
  editWebsiteContent: EMPTY_FUNCTION,
  descriptionEditHasErrored: false,
  descriptionEditIsLoading: false,
  descriptionEditSuccess: false,
  highlightPosition: DEFAULT_HIGHLIGHT_POSITION,
  onHighlight: EMPTY_FUNCTION,
};

const mapStateToProps = (state, ownProps) => ({
  positionDetails: state.positionDetails,
  hasErrored: state.positionDetailsHasErrored,
  isLoading: state.positionDetailsIsLoading,
  routerLocations: state.routerLocations,
  id: ownProps,
  userProfile: state.userProfile,
  userProfileIsLoading: state.userProfileIsLoading,
  bidListHasErrored: state.bidListHasErrored,
  bidListIsLoading: state.bidListIsLoading,
  bidList: state.bidListFetchDataSuccess,
  bidListToggleHasErrored: state.bidListToggleHasErrored,
  bidListToggleIsLoading: state.bidListToggleIsLoading,
  bidListToggleSuccess: state.bidListToggleSuccess,
  descriptionEditHasErrored: state.descriptionEditHasErrored,
  descriptionEditIsLoading: state.descriptionEditIsLoading,
  descriptionEditSuccess: state.descriptionEditSuccess,
  highlightPosition: state.highlightPosition,
});

export const mapDispatchToProps = dispatch => ({
  fetchData: id => dispatch(positionDetailsFetchData(id)),
  onNavigateTo: dest => dispatch(push(dest)),
  fetchBidList: () => dispatch(bidListFetchData()),
  editDescriptionContent: (id, content) => dispatch(editDescriptionContent(id, content)),
  editPocContent: (id, content) => dispatch(editPocContent(id, content)),
  editWebsiteContent: (id, content) => dispatch(editWebsiteContent(id, content)),
  resetDescriptionEditMessages: () => dispatch(resetMessages()),
  onHighlight: (id, checked) =>
    dispatch((checked ? putHighlightedPosition : deleteHighlightPosition)(id)),
});

export default connect(mapStateToProps, mapDispatchToProps)(withRouter(Position));
