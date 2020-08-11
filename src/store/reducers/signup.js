import * as actionTypes from '../actions/actionTypes';
import { updateObject } from '../../shared/utility';

const initialState = {
    customerData: [],
    loading: false,
    purchased: false,
    isUpdateSuccessfull:false
};

const customerSignupInit = ( state, action ) => {
    return updateObject( state, { purchased: false } );
};

const customerSignupStart = ( state, action ) => {
    return updateObject( state, { loading: true ,isUpdateSuccessfull:false} );
};

const customerSignupSuccess = ( state, action ) => {
    const newData = updateObject( action.customerData, { id: action.orderId } );
    return updateObject( state, {
        loading: false,
        purchased: true,
        isUpdateSuccessfull:true,
        customerData: newData
    } );
};

const customerSignupFail = ( state, action ) => {
    return updateObject( state, { loading: false,isUpdateSuccessfull:false } );
};
const customerUpdateStart = ( state, action ) => {
    return updateObject( state, { loading: true , isUpdateSuccessfull:false} );
};

const customerUpdateSuccess = ( state, action ) => {
    const newData = updateObject( action.customerData, { id: action.orderId } );
    return updateObject( state, {
        loading: false,
        purchased: true,
        isUpdateSuccessfull:true,
        customerData: newData
    } );
};

const customerUpdateFail = ( state, action ) => {
    return updateObject( state, { loading: false,isUpdateSuccessfull:false } );
};
const fetchCustomerDetailsStart = ( state, action ) => {
    return updateObject( state, { loading: true } );
};

const fetchCustomerDetailsSuccess = ( state, action ) => {
    return updateObject( state, {
        customerData: action.customerData,
        loading: false
    } );
};

const fetchCustomerDetailsFail = ( state, action ) => {
    return updateObject( state, { loading: false } );
};
const reducer = ( state = initialState, action ) => {
    switch ( action.type ) {
        case actionTypes.CUSTOMER_SIGNUP_INIT: return customerSignupInit( state, action );
        case actionTypes.CUSTOMER_SIGNUP_START: return customerSignupStart( state, action );
        case actionTypes.CUSTOMER_SIGNUP_SUCCESS: return customerSignupSuccess( state, action )
        case actionTypes.CUSTOMER_SIGNUP_FAIL: return customerSignupFail( state, action );
        case actionTypes.CUSTOMER_UPDATE_START: return customerUpdateStart( state, action );
        case actionTypes.CUSTOMER_UPDATE_SUCCESS: return customerUpdateSuccess( state, action )
        case actionTypes.CUSTOMER_UPDATE_FAIL: return customerUpdateFail( state, action );
        case actionTypes.FETCH_CUSTOMER_DETAILS_START: return fetchCustomerDetailsStart( state, action );
        case actionTypes.FETCH_CUSTOMER_DETAILS_SUCCESS: return fetchCustomerDetailsSuccess( state, action )
        case actionTypes.FETCH_CUSTOMER_DETAILS_FAIL: return fetchCustomerDetailsFail( state, action );
        
        default: return state;
    }
};

export default reducer;