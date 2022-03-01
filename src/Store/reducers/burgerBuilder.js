import * as actionTypes from '../actions/actionTypes';

const initialState = {
    ingredient:null,
    totalPrice: 4,
    error: false,
    building : false
}

const INGREDIENT_PRICES = {
    salad: 0.5,
    cheese: 0.4,
    meat: 1.3,
    bacon: 0.7,
}

const reducer = (state = initialState, action) => {
    switch (action.type) {
        case actionTypes.ADD_INGREDIENT:
            return {
                ...state,
                ingredient: {
                    ...state.ingredient,
                    [action.ingredientName]: state.ingredient[action.ingredientName] + 1
                },
                totalPrice: state.totalPrice + INGREDIENT_PRICES[action.ingredientName],
                building:true
            }
        case actionTypes.REMOVE_INGREDIENT:
            return {
                ...state,
                ingredient: {
                    ...state.ingredient,
                    [action.ingredientName]: state.ingredient[action.ingredientName] - 1
                },
                totalPrice: state.totalPrice - INGREDIENT_PRICES[action.ingredientName],
                building:true
            }
        case actionTypes.SET_INGREDIENTS:
            return{
                ...state,
                ingredient : action.ingredient,
                totalPrice : 4,
                error : false,
                building : false
            }
        case actionTypes.FETCH_INGREDIENT_FAILED:
            return{
                ...state,
                error : true
            }
        default:
            return state
    }
}

export default reducer;