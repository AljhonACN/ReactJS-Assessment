const EMAIL_PATTERN = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
const WEBSITE_PATTERN = /^[^\s.]+\.[^\s.]+/;
const PH_PHONE_PATTERN = /^(09\d{9}|(\+?63)9\d{9})$/;

export function validateContact(data, existingContacts = [], currentId = null) {
  const errors = {};

  // Name — REQUIRED + no duplicates
  if (!data.name.trim()) {
    errors.name = "Name is required.";
  } else if (data.name.trim().length < 2) {
    errors.name = "Name must be at least 2 characters.";
  } else {
    const nameTaken = existingContacts.some(
      (contact) =>
        String(contact.id) !== String(currentId) &&
        contact.name?.trim().toLowerCase() === data.name.trim().toLowerCase(),
    );
    if (nameTaken) {
      errors.name = "A contact with this name already exists.";
    }
  }

  // At least ONE of phone OR email is required
  const hasPhoneOrEmail = data.phone.trim() || data.email.trim();

  if (!hasPhoneOrEmail) {
    errors.contactMethod =
      "Provide at least a contact number or an email address.";
  }

  // Email — validate format only if entered
  if (data.email.trim()) {
    if (!EMAIL_PATTERN.test(data.email.trim())) {
      errors.email = "Enter a valid email address.";
    }
  }

  // Phone — validate format only if entered (PH format)
  if (data.phone.trim()) {
    const digitsOnly = data.phone.replace(/[\s-]/g, "");
    if (!PH_PHONE_PATTERN.test(digitsOnly)) {
      errors.phone = "Enter a valid PH mobile number (e.g. 0917 123 4567).";
    }
  }

  // Website — fully OPTIONAL: validate format only if entered
  if (data.website.trim()) {
    if (!WEBSITE_PATTERN.test(data.website.trim())) {
      errors.website = "Enter a valid website (e.g. example.com).";
    }
  }

  return errors;
}
