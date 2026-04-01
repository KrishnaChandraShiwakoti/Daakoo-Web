const ProfileAddressPanel = ({
  addresses,
  showAddressInput,
  newAddress,
  isAddingAddress,
  isDeletingAddress,
  setShowAddressInput,
  setNewAddress,
  setErrorMsg,
  setSuccessMsg,
  handleAddAddress,
  handleDeleteAddress,
}) => {
  return (
    <section className="panel address-panel">
      <div className="panel-head">
        <h2>Saved Addresses</h2>
        <button
          type="button"
          className="address-add-btn"
          onClick={() => {
            setErrorMsg("");
            setSuccessMsg("");
            setShowAddressInput((prev) => !prev);
          }}>
          + Add New
        </button>
      </div>

      {showAddressInput ? (
        <div className="address-add-form">
          <input
            type="text"
            value={newAddress}
            onChange={(event) => setNewAddress(event.target.value)}
            placeholder="Flat/House, Street, Area, City"
          />
          <button
            type="button"
            className="address-save-btn"
            onClick={handleAddAddress}
            disabled={isAddingAddress}>
            {isAddingAddress ? "Adding..." : "Add Address"}
          </button>
        </div>
      ) : null}

      {addresses.map((address, index) => {
        const trimmedAddress = address.trim();
        if (!trimmedAddress) return null;

        return (
          <article className="address-card" key={`${trimmedAddress}-${index}`}>
            <div className="address-card-header">
              <h3>{index === 0 ? "Primary Address" : `Address ${index + 1}`}</h3>
              <button
                type="button"
                className="address-delete-btn"
                onClick={() => handleDeleteAddress(index)}
                disabled={isDeletingAddress === index}
                title="Delete this address">
                {isDeletingAddress === index ? "Deleting..." : "Delete"}
              </button>
            </div>
            <p>{trimmedAddress}</p>
          </article>
        );
      })}
      {addresses.every((address) => !address.trim()) ? (
        <article className="address-card">
          <h3>No Address</h3>
          <p>No address added yet.</p>
        </article>
      ) : null}
    </section>
  );
};

export default ProfileAddressPanel;
