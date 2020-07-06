import React, { Component } from 'react';
import { Meteor } from 'meteor/meteor';

import {
  Row,
  Col,
  FormGroup,
  Input,
  Button,
  CustomInput,
  Alert
} from 'reactstrap';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
  faTimes,
  faExclamationTriangle
} from '@fortawesome/free-solid-svg-icons';

export default class FormBuilder extends Component {
  constructor(props) {
    super(props);
    this.state = {
      inputs: 1,
      form: [
        { label: '', type: '', required: false }
      ],
      error: ''
    }
  }

  addFormField = () => {
    this.setState({
      inputs: this.state.inputs + 1,
      form: this.state.form.concat({ label: '', type: '', required: false })
    })
  }

  handleChange = (e, key) => {
    const name = key.split('-')[0];
    const index = key.split('-')[1];

    let form = [...this.state.form];
    let field = {...form[index]};
    field[name] = (name == "required") ? e.target.checked : e.target.value;
    form[index] = field;

    this.setState({ form });
  }

  removeFormField = () => {
    let form = [...this.state.form];
    form.pop();
    this.setState({ form: form, inputs: this.state.inputs - 1 });
  }

  getFormContents = () => {

    if (this.state.form.some((field) => (field.label === '' && field.type === '')) && inputs == 1) {
      return [];
    }

    if (this.state.form.some((field) => (field.label === '' || field.type === ''))) {
      this.setState({ error: "Please fill out all inputs or delete unused fields"});
      return null;
    }

    this.setState({ error: '' });
    return this.state.form;
  }

  showFormFields = () => {
    return this.state.form.map((field, index) => {
      return (
        <Row key={index}>
          <Col lg="6">
            <FormGroup>
              <Input
                className="form-control-alternative"
                id={`label-${index}`}
                placeholder="e.g. Phone Number"
                type="text"
                onChange={e => this.handleChange(e, `label-${index}`)}
              />
            </FormGroup>
          </Col>
          <Col lg="4">
            <FormGroup>
              <Input
                className="form-control-alternative"
                id={`type-${index}`}
                type="select"
                onChange={e => this.handleChange(e, `type-${index}`)}
                >
                <option value="">Select</option>
                <option value="email">Email</option>
                <option value="tel">Phone</option>
                <option value="number">Number</option>
                <option value="url">URL</option>
                <option value="textarea">Comment</option>
                <option value="text">Other</option>
              </Input>
            </FormGroup>
          </Col>
          <Col lg="2">
            <FormGroup>
              <CustomInput
                id={`required-${index}`}
                type="checkbox"
                onChange={e => this.handleChange(e, `required-${index}`)}
                />
            </FormGroup>
          </Col>
        </Row>
      )
    })
  }

  render() {
    return (
      <div className="mt-3">
        <small>Add up to 3 custom form fields to your public campaign page</small>
        <Row className="mt-3">
          <Col lg="6">
            <label
              className="form-control-label"
              htmlFor="label0"
            >
              Label
            </label>
          </Col>
          <Col lg="4">
            <label
              className="form-control-label"
              htmlFor="type0"
            >
              Type
            </label>
          </Col>
          <Col lg="2">
            <label className="form-control-label">
              Required
            </label>
          </Col>
        </Row>
        {this.showFormFields()}
        <Button
          size="sm"
          color="secondary"
          type="button"
          disabled={this.state.inputs >= 3}
          onClick={this.addFormField}
          >
          + New Field
        </Button>
        <Button
          className="btn-icon btn-2"
          color="warning"
          type="button"
          size="sm"
          disabled={this.state.inputs < 2}
          onClick={this.removeFormField}
          >
          <span className="btn-inner--icon">
            <FontAwesomeIcon icon={faTimes} />
          </span>
        </Button>
        { this.state.error ?
          <Alert color="danger" className="mt-4">
            <span className="alert-inner--icon">
              <FontAwesomeIcon icon={faExclamationTriangle}/>
            </span>{" "}
            <span className="alert-inner--text">
              {this.state.error}
            </span>
          </Alert> : ''
        }
      </div>
    );
  }
}
