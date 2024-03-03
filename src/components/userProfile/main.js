import React, { useEffect } from "react";
import { useAuth0 } from "@auth0/auth0-react";
import { doc, setDoc } from "firebase/firestore";
import { db } from "../../firebase-config";
import './style.scss';

const UserProfile = () => {
  const { user, isAuthenticated, isLoading } = useAuth0();

  useEffect(() => {
    if (isAuthenticated && user) {
      // Correctly reference the document using the Auth0 user ID
      const userDocRef = doc(db, 'Users', user.sub);
      // Use setDoc from Firebase version 9+ to set the document
      setDoc(userDocRef, {
        email: user.email,
        userName: user.name, // Assuming you want to store the user's name under the field `userName`
      }, { merge: true }); // Ensures you don't overwrite existing data
    }
  }, [user, isAuthenticated]);

  if (isLoading) {
    return <div>Loading ...</div>;
  }

  return isAuthenticated && (
    <div className="user-profile">
      <img src={user.picture} alt={user.name} />
      <h2>{user.name}</h2>
      <button onClick={createGoal}>
        Click Me
      </button>
      {/* Display any other user information as needed */}
    </div>
  );

  function createGoal() {
    console.log("clicked");
  }
};

export default UserProfile;
