import React from "react";

function Input({ value, setValue, name, id, placeholder, disabled }) {
  const onChange = (event) => {
    if (event.target.value !== value) {
      setValue(event.target.value);
    }
  };

  return (
    <textarea
      name={name}
      id={id}
      placeholder={placeholder}
      onChange={onChange}
      value={value}
      disabled={disabled}
    />
  );
}

export default Input;
