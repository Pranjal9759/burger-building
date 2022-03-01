import React from 'react';
import CheckoutSummary from '../../Components/Order/CheckoutSummary/CheckoutSummary';
import { Route, Redirect } from 'react-router-dom';
import ContactData from './ContactData/ContactData';
import { connect } from 'react-redux';

const checkout = props => {

    const checkoutCancelledHandler = () => {
        props.history.goBack()
    }
    const checkoutContinuedHandler = () => {
        props.history.replace('/checkout/contact-data');
    }

    let summary = <Redirect to='/' />

    if (props.ings) {
        const purchasedRedirect = props.purchased ? <Redirect to='/' /> : null
        summary = <div>
            {purchasedRedirect}
            <CheckoutSummary
                ingredient={props.ings}
                onCheckoutCancelled={checkoutCancelledHandler}
                onCheckoutContinued={checkoutContinuedHandler} />
            <Route
                path={props.match.path + '/contact-data'}
                component={ContactData} />
        </div>
    }
    return summary
}

const mapStateToprops = state => {
    return {
        ings: state.burgerBuilder.ingredient,
        purchased: state.order.purchased
    }
}


export default connect(mapStateToprops)(checkout);