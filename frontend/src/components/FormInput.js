import PropTypes from 'prop-types'

const FormInput = ({ label, type = 'text', value, onChange }) => (
  <div>{label}: <input type={type} name={label} value={value} onChange={onChange}/></div>
)

FormInput.propTypes = {
  label: PropTypes.string.isRequired,
  type: PropTypes.string,
  value: PropTypes.string.isRequired,
  onChange: PropTypes.func.isRequired,
}

export default FormInput