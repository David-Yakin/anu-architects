import React from "react";

const Textarea = ({
  name,
  error,
  placeholder,
  divClass = "mb-2 px-0 col-12 border border-0",
  className = "text-rtl m-0 col-12 rounded",
  rows = "5",
  cols = "100",
  disabled = false,
  ...rest
}) => {
  return (
    <div className={divClass}>
      <textarea
        name={name}
        cols={cols}
        id={name}
        className={className}
        placeholder={placeholder}
        rows={rows}
        disabled={disabled}
        {...rest}></textarea>
      {error && <span className="text-danger border-0">{error}</span>}
    </div>
  );
};

export default Textarea;
