import React ,{  useState, useEffect }  from 'react';
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
import CountryDropdown  from '../CountryRegionSelector/CountryDropDown';
import RegionDropdown  from '../CountryRegionSelector/RegionDropDown';
import Select from '@material-ui/core/Select';
import axios from '../../axios-customers';
import withErrorHandler from '../../hoc/withErrorHandler/withErrorHandler';
import * as actions from '../../store/actions/index';
import Spinner from '../../components/UI/Spinner/Spinner';
import { Redirect } from 'react-router-dom';
import { Dialog } from '@material-ui/core';
import {validateField } from '../../shared/utility';

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

 
const SignUp = props => {
    
  const classes = useStyles();

const [customer,setCustomer] = useState({});
  const submitHandler = event => {
    event.preventDefault();
      const customer = {
      name: name,
      username: username,
      password: password,
      email:email,
      birthDate:birthDate,
      age:age,
      regDate:regDate,
      address:address,
      country:country,
      region:region,
      citizenship:citizenship,
      gender:gender,
      maritalStatus:maritalStatus,
      contactNumber:contactNumber,
      idProofType:idProofType,
      idDocumentNumber:idDocumentNumber,
      customerId:customerId,
      userId: props.userId
    };
    setCustomer(customer);
    props.createUser(customer.username,customer.password,true);
  };
  useEffect(() => {
    customer.userId = props.userId;
    if(customer.userId  && customer.userId !==''){
      props.onSignupCustomer(customer, props.token);
    }
     // eslint-disable-next-line
  }, [props.userId])
  const [name, setName] = useState("");
  const [username, setUserName] = useState("");
  const [password, setPassword] = useState("");
  const [email, setEmail] = useState("");
  const [birthDate, setBirthDate] = useState(new Date().toISOString().slice(0, 10));
  const [regDate, setRegDate] = useState(new Date().toISOString().slice(0, 10));
  const [address, setAddress] = useState("");
  const [country, setCountry] = useState("");
  const [region, setRegion] = useState("");
  const [citizenship, setCitizenship] = useState("");
  const [gender, setGender] = useState("");
  const [maritalStatus, setMaritalStatus ]= useState("");
  const [contactNumber, setContactNumber] = useState("");
  const [idProofType, setIdProofType] = useState("");
  const [idDocumentNumber, setIdDocumentNumber] = useState("");
  const [customerId] = useState("R-"+ Math.floor(Math.random()*1000));
  
  
  
  
  const [age,setAge] = useState("");
     
  const [errors] = useState( {});

  
  
  const dateMinLimit = new Date();  
  dateMinLimit.setFullYear(dateMinLimit.getFullYear() - 18);
  
  const dateMaxLimit = new Date();  
  dateMaxLimit.setFullYear(dateMaxLimit.getFullYear() - 96);

  let form = (
    <Container component="main" maxWidth="xs">
    <CssBaseline />
    <div className={classes.paper}>
      <Avatar className={classes.avatar}>
        <LockOutlinedIcon />
      </Avatar>
      <Typography component="h1" variant="h5">
        Sign up
      </Typography>
      <form onSubmit={submitHandler} className={classes.form}>
        <Grid container spacing={2}>
          <Grid item xs={12} sm={6}>
            <TextField
              autoComplete="fname"
              name="Name"
              variant="outlined"
              required
              fullWidth
              id="Name"
              label="Name"
              value={name}
              onChange={event => {
                 setName(event.target.value);
                 validateField(event.target.name,event.target.value, 
                  {
                    required: true,
                    onlyAlphabetsAndSpace: true
                  },errors
                );             
              }}
              error={!errors["Name"]}
              
              autoFocus
            />
          </Grid>
          <Grid item xs={12} sm={6}>
            <TextField
              variant="outlined"
              required
              fullWidth
              id="userName"
              label="User Name (Email Address)"
              name="userName"
              autoComplete="userName"
              value={username}
              onChange={event => {
                setUserName(event.target.value);
                validateField(event.target.name,event.target.value, 
                  {
                    required: true,                
                    isEmail: true
                  },errors);
             }}
             error= {!errors["userName"]}
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
              value={password}
              autoComplete="current-password"
              onChange={event => {
                setPassword(event.target.value);
                validateField(event.target.name,event.target.value, 
                  {
                    required: true,
                    minLength: 6
                   },errors);
             }}
             error= {!errors["password"]}   
            />
          </Grid>
          <Grid item xs={12} sm={6}>
            <TextField
              autoComplete="address"
              name="Address"
              variant="outlined"
              required
              fullWidth
              id="address"
              value={address}
              onChange={event => {
                setAddress(event.target.value);
                validateField(event.target.name,event.target.value, 
                  {
                    required: true,
                    },errors);
             }}
              label="Address"
              error= {!errors["Address"]}                 
            />
          </Grid>
          <Grid item xs={12} sm={6}>
          <InputLabel id="citizenship-label">Citizenship</InputLabel>
              <CountryDropdown
                  labelId ="citizenship-label"
                  id="citizenship"
                  name="citizenship" 
                  value={citizenship}
                  onChange={(val) => {
                    setCitizenship(val);
                    validateField("citizenship",val, 
                      {
                        required: true,
                      },errors);
                 }}
                  showDefaultOption= {true}
                  fullWidth
                  error= {!errors["citizenship"]} 
              />
          </Grid>
          <Grid item xs={12} sm={6}>
          <InputLabel id="country-label">Country</InputLabel>
              <CountryDropdown
                  labelId ="country-label"
                  id="country"
                  value={country}
                  onChange={(val) => {
                    setCountry(val);
                    validateField("country",val, 
                      {
                        required: true,
                      },errors);
                 }}
                  showDefaultOption= {true}
                  fullWidth
                  error= {!errors["country"]} 
              />
          </Grid>
          <Grid item xs={12} sm={6}>
            <InputLabel id="region-label">State</InputLabel>
              <RegionDropdown
                  labelId ="region-label"
                  id="region"
                  country={country}
                  labelType="full"
                   value={region}
                  onChange={(val) => {
                    setRegion(val);
                    validateField("region",val, 
                      {
                        required: true,
                      },errors);
                 }}
                  showDefaultOption= {true}
                  fullWidth
                  error= {!errors["region"]} 
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
              value={email}
              onChange={event => {
                setEmail(event.target.value);
                validateField(event.target.name,event.target.value, 
                {
                  required: true,
                  isEmail:true 
                },errors);
             }}
              autoComplete="email"
              error= {!errors["email"]} 

            />
          </Grid>
          <Grid item xs={12} sm={6}>
              <InputLabel id="gender-label">Gender</InputLabel>
              <Select
                  labelId="gender-label"
                  id="gender"
                  name="gender"
                  value={gender}
                  fullWidth
                  onChange={event => {
                    setGender(event.target.value);
                    validateField(event.target.name,event.target.value, 
                    {
                      required: true,
                     },errors);
                 }}
                  label="Gender"
                  error= {!errors["gender"]} 
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
                  name = "maritalStatus"
                  fullWidth
                  value={maritalStatus}
                  onChange={event => {
                    setMaritalStatus(event.target.value);
                    validateField(event.target.name,event.target.value, 
                      {
                        required: true,
                       },errors);
                 }}
                  label="Marital Status"
                  error= {!errors["maritalStatus"]} 
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
              value={contactNumber}
              onChange={event => {
                setContactNumber(event.target.value);
                validateField(event.target.name,event.target.value, 
                  {
                    required: true,
                    minLength:10,
                    isNumeric:true
                   },errors);
             }}
             error= {!errors["contactNumber"]}          
            />
          </Grid>
          <Grid item xs={12} sm={6}>
              <TextField
              type='date'
              name='birthDate'
              id='birthDate'
              label='Date Of Birth'
              value={birthDate}
              onChange={event => {
                setBirthDate(event.target.value);
                 
                let today = new Date();
                let birthDat = new Date(event.target.value);
                let age = today.getFullYear() - birthDat.getFullYear();
                let m = today.getMonth() - birthDat.getMonth();
                if (m < 0 || (m === 0 && today.getDate() < birthDat.getDate())) {
                    age--;
                }
                setAge(age);
                validateField(event.target.name,event.target.value, 
                  {
                    required: true,                    
                   },errors);
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
              error= {!errors["birthDate"]}  
              required
              
              />
          </Grid>
          <Grid item xs={12} sm={6}>
              <TextField
              type='date'
              name='regDate'
              id='regDate'
              label='Registration Date'
              value={regDate}
              onChange={event => {
                setRegDate(event.target.value);
                validateField(event.target.name,event.target.value, 
                  {
                    required: true,                    
                   },errors);
             }}
              variant='outlined'
              margin='normal'
              InputLabelProps={{
                  shrink: true
              }}
              inputProps={{
                  min: new Date().toISOString().slice(0, 10)
              }}
              error= {!errors["regDate"]}  
              required
              />
          </Grid>
          <Grid item xs={12} sm={6}>
              <InputLabel id="idprooftype-label">Identification Proof Type</InputLabel>
              <Select
                  labelId="idprooftype-label"
                  id="idprooftype"
                  name ="idProofType"                  
                  fullWidth
                  value={idProofType}
                  onChange={event => {
                    setIdProofType(event.target.value);
                    validateField(event.target.name,event.target.value, 
                      {
                        required: true,                    
                       },errors);
                 }}
                  label="Identification Proof Type"
                  error= {!errors["idProofType"]}
              >                     
                  <MenuItem value={"SSN"}>SSN</MenuItem>
                  <MenuItem value={"Passport"}>Passport</MenuItem>
               </Select>
          </Grid>
          <Grid item xs={12} sm={6}>
            <TextField
              autoComplete="IdentificationDocumentNumber"
              name="IdentificationDocumentNumber"
              variant="outlined"
              required
              fullWidth
              id="IdentificationDocumentNumber"
              label="Identification Document No" 
              value={idDocumentNumber}
              onChange={event => {
                setIdDocumentNumber(event.target.value);
                validateField(event.target.name,event.target.value, 
                  {
                    required: true,                    
                   },errors);
             }}
             error={!errors["IdentificationDocumentNumber"]}              
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
  if (props.loading) {
    form = <Spinner />;
  }
  let authRedirect = null;
  if ( props.isAuthenticated ) {
    form =( <Dialog open="true">
      Signup successfull. You customer id is {customerId}
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
    authRedirectPath: state.auth.authRedirectPath
  };
};

const mapDispatchToProps = dispatch => {
  return {
    createUser: ( email, password, isSignup ) => dispatch( actions.auth( email, password, isSignup ) ),
    onSignupCustomer: (customer, token) =>
      dispatch(actions.customerSignup(customer, token))
      
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(withErrorHandler(SignUp, axios));