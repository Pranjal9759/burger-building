import * as actionTypes from './actionTypes';
import axios from '../../axios-orders';

export const addIngredient = (name) =>{
    return{
        type : actionTypes.ADD_INGREDIENT,
        ingredientName : name
    }
}

export const removeIngredient = (name) =>{
    return{
        type : actionTypes.REMOVE_INGREDIENT,
        ingredientName : name
    }
}

export const setIngredients = (ingredients) => {
    return{
        type : actionTypes.SET_INGREDIENTS,
        ingredient : ingredients
    }
}

export const fetchIngredient_failde = () => {
    return {
        type: actionTypes.FETCH_INGREDIENT_FAILED
    }
}

export const initIngredients = () => {
    return dispatch =>{
        
        axios.get('https://react-my-burger-5a06f-default-rtdb.firebaseio.com/ingredients.json')
            .then(response => {
                dispatch(setIngredients(response.data))
            })
            .catch(error =>{
                dispatch(fetchIngredient_failde())
            })
    }
}