import React, { useEffect,Suspense } from 'react';
import BurgerBuilder from './Containers/BurgerBuilder/Burgerbuilder';
import Layout from './Components/Layout/Layout';
import { Route, Switch, withRouter, Redirect } from 'react-router-dom';
import Logout from './Containers/Auth/Logout/logout';
import { connect } from 'react-redux';
import * as actions from './Store/actions/index';

const Checkout = React.lazy(() => {
  return import('./Containers/Checkout/Checkout')
});

const Orders = React.lazy(() => {
  return import('./Containers/Orders/Orders')
});

const Auth = React.lazy(() => {
  return import('./Containers/Auth/auth')
});

const app = props => {
  const {onTryAutoSignUp} = props
  
  useEffect(() => {
    onTryAutoSignUp()
  }, [])

    let routes = (
      <Switch>
        <Route path='/auth' render={(props) => <Auth {...props}/>} />
        <Route path='/' exact component={BurgerBuilder} />
        <Redirect to='/'/>
      </Switch>
    )
    if (props.isAuthenticated) {
      routes = (
      <Switch>
        <Route path='/checkout' render={(props) => <Checkout {...props}/>} />
        <Route path='/orders' render={(props) => <Orders {...props}/>} />
        <Route path='/logout' component={Logout} />
        <Route path='/auth' render={(props) => <Auth {...props}/>} />
        <Route path='/' exact component={BurgerBuilder} />
        <Redirect to='/'/>
      </Switch> )
    }

    return (
      <div>
        <Layout>
          <Suspense fallback={<p>Loading....</p>}>{routes}</Suspense>
        </Layout>
      </div>
    );
}

const mapStateToProps = state => {
  return {
    isAuthenticated: state.auth.token !== null
  }
}

const mapDispatchToProps = dispatch => {
  return {
    onTryAutoSignUp: () => dispatch(actions.authCheckState())
  }
}

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(app));
