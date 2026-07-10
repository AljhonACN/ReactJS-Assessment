import FormField from "./FormField";

function BasicInfoStep({ formData, errors, onChange }) {
  return (
    <div className="form-grid form-grid--compact">
      <FormField
        id="name"
        label="Name"
        name="name"
        value={formData.name}
        onChange={onChange}
        error={errors.name}
      />
      <FormField
        id="username"
        label="Username"
        name="username"
        value={formData.username}
        onChange={onChange}
      />
      <FormField
        id="phone"
        label="Contact Number"
        name="phone"
        value={formData.phone}
        onChange={onChange}
        error={errors.phone}
      />
      <FormField
        id="email"
        label="Email address"
        name="email"
        type="email"
        value={formData.email}
        onChange={onChange}
        error={errors.email}
      />
      <FormField
        id="website"
        label="Website"
        name="website"
        value={formData.website}
        onChange={onChange}
        error={errors.website}
        fullWidth
      />

      <div className="form-field">
        <label htmlFor="status">Status</label>
        <select
          id="status"
          name="status"
          value={formData.status}
          onChange={onChange}
        >
          <option value="Active">Active</option>
          <option value="Inactive">Inactive</option>
        </select>
      </div>
    </div>
  );
}

export default BasicInfoStep;
