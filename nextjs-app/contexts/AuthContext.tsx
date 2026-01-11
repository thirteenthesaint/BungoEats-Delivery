'use client';

import { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import { 
  signInWithEmailAndPassword, 
  createUserWithEmailAndPassword,
  signOut,
  onAuthStateChanged,
  User as FirebaseUser
} from 'firebase/auth';
import { doc, setDoc, getDoc, updateDoc, serverTimestamp } from 'firebase/firestore';
import { auth, db } from '@/lib/firebase';

interface User {
  uid: string;
  name: string;
  email: string;
  phone?: string;
  favourites: string[];
  createdAt?: any;
  lastLoginAt?: any;
}

interface AuthContextType {
  user: User | null;
  login: (email: string, password: string) => Promise<void>;
  signup: (name: string, email: string, password: string, phone?: string) => Promise<void>;
  logout: () => void;
  isLoading: boolean;
  addFavourite: (restaurantId: string) => Promise<void>;
  removeFavourite: (restaurantId: string) => Promise<void>;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<User | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, async (firebaseUser) => {
      if (firebaseUser) {
        // Fetch user data from Firestore
        const userDoc = await getDoc(doc(db, 'users', firebaseUser.uid));
        if (userDoc.exists()) {
          const userData = userDoc.data() as User;
          setUser(userData);
          
          // Update last login
          await updateDoc(doc(db, 'users', firebaseUser.uid), {
            lastLoginAt: serverTimestamp()
          });
        }
      } else {
        setUser(null);
      }
      setIsLoading(false);
    });

    return () => unsubscribe();
  }, []);

  const login = async (email: string, password: string) => {
    try {
      await signInWithEmailAndPassword(auth, email, password);
      // User state will be updated by onAuthStateChanged
    } catch (error: any) {
      throw new Error(error.message || 'Login failed');
    }
  };

  const signup = async (name: string, email: string, password: string, phone?: string) => {
    try {
      const userCredential = await createUserWithEmailAndPassword(auth, email, password);
      const { uid } = userCredential.user;
      
      // Create user profile in Firestore
      const userData: User = {
        uid,
        name,
        email,
        phone: phone || '',
        favourites: [],
        createdAt: serverTimestamp(),
        lastLoginAt: serverTimestamp()
      };
      
      await setDoc(doc(db, 'users', uid), userData);
      setUser(userData);
    } catch (error: any) {
      throw new Error(error.message || 'Signup failed');
    }
  };

  const logout = async () => {
    try {
      await signOut(auth);
      setUser(null);
    } catch (error: any) {
      throw new Error(error.message || 'Logout failed');
    }
  };

  const addFavourite = async (restaurantId: string) => {
    if (!user) throw new Error('User not logged in');
    
    // Check if already at max (3 favorites)
    if (user.favourites.length >= 3) {
      throw new Error('Maximum 3 favorites allowed');
    }
    
    // Check if already favorited
    if (user.favourites.includes(restaurantId)) {
      return;
    }
    
    const updatedFavourites = [...user.favourites, restaurantId];
    await updateDoc(doc(db, 'users', user.uid), {
      favourites: updatedFavourites
    });
    
    setUser({ ...user, favourites: updatedFavourites });
  };

  const removeFavourite = async (restaurantId: string) => {
    if (!user) throw new Error('User not logged in');
    
    const updatedFavourites = user.favourites.filter(id => id !== restaurantId);
    await updateDoc(doc(db, 'users', user.uid), {
      favourites: updatedFavourites
    });
    
    setUser({ ...user, favourites: updatedFavourites });
  };

  return (
    <AuthContext.Provider value={{ user, login, signup, logout, isLoading, addFavourite, removeFavourite }}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
}
