import * as actionTypes from '../actions/actionTypes';
import { updateObject } from '../../shared/utility';

const initialState = {
    orders: [],
    loading: false,
    purchased: false
};

const purchaseInit = ( state, action ) => {
    return updateObject( state, { purchased: false } );
};

const purchasePolicyStart = ( state, action ) => {
    return updateObject( state, { loading: true } );
};

const purchasePolicySuccess = ( state, action ) => {
    const newOrder = updateObject( action.orderData, { id: action.orderId } );
    return updateObject( state, {
        loading: false,
        purchased: true,
        orders: state.orders.concat( newOrder )
    } );
};

const purchasePolicyFail = ( state, action ) => {
    return updateObject( state, { loading: false } );
};

const fetchCustomerPoliciesStart = ( state, action ) => {
    return updateObject( state, { loading: true } );
};

const fetchCustomerPoliciesSuccess = ( state, action ) => {
    return updateObject( state, {
        orders: action.orders,
        loading: false
    } );
};

const fetchCustomerPoliciesFail = ( state, action ) => {
    return updateObject( state, { loading: false } );
};

const reducer = ( state = initialState, action ) => {
    switch ( action.type ) {
        case actionTypes.PURCHASE_INIT: return purchaseInit( state, action );
        case actionTypes.PURCHASE_POLICIES_START: return purchasePolicyStart( state, action );
        case actionTypes.PURCHASE_POLICIES_SUCCESS: return purchasePolicySuccess( state, action )
        case actionTypes.PURCHASE_POLICIES_FAIL: return purchasePolicyFail( state, action );
        case actionTypes.FETCH_CUSTOMER_POLICIES_START: return fetchCustomerPoliciesStart( state, action );
        case actionTypes.FETCH_CUSTOMER_POLICIES_SUCCESS: return fetchCustomerPoliciesSuccess( state, action );
        case actionTypes.FETCH_CUSTOMER_POLICIES_FAIL: return fetchCustomerPoliciesFail( state, action );
        default: return state;
    }
};

export default reducer;