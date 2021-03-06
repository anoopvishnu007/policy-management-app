import * as actionTypes from "./actionTypes";

export const purchasePoliciesSuccess = (id, customerPolicies) => {
  return {
    type: actionTypes.PURCHASE_POLICIES_SUCCESS,
    purchaseId: id,
    customerPolicies: customerPolicies
  };
};

export const purchasePoliciesFail = error => {
  return {
    type: actionTypes.PURCHASE_POLICIES_FAIL,
    error: error
  };
};

export const purchasePoliciesStart = () => {
  return {
    type: actionTypes.PURCHASE_POLICIES_START
  };
};

export const purchasePolicies = (customerPolicies, token,isPost) => {
  return {
    type: actionTypes.PURCHASE_POLICIES,
    customerPolicies: customerPolicies,
    token: token,
    isPost: isPost
  };
};

export const purchaseInit = () => {
  return {
    type: actionTypes.PURCHASE_INIT
  };
};

export const fetchCustomerPoliciesSuccess = customerPolicies => {
  return {
    type: actionTypes.FETCH_CUSTOMER_POLICIES_SUCCESS,
    customerPolicies: customerPolicies
  };
};

export const fetchCustomerPoliciesFail = error => {
  return {
    type: actionTypes.FETCH_CUSTOMER_POLICIES_FAIL,
    error: error
  };
};

export const fetchCustomerPoliciesStart = () => {
  return {
    type: actionTypes.FETCH_CUSTOMER_POLICIES_START
  };
};

export const fetchCustomerPolicies = (token, userId) => {
  return {
    type: actionTypes.FETCH_CUSTOMER_POLICIES,
    token: token,
    userId: userId
  };
};
