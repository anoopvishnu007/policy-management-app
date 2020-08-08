import React, { Component , Fragment} from 'react';
import { connect } from 'react-redux';

import Aux from '../Ax/Ax';
import classes from './Layout.module.css';
import HeaderToolbar from '../../components/UI/Toolbar/Toolbar';

class Layout extends Component {
    state = {
        showSideDrawer: false
    }

    sideDrawerClosedHandler = () => {
        this.setState( { showSideDrawer: false } );
    }

    sideDrawerToggleHandler = () => {
        this.setState( ( prevState ) => {
            return { showSideDrawer: !prevState.showSideDrawer };
        } );
    } 

    render () {
        return (
            <Fragment>
                <Aux>
                
                    <HeaderToolbar />
                   
                    <main className={classes.Content}>
                     {this.props.children}
                    </main>
                </Aux>
            </Fragment>
        )
    }
}

const mapStateToProps = state => {
    return {
        isAuthenticated: state.auth.token !== null
    };
};

export default connect( mapStateToProps )( Layout );