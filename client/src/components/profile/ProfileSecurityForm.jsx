const ProfileSecurityForm = ({
  passwordData,
  isChangingPassword,
  errorMsg,
  successMsg,
  handlePasswordChange,
  setPasswordData,
}) => {
  return (
    <form className="panel personal-panel" onSubmit={handlePasswordChange}>
      <div className="panel-head">
        <h2>Security & Password</h2>
      </div>

      {successMsg ? <p className="profile-message success">{successMsg}</p> : null}
      {errorMsg ? <p className="profile-message error">{errorMsg}</p> : null}

      <label>
        Current Password
        <input
          type="password"
          value={passwordData.oldPassword}
          onChange={(event) =>
            setPasswordData((prev) => ({
              ...prev,
              oldPassword: event.target.value,
            }))
          }
          required
        />
      </label>

      <label>
        New Password
        <input
          type="password"
          value={passwordData.newPassword}
          onChange={(event) =>
            setPasswordData((prev) => ({
              ...prev,
              newPassword: event.target.value,
            }))
          }
          required
        />
      </label>

      <label>
        Confirm New Password
        <input
          type="password"
          value={passwordData.confirmPassword}
          onChange={(event) =>
            setPasswordData((prev) => ({
              ...prev,
              confirmPassword: event.target.value,
            }))
          }
          required
        />
      </label>

      <button
        type="submit"
        className="primary-btn"
        disabled={isChangingPassword}>
        {isChangingPassword ? "Updating..." : "Update Password"}
      </button>
    </form>
  );
};

export default ProfileSecurityForm;
