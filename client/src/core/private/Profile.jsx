import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { changeMyPassword, getMyProfile, updateMyProfile } from "../../API/Auth";
import {
  ProfileHero,
  ProfileDetailsForm,
  ProfileSecurityForm,
  ProfileSettingsPanel,
  ProfilePaymentPanel,
  ProfileAddressPanel,
} from "../../components/profile";
import "../../styles/profile.css";

const Profile = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    fName: "",
    lName: "",
    email: "",
    contact: "",
    addresses: [""],
  });
  const [isLoading, setIsLoading] = useState(true);
  const [isSaving, setIsSaving] = useState(false);
  const [isChangingPassword, setIsChangingPassword] = useState(false);
  const [isAddingAddress, setIsAddingAddress] = useState(false);
  const [isDeletingAddress, setIsDeletingAddress] = useState(null);
  const [errorMsg, setErrorMsg] = useState("");
  const [successMsg, setSuccessMsg] = useState("");
  const [showAddressInput, setShowAddressInput] = useState(false);
  const [newAddress, setNewAddress] = useState("");
  const [activePanel, setActivePanel] = useState("profile");
  const [passwordData, setPasswordData] = useState({
    oldPassword: "",
    newPassword: "",
    confirmPassword: "",
  });

  let storedUser = null;
  try {
    storedUser = JSON.parse(localStorage.getItem("daakooUser") || "null");
  } catch {
    storedUser = null;
  }

  useEffect(() => {
    const hydrateProfile = async () => {
      const token = localStorage.getItem("daakooToken");
      if (!token) {
        navigate("/login", { replace: true });
        return;
      }

      setErrorMsg("");

      try {
        const data = await getMyProfile(token);
        const profileAddresses = Array.isArray(data?.addresses)
          ? data.addresses.filter((item) => typeof item === "string")
          : data?.address
            ? [data.address]
            : [];

        setFormData({
          fName: data?.fName || "",
          lName: data?.lName || "",
          email: data?.email || "",
          contact: data?.contact || "",
          addresses: profileAddresses.length > 0 ? profileAddresses : [""],
        });
      } catch (error) {
        if (error?.response?.status === 401) {
          localStorage.removeItem("daakooToken");
          localStorage.removeItem("daakooUser");
          navigate("/login", { replace: true });
          return;
        }
        setErrorMsg(
          error?.response?.data?.message ||
            "Unable to load your profile. Please try again.",
        );
      } finally {
        setIsLoading(false);
      }
    };

    hydrateProfile();
  }, [navigate]);

  const handleChange = (event) => {
    const { name, value } = event.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    const token = localStorage.getItem("daakooToken");

    if (!token) {
      navigate("/login", { replace: true });
      return;
    }

    setErrorMsg("");
    setSuccessMsg("");
    setIsSaving(true);

    try {
      const payload = {
        fName: formData.fName,
        lName: formData.lName,
        contact: formData.contact,
        addresses: formData.addresses
          .map((item) => item.trim())
          .filter(Boolean),
      };

      const data = await updateMyProfile(payload, token);

      if (data?.user) {
        localStorage.setItem(
          "daakooUser",
          JSON.stringify({
            ...(JSON.parse(localStorage.getItem("daakooUser") || "{}")),
            ...data.user,
            refreshJWT: token,
          }),
        );
      }

      setSuccessMsg(data?.message || "Profile updated successfully.");
    } catch (error) {
      setErrorMsg(
        error?.response?.data?.message ||
          "Unable to update your profile right now.",
      );
    } finally {
      setIsSaving(false);
    }
  };

  const handlePasswordChange = async (event) => {
    event.preventDefault();
    const token = localStorage.getItem("daakooToken");

    if (!token) {
      navigate("/login", { replace: true });
      return;
    }

    setErrorMsg("");
    setSuccessMsg("");

    if (
      !passwordData.oldPassword ||
      !passwordData.newPassword ||
      !passwordData.confirmPassword
    ) {
      setErrorMsg("Please fill all password fields.");
      return;
    }

    if (passwordData.newPassword !== passwordData.confirmPassword) {
      setErrorMsg("New password and confirm password must match.");
      return;
    }

    setIsChangingPassword(true);

    try {
      const data = await changeMyPassword(passwordData, token);
      setSuccessMsg(data?.message || "Password changed successfully.");
      setPasswordData({
        oldPassword: "",
        newPassword: "",
        confirmPassword: "",
      });
    } catch (error) {
      setErrorMsg(
        error?.response?.data?.message ||
          "Unable to change password right now.",
      );
    } finally {
      setIsChangingPassword(false);
    }
  };

  const handleDeleteAddress = async (addressIndex) => {
    const token = localStorage.getItem("daakooToken");

    if (!token) {
      navigate("/login", { replace: true });
      return;
    }

    setIsDeletingAddress(addressIndex);
    setErrorMsg("");
    setSuccessMsg("");

    const updatedAddresses = formData.addresses.filter(
      (_, index) => index !== addressIndex
    );

    try {
      const payload = {
        fName: formData.fName,
        lName: formData.lName,
        contact: formData.contact,
        addresses: updatedAddresses.filter((item) => item.trim()),
      };

      const data = await updateMyProfile(payload, token);
      const savedAddresses = data?.user?.addresses || updatedAddresses;

      setFormData((prev) => ({
        ...prev,
        addresses: savedAddresses.length > 0 ? savedAddresses : [""],
      }));

      if (data?.user) {
        localStorage.setItem(
          "daakooUser",
          JSON.stringify({
            ...(JSON.parse(localStorage.getItem("daakooUser") || "{}")),
            ...data.user,
            refreshJWT: token,
          }),
        );
      }

      setSuccessMsg("Address deleted successfully.");
    } catch (error) {
      setErrorMsg(
        error?.response?.data?.message ||
          "Unable to delete address right now.",
      );
    } finally {
      setIsDeletingAddress(null);
    }
  };

  const handleAddAddress = async () => {
    const trimmedAddress = newAddress.trim();
    const token = localStorage.getItem("daakooToken");

    if (!token) {
      navigate("/login", { replace: true });
      return;
    }

    if (!trimmedAddress) {
      setErrorMsg("Please enter an address first.");
      return;
    }

    if (
      formData.addresses.some(
        (address) => address.trim().toLowerCase() === trimmedAddress.toLowerCase(),
      )
    ) {
      setErrorMsg("That address already exists.");
      return;
    }

    setIsAddingAddress(true);
    setErrorMsg("");
    setSuccessMsg("");

    const updatedAddresses = [
      ...formData.addresses.filter((item) => item.trim()),
      trimmedAddress,
    ];

    try {
      const payload = {
        fName: formData.fName,
        lName: formData.lName,
        contact: formData.contact,
        addresses: updatedAddresses,
      };

      const data = await updateMyProfile(payload, token);
      const savedAddresses = data?.user?.addresses || updatedAddresses;

      setFormData((prev) => ({
        ...prev,
        addresses: savedAddresses.length > 0 ? savedAddresses : [""],
      }));

      if (data?.user) {
        localStorage.setItem(
          "daakooUser",
          JSON.stringify({
            ...(JSON.parse(localStorage.getItem("daakooUser") || "{}")),
            ...data.user,
            refreshJWT: token,
          }),
        );
      }

      setSuccessMsg("Address added successfully.");
      setNewAddress("");
      setShowAddressInput(false);
    } catch (error) {
      setErrorMsg(
        error?.response?.data?.message ||
          "Unable to add address right now.",
      );
    } finally {
      setIsAddingAddress(false);
    }
  };

  if (isLoading) {
    return (
      <main className="profile-page">
        <section className="profile-shell">
          <p className="profile-loading">Loading your profile...</p>
        </section>
      </main>
    );
  }

  const fullName = `${formData.fName} ${formData.lName}`.trim() || "User";
  const joinDate = storedUser?.createdAt ? new Date(storedUser.createdAt) : null;
  const joinLabel = joinDate
    ? joinDate.toLocaleDateString(undefined, {
        month: "long",
        year: "numeric",
      })
    : "Recently";

  return (
    <main className="profile-page">
      <section className="profile-shell">
        <ProfileHero fullName={fullName} joinLabel={joinLabel} />

        <section className="profile-grid">
          {activePanel === "profile" ? (
            <ProfileDetailsForm
              formData={formData}
              isSaving={isSaving}
              errorMsg={errorMsg}
              successMsg={successMsg}
              handleChange={handleChange}
              handleSubmit={handleSubmit}
            />
          ) : (
            <ProfileSecurityForm
              passwordData={passwordData}
              isChangingPassword={isChangingPassword}
              errorMsg={errorMsg}
              successMsg={successMsg}
              handlePasswordChange={handlePasswordChange}
              setPasswordData={setPasswordData}
            />
          )}

          <ProfileSettingsPanel
            activePanel={activePanel}
            setActivePanel={setActivePanel}
            setErrorMsg={setErrorMsg}
            setSuccessMsg={setSuccessMsg}
          />

          <ProfilePaymentPanel />

          <ProfileAddressPanel
            addresses={formData.addresses}
            showAddressInput={showAddressInput}
            newAddress={newAddress}
            isAddingAddress={isAddingAddress}
            isDeletingAddress={isDeletingAddress}
            setShowAddressInput={setShowAddressInput}
            setNewAddress={setNewAddress}
            setErrorMsg={setErrorMsg}
            setSuccessMsg={setSuccessMsg}
            handleAddAddress={handleAddAddress}
            handleDeleteAddress={handleDeleteAddress}
          />
        </section>
      </section>
    </main>
  );
};

export default Profile;
