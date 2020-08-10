import React, { useState, useEffect } from 'react';
import { connect } from 'react-redux';
import Avatar from '@material-ui/core/Avatar';
import Button from '@material-ui/core/Button';
import CssBaseline from '@material-ui/core/CssBaseline';
import TextField from '@material-ui/core/TextField';
import Link from '@material-ui/core/Link';
import Grid from '@material-ui/core/Grid';
import LockOutlinedIcon from '@material-ui/icons/LockOutlined';
import Typography from '@material-ui/core/Typography';
import { makeStyles } from '@material-ui/core/styles';
import Container from '@material-ui/core/Container';

import InputLabel from '@material-ui/core/InputLabel';
import MenuItem from '@material-ui/core/MenuItem';
import CountryDropdown from '../CountryRegionSelector/CountryDropDown';
import RegionDropdown from '../CountryRegionSelector/RegionDropDown';
import Select from '@material-ui/core/Select';
import axios from '../../axios-customers';
import withErrorHandler from '../../hoc/withErrorHandler/withErrorHandler';
import * as actions from '../../store/actions/index';
import Spinner from '../UI/Spinner/Spinner';
import { Redirect } from 'react-router-dom';
import { Dialog } from '@material-ui/core';
import { checkValidity } from '../../shared/utility';


const useStyles = makeStyles((theme) => ({
  paper: {
    marginTop: theme.spacing(8),
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
  },
  avatar: {
    margin: theme.spacing(1),
    backgroundColor: theme.palette.secondary.main,
  },
  form: {
    width: '100%', // Fix IE 11 issue.
    marginTop: theme.spacing(3),
  },
  submit: {
    margin: theme.spacing(3, 0, 2),
  },
}));


const UserDetails = props => {

  const classes = useStyles();

  const [customer, setCustomer] = useState(props.customer || {});
  const submitHandler = event => {
    event.preventDefault();
    let keys = Object.keys(props.customer);
    let isValid = true;

    for (let i = 0; i < keys.length; i++) {
      if (errors[keys[i]] === false) {
        isValid = false;
        break;
      }
    } 
    if (isValid) {
      props.updateCustomerDetails(customer, props.token)
    }  

  };

  const [error, setError] = useState('');
  useEffect(() => {
    async function fetchData() {
      // You can await here
      try {
        console.log(props.userId);
        if (!props.customer && props.userId && props.userId !== '') {
          await props.fetchCustomer(props.userId, props.token);
        }
      } catch (e) {
        setError(e.message || 'Unexpected error');
      }
    }
    fetchData();

    // eslint-disable-next-line
  }, [])
  useEffect(() => {
    function setData() {
      // You can await here
      try {
        if (props.customer) {
          //let customerOBj = Object.keys(props.customer).map((k) => { return props.customer[k] })

          if (customer && customer !== props.customer) {
            setCustomer(props.customer);
          }
          Object.keys(props.customer).map((k) => errors[k] = true)

        }
      } catch (e) {
        setError(e.message || 'Unexpected error');
      }
    }
    setData();

    // eslint-disable-next-line
  }, [props.customer])

  let err = {};
  const [errors] = useState(Object.keys(props.customer).map((k) => err[k] = true));
  const validateField = (fieldName, newValue, rules) => {
    let valid = checkValidity(newValue, rules)
    errors[fieldName] = valid;
  }

  const dateMinLimit = new Date();
  dateMinLimit.setFullYear(dateMinLimit.getFullYear() - 18);

  const dateMaxLimit = new Date();
  dateMaxLimit.setFullYear(dateMaxLimit.getFullYear() - 96);
  let form = <Spinner />
  if (props.loading) {
    return form;
  }
  if (error) {
    let form = <div style={{ color: 'red' }}>ERROR: {error}</div>
    return form;
  }
  if (props.customer) {
    form = (
      <Container component="main" maxWidth="xs">
        <CssBaseline />
        <div className={classes.paper}>
          <Avatar className={classes.avatar}>
            <LockOutlinedIcon />
          </Avatar>
          <Typography component="h1" variant="h5">
            Update you profile details
      </Typography>
          <form onSubmit={submitHandler} className={classes.form}>
            <Grid container spacing={2}>
              <Grid item xs={12} sm={6}>
                <TextField
                  autoComplete="fname"
                  name="name"
                  variant="outlined"
                  required
                  fullWidth
                  id="Name"
                  label="Name"
                  value={customer.name || ''}
                  onChange={event => {
                    //setName(event.target.value);
                    setCustomer({ ...customer, [event.target.name]: event.target.value });
                    validateField(event.target.name, event.target.value,
                      {
                        required: true,
                        onlyAlphabetsAndSpace: true
                      }
                    );
                  }}
                  error={!errors["name"]}

                  autoFocus
                />
              </Grid>
              <Grid item xs={12} sm={6}>
                <TextField
                  variant="outlined"
                  required
                  fullWidth
                  id="username"
                  label="User Name (Email Address)"
                  name="username"
                  autoComplete="userName"
                  value={customer.username || ''}
                  onChange={event => {
                    //setUserName(event.target.value);
                    setCustomer({ ...customer, [event.target.name]: event.target.value });
                    validateField(event.target.name, event.target.value,
                      {
                        required: true,
                        isEmail: true
                      });
                  }}
                  error={!errors["username"]}
                />
              </Grid>
              <Grid item xs={12} sm={6}>
                <TextField
                  variant="outlined"
                  required
                  fullWidth
                  name="password"
                  label="Password"
                  type="password"
                  id="password"
                  value={customer.password || ''}
                  autoComplete="current-password"
                  onChange={event => {
                    // setPassword(event.target.value);
                    setCustomer({ ...customer, [event.target.name]: event.target.value });
                    validateField(event.target.name, event.target.value,
                      {
                        required: true,
                        minLength: 6
                      });
                  }}
                  error={!errors["password"]}
                />
              </Grid>
              <Grid item xs={12} sm={6}>
                <TextField
                  autoComplete="address"
                  name="address"
                  variant="outlined"
                  required
                  fullWidth
                  id="address"
                  value={customer.address || ''}
                  onChange={event => {
                    //setAddress(event.target.value);
                    setCustomer({ ...customer, [event.target.name]: event.target.value });
                    validateField(event.target.name, event.target.value,
                      {
                        required: true,
                      });
                  }}
                  label="Address"
                  error={!errors["address"]}
                />
              </Grid>
              <Grid item xs={12} sm={6}>
                <InputLabel id="citizenship-label">Citizenship</InputLabel>
                <CountryDropdown
                  labelId="citizenship-label"
                  id="citizenship"
                  name="citizenship"
                  value={customer.citizenship || ''}
                  onChange={(val) => {
                    //setCitizenship(val);
                    setCustomer({ ...customer, "citizenship": val });
                    validateField("citizenship", val,
                      {
                        required: true,
                      });
                  }}
                  showDefaultOption={true}
                  fullWidth
                  error={!errors["citizenship"]}
                />
              </Grid>
              <Grid item xs={12} sm={6}>
                <InputLabel id="country-label">Country</InputLabel>
                <CountryDropdown
                  labelId="country-label"
                  id="country"
                  value={customer.country || ''}
                  onChange={(val) => {
                    //setCountry(val);
                    setCustomer({ ...customer, "country": val });
                    validateField("country", val,
                      {
                        required: true,
                      });
                  }}
                  showDefaultOption={true}
                  fullWidth
                  error={!errors["country"]}
                />
              </Grid>
              <Grid item xs={12} sm={6}>
                <InputLabel id="region-label">State</InputLabel>
                <RegionDropdown
                  labelId="region-label"
                  id="region"
                  name="region"
                  country={customer.country || ''}
                  labelType="full"
                  value={customer.region || ''}
                  onChange={(val) => {
                    // setRegion(val);
                    setCustomer({ ...customer, "region": val });
                    validateField("region", val,
                      {
                        required: true,
                      });
                  }}
                  showDefaultOption={true}
                  fullWidth
                  error={!errors["region"]}
                />
              </Grid>

              <Grid item xs={12} sm={6}>
                <TextField
                  variant="outlined"
                  required
                  fullWidth
                  id="email"
                  label="Email Address"
                  name="email"
                  value={customer.email || ''}
                  onChange={event => {
                    //setEmail(event.target.value);
                    setCustomer({ ...customer, [event.target.name]: event.target.value });
                    validateField(event.target.name, event.target.value,
                      {
                        required: true,
                        isEmail: true
                      });
                  }}
                  autoComplete="email"
                  error={!errors["email"]}

                />
              </Grid>
              <Grid item xs={12} sm={6}>
                <InputLabel id="gender-label">Gender</InputLabel>
                <Select
                  labelId="gender-label"
                  id="gender"
                  name="gender"
                  value={customer.gender || ''}
                  fullWidth
                  onChange={event => {
                    //setGender(event.target.value);
                    setCustomer({ ...customer, "gender": event.target.value });
                    validateField(event.target.name, event.target.value,
                      {
                        required: true,
                      });
                  }}
                  label="Gender"
                  error={!errors["gender"]}
                >
                  <MenuItem value={"Male"}>Male</MenuItem>
                  <MenuItem value={"Female"}>Female</MenuItem>
                </Select>
              </Grid>
              <Grid item xs={12} sm={6}>
                <InputLabel id="maritalStatus-label">Marital Status</InputLabel>
                <Select
                  labelId="maritalStatus-label"
                  id="maritalStatus"
                  name="maritalStatus"
                  fullWidth
                  value={customer.maritalStatus || ''}
                  onChange={event => {
                    //setMaritalStatus(event.target.value);
                    setCustomer({ ...customer, "maritalStatus": event.target.value });
                    validateField(event.target.name, event.target.value,
                      {
                        required: true,
                      });
                  }}
                  label="Marital Status"
                  error={!errors["maritalStatus"]}
                >
                  <MenuItem value={"Single"}>Single</MenuItem>
                  <MenuItem value={"Married"}>Married</MenuItem>
                </Select>
              </Grid>
              <Grid item xs={12} sm={6}>
                <TextField
                  autoComplete="contactNumber"
                  name="contactNumber"
                  variant="outlined"
                  required
                  fullWidth
                  id="contactNumber"
                  label="Contact Number"
                  value={customer.contactNumber || ''}
                  onChange={event => {
                    //setContactNumber(event.target.value);
                    setCustomer({ ...customer, [event.target.name]: event.target.value });
                    validateField(event.target.name, event.target.value,
                      {
                        required: true,
                        minLength: 10,
                        isNumeric: true
                      });
                  }}
                  error={!errors["contactNumber"]}
                />
              </Grid>
              <Grid item xs={12} sm={6}>
                <TextField
                  type='date'
                  name='birthDate'
                  id='birthDate'
                  label='Date Of Birth'
                  value={customer.birthDate || ''}
                  onChange={event => {
                    //setBirthDate(event.target.value);
                    setCustomer({ ...customer, [event.target.name]: event.target.value });

                    let today = new Date();
                    let birthDat = new Date(event.target.value);
                    let age = today.getFullYear() - birthDat.getFullYear();
                    let m = today.getMonth() - birthDat.getMonth();
                    if (m < 0 || (m === 0 && today.getDate() < birthDat.getDate())) {
                      age--;
                    }
                    //setAge(age);
                    setCustomer({ ...customer, "age": age });
                    validateField(event.target.name, event.target.value,
                      {
                        required: true,
                      });
                  }}
                  helperText='You need to be at least 18 years old'
                  variant='outlined'
                  margin='normal'
                  InputLabelProps={{
                    shrink: true
                  }}
                  inputProps={{
                    min: dateMaxLimit.toISOString().slice(0, 10),
                    max: dateMinLimit.toISOString().slice(0, 10),
                  }}
                  error={!errors["birthDate"]}
                  required

                />
              </Grid>

              <Grid item xs={12} sm={6}>
                <InputLabel id="idprooftype-label">Identification Proof Type</InputLabel>
                <Select
                  labelId="idprooftype-label"
                  id="idprooftype"
                  name="idProofType"
                  fullWidth
                  value={customer.idProofType || ''}
                  onChange={event => {
                    // setIdProofType(event.target.value);
                    setCustomer({ ...customer, [event.target.name]: event.target.value });
                    validateField(event.target.name, event.target.value,
                      {
                        required: true,
                      });
                  }}
                  label="Identification Proof Type"
                  error={!errors["idProofType"]}
                >
                  <MenuItem value={"SSN"}>SSN</MenuItem>
                  <MenuItem value={"Passport"}>Passport</MenuItem>
                </Select>
              </Grid>
              <Grid item xs={12} sm={6}>
                <TextField
                  autoComplete="idDocumentNumber"
                  name="idDocumentNumber"
                  variant="outlined"
                  required
                  fullWidth
                  id="idDocumentNumber"
                  label="Identification Document No"
                  value={customer.idDocumentNumber || ''}
                  onChange={event => {
                    // setIdDocumentNumber(event.target.value);
                    setCustomer({ ...customer, [event.target.name]: event.target.value });
                    validateField(event.target.name, event.target.value,
                      {
                        required: true,
                      });
                  }}
                  error={!errors["idDocumentNumber"]}
                />
              </Grid>
              <Grid item xs={12} sm={6}>

              </Grid>
            </Grid>
            <Button
              type="submit"
              fullWidth
              variant="contained"
              color="primary"
              className={classes.submit}
            >
              Sign Up
        </Button>
            <Grid container justify="flex-end">
              <Grid item>
                <Link href="/login" variant="body2">
                  Already have an account? Sign in
            </Link>
              </Grid>
            </Grid>
          </form>
        </div>

      </Container>
    );
  }
  let authRedirect = null;
  if (props.isUpdateSuccessfull) {
    form = (

      <Dialog open="true">
        Update successfull.
      </Dialog>)
    authRedirect = <Redirect to={props.authRedirectPath} />
  }
  return (
    <div className={classes.ContactData}>
      {form}
      {authRedirect}
    </div>
  );

}

const mapStateToProps = state => {
  return {
    loading: state.signup.loading,
    token: state.auth.token,
    isAuthenticated: state.auth.token !== null,
    userId: state.auth.userId,
    isUpdateSuccessfull: state.signup.isUpdateSuccessfull,
    authRedirectPath: state.auth.authRedirectPath,
    customer: state.signup.customerData
  };
};

const mapDispatchToProps = dispatch => {
  return {
    fetchCustomer: (userId, token) => dispatch(actions.fetchCustomerDetails(userId, token)),
    updateCustomerDetails: (customer, token) =>
      dispatch(actions.customerUpdate(customer, token))

  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(withErrorHandler(UserDetails, axios));