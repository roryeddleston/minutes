import React, { createContext, useContext, useEffect, useState } from 'react';
import { db } from '../src/firebase-config';
import {
  collection,
  addDoc,
  query,
  where,
  onSnapshot,
  doc,
  updateDoc,
  deleteDoc
} from 'firebase/firestore';
import { useAuth0 } from "@auth0/auth0-react";

const GoalsContext = createContext();

export const useGoals = () => useContext(GoalsContext);

export const GoalsProvider = ({ children }) => {
  const [goals, setGoals] = useState([]);
  const { user } = useAuth0(); // Get the authenticated user's details
  const goalsCollectionRef = collection(db, 'Goals');

  // Fetch goals for the logged-in user
  useEffect(() => {
    if (user) {
      const q = query(goalsCollectionRef, where("userID", "==", user.sub));
      const unsubscribe = onSnapshot(q, (querySnapshot) => {
        setGoals(querySnapshot.docs.map(doc => ({ ...doc.data(), id: doc.id })));
      });

      return () => unsubscribe();
    }
  }, [user]);

  const addGoal = async (goal) => {
    console.log(user)
    if (!user) {
      console.error('User is not authenticated');
      return; // Or handle this case differently, e.g., redirect to login
    }

    await addDoc(goalsCollectionRef, {
      ...goal,
      userID: user.sub, // Now protected against undefined user
      currentNumber: 0, // Initialize currentNumber
    });
  };

  const editGoal = async (goalId, updatedGoal) => {
    const goalDoc = doc(db, 'Goals', goalId);
    await updateDoc(goalDoc, updatedGoal);
  };

  const deleteGoal = async (goalId) => {
    const goalDoc = doc(db, 'Goals', goalId);
    await deleteDoc(goalDoc);
  };

  return (
    <GoalsContext.Provider value={{ goals, addGoal, editGoal, deleteGoal }}>
      {children}
    </GoalsContext.Provider>
  );
};
