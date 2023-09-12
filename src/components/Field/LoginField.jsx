import PropTypes from "prop-types";

const LoginField = ({ value, type, name, placeholder, onChange }) => {
  const handleChange = (e) => {
    onChange(e.target.value, name);
  };
  const inputId = `field-${name}`;

  return (
    <input
      value={value}
      onChange={handleChange}
      id={inputId}
      type={type}
      className="input input-bordered"
      placeholder={placeholder}
      name={name}
    />
  );
};

LoginField.propTypes = {
  value: PropTypes.string,
  type: PropTypes.string,
  name: PropTypes.string.isRequired,
  placeholder: PropTypes.string.isRequired,
  onChange: PropTypes.func.isRequired,
};

LoginField.defaultProps = {
  value: "",
  type: "text",
};

export default LoginField;
