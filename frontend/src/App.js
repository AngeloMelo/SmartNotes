import React from 'react';
import AppNavbar from './components/AppNavbar';
import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import {connect} from 'react-redux';
import PropTypes from 'prop-types';

class App extends React.Component {

	render() {
	
		return (
			<div className="App">
				<AppNavbar />
				{this.props.children}
			</div>
		);
	}	
}

App.propTypes = {
	children: PropTypes.object.isRequired,
	loading: PropTypes.bool.isRequired
};


function mapStateToProps(state, ownProps){
	return{
		loading: state.ajaxCallsInProgress > 0
	};
}

export default connect(mapStateToProps)(App);			