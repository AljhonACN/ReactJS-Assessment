function FormStepper({ currentPage }) {
  return (
    <div className="form-stepper" aria-label="Form progress">
      <span className={currentPage === 1 ? "step-pill active" : "step-pill"}>
        1. Basic Info
      </span>
      <span className={currentPage === 2 ? "step-pill active" : "step-pill"}>
        2. Address &amp; Company
      </span>
    </div>
  );
}

export default FormStepper;
