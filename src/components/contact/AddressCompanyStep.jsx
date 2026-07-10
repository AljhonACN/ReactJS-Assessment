import FormField from "./FormField";

function AddressCompanyStep({ formData, onChange }) {
  return (
    <div className="form-grid form-grid--compact">
      <FormField
        id="address.street"
        label="Street"
        name="address.street"
        value={formData.address.street}
        onChange={onChange}
      />
      <FormField
        id="address.suite"
        label="Suite"
        name="address.suite"
        value={formData.address.suite}
        onChange={onChange}
      />
      <FormField
        id="address.city"
        label="City"
        name="address.city"
        value={formData.address.city}
        onChange={onChange}
      />
      <FormField
        id="address.zipcode"
        label="ZIP Code"
        name="address.zipcode"
        value={formData.address.zipcode}
        onChange={onChange}
      />
      <FormField
        id="company.name"
        label="Company"
        name="company.name"
        value={formData.company.name}
        onChange={onChange}
      />
      <FormField
        id="company.catchPhrase"
        label="Catchphrase"
        name="company.catchPhrase"
        value={formData.company.catchPhrase}
        onChange={onChange}
      />
      <FormField
        id="company.bs"
        label="Business"
        name="company.bs"
        value={formData.company.bs}
        onChange={onChange}
        fullWidth
      />
    </div>
  );
}

export default AddressCompanyStep;
