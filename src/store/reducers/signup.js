import * as actionTypes from '../actions/actionTypes';
import { updateObject } from '../../shared/utility';

const initialState = {
    orders: [],
    loading: false,
    purchased: false
};

const customerSignupInit = ( state, action ) => {
    return updateObject( state, { purchased: false } );
};

const customerSignupStart = ( state, action ) => {
    return updateObject( state, { loading: true } );
};

const customerSignupSuccess = ( state, action ) => {
    const newOrder = updateObject( action.customer, { id: action.orderId } );
    return updateObject( state, {
        loading: false,
        purchased: true,
        orders: state.orders.concat( newOrder )
    } );
};

const customerSignupFail = ( state, action ) => {
    return updateObject( state, { loading: false } );
};


const reducer = ( state = initialState, action ) => {
    switch ( action.type ) {
        case actionTypes.CUSTOMER_SIGNUP_INIT: return customerSignupInit( state, action );
        case actionTypes.CUSTOMER_SIGNUP_START: return customerSignupStart( state, action );
        case actionTypes.CUSTOMER_SIGNUP_SUCCESS: return customerSignupSuccess( state, action )
        case actionTypes.CUSTOMER_SIGNUP_FAIL: return customerSignupFail( state, action );
        
        default: return state;
    }
};

export default reducer;