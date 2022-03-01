import React, { useState, useEffect, useCallback } from 'react';
import Aux from '../../hoc/Auxillary';
import Burger from '../../Components/Burger/Burger';
import BuildControls from '../../Components/Burger/BuildControls/BuildControls';
import Modal from '../../Components/UI/MODAL/Modal';
import OrderSummary from '../../Components/Burger/OrderSummary/OrderSummary';
import axios from '../../axios-orders';
import Spinner from '../../Components/UI/Spinner/Spinner';
import withErrorHandler from '../../hoc/withErrorHandler/withErrorHandler';
import { useDispatch, useSelector } from 'react-redux';
import * as actions from '../../Store/actions/index';

export const burgerBuilder = props => {
    const [purchasing, setPurchasing] = useState(false)
    const dispatch = useDispatch()

    const ings = useSelector(state => {
        return state.burgerBuilder.ingredient
    })

    const price = useSelector(state => {
        return state.burgerBuilder.totalPrice
    })

    const error = useSelector(state => {
        return state.burgerBuilder.error
    })

    const isAuthenticated = useSelector(state => {
        return state.auth.token !== null
    })

    const onIngredientAdded = (ingName) => dispatch(actions.addIngredient(ingName))
    const onIngredientRemoved = (ingName) => dispatch(actions.removeIngredient(ingName))
    const onInitIngredients = useCallback(() => dispatch(actions.initIngredients()),[])
    const onInitPurchase = () => dispatch(actions.purchaseInit())
    const onSetAuthRedirectPath = (path) => dispatch(actions.setAuthRedirectPath(path))

    useEffect(() => {
        onInitIngredients()
    }, [onInitIngredients])

    const purchaseHandler = () => {
        if (isAuthenticated) {
            setPurchasing(true)
        } else {
            onSetAuthRedirectPath('/checkout')
            props.history.push('/auth')
        }

    }

    const purchaseCancelHandler = () => {
        setPurchasing(false)
    }

    const purchaseContinueHandler = () => {
        // alert('You Continue');

        // const queryParams = [];
        // for(let i in this.state.ingredient){
        //     queryParams.push(encodeURIComponent(i)+'='+encodeURIComponent(this.state.ingredient[i]));
        // }
        // queryParams.push('price='+this.state.totalPrice)
        // const querystring = queryParams.join('&')
        onInitPurchase();
        props.history.push('/checkout')
    }

    const updatePurchaseState = (ingredients) => {
        const sum = Object.keys(ingredients)
            .map(igkey => {
                return ingredients[igkey];
            })
            .reduce((sum, el) => {
                return sum + el;
            }, 0);
        return sum > 0;
    }

    const disabledInfo = {
        ...ings
    };
    for (let key in disabledInfo) {
        disabledInfo[key] = disabledInfo[key] <= 0
    }
    let orderSummary = null


    let burger = error ? <p>Ingredients can't be loaded</p> : <Spinner />
    if (ings) {
        burger = (<Aux>
            <Burger ingredient={ings} />
            <BuildControls
                ingredientAdded={onIngredientAdded}
                ingredientRemoved={onIngredientRemoved}
                disabled={disabledInfo}
                purchaseable={updatePurchaseState(ings)}
                isAuth={isAuthenticated}
                ordered={purchaseHandler}
                price={price} />
        </Aux>);
        orderSummary = <OrderSummary
            ingredients={ings}
            price={price}
            purchaseCancelled={purchaseCancelHandler}
            purchaseContinued={purchaseContinueHandler} />
    }



    return (
        <Aux>
            <Modal show={purchasing} modalClosed={purchaseCancelHandler}>
                {orderSummary}
            </Modal>
            {burger}

        </Aux>
    );
}

export default withErrorHandler(burgerBuilder, axios);