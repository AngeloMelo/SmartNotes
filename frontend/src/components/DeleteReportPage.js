import React, {Component} from 'react';
import PropTypes from 'prop-types';
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';
import * as reportActions from '../actions/reportActions';

class DeleteReportPage extends Component{

    constructor(props, context){
		super(props, context);

		this.state = {
			report: Object.assign({}, this.props.report), 
			errors: {},
			deleting: false
		};
    }

    deleteReport = (ev)=>
    {
        ev.preventDefault();
		this.setState({deleting: true});
		this.props.actions.deleteReport(this.state.report)
        this.redirect();
    }

    redirect(){
		this.setState({deleting: false});
        // toastr.success('City deleted');
        alert('report deleted');
		this.context.router.push('/reports');
	}

    cancelDeletion = (ev)=>{
        ev.preventDefault();
		this.context.router.push('/reports');
    }

    render(){
        return (
            <div>
				<h2>Excluir report</h2>
				Deseja realmente excluir este report?
				<br/>
				{this.props.report.title}
				<br/>
				<input 
					type="button"
					value="Remover"
					className="btn btn-danger"
					disabled={this.state.deleting}
					onClick={this.deleteReport}/>

				<input 
					type="button"
					value="Cancelar"
					className="btn btn-primary"
					onClick={this.cancelDeletion}/>	
			</div>
        );
    }
}

DeleteReportPage.propTypes = {
	report: PropTypes.object.isRequired,
	actions: PropTypes.object.isRequired
};

DeleteReportPage.contextTypes = {
	router: PropTypes.object
};

function getById(reports, id){
    const reportsF = reports.filter(report => report._id == id);
	if(reportsF.length > 0) return reportsF[0];
	return null;
}

function mapStateToProps(state, ownProps){

	const id = ownProps.params.id;
	let iniReport = getById(state.reports, id);
	
	return {
		report: iniReport
	};
}

function mapDispatchToProps(dispatch){
	return {
		actions: bindActionCreators(reportActions, dispatch)
	};
}

export default connect(mapStateToProps, mapDispatchToProps)(DeleteReportPage);