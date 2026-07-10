import { useEffect, useState } from "react";
import FormStepper from "./FormStepper";
import BasicInfoStep from "./BasicInfoStep";
import AddressCompanyStep from "./AddressCompanyStep";
import { validateContact } from "../../utils/validateContact";

const EMPTY_FORM = {
  name: "",
  username: "",
  email: "",
  phone: "",
  website: "",
  status: "Active",
  address: { street: "", suite: "", city: "", zipcode: "" },
  company: { name: "", catchPhrase: "", bs: "" },
};

function ContactForm({
  initialValues,
  onSubmit,
  onCancel,
  buttonText,
  existingContacts = [],
}) {
  const [currentPage, setCurrentPage] = useState(1);
  const [errors, setErrors] = useState({});
  const [formData, setFormData] = useState(EMPTY_FORM);

  useEffect(() => {
    setCurrentPage(1);
    setErrors({});

    if (initialValues) {
      setFormData({
        name: initialValues.name || "",
        username: initialValues.username || "",
        email: initialValues.email || "",
        phone: initialValues.phone || "",
        website: initialValues.website || "",
        status: initialValues.status || "Active",
        address: {
          street: initialValues.address?.street || "",
          suite: initialValues.address?.suite || "",
          city: initialValues.address?.city || "",
          zipcode: initialValues.address?.zipcode || "",
        },
        company: {
          name: initialValues.company?.name || "",
          catchPhrase: initialValues.company?.catchPhrase || "",
          bs: initialValues.company?.bs || "",
        },
      });
    } else {
      setFormData(EMPTY_FORM);
    }
  }, [initialValues]);

  function handleChange(event) {
    const { name, value } = event.target;

    setFormData((prev) => {
      const next = { ...prev };

      if (name.startsWith("address.")) {
        const key = name.split(".")[1];
        next.address = { ...prev.address };
        next.address[key] = value;
      } else if (name.startsWith("company.")) {
        const key = name.split(".")[1];
        next.company = { ...prev.company };
        next.company[key] = value;
      } else {
        next[name] = value;
      }

      return next;
    });

    // Clear the field's own error
    if (errors[name]) {
      setErrors((prevErrors) => {
        const nextErrors = { ...prevErrors };
        delete nextErrors[name];
        return nextErrors;
      });
    }

    // Clear the "contact method" error once phone or email gets filled
    if (errors.contactMethod && (name === "phone" || name === "email")) {
      setErrors((prevErrors) => {
        const nextErrors = { ...prevErrors };
        delete nextErrors.contactMethod;
        return nextErrors;
      });
    }
  }

  function handleNext() {
    const validationErrors = validateContact(
      formData,
      existingContacts,
      initialValues?.id,
    );
    setErrors(validationErrors);

    if (Object.keys(validationErrors).length > 0) {
      return;
    }

    setCurrentPage(2);
  }

  function handleSubmit(event) {
    event.preventDefault();

    const validationErrors = validateContact(
      formData,
      existingContacts,
      initialValues?.id,
    );
    setErrors(validationErrors);

    if (Object.keys(validationErrors).length > 0) {
      setCurrentPage(1);
      return;
    }

    onSubmit({
      ...formData,
      ...(initialValues?.id ? { id: initialValues.id } : {}),
    });
  }

  return (
    <form className="contact-form" onSubmit={handleSubmit}>
      <FormStepper currentPage={currentPage} />

      {currentPage === 1 ? (
        <>
          <BasicInfoStep
            formData={formData}
            errors={errors}
            onChange={handleChange}
          />

          {errors.contactMethod && (
            <p className="form-error" role="alert">
              {errors.contactMethod}
            </p>
          )}
        </>
      ) : (
        <AddressCompanyStep formData={formData} onChange={handleChange} />
      )}

      <div className="form-actions">
        <button className="secondary-button" type="button" onClick={onCancel}>
          Cancel
        </button>

        {currentPage === 1 ? (
          <button className="primary-button" type="button" onClick={handleNext}>
            Next
          </button>
        ) : (
          <>
            <button
              className="secondary-button"
              type="button"
              onClick={() => setCurrentPage(1)}
              aria-label="Go back to the previous page"
            >
              Previous Page
            </button>
            <button className="primary-button" type="submit">
              {buttonText}
            </button>
          </>
        )}
      </div>
    </form>
  );
}

export default ContactForm;
