import React, { useState, useEffect } from 'react';

import Aux from '../Ax/Ax';
import Modal from '../../components/UI/Modal/Modal';

const withErrorHandler = ( WrappedComponent, axios ) => {
    return (props)=> {
        const [state, setState] = useState({
            error: null
        });
         useEffect(() => {
            let reqInterceptor = axios.interceptors.request.use( req => {
                setState( { error: null } );
                return req;
            } );
            let resInterceptor = axios.interceptors.response.use( res => res, error => {
                setState( { error: error } );
            } );
          
            // returned function will be called on component unmount 
            return () => {
                axios.interceptors.request.eject( reqInterceptor );
                axios.interceptors.response.eject( resInterceptor );
            }
          }, []);
         

        

        const errorConfirmedHandler = () => {
            setState( { error: null } );
        }

        
            return (
                <Aux>
                    <Modal
                        show={state.error}
                        modalClosed={errorConfirmedHandler}>
                        {state.error ? state.error.message : null}
                    </Modal>
                    <WrappedComponent {...props} />
                </Aux>
            );
     
    }
}

export default withErrorHandler;