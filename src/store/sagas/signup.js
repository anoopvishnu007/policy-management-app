import { put } from "redux-saga/effects";

import axios from "../../axios-customers";
import * as actions from "../actions";

export function* customerSignupSaga(action) {
  yield put(actions.customerSignupStart());
  try {
 
    const response = yield axios.post(
      "/Customers.json"  ,
      action.customerData
    );
    yield put(
      actions.customerSignupSuccess(response.data.name, action.customerData)
    );
  } catch (error) {
    yield put(actions.customerSignupFail(error));
  }
}
export function* customerUpdateSaga(action) {
  yield put(actions.customerUpdateStart());
  try {
 
    const response = yield axios.put(
      "/Customers.json"  ,
      action.customerData
    );
    yield put(
      actions.customerUpdateSuccess(response.data.name, action.customerData)
    );
  } catch (error) {
    yield put(actions.customerUpdateFail(error));
  }
}
export function* fetchCustomerDetailsSaga(action) {
  yield put(actions.fetchCustomerDetailsStart());
  const queryParams =
    "?auth=" +
    action.token +
    '&orderBy="userId"&userId="' +
    action.userId +
    '"';
  try {
    const response = yield axios.get("/Customers.json" + queryParams);
    const fetchedCustmer = response.data;
    /*for (let key in response.data) {
      fetchedCustmer.push({
        ...response.data[key],
        id: key
      });
    }*/
    yield put(actions.fetchCustomerDetailsSuccess(fetchedCustmer));
  } catch (error) {
    yield put(actions.fetchCustomerDetailsFail(error));
  }
}

 
