import { useEffect, useState } from "react";
import { db, auth } from "../firebase";
import { doc, getDoc } from "firebase/firestore";

export default function Admin({ setPage }) {
  const [isAdmin, setIsAdmin] = useState(null);

  useEffect(() => {
    checkAdmin();
  }, []);

  const checkAdmin = async () => {
    const user = auth.currentUser;

    if (!user) {
      setIsAdmin(false);
      return;
    }

    const ref = doc(db, "users", user.uid);
    const snap = await getDoc(ref);

    if (snap.exists() && snap.data().role === "admin") {
      setIsAdmin(true);
    } else {
      setIsAdmin(false);
    }
  };

  if (isAdmin === null) return <h2>Loading...</h2>;

  if (!isAdmin) {
    return <h2>Access Denied ❌</h2>;
  }

  return (
    <div style={{ padding: "20px" }}>
      <h1>Admin Dashboard</h1>
      <button onClick={() => setPage("home")}>Back</button>
    </div>
  );
}
