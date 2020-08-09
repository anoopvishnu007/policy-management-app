import React,{  useEffect }  from 'react';
import { connect } from 'react-redux';
import axios from '../../axios-customers';
import withErrorHandler from '../../hoc/withErrorHandler/withErrorHandler';
import * as actions from '../../store/actions/index';
import {withStyles, makeStyles, Paper, TableContainer, Table, TableHead, TableRow, TableBody, TableCell } from '@material-ui/core';

const StyledTableCell = withStyles((theme) => ({
  head: {
    backgroundColor: theme.palette.common.black,
    color: theme.palette.common.white,
  },
  body: {
    fontSize: 14,
  },
}))(TableCell);

const StyledTableRow = withStyles((theme) => ({
  root: {
    '&:nth-of-type(odd)': {
      backgroundColor: theme.palette.action.hover,
    },
  },
}))(TableRow);

function createData(name, calories, fat, carbs, protein) {
  return { name, calories, fat, carbs, protein };
}

const rows = [
  createData('Frozen yoghurt', 159, 6.0, 24, 4.0),
  createData('Ice cream sandwich', 237, 9.0, 37, 4.3),
  createData('Eclair', 262, 16.0, 24, 6.0),
  createData('Cupcake', 305, 3.7, 67, 4.3),
  createData('Gingerbread', 356, 16.0, 49, 3.9),
];

const useStyles = makeStyles({
  table: {
    minWidth: 700,
  },
});

 const Policies = (props)=> {
  const classes = useStyles();
  useEffect(() => {
    props.onFetchCustomerPolicies(props.token, props.userId);
    // eslint-disable-next-line
  }, [])
  if (props.loading) {
    return <div>Loading</div>
  }   
  if (props.error) {
    return <div style={{color: 'red'}}>ERROR: {this.props.error}</div>
  }
  return (
   
    <TableContainer component={Paper}>
      <Table className={classes.table} aria-label="customized table">
        <TableHead>
          <TableRow>
            <StyledTableCell>Policy Type</StyledTableCell>
            <StyledTableCell align="right">Amount</StyledTableCell>
            <StyledTableCell align="right">Start Date</StyledTableCell>
            <StyledTableCell align="right">Duration</StyledTableCell>
           </TableRow>
        </TableHead>
        <TableBody>
          {Object.keys(props.customerPolicies).map((k)=>Object.keys(props.customerPolicies[k]).map((row) => (
            <StyledTableRow key={row.policyType}>
              <StyledTableCell component="th" scope="row">
                {row.policyType}
              </StyledTableCell>
              <StyledTableCell align="right">{row.policyAmount}</StyledTableCell>
               <StyledTableCell align="right">{row.policyStartDate}</StyledTableCell>
              <StyledTableCell align="right">{row.policyDuration}</StyledTableCell>
            </StyledTableRow>
          )))}
        </TableBody>
      </Table>
    </TableContainer>
  );
}
 
 const mapStateToProps = state => {
  return {
      customerPolicies: state.policy.customerPolicies,
      loading: state.policy.loading,
      token: state.auth.token,
      userId: state.auth.userId
  };
};

const mapDispatchToProps = dispatch => {
  return {
    onFetchCustomerPolicies: (token, userId) => dispatch( actions.fetchCustomerPolicies(token, userId) )
  };
};

export default connect( mapStateToProps, mapDispatchToProps )( withErrorHandler( Policies, axios ) );