import { shallow } from 'enzyme';
import React from 'react';
import toJSON from 'enzyme-to-json';
import ResultsCondensedCardBottom from './ResultsCondensedCardBottom';
import resultsObject from '../../__mocks__/resultsObject';
import bidListObject from '../../__mocks__/bidListObject';
import { bidderUserObject } from '../../__mocks__/userObject';

describe('ResultsCondensedCardBottomComponent', () => {
  const type = 'default';
  const favorites = bidderUserObject.favorite_positions;
  it('is defined', () => {
    const wrapper = shallow(
      <ResultsCondensedCardBottom
        position={resultsObject.results[0]}
        bidList={bidListObject.results}
        favorites={favorites}
      />,
    );
    expect(wrapper).toBeDefined();
  });

  it('can receive props', () => {
    const wrapper = shallow(
      <ResultsCondensedCardBottom
        position={resultsObject.results[0]}
        bidList={bidListObject.results}
        favorites={favorites}
      />,
    );
    expect(wrapper.instance().props.type).toBe(type);
  });

  it('does not render the bid stats when showBidCount === false', () => {
    const wrapper = shallow(
      <ResultsCondensedCardBottom
        position={resultsObject.results[0]}
        bidList={bidListObject.results}
        favorites={favorites}
        showBidCount={false}
      />,
    );
    expect(wrapper.find('ResultsCondensedCardStats').exists()).toBe(false);
  });

  it('matches snapshot', () => {
    const wrapper = shallow(
      <ResultsCondensedCardBottom
        position={resultsObject.results[0]}
        bidList={bidListObject.results}
        favorites={favorites}
      />,
    );
    expect(toJSON(wrapper)).toMatchSnapshot();
  });

  it('matches snapshot with bidlist button', () => {
    const wrapper = shallow(
      <ResultsCondensedCardBottom
        position={resultsObject.results[0]}
        bidList={bidListObject.results}
        favorites={favorites}
        showBidListButton
      />,
    );
    expect(toJSON(wrapper)).toMatchSnapshot();
  });
});
