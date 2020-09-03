import React, { Component } from "react";
import { Col, Button, Collapse, FormGroup, Label, Input, Row } from 'reactstrap';
import PropTypes from 'prop-types';
import KeywordsViewer from './KeywordsViewer';
import AddKeyword from './addKeyword';

class ReportsFilter extends Component{

    constructor(props)
    {
        super(props);
        this.state = {
            fields : {
                keywords:[],
                iniDate:'',
                finDate:'',
                title:'', 
                isOpen: false
            }
        }
    }

    toggle = () =>{
        this.setState({...this.state, isOpen: !this.state.isOpen});
    }

    updateField = (ev) =>{
        ev.preventDefault();
        
        let fields = this.state.fields;
        fields[ev.target.name] = ev.target.value;
        
        this.setState({fields});
    }

    updateKeyWords = (id) =>{

        let fields = this.state.fields;
        fields.keywords.push(id);
        this.setState({fields});

        this.props.updateKeyWords(id);
    }

    onSearch = () =>{
        this.props.onSearch(this.state.fields);
    }

    render(){
        return(
            <div className="form-bg">
                <div className="form-bg-title" onClick={this.toggle}>Search fields</div>
                <Collapse isOpen={this.state.isOpen}>
                    <Row form>
                        <Col md={2}>
                            <FormGroup>
                                <Label for="iniDate">From</Label>
                                <Input type="date" name="iniDate" id="iniDate" onChange={this.updateField}/>
                            </FormGroup>
                        </Col>
                        <Col md={2}>
                            <FormGroup>
                                <Label for="finDate">To</Label>
                                <Input type="date" name="finDate" id="finDate" onChange={this.updateField}/>
                            </FormGroup>
                        </Col>
                        <Col md={4}>
                            <FormGroup>
                                <Label for="title">Note Title</Label>
                                <Input type="text" name="title" id="title" placeholder="Assunto" onChange={this.updateField} />
                            </FormGroup>
                        </Col>
                        <Col md={4}>
                            <Row form>
                                <Col md={12}>
                                    <KeywordsViewer kws={this.props.keywords}/> 
                                </Col>
                            </Row>
                            <Row form>    
                                <Col md={12}>
                                    <AddKeyword updateKeyWords={this.updateKeyWords}/>
                                </Col>
                            </Row>
                        </Col>
                    </Row>
                    <br/>
                    <Row form>
                        <Col md={3}>
                            <Button onClick={this.onSearch}>Search</Button>
                        </Col>
                    </Row>
                </Collapse>
            </div>
        );
    }
}

ReportsFilter.propTypes = {
    keywords: PropTypes.array.isRequired,
    updateKeyWords: PropTypes.func.isRequired,
    onSearch: PropTypes.func.isRequired
}


export default ReportsFilter;