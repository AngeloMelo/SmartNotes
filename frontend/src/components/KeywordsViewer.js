import React from 'react';
import PropTypes from 'prop-types';
import { Badge, Label, Row, Col } from 'reactstrap';

const KeywordsViewer = ({kws}) =>{

	console.log('viewr: ' + JSON.stringify(kws))
	return (
		<div>
            <Label>Keywords</Label>
            <Row>
				<Col>
					{kws.map(
						keyword => <Badge color="primary" key={keyword._id} pill>{keyword.name}</Badge> 					
					)}
				</Col>
			</Row>
		</div>
	);
};

KeywordsViewer.propTypes = {
	kws: PropTypes.array.isRequired
};

export default KeywordsViewer;