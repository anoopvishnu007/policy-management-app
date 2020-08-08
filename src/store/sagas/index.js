import { takeEvery, all, takeLatest } from "redux-saga/effects";

import * as actionTypes from "../actions/actionTypes";
import {
  logoutSaga,
  checkAuthTimeoutSaga,
  authUserSaga,
  authCheckStateSaga
} from "./auth";
import { purchasePolicySaga, fetchCustomerPoliciesSaga } from "./policies";
import { customerSignupSaga } from "./signup";

export function* watchAuth() {
  yield all([
    takeEvery(actionTypes.AUTH_CHECK_TIMEOUT, checkAuthTimeoutSaga),
    takeEvery(actionTypes.AUTH_INITIATE_LOGOUT, logoutSaga),
    takeEvery(actionTypes.AUTH_USER, authUserSaga),
    takeEvery(actionTypes.AUTH_CHECK_STATE, authCheckStateSaga)
  ]);
}


export function* watchPolicies() {
  yield takeLatest(actionTypes.PURCHASE_POLICIES, purchasePolicySaga);
  yield takeEvery(actionTypes.FETCH_CUSTOMER_POLICIES, fetchCustomerPoliciesSaga);
}
export function* watchCustomerSignup() {
  yield takeLatest(actionTypes.CUSTOMER_SIGNUP, customerSignupSaga);
 }