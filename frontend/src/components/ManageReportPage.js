import React, {Component} from 'react';
import PropTypes from 'prop-types';
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';
import { Col, Button, Collapse, FormGroup, Label, Input, Row } from 'reactstrap';
import * as reportActions from '../actions/reportActions';
import TextInput from './common/TextInput';
import TextA from './common/TextArea';
import {browserHistory} from 'react-router';
import KeywordsViewer from './KeywordsViewer';
import AddKeyword from './addKeyword';

class ManageReportPage extends Component{

	constructor(props, context){
		super(props, context);
		this.state = {
			report: Object.assign({}, this.props.report), 
			errors: {},
			saving: false
		};
	}

	componentWillReceiveProps = (nextProps)=>
    {
        if (this.props.report._id != nextProps.report._id){

			//Necessary to populate form when existing report is loaded directly
			this.setState({report: Object.assign({}, nextProps.report)});
		}
	}

	updateReportState = (event) => {

		const field = event.target.name;
		let report = this.state.report;
		report[field] = event.target.value;

		return this.setState({report: report});
	}

	saveReport = (event) => {

		event.preventDefault();

		if(!this.reportFormIsValid()){
			return;
		}

		this.setState({saving: true});
		this.props.actions.saveReport(this.state.report);
		this.redirect();
	}

	updateKeyWords = (id) =>{

		let report = this.state.report;
		report.keywords.push(id);

		return this.setState({report: report});
	}

	redirect(){
		this.setState({saving: false});
		alert('Note saved');
		this.context.router.push('/reports');
	}

	reportFormIsValid = () => {
		let formIsValid = true;
		let errors = {};

        if (this.state.report.title.length < 5){
			errors.title = 'Title must have at least 5 characters.';
			formIsValid = false;
		}

		this.setState({errors: errors});
		return formIsValid;
	}

	redirectToReportsPage = (event)=>
    {
		browserHistory.push('/reports');
    }

	render(){
		const report = this.state.report;
		const kws = this.props.keywords.filter(k => report.keywords.includes(k._id) );
		return (
			<form>
				<h1>Note</h1>

				<Row form>
					<Col md={6}>
						<FormGroup>
							<TextInput
								name="title"
								label="Title"
								value={report.title}
								onChange={this.updateReportState}
								error={this.state.errors.title} />
						</FormGroup>
					</Col>	
					<Col md={6}>
						<FormGroup>
							<KeywordsViewer kws={kws}/> 
							<AddKeyword updateKeyWords={this.updateKeyWords}/>
						</FormGroup>
					</Col>			
				</Row>
				<br/>
				<TextA
					name="description"
					label="Description"
					value={report.description}
					onChange={this.updateReportState}
					error={this.state.errors.title} />

				<input 
					type="submit"
					disabled={this.state.saving}
					value={this.state.saving ? 'Saving...' : 'Save'}
					className="btn btn-primary"
					onClick={this.saveReport} />
		
				<Button color="dark" onClick={this.redirectToReportsPage}>Cancel</Button>
				

			</form>
		);
	}
}

ManageReportPage.propTypes = {
	report: PropTypes.object.isRequired,
	actions: PropTypes.object.isRequired
};

ManageReportPage.contextTypes = {
	router: PropTypes.object
};

function getReportById(reports, id){
    const report = reports.filter(report => report._id == id);
	if(report.length > 0) return report[0];
	return null;
}

function mapStateToProps(state, ownProps){

    const id = ownProps.params.id;
    let ini = { _id: '', title: '', keywords:[]};
	
	if(id && state.reports.length > 0)
	{
		ini = getReportById(state.reports, id);
	}
	
	return {
		report: ini,
		keywords: state.keywords
	};
}

function mapDispatchToProps(dispatch){
	return {
		actions: bindActionCreators(reportActions, dispatch)
	};
}

export default connect(mapStateToProps, mapDispatchToProps)(ManageReportPage);