const ProfileSettingsPanel = ({ activePanel, setActivePanel, setErrorMsg, setSuccessMsg }) => {
  const handlePanelChange = (panelName) => {
    setActivePanel(panelName);
    setErrorMsg("");
    setSuccessMsg("");
  };

  return (
    <div className="panel side-panel">
      <div className="panel-head">
        <h2>Settings</h2>
      </div>
      <div className="settings-list">
        <button
          type="button"
          className={`ghost-item ${activePanel === "profile" ? "ghost-item-active" : ""}`}
          onClick={() => handlePanelChange("profile")}>
          Edit Profile Details
        </button>
        <button
          type="button"
          className={`ghost-item ${activePanel === "security" ? "ghost-item-active" : ""}`}
          onClick={() => handlePanelChange("security")}>
          Security and Password
        </button>
      </div>
    </div>
  );
};

export default ProfileSettingsPanel;
