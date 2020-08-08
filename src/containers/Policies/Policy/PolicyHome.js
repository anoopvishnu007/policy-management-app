import React, { Component } from 'react';
import { connect } from 'react-redux';

import Aux from '../../../hoc/Ax/Ax';
import withErrorHandler from '../../../hoc/withErrorHandler/withErrorHandler';
import * as actions from '../../../store/actions/index';
import axios from '../../../axios-customers';
import Policies from '../../../components/Policies/Policies';

export class PolicyHome extends Component {
    

    render () {
         
        return (
                 <Aux> 
                {this.props.isAuthenticated? <nav>
                <Policies/>  
                </nav>  : 
                <nav>
                    Please Signin / Signup for managing polcies.
                </nav>
                } 
            </Aux>       
        );
    }
}

const mapStateToProps = state => {
    return {
      loading: state.signup.loading,    
      token: state.auth.token,
      isAuthenticated: state.auth.token !== null,
      userId: state.auth.userId
    };
  };

const mapDispatchToProps = dispatch => {
    return {      
        onSetAuthRedirectPath: (path) => dispatch(actions.setAuthRedirectPath(path))
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(withErrorHandler( PolicyHome, axios ));