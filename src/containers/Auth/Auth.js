import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Redirect } from 'react-router-dom';

 
import Spinner from '../../components/UI/Spinner/Spinner';
import classes from './Auth.module.css';
import * as actions from '../../store/actions/index';
 
import SignIn from '../../components/Auth/Login/Login';

class Auth extends Component {
    state={
        email:"",
        password:"",
        isSignup:false
    }
    constructor() {
        super();
        this.onChangeData = this.onChangeData.bind(this);
    }
    onChangeData(data) {
        console.log(data)
        this.setState({email:data.email,password:data.password, isSignup:false})
    }
    componentDidMount () {
        if ( this.props.authRedirectPath !== '/' ) {
            this.props.onSetAuthRedirectPath();
        }
    }

   

    submitHandler = ( event ) => {
        event.preventDefault();
        this.props.onAuth( this.state.email, this.state.password, this.state.isSignup );
    }

   

    render () {
         let form = <SignIn onChangeData={this.onChangeData}/>
        if ( this.props.loading ) {
            form = <Spinner />
        }

        let errorMessage = null;

        if ( this.props.error ) {
            errorMessage = (
                <p>{this.props.error.message}</p>
            );
        }

        let authRedirect = null;
        if ( this.props.isAuthenticated ) {
            authRedirect = <Redirect to={this.props.authRedirectPath} />
        }

        return (
            <div className={classes.Auth}>
                {authRedirect}
                {errorMessage}
                <form onSubmit={this.submitHandler}>
                     {form}                    
                </form>
                 
            </div>
        );
    }
}

const mapStateToProps = state => {
    return {
        loading: state.auth.loading,
        error: state.auth.error,
        isAuthenticated: state.auth.token !== null,
        authRedirectPath: state.auth.authRedirectPath
    };
};

const mapDispatchToProps = dispatch => {
    return {
        onAuth: ( email, password, isSignup ) => dispatch( actions.auth( email, password, isSignup ) ),
        onSetAuthRedirectPath: () => dispatch( actions.setAuthRedirectPath( '/' ) )
    };
};

export default connect( mapStateToProps, mapDispatchToProps )( Auth );