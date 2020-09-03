import React from 'react';
import {Route, IndexRoute} from 'react-router';
import ReportsPage from './components/ReportsPage';
import App from './App';
import HomePage from './components/home';
import ManageReportPage from './components/ManageReportPage'; 
import DeleteReportPage from './components/DeleteReportPage';

export default (
	<Route path="/" component={App}>
		<IndexRoute component={HomePage} />
		<Route path="reports" component={ReportsPage} />
		<Route path="report" component={ManageReportPage} />
        <Route path="report/:id" component={ManageReportPage} />
		<Route path="deletereport/:id" component={DeleteReportPage} />			 
	</Route>
);