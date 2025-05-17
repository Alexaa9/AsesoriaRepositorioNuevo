import { auth, db } from "./firebaseConfig";
import { createUserWithEmailAndPassword } from "firebase/auth";
import { collection, addDoc } from "firebase/firestore";

export async function registerUser(matricula, email, password) {
  try {
    const userCredential = await createUserWithEmailAndPassword(auth, email, password);
    const user = userCredential.user;

    // Guardar datos adicionales en Firestore
    await addDoc(collection(db, "usuarios"), {
      uid: user.uid,
      matricula,
      email
    });

    console.log("Usuario registrado y datos guardados en Firestore");
    return user;
  } catch (error) {
    console.error("Error en el registro:", error.message);
    throw error;
  }
}
