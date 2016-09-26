import React, {Component} from 'react';
import ReactDOM from 'react-dom';
import {
  Button,
  Checkbox,
  Col,
  ControlLabel,
  Form,
  FormControl,
  FormGroup,
  ListGroup,
  ListGroupItem,
  Row,
} from 'react-bootstrap'
import SweetAlert from 'sweetalert-react';
import { connect } from 'react-redux';

import { addRequest } from '../actions';
import Request from './request';


const mapStateToProps = (state, router) => ({
  request: state.request
});

const matchDispatchToProps = dispatch => ({
      addRequest: request => dispatch(addRequest(request))
    }
)

var MylistGroupItem = null;

class Requests extends Component {
  constructor(props) {
    super(props);
    this.state = {
      show: false,
    };
  }
  render(){
    this.isEmpty(this.props.request);
    return(
      <Row bsClass="sl-modal">
        <SweetAlert
            show={this.state.show}
            type="warning"
            title="Error"
            text="Favor llenar los campos"
            onConfirm={() => this.setState({ show: false })}
        />
        <div className="border col-sm-4">
          <h6>Lista de Solicitudes</h6>
          <MylistGroupItem/>
        </div>
        <div className="col-sm-push-1 col-sm-6 border"   >
          <br/>  <br/>
          <Form horizontal onSubmit={this.requestForm.bind(this)} >
            <FormGroup controlId="requestName">
              <Col sm={12}>
                <input ref="requestName" type="text" className="form-control" placeholder="Nombre de la solicitud."/>
              </Col>
            </FormGroup>

            <FormGroup controlId="requestDescription">
              <Col sm={12}>
                <input ref="requestDescription"  type="text-area" className="form-control" placeholder="Descripción"/>
              </Col>
            </FormGroup>

            <FormGroup>
              <Col smOffset={2} sm={10}>
                <Button  type="submit">
                  Enviar Solicitud
                </Button>
              </Col>
            </FormGroup>
          </Form>
        </div>
      </Row>
    )
  }
  isEmpty(request){

    if (request.length == 0) {
         MylistGroupItem = props => (
              <ListGroup bsClass="list">
                <ListGroupItem>No hay Solicitudes para mostrar</ListGroupItem>
              </ListGroup>
          );
     }else{
        MylistGroupItem = props =>(
              <ul class="list-group">
                {this.props.request.map( rq => <Request rq={rq} key={rq.id}/> )}
              </ul>
          )
      }
  }
  requestForm(event){
    event.preventDefault();
    let rName = ReactDOM.findDOMNode(this.refs.requestName).value;
    let rDescription = ReactDOM.findDOMNode(this.refs.requestDescription).value;
    if(rName && rDescription){
      let request = {
        name:  rName,
        features:  rDescription
      };
      this.props.addRequest(request);
      ReactDOM.findDOMNode(this.refs.requestName).value = null;
      ReactDOM.findDOMNode(this.refs.requestDescription).value = null;
    }else{
      this.setState({ show: true })
    }
  }

}

export default connect(mapStateToProps,matchDispatchToProps)(Requests);