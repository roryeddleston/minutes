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
  const { user } = useAuth0();
  const goalsCollectionRef = collection(db, 'Goals');

  // 🔹 Fetch goals for the logged-in user (Make sure all goals are fetched)
  useEffect(() => {
    if (user) {
      const q = query(goalsCollectionRef, where("userID", "==", user.sub));
      const unsubscribe = onSnapshot(q, (querySnapshot) => {
        const fetchedGoals = querySnapshot.docs.map(doc => {
          const data = doc.data();
          return { ...data, id: doc.id, createdAt: data.createdAt || new Date().toISOString() }; // Default for old goals
        });

        // 🔹 Sort goals (show newest first, but include old ones)
        fetchedGoals.sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt));

        setGoals(fetchedGoals);
      });

      return () => unsubscribe();
    }
  }, [user, goalsCollectionRef]);

  // 🔹 Add a new goal (Firestore handles real-time update)
  const addGoal = async (goal) => {
    if (!user) {
      console.error("User is not authenticated");
      return null;
    }

    try {
      const createdAt = new Date().toISOString(); // Set `createdAt` for new goals
      const docRef = await addDoc(goalsCollectionRef, {
        ...goal,
        userID: user.sub,
        createdAt
      });

      return { id: docRef.id, ...goal, createdAt }; // 🔹 Ensure new goal has `createdAt`
    } catch (error) {
      console.error("Error adding goal:", error);
      return null;
    }
  };

  // 🔹 Edit an existing goal
  const editGoal = async (goalId, updatedGoal) => {
    const goalDoc = doc(db, 'Goals', goalId);
    await updateDoc(goalDoc, updatedGoal);
  };

  // 🔹 Delete a goal
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