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

 
