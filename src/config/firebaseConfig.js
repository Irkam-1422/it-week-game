import { initializeApp } from "firebase/app";
import { getFirestore, getDoc, updateDoc, doc } from "firebase/firestore";

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyDDTq7N_fmrynjqOdxeeTg-TiR7QyRw7SQ",
  authDomain: "it-week-c4185.firebaseapp.com",
  projectId: "it-week-c4185",
  storageBucket: "it-week-c4185.appspot.com",
  messagingSenderId: "620611033780",
  appId: "1:620611033780:web:229a5144cb59c39319d5e1",
};

const app = initializeApp(firebaseConfig);
const firestore = getFirestore(app);

const docRef = doc(firestore, "gameInfo", "hV8NiGdQ7nAS90AB3eoP");

export const getInfo = async function () {
  try {
    const doc = await getDoc(docRef);
    const data = doc.data();
    return data;
  } catch (e) {
    console.error(e);
    throw e;
  }
};

export const updateCode = async function (code) {
  try {
    await updateDoc(docRef, {
      code: code,
    });
    return true;
  } catch (error) {
    console.error("Error updating user progress:", error);
    throw error;
  }
};

export const updateVirus = async function (bol) {
    try {
      await updateDoc(docRef, {
        virus: bol,
      });
      return bol;
    } catch (error) {
      console.error("Error updating user progress:", error);
      throw error;
    }
  };
