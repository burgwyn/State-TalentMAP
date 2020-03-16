import React from 'react';
import { shallow } from 'enzyme';
import CheckboxList from './CheckboxList';

describe('CheckboxList', () => {
  const props = {
    clientClassifications: ['3', 'T', 'C'],
    list: [
      {
        code: '3',
        text: '3rd Tour Bidders',
        disabled_ind: false,
      },
      {
        code: '4',
        text: 'Tenured',
        disabled_ind: false,
      },
      {
        code: 'D',
        text: 'Differential Bidder',
        disabled_ind: false,
      },
      {
        code: 'T',
        text: 'Tandem Bidder',
        disabled_ind: false,
      },
      {
        code: 'M',
        text: 'Meritorious Step Increases',
        disabled_ind: false,
      },
      {
        code: '6',
        text: '6/8 Rule',
        disabled_ind: false,
      },
      {
        code: 'F',
        text: 'Fair Share Bidders',
        disabled_ind: false,
      },
      {
        code: 'C',
        text: 'Critical Need Language',
        disabled_ind: false,
      },
      {
        code: 'C1',
        text: 'Critical Need Language 1st Tour Complete',
        disabled_ind: false,
      },
      {
        code: 'CC',
        text: 'Critical Need Language Final Tour Complete',
        disabled_ind: false,
      },
      {
        code: 'R',
        text: 'Recommended for Tenure',
        disabled_ind: false,
      },
      {
        code: 'A',
        text: 'Ambassador or Deputy Assistant Secretary',
        disabled_ind: false,
      },
      {
        code: 'F1',
        text: 'Pickering Fellows',
        disabled_ind: false,
      },
      {
        code: 'F2',
        text: 'Rangel Fellows',
        disabled_ind: false,
      },
      {
        code: 'P',
        text: 'Pickering/Rangel Fellows',
        disabled_ind: false,
      },
    ],
  };

  it('is defined', () => {
    const wrapper = shallow(<CheckboxList
      {...props}
    />);
    expect(wrapper).toBeDefined();
  });

  it('is defined when isDisabled is true', () => {
    const wrapper = shallow(<CheckboxList
      {...props}
      isDisabled
    />);
    expect(wrapper).toBeDefined();
  });
});
