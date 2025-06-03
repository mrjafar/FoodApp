import React, { useState } from 'react';
import firebase from '../../../firebaseConfig';
import { auth } from '../../../firebaseConfig';

export const Auth = () => {
  const [user, setUser] = useState(null);

  const signInWithGoogle = () => {
    const googleProvider = new firebase.auth.GoogleAuthProvider();
    auth.signInWithPopup(googleProvider)
      .then((result) => {
        setUser(result.user);
        console.log("User signed in:", result.user);
      })
      .catch((error) => {
        console.error("Error during sign-in:", error);
      });
  };

  const signOut = () => {
    auth.signOut()
      .then(() => {
        setUser(null);
        console.log("User signed out");
      })
      .catch((error) => {
        console.error("Error during sign-out:", error);
      });
  };

  return (
    <div>
      {user ? (
        <div>
          <p>Welcome, {user.displayName}</p>
          <button onClick={signOut}>Sign Out</button>
        </div>
      ) : (
        <button onClick={signInWithGoogle}>Sign In with Google</button>
      )}
    </div>
  );
};

