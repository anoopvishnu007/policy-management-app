import React, { useEffect } from 'react';
import { connect } from 'react-redux';
import axios from '../../axios-customers';
import withErrorHandler from '../../hoc/withErrorHandler/withErrorHandler';
import * as actions from '../../store/actions/index';
import { withStyles, makeStyles, Paper, TableContainer, Table, TableHead, TableRow, TableBody, TableCell, Button, Grid, Container, CssBaseline, Typography } from '@material-ui/core';
import jsPDF from 'jspdf';
import html2canvas from 'html2canvas';
import { Link } from 'react-router-dom';

var moment = require('moment')
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
  table: {
    minWidth: 500,
  },
}));


const Policies = (props) => {
  const classes = useStyles();
  useEffect(() => {
    props.onFetchCustomerPolicies(props.token, props.userId);
    // eslint-disable-next-line
  }, [])


  if (props.loading) {
    return <div>Loading</div>
  }

  if (props.error) {
    return <div style={{ color: 'red' }}>ERROR: {this.props.error}</div>
  }

  let policies = null;
  if (props.customerPolicies) {
    policies = Object.keys(props.customerPolicies).filter((p) => {
      if (p) {
        return true;
      }
      return false;
    }).map((k) => {

      return props.customerPolicies[k].policies;
    }
    );

  }
   
  const printDocument = () => {
    const input = document.getElementById('divToPrint');
    html2canvas(input)
      .then((canvas) => {
        const imgData = canvas.toDataURL('image/png');
        const pdf = new jsPDF();
        pdf.addImage(imgData, 'JPEG', 0, 0);
        // pdf.output('dataurlnewwindow');
        pdf.save("download.pdf");
      })
      ;
  }
  if (policies && policies.length > 0) {
    return (
      <div>
        <Container component="main" maxWidth="xl">
          <CssBaseline />
          <div className={classes.paper}>
            <Typography component="h1" variant="h5">
              Your current policies are shown below.
            </Typography>
            <TableContainer component={Paper}>
              <div id="divToPrint">
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
                    {policies[0].map((row, i) => (
                      <StyledTableRow key={i}>
                        <StyledTableCell component="th" scope="row">
                          {row.policyType}
                        </StyledTableCell>
                        <StyledTableCell align="right">{row.policyAmount}</StyledTableCell>
                        <StyledTableCell align="right">{moment(row.policyStartDate).format('D/MM/YYYY')}</StyledTableCell>
                        <StyledTableCell align="right">{row.policyDuration}</StyledTableCell>
                      </StyledTableRow>
                    ))}
                  </TableBody>
                </Table>
              </div>

            </TableContainer>
            <Grid container spacing={4} justify="center">
              <Grid item xs={12} sm={6} className={classes.submit} align="right">
                <Button
                  onClick={printDocument}
                  variant="contained"
                  color="primary"
                >Print</Button>
              </Grid>
              <Grid item xs={12} sm={6} className={classes.submit}>
                <Button
                  component={Link}
                  variant="contained"
                  color="primary"
                  to="/purchase"
                 >Purchase More</Button>
                <Link variant="button" color="textPrimary" to="/purchase" >

                </Link>

              </Grid>
            </Grid>
          </div>
        </Container>
      </div>
    );
  }
  else {
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
            <StyledTableRow>
              <StyledTableCell component="th" scope="row" colSpan="4">
                No Policies found.!!
              </StyledTableCell>

            </StyledTableRow>

          </TableBody>
        </Table>
      </TableContainer>
    );
  }
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
    onFetchCustomerPolicies: (token, userId) => dispatch(actions.fetchCustomerPolicies(token, userId))
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(withErrorHandler(Policies, axios));