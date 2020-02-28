import axios from 'axios';
import { get, isArray } from 'lodash';
import { clientBidListFetchDataSuccess } from './bidList';
import api from '../api';

export function userProfilePublicHasErrored(bool) {
  return {
    type: 'USER_PROFILE_PUBLIC_HAS_ERRORED',
    hasErrored: bool,
  };
}

export function userProfilePublicIsLoading(bool) {
  return {
    type: 'USER_PROFILE_PUBLIC_IS_LOADING',
    isLoading: bool,
  };
}

export function userProfilePublicFetchDataSuccess(userProfile) {
  return {
    type: 'USER_PROFILE_PUBLIC_FETCH_DATA_SUCCESS',
    userProfile,
  };
}

export function unsetUserProfilePublic() {
  return (dispatch) => {
    dispatch(userProfilePublicFetchDataSuccess({}));
  };
}

// include an optional bypass for when we want to silently update the profile
export function userProfilePublicFetchData(id, bypass) {
  return (dispatch, getState) => {
    if (!bypass) {
      dispatch(userProfilePublicIsLoading(true));
      dispatch(userProfilePublicHasErrored(false));
    }

    /**
     * create functions to fetch user's profile and other data
     */
    // profile
    const getUserAccount = () => api().get(`/fsbid/client/${id}/`);

    // bids
    const getUserBids = () => api().get(`/fsbid/cdo/client/${id}/`);

    // use api' Promise.all to fetch the profile, assignments and any other requests we
    // might add in the future
    axios.all([getUserAccount(), getUserBids()])
      .then(axios.spread((acct, bids) => {
        // form the userProfile object
        const acct$ = get(acct, 'data', {});
        if (!get(acct$, 'perdet_seq_number')) {
          dispatch(userProfilePublicHasErrored(true));
          dispatch(userProfilePublicIsLoading(false));
        } else {
          const newProfileObject = {
            ...acct$,
            user: {
              username: acct$.employee_id,
              email: null,
              first_name: acct$.name,
              last_name: null,
            },
            bidList: get(bids, 'data.results', []),
            // any other profile info we want to add in the future
          };

          // then perform dispatches
          dispatch(userProfilePublicFetchDataSuccess(newProfileObject));
          dispatch(userProfilePublicIsLoading(false));
          dispatch(userProfilePublicHasErrored(false));

          // Set this user's bid list to the clientView's bid list, if they are the same user.
          const clientView = get(getState(), 'clientView');
          const selectedEmpId = get(clientView, 'client.employee_id');
          const empId = get(newProfileObject, 'employee_id');
          if (empId && selectedEmpId &&
            empId === selectedEmpId && isArray(newProfileObject.bidList)) {
            dispatch(clientBidListFetchDataSuccess({ results: newProfileObject.bidList }));
          }
        }
      }))
      .catch(() => {
        dispatch(userProfilePublicHasErrored(true));
        dispatch(userProfilePublicIsLoading(false));
      });
  };
}