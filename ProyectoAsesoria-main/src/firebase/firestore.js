
import { db } from "./firebaseConfig";
import { collection, addDoc, doc, getDoc } from "firebase/firestore"; // Importación corregida


export async function guardarUsuario(matricula, email, password) {
  try {
    await addDoc(collection(db, "Asesorado"), {
      matricula,
      correo: email,
      password
    });
    console.log("Usuario registrado correctamente en Firestore");
  } catch (error) {
    console.error("Error al guardar usuario:", error.message);
    throw error;
  }
}

// 🔹 Nueva función para obtener los datos personales de Firestore
export async function obtenerDatosPersonales(uid) {
  try {
    const userDocRef = doc(db, "Asesorado", uid); // Usamos el UID del usuario como referencia
    const userDocSnap = await getDoc(userDocRef);

    if (userDocSnap.exists()) {
      return userDocSnap.data(); // Devuelve los datos del usuario
    } else {
      console.error("No se encontraron datos del usuario en Firestore");
      return null;
    }
  } catch (error) {
    console.error("Error al obtener datos personales:", error.message);
    throw error;
  }
}