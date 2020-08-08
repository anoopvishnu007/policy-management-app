import * as actionTypes from "./actionTypes";

export const customerSignupSuccess = (id, customerData) => {
  return {
    type: actionTypes.CUSTOMER_SIGNUP_SUCCESS,
    orderId: id,
    customerData: customerData
  };
};

export const customerSignupFail = error => {
  return {
    type: actionTypes.CUSTOMER_SIGNUP_FAIL,
    error: error
  };
};

export const customerSignupStart = () => {
  return {
    type: actionTypes.CUSTOMER_SIGNUP_START
  };
};

export const customerSignup = (customerData, token) => {
  return {
    type: actionTypes.CUSTOMER_SIGNUP,
    customerData: customerData,
    token: token
  };
};

export const customerSignupInit = () => {
  return {
    type: actionTypes.CUSTOMER_SIGNUP_INIT
  };
};

export const fetchCustomerPoliciesSuccess = orders => {
  return {
    type: actionTypes.FETCH_CUSTOMER_POLICIES_SUCCESS,
    orders: orders
  };
};


