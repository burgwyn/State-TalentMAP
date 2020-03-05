import { shallow } from 'enzyme';
import React from 'react';
import toJSON from 'enzyme-to-json';
import Loading from './Loading';

describe('Loading', () => {
  it('is defined', () => {
    const wrapper = shallow(<Loading />);
    expect(wrapper).toBeDefined();
  });

  it('matches snapshot', () => {
    const wrapper = <Loading />;
    expect(toJSON(wrapper)).toMatchSnapshot();
  });
});
