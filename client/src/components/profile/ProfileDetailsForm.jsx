const ProfileDetailsForm = ({
  formData,
  isSaving,
  errorMsg,
  successMsg,
  handleChange,
  handleSubmit,
}) => {
  return (
    <form className="panel personal-panel" onSubmit={handleSubmit}>
      <div className="panel-head">
        <h2>Personal Information</h2>
      </div>

      {successMsg ? <p className="profile-message success">{successMsg}</p> : null}
      {errorMsg ? <p className="profile-message error">{errorMsg}</p> : null}

      <div className="profile-two-col">
        <label>
          First Name
          <input
            type="text"
            name="fName"
            value={formData.fName}
            onChange={handleChange}
            required
          />
        </label>

        <label>
          Last Name
          <input
            type="text"
            name="lName"
            value={formData.lName}
            onChange={handleChange}
            required
          />
        </label>
      </div>

      <div className="profile-two-col">
        <label>
          Email Address
          <input type="email" name="email" value={formData.email} disabled />
        </label>

        <label>
          Phone Number
          <input
            type="tel"
            name="contact"
            value={formData.contact}
            onChange={handleChange}
            required
          />
        </label>
      </div>

      <button type="submit" className="primary-btn" disabled={isSaving}>
        {isSaving ? "Saving..." : "Save Changes"}
      </button>
    </form>
  );
};

export default ProfileDetailsForm;
