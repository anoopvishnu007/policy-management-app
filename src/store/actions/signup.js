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
export const customerUpdateSuccess = (id, customerData) => {
  return {
    type: actionTypes.CUSTOMER_UPDATE_SUCCESS,
    orderId: id,
    customerData: customerData
  };
};

export const customerUpdateFail = error => {
  return {
    type: actionTypes.CUSTOMER_UPDATE_FAIL,
    error: error
  };
};

export const customerUpdateStart = () => {
  return {
    type: actionTypes.CUSTOMER_UPDATE_START
  };
};

export const customerUpdate = (customerData, token) => {
  return {
    type: actionTypes.CUSTOMER_UPDATE,
    customerData: customerData,
    token: token
  };
};
export const customerUpdateInit = () => {
  return {
    type: actionTypes.CUSTOMER_UPDATE_INIT
  };
};
export const customerSignupInit = () => {
  return {
    type: actionTypes.CUSTOMER_SIGNUP_INIT
  };
};

export const fetchCustomerDetailsSuccess = customerData => {
  return {
    type: actionTypes.FETCH_CUSTOMER_DETAILS_SUCCESS,
    customerData: customerData
  };
};

export const fetchCustomerDetailsFail = error => {
  return {
    type: actionTypes.FETCH_CUSTOMER_DETAILS_FAIL,
    error: error
  };
};

export const fetchCustomerDetailsStart = () => {
  return {
    type: actionTypes.FETCH_CUSTOMER_DETAILS_START
  };
};

export const fetchCustomerDetails = (userId,token) => {
  return {
    type: actionTypes.FETCH_CUSTOMER_DETAILS,
    token: token,
    userId: userId
  };
};


