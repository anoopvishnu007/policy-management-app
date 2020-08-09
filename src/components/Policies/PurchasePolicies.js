import React,{useState,useEffect} from 'react';
import { connect } from 'react-redux';
import axios from '../../axios-customers';
import withErrorHandler from '../../hoc/withErrorHandler/withErrorHandler';
import * as actions from '../../store/actions/index';
import { TextField,Button, Container, CssBaseline, Grid, InputLabel, Select, MenuItem, makeStyles } from '@material-ui/core';
 

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

function PurchasePolicies(props) {
  const classes = useStyles();
  const submitHandler = event => {
    event.preventDefault();
    const custPolicies = {
      userId:userId,
      policies:[...customerPolicies.policies, {
        policyType: policyType,
        policyAmount: policyAmount,
        policyStartDate: policyStartDate,
        policyDuration:policyDuration
      }]
       
    };
    props.purchasePolicy(custPolicies,props.token);
   };
   
  const [policyType, setPolicyType] = useState("");
  const [policyAmount, setPolicyAmount] = useState("");  
  const [policyStartDate, setPolicyStartDate] = useState(new Date().toISOString().slice(0, 10));
  const [policyDuration, setPolicyDuration] = useState("");   
  const [userId] = useState(props.userId);
  const [customerPolicies] = useState(props.customerPolicies);   
  const [errors] = useState( {});
  useEffect(() => {
    props.onFetchCustomerPolicies(props.token, props.userId);
    // eslint-disable-next-line
  }, [])
  const dateLimit = new Date();
   dateLimit.setFullYear(dateLimit.getFullYear() - 18);
  return (
    <Container component="main" maxWidth="xs">
      <CssBaseline />
      <div className={classes.paper}>
        
      <form onSubmit={submitHandler} className={classes.form}>
          <Grid container spacing={2}>        
            
        
            <Grid item xs={12} sm={6}>
                <InputLabel id="policyType-label">Policy Type</InputLabel>
                <Select
                    labelId="policyType-label"
                    id="policyType"
                    value={policyType}
                    fullWidth
                    onChange={event => {
                      setPolicyType(event.target.value);
                   }}
                    label="Policy Type"
                    autoFocus
                >                     
                    <MenuItem value="Life">Life</MenuItem>
                    <MenuItem value="Annuities">Annuities</MenuItem>
                 </Select>
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField
                autoComplete="policyAmount"
                name="policyAmount"
                variant="outlined"
                required
                fullWidth
                id="policyAmount"
                label="Policy Amount" 
                value={policyAmount}                
                onChange={event => {
                  setPolicyAmount(event.target.value);
               }}               
              />
            </Grid>
            <Grid item xs={12} sm={6}>
                <TextField
                type='date'
                name='policyStartDate'
                id='policyStartDate'
                label='Policy Start Date'
                variant='outlined'
                margin='normal'
                value={policyStartDate}
                onChange={event => {
                  setPolicyStartDate(event.target.value);
               }} 
                InputLabelProps={{
                    shrink: true
                }}
                inputProps={{
                    min: new Date(),
                    max: new Date()
                }}
                error={!!errors["policyStartDate"]}
                required
                />
            </Grid>
            <Grid item xs={12} sm={6}>
                <InputLabel id="policyDuration-label">Duration Of Policy</InputLabel>
                <Select
                    labelId="policyDuration-label"
                    id="policyDuration"
                    fullWidth
                    value={policyDuration}
                    onChange={event => {
                      setPolicyDuration(event.target.value);
                    }} 
                    label="Duration Of Policy"
                >   
                <MenuItem value={5}>5</MenuItem>
                    <MenuItem value={10}>10</MenuItem>                  
                    <MenuItem value={15}>15</MenuItem>
                    <MenuItem value={20}>20</MenuItem>
                 </Select>
            </Grid>
           
            
            <Grid item xs={12} sm={6}>
              
            </Grid>
          </Grid>
          <Button
            type="submit"
            variant="contained"
            color="primary"
            className={classes.submit}
          >
            Purchase
          </Button>
           
        </form>
      </div>
       
    </Container>
  );
}

const mapStateToProps = state => {
  return {
    customerPolicies: state.policy.customerPolicies,
    loading: state.policy.loading,    
    token: state.auth.token,
    isAuthenticated: state.auth.token !== null,
    userId: state.auth.userId,
  };
};

const mapDispatchToProps = dispatch => {
  return {
     purchasePolicy: (customerPolicies, token) =>
     dispatch(actions.purchasePolicies(customerPolicies, token)),
     onFetchCustomerPolicies: (token, userId) => dispatch( actions.fetchCustomerPolicies(token, userId) )  
  };
};
export default connect(
  mapStateToProps,mapDispatchToProps    
)(withErrorHandler(PurchasePolicies,axios));