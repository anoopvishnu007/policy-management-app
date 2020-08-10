import { put } from "redux-saga/effects";

import axios from "../../axios-customers";
import * as actions from "../actions";

export function* purchasePolicySaga(action) {
  yield put(actions.purchasePoliciesStart());
  try { 
    let response= "";
    if(action.isPost){
      response = yield axios.post(
        "/policies.json?auth=" + action.token,
        action.customerPolicies
      );
    }  else { 
     response = yield axios.put(
      "/policies.json?auth=" + action.token,
      action.customerPolicies
    );
  }
    yield put(
      actions.purchasePoliciesSuccess(response.data.name, action.customerPolicies)
    );
  } catch (error) {
    yield put(actions.purchasePoliciesFail(error));
  }
}

export function* fetchCustomerPoliciesSaga(action) {
  yield put(actions.fetchCustomerPoliciesStart());
  const queryParams =
    "?auth=" +
    action.token +
    '&orderBy="userId"&userId="' +
    action.userId +
    '"';
  try {
    const response = yield axios.get("/policies.json" + queryParams);
    const fetchedPolicies = response.data;
    /*for (let key in response.data) {
      fetchedPolicies.push({
        ...response.data[key],
        id: key
      });
    }*/
    yield put(actions.fetchCustomerPoliciesSuccess(fetchedPolicies));
  } catch (error) {
    yield put(actions.fetchCustomerPoliciesFail(error));
  }
}
