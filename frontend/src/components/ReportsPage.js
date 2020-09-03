import React, {Component} from 'react';
import { Button } from 'reactstrap';
import {connect} from 'react-redux';
import {browserHistory} from 'react-router';
import {bindActionCreators} from 'redux';
import PropTypes from 'prop-types';
import ReportList from './ReportList';
import ReportsFilter from './reportsFilter';
import * as reportActions from '../actions/reportActions';

class ReportsPage extends Component{

    constructor(props)
    {
        super(props);
        this.state = {
            keywords : []
        }
    }
    
    redirectToNewReportPage = (event)=>
    {
		browserHistory.push('/report');
    }
    
    updateKeyWords = (id) =>{
        const keyword = this.props.keywords.filter(k => k._id === id); 
        const stateKeywords = this.state.keywords; 
        stateKeywords.push(keyword[0]);
        this.setState({keywords: stateKeywords});
    }

    onSearch = (fields)=>{
        const keywords = JSON.stringify(fields.keywords);
        this.props.actions.loadReports(keywords, fields.iniDate, fields.finDate, fields.title);
    }

    render()
    {
        const {reports} = this.props;

        return(
            <div>
				<h1>My Notes</h1>
                <Button color="primary" onClick={this.redirectToNewReportPage}>Add a note</Button>

                <ReportsFilter 
                    updateKeyWords={this.updateKeyWords} 
                    keywords={this.state.keywords} 
                    onSearch={this.onSearch}/>
                <br/>
				<ReportList reports={reports}  />
            </div>
        );
    }
}

ReportsPage.propTypes = {
    actions: PropTypes.object.isRequired,
    reports: PropTypes.array.isRequired
}

const mapStateToProps = (state) => ({
    reports: state.reports,
    keywords: state.keywords
})

const mapDispatchToProps = (dispatch) =>{

	return {
		actions: bindActionCreators(reportActions, dispatch)
	};
}

export default connect(mapStateToProps, mapDispatchToProps)(ReportsPage); 