import React, {Component} from 'react';
import { Button, Input, InputGroup, InputGroupAddon, Row, Col } from 'reactstrap';
import PropTypes from 'prop-types';
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';
import * as keywordActions from '../actions/keywordActions';


class AddKeyword extends Component{

    constructor(props){
        super(props);
    
        this.state = {
            open: false,
            word: ''
        }
    }

    addClick = (ev) =>{
        this.setState({open:true});
    }

    saveClick = (ev) =>{

        if(this.state.word ===''){
            this.setState({open:false, word: ''});
            return;
        }

        let id = this.getKeywordId(this.state.word)
        if(id !=='')
        {
            this.props.updateKeyWords(id);
            this.setState({open:false, word: ''});
            return;
        }

        this.props.actions.saveKeyword({name:this.state.word})
            .then((res) => {
                let id = this.getKeywordId(this.state.word)
                this.props.updateKeyWords(id);
                this.setState({open:false, word: ''});
            })
            .catch(err=>{
                alert(err);
                this.setState({open:false});
            });
        
    }

    getKeywordId = (word) =>
    {
        let res = this.props.keywords.filter(k => k.name === word);
        if(res.length === 1) return res[0]._id;
        return '';
    }

    setValue = (ev) =>{
        this.setState({word: ev.target.value});
    }

    render(){
        return (
            <Row>
                <Col>
                    <Button onClick={this.addClick} style={this.state.open ? { display: 'none' }: {}}>Add</Button>

                    <InputGroup>
                        <Input name="kw" type="text" style={this.state.open ? {} : { display: 'none' }} onChange={this.setValue} value={this.state.word} />
                        <InputGroupAddon addonType="append">
                            <Button color="secondary" onClick={this.saveClick} style={this.state.open ? {}: {display: 'none'}}>Include</Button>
                        </InputGroupAddon>
                    </InputGroup>
                </Col>
            </Row>
        );
    }
}

AddKeyword.propTypes = {
	keywords: PropTypes.array.isRequired,
    actions: PropTypes.object.isRequired,
    updateKeyWords: PropTypes.func.isRequired
};

function mapStateToProps(state){

	return {
		keywords: state.keywords
	};
}

function mapDispatchToProps(dispatch){
	return {
		actions: bindActionCreators(keywordActions, dispatch)
	};
}

export default connect(mapStateToProps, mapDispatchToProps)(AddKeyword);