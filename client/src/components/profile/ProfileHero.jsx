const ProfileHero = ({ fullName, joinLabel }) => {
  return (
    <section className="profile-hero">
      <div className="profile-avatar-lg">{fullName.charAt(0).toUpperCase()}</div>
      <div className="profile-hero-info">
        <h1>{fullName}</h1>
        <p>Member since {joinLabel}</p>
      </div>
    </section>
  );
};

export default ProfileHero;
