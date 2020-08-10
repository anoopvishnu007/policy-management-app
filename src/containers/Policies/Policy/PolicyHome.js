import React, { Component } from 'react';
import { connect } from 'react-redux';

import Aux from '../../../hoc/Ax/Ax';
import withErrorHandler from '../../../hoc/withErrorHandler/withErrorHandler';
import * as actions from '../../../store/actions/index';
import axios from '../../../axios-customers';
import Policies from '../../../components/Policies/Policies';
import CssBaseline from '@material-ui/core/CssBaseline';
import Container from '@material-ui/core/Container';
import classes from './PolicyHome.module.css';
import Avatar from '@material-ui/core/Avatar';
import LockOutlinedIcon from '@material-ui/icons/LockOutlined';
import Typography from '@material-ui/core/Typography';

export class PolicyHome extends Component {
    
    
    render () {
         
        return (
                 <Aux> 
                {this.props.isAuthenticated? <nav>
                <Policies/>  
                </nav>  : 
                <nav>
                    <Container component="main" maxWidth="xs">
                    <CssBaseline />
                    <div className={classes.paper}>
                        <Avatar className={classes.avatar}>
                            <LockOutlinedIcon />
                        </Avatar>
                        <Typography component="h1" variant="h5">
                            Please Signin / Signup for managing policies.
                        </Typography>
                        
                    </div>
                    </Container>
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