import React from "react";
import { useAuth0 } from "@auth0/auth0-react";
import { db } from "../../firebase-config"

const UserProfile = () => {
  const { user, isAuthenticated, isLoading } = useAuth0();

  useEffect(() => {
    if (isAuthenticated) {
      // Use `user.sub` as the document ID for Firestore
      const docRef = db.collection('users').doc(user.sub);

      docRef.set({
        email: user.email,
        name: user.name,
        // any other user details you wish to store
      }, { merge: true }); // merge: true ensures you don't overwrite existing data
    }
  }, [user, isAuthenticated]);

  if (isLoading) {
    return <div>Loading ...</div>;
  }

  return (
    isAuthenticated && (
      <div>
        <img src={user.picture} alt={user.name} />
        <p>{user.name}</p>
      </div>
    )
  );
};

export default UserProfile;