import React from 'react';
import {Link} from 'react-router';

class HomePage extends React.Component {

	render() {
	
		return (
			<div className="jumbotron">
				<h1>Wellcome</h1>
                <p>This is a simple SPA built with MongoDb, Express, ReactJs and NodeJs</p>
				<Link to="reports" className="btn btn-primary btn-lg">Notes Page</Link>
			</div>
		);
	}	
}

export default HomePage;