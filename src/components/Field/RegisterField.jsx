import PropTypes from "prop-types";

const RegisterField = ({ value, type, name, placeholder, onChange }) => {

  return (
    <input
      value={value}
      onChange={onChange}
      type={type}
      className="input input-bordered"
      placeholder={placeholder}
      name={name}
    />
  );
};

RegisterField.propTypes = {
  value: PropTypes.string,
  type: PropTypes.string,
  name: PropTypes.string.isRequired,
  placeholder: PropTypes.string.isRequired,
  onChange: PropTypes.func.isRequired,
};

RegisterField.defaultProps = {
  value: "",
  type: "text",
};

export default RegisterField;
