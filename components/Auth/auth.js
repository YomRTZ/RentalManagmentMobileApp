
import {createUserWithEmailAndPassword, sendEmailVerification, signInWithEmailAndPassword, sendPasswordResetEmail, confirmPasswordReset as firebaseConfirmPasswordReset } from 'firebase/auth';
import { auth,firestore} from '../../firebaseConfig';  
import { doc, setDoc} from 'firebase/firestore';
export const registerUser = async (email, password) => {
  try {
    const userCredential = await createUserWithEmailAndPassword(auth, email, password);
    const user = userCredential.user;
    // await sendEmailVerification(user);
    console.log('User registered and verification email sent:', user);
  } catch (error) {
    console.error('Error registering user:', error.message);
  }
};

export const signInUser = async (email, password) => {
  try {
    const userCredential = await signInWithEmailAndPassword(auth, email, password);
    const user = userCredential.user;
    console.log('User signed in:', user);
    await createUserDocument(user);
    return user;
  } catch (error) {
    console.error('Error signing in user:', error.message);
  }
  
};

const createUserDocument = async (user) => {
  const userRef = doc(firestore, 'users', user.uid); 
  await setDoc(userRef, {
  email: user.email,
    createdAt: new Date().toISOString()
  });
}

export const resetPassword = async (email) => {
  try {
    await sendPasswordResetEmail(auth, email);
    console.log('Password reset email sent.');
   
  } catch (error) {
    console.error('Error sending password reset email:', error.message);
    
  }
};


export const confirmPasswordReset = async (code, newPassword) => {
    try {
      await firebaseConfirmPasswordReset(auth, code, newPassword);
      console.log('Password reset confirmed.');
    } catch (error) {
      console.error('Error confirming password reset:', error.message);
      throw new Error(error.message);
    }
};
