import Textarea from "./textarea";
import React, { Component } from "react";
import Joi from "joi-browser";
import Input from "./input";
import SelectBox from "./selectBox";
import InputFile from "./input-file";

class Form extends Component {
  state = {
    data: {},
    errors: {},
  };

  renderButton(text, className = "btn btn-dark") {
    return (
      <button disabled={this.validate()} className={className}>
        {text}
      </button>
    );
  }

  renderInput(
    name,
    placeholder,
    disabled = false,
    type = "text",
    divClass,
    className
  ) {
    const { data, errors } = this.state;
    return (
      <Input
        divClass={divClass}
        className={className}
        placeholder={placeholder}
        type={type}
        name={name}
        value={data[name] === undefined ? "" : data[name]}
        onChange={this.handleChange}
        error={errors[name]}
        disabled={disabled}
      />
    );
  }

  handleChange = ({ currentTarget: input }) => {
    const errors = { ...this.state.errors };
    const data = { ...this.state.data };
    data[input.name] = input.value;
    const errorMessage = this.validateProperty(input);
    if (errorMessage) errors[input.name] = errorMessage;
    else delete errors[input.name];
    this.setState({ data, errors });
  };

  renderFileInput(
    name,
    text,
    disabled = false,
    accept = ".png, .jpg, .jpeg",
    divClass,
    className
  ) {
    const { data, errors } = this.state;
    return (
      <InputFile
        name={name}
        text={text}
        accept={accept}
        className={className}
        divClass={divClass}
        value={data[name]}
        onChange={this.handleFileChange}
        error={errors[name]}
        disabled={disabled}
      />
    );
  }

  handleFileChange = ({ target: input }) => {
    const errors = { ...this.state.errors };
    const errorMessage = this.validateProperty(input);
    if (errorMessage) return (errors[input.name] = errorMessage);
    else delete errors[input.name];
    const data = { ...this.state.data };
    data[input.name] = input.value;
    let stateImage = [...this.state.images];
    stateImage.push(input.files);
    this.setState({ data, errors, images: stateImage });
  };

  renderFileInputEdit(
    name,
    text,
    disabled = false,
    accept = ".png, .jpg, .jpeg",
    divClass,
    className
  ) {
    const { data, errors } = this.state;
    return (
      <InputFile
        name={name}
        text={text}
        accept={accept}
        className={className}
        divClass={divClass}
        value={data[name]}
        onChange={this.handleFileChangeEdit}
        error={errors[name]}
        disabled={disabled}
      />
    );
  }
  /** */
  handleFileChangeEdit = ({ target: input }) => {
    const errors = { ...this.state.errors };
    delete errors[input.name];
    const data = { ...this.state.data };
    data[input.name] = input.value;
    let stateImage = [...this.state.images];
    stateImage.push(input.files);
    this.setState({ data, errors, images: stateImage });
  };

  renderTextarea(name, placeholder, divClass, className, rows, disabled) {
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
        disabled={disabled}
      />
    );
  }

  renderSelectBox(
    name,
    defaultText,
    options,
    divClass,
    className,
    disabled = false
  ) {
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
        disabled={disabled}
      />
    );
  }

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
