import { BurgerBuilder} from './Burgerbuilder';
import BuildControls from '../../Components/Burger/BuildControls/BuildControls'

import React from 'react';
import { configure, shallow } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';

configure({adapter : new Adapter()})

describe('<BurgerBuilder/>',() => {
    let wrapper;

    beforeEach(() => {
        wrapper = shallow(<BurgerBuilder onInitIngredients={() => {}}/>)
    })

    it('should render <buildControls/> when receiving ingredients', () => {
        wrapper.setProps({ings : {salad : 0}})
        expect(wrapper.find(BuildControls)).toHaveLength(1)
    })
})