const EMAIL_PATTERN = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
const WEBSITE_PATTERN = /^[^\s.]+\.[^\s.]+/;
const PH_PHONE_PATTERN = /^(09\d{9}|(\+?63)9\d{9})$/;

export function validateContact(data) {
  const errors = {};

  if (!data.name.trim()) {
    errors.name = "Name is required.";
  } else if (data.name.trim().length < 2) {
    errors.name = "Name must be at least 2 characters.";
  }

  if (!data.email.trim()) {
    errors.email = "Email is required.";
  } else if (!EMAIL_PATTERN.test(data.email.trim())) {
    errors.email = "Enter a valid email address.";
  }
  // Phone — OPTIONAL: only validate the format if something was entered
  //   if (data.phone.trim()) {
  //     const digitsOnly = data.phone.replace(/[\s-]/g, "");
  //     if (!PH_PHONE_PATTERN.test(digitsOnly)) {
  //       errors.phone = "Enter a valid PH mobile number (e.g. 0917 123 4567).";
  //     }
  //   }

  // ✅ Phone OPTIONAL — only validate format if something was typed
  if (data.phone.trim()) {
    const digitsOnly = data.phone.replace(/[\s-]/g, "");
    if (!PH_PHONE_PATTERN.test(digitsOnly)) {
      errors.phone = "Enter a valid PH mobile number (e.g. 0917 123 4567).";
    }
  }

  if (!data.website.trim()) {
    errors.website = "Website is required.";
  } else if (!WEBSITE_PATTERN.test(data.website.trim())) {
    errors.website = "Enter a valid website (e.g. example.com).";
  }

  return errors;
}
