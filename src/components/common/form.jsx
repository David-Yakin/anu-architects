import Textarea from "./textarea";
import React, { Component } from "react";
import Joi from "joi-browser";
import Input from "./input";
import SelectBox from "./selectBox";

class Form extends Component {
  state = {
    data: {},
    errors: {}
  };

  renderButton(text, className='btn btn-dark') {
    return (
      <button disabled={this.validate()} className={className}>
        {text}
      </button>
    );
  };

  renderInput(name, placeholder, type = "text", className, divClass) {
    const { data, errors } = this.state;
    return (
      <Input
        divClass={divClass}
        className={className}
        placeholder={placeholder}
        type={type}
        name={name}
        value={data[name]}
        onChange={this.handleChange}
        error={errors[name]}
      />
    );
  };

    renderTextarea(name, placeholder, divClass, className, rows ){
    const { data, errors } = this.state;
    return (
      <Textarea
        divClass={divClass}
        className={className}
        placeholder={placeholder}
        name={name}
        value={data[name]}
        rows={rows}
        onChange={this.handleChange}
        error={errors[name]}
      />
    );
  }

  renderSelectBox(name, defaultText, options, divClass, className){
    const { data, errors } = this.state;
    return (
      <SelectBox
      options={options}
      divClass={divClass}
      className={className}
      defaultText={defaultText}
      name={name}
      value={data[name]}
      onChange={this.handleChange}
      error={errors[name]}
      />
    );
  }

  handleChange = ({ currentTarget: input }) => {
    const errors = { ...this.state.errors };
    const errorMessage = this.validateProperty(input);
    if (errorMessage) errors[input.name] = errorMessage;
    else delete errors[input.name];
    const data = { ...this.state.data };
    data[input.name] = input.value;
    this.setState({ data, errors });
  };
  
  validateProperty = ({ name, value }) => {
    const obj = { [name]: value };
    const schema = { [name]: this.schema[name] };
    const { error } = Joi.validate(obj, schema);
    return error ? error.details[0].message : null;
  };
  
  validate = () => {
    const options = { abortEarly: false };
    const { error } = Joi.validate(this.state.data, this.schema, options);
    if (!error) return null;
    const errors = {};
    for (let item of error.details) errors[item.path[0]] = item.message;
    return errors;
  };


  handleSubmit = e => {
    e.preventDefault();
    const errors = this.validate();
    this.setState({ errors: errors || {} });
    if (errors) return;
    this.doSubmit();
  };
  
}

export default Form;