export default function Profile({ user }) {
  return (
    <div style={container}>
      
      <h1 style={title}>My Profile 👤</h1>
      <p style={subtitle}>Manage your personal details</p>

      <p><b>Email:</b> {user.email}</p>

    </div>
  );
}

const container = {
  padding: "20px",
  minHeight: "100vh",
  background: "#fff",
};

const title = {
  color: "maroon",
};

const subtitle = {
  marginBottom: "20px",
  color: "#555",
};
