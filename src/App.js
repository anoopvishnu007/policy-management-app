import React, { Component } from 'react';
import { Route, Switch, withRouter, Redirect } from 'react-router-dom';
import { connect } from 'react-redux';
import asyncComponent from './hoc/asyncComponent/asyncComponent';
import Layout from './hoc/Layout/Layout';
import Logout from './components/Auth/Logout/Logout';
import * as actions from './store/actions/index';
import PolicyHome from './containers/Policies/Policy/PolicyHome';
import  './App.module.css';

 

const asyncAuth = asyncComponent(() => {
  return import('./containers/Auth/Auth');
});
const asyncSignUp = asyncComponent(() => {
  return import('./components/User/Signup');
});
const asyncPolicies = asyncComponent(() => {
  return import('./components/Policies/Policies');
});
const asyncPurchasePolicies = asyncComponent(() => {
  return import('./components/Policies/PurchasePolicies');
});

class App extends Component {
  componentDidMount () {
    this.props.onTryAutoSignup();
  }

 
  render() {

    let routes = (
      <Switch>
        <Route path="/login" component={asyncAuth} />
        <Route path='/signup' component={ asyncSignUp }/>
        <Route path="/" exact component={PolicyHome} />
        <Redirect to="/"/>
      </Switch>
    );

    if ( this.props.isAuthenticated ) {
      routes = (
        <Switch>
          <Route path="/logout" component={Logout} />
          <Route path='/signup' component={ asyncSignUp }/>
          <Route path='/purchase' component={ asyncPurchasePolicies }/>
          <Route path='/policies' component={ asyncPolicies }/>
          <Route path="/" exact component={PolicyHome} />           
          <Redirect to="/"/>
        </Switch>
          
      );
    }
    return (
      <div>
        <Layout>
          {routes}
        </Layout>
      </div>
    );     
  }
}
const mapStateToProps = state => {
  return {
    isAuthenticated: state.auth.token !== null
  };
};

const mapDispatchToProps = dispatch => {
  return {
    onTryAutoSignup: () => dispatch( actions.authCheckState() )
  };
};

export default withRouter( connect( mapStateToProps, mapDispatchToProps )( App ) );