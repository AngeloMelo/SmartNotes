import React from 'react';
import ReportListRow from './reportListRow';
import PropTypes from 'prop-types';

const ReportList = ({reports}) =>{

	return (
		<div className="form-bg">
            <div className="form-bg-title">Results</div>
			<table className="table">
				<thead>
					<tr>
						<th>&nbsp;</th>						
						<th>Note date</th>
						<th>Title</th>
					</tr>
				</thead>
				<tbody>
					{reports.map(report => <ReportListRow key={report._id} report={report} />)}
				</tbody>
			</table>
		</div>
		
	);
};

ReportList.propTypes = {
	reports: PropTypes.array.isRequired
};

export default ReportList;