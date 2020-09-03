import React from 'react';
import {Link} from 'react-router';
import PropTypes from 'prop-types';

const ReportListRow = ({report}) =>{
	const create_date = new Date(report.create_date).toLocaleDateString();
	return (
		<tr>
            <td><Link to={'/deletereport/' + report._id}>Remove</Link></td>
            <td>{create_date}</td>
            <td><Link to={'/report/' + report._id}>{report.title}</Link></td>

		</tr>
	);
};

ReportListRow.propTypes = {
	report: PropTypes.object.isRequired
};

export default ReportListRow;