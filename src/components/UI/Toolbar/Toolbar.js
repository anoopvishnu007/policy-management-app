import React, { useEffect}from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom'
import AppBar from '@material-ui/core/AppBar';

import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import { makeStyles } from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';
import axios from '../../../axios-customers';
import withErrorHandler from '../../../hoc/withErrorHandler/withErrorHandler';
import * as actions from '../../../store/actions/index';

const useStyles = makeStyles((theme) => ({
  '@global': {
    ul: {
      margin: 0,
      padding: 0,
      listStyle: 'none',
    },
  },
  appBar: {
    borderBottom: `1px solid ${theme.palette.divider}`,
  },
  toolbar: {
    flexWrap: 'wrap',
  },
  toolbarTitle: {
    flexGrow: 1,
  },
  link: {
    margin: theme.spacing(1, 1.5),
  },
  
  
}));
 
  const  HeaderToolbar = (props) => {        
  const classes = useStyles();

  useEffect(() => {
     function fetchData() {
      try {
        if (props.userId && props.userId !== '') {
          props.fetchCustomer(props.userId, props.token);
        }
      } catch (e) {
       }
    }
    fetchData();

    // eslint-disable-next-line
  }, [props.userId])
  return (
    <AppBar position="static" color="default" elevation={0} className={classes.appBar}>
      <Toolbar className={classes.toolbar}>
        <Typography variant="h6" color="inherit" noWrap className={classes.toolbarTitle}>
          Policy Management App
        </Typography>
       
        {props.isAuthenticated? <nav>
          <Typography variant="h6" color="inherit" noWrap  >
          Welcome {props.customerData.name}
        </Typography>

          <Link variant="button" color="textPrimary" to="/purchase" className={classes.link}>
              Products
          </Link>
          <Link variant="button" color="textPrimary" to="/policies" className={classes.link}>
              My policies
          </Link>
          <Link variant="button" color="textPrimary" to="/updateProfile" className={classes.link}>
              Update My Profile
          </Link>
          <Link variant="button" to="/logout" color="textPrimary" className={classes.link}>
              SignOut
          </Link>
    </nav>
    : null } 
       

    {!props.isAuthenticated?
      <nav>
        <Button href="/login" color="primary" variant="outlined" className={classes.link}>
          SignIn
        </Button>
        <Button href="/signup" color="primary" variant="outlined" className={classes.link}>
          SignUp
        </Button></nav>
        : null} 
      </Toolbar>
    </AppBar>
   
);
  }
  const mapStateToProps = state => {
    return {
      customerData: state.signup.customerData,
      loading: state.signup.loading,    
      token: state.auth.token,
      isAuthenticated: state.auth.token !== null,
      userId: state.auth.userId
    };
  };
  const mapDispatchToProps = dispatch => {
    return {
      fetchCustomer: (userId, token) => dispatch(actions.fetchCustomerDetails(userId, token))    
    };
  };
  export default connect(
    mapStateToProps,
    mapDispatchToProps    
  )(withErrorHandler(HeaderToolbar,axios));