const Profile = ({ user }) => {
  return (
    <div style={{ padding: 20 }}>
      <h1>Perfil de {user.username}</h1>
      <p>Esta es tu página de perfil.</p>
      {/* Más detalles o edición futura */}
    </div>
  );
};

export default Profile;
