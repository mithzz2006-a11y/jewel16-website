import { auth } from "../firebase";

export default function Profile() {
  const user = auth.currentUser;

  return (
    <div style={{ padding: "20px" }}>
      <h1>My Profile</h1>
      <p>Email: {user?.email}</p>
    </div>
  );
}
