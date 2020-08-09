import React from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom'
import AppBar from '@material-ui/core/AppBar';

import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import { makeStyles } from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';
 
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

 
  return (
    <AppBar position="static" color="default" elevation={0} className={classes.appBar}>
      <Toolbar className={classes.toolbar}>
        <Typography variant="h6" color="inherit" noWrap className={classes.toolbarTitle}>
          Policy Management App
        </Typography>
       
        {props.isAuthenticated? <nav>
          <Link variant="button" color="textPrimary" to="/purchase" className={classes.link}>
              Products
          </Link>
          <Link variant="button" color="textPrimary" to="/policies" className={classes.link}>
              My policies
          </Link>
          <Link variant="button" color="textPrimary" to="/updateProfile" className={classes.link}>
              Upadate My Profile
          </Link>
    </nav>
    : null } 
      {props.isAuthenticated?
    <Link variant="button" to="/logout" color="textPrimary" className={classes.link}>
    SignOut
</Link>
    :null} 

    {!props.isAuthenticated?
    
    <Button href="/login" color="primary" variant="outlined" className={classes.link}>
          SignIn
        </Button>: null}
        <Button href="/signup" color="primary" variant="outlined" className={classes.link}>
          SignUp
        </Button>
        
      </Toolbar>
    </AppBar>
   
);
  }
  const mapStateToProps = state => {
    return {
      loading: state.signup.loading,    
      token: state.auth.token,
      isAuthenticated: state.auth.token !== null,
      userId: state.auth.userId
    };
  };

  export default connect(
    mapStateToProps    
  )(HeaderToolbar);