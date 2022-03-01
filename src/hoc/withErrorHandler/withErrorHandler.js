import React from 'react';
import Modal from '../../Components/UI/MODAL/Modal';
import Aux from '../Auxillary'
import useHttpErrorHandler from '../../hooks/httpErrorHandler';

const withErrorHandler = (WrappedComponent, axios) => {
    return props => {
        const[error, clearError] =useHttpErrorHandler(axios)
        
        return (
            <Aux>
                <Modal show={error} modalClosed={clearError}>
                    {error ? error.message : null}
                </Modal>
                <WrappedComponent {...props} />
            </Aux>
        )
    }
}

export default withErrorHandler;