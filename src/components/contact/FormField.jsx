function FormField({
  id,
  label,
  name,
  value,
  onChange,
  type = "text",
  error,
  fullWidth = false,
}) {
  return (
    <div className={fullWidth ? "form-field form-field--full" : "form-field"}>
      <label htmlFor={id}>{label}</label>
      <input
        id={id}
        type={type}
        name={name}
        value={value}
        onChange={onChange}
      />
      {error && <span className="form-error">{error}</span>}
    </div>
  );
}

export default FormField;
