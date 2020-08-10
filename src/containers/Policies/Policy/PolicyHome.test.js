import React from 'react';

import { configure, shallow } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
import { PolicyHome } from './policyhome';
import Policies from '../../../components/Policies/Policies';

 

configure({adapter: new Adapter()});

describe('<PolicyHome />', () => {
    let wrapper;
    
    beforeEach(() => {
        wrapper = shallow(<PolicyHome />);
    });

    it('should render <PolicyHome /> when login', () => {
        wrapper.setProps({
            isAuthenticated: true
        });
         expect(wrapper.find(Policies)).toHaveLength(1);
    });
});