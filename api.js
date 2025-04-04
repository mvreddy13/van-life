import { initializeApp } from "firebase/app";
import {
  getFirestore,
  collection,
  getDocs,
  getDoc,
  doc,
  query,
  where,
} from "firebase/firestore/lite";

const firebaseConfig = {
  apiKey: "AIzaSyCeTfYdoStdtkuT-XPBXvaV0Sb2tSVKTvA",
  authDomain: "van-life-295db.firebaseapp.com",
  projectId: "van-life-295db",
  storageBucket: "van-life-295db.firebasestorage.app",
  messagingSenderId: "614612148945",
  appId: "1:614612148945:web:376be173dfe9c4bbe85bf0",
};

const app = initializeApp(firebaseConfig);
const db = getFirestore(app);

export const getVans = async () => {
  const vansSnapshot = await getDocs(collection(db, "vans"));
  const vans = vansSnapshot.docs.map((doc) => {
    return { ...doc.data(), id: doc.id };
  });
  return vans;
};

export const getVan = async (id) => {
  const docRef = doc(db, "vans", id);
  const docSnap = await getDoc(docRef);
  console.log(docSnap);
  if (docSnap.exists()) {
    return { ...docSnap.data(), id: docSnap.id };
  } else {
    throw new Error("No such document!");
  }
};

export const getHostVans = async () => {
  const q = query(collection(db, "vans"), where("hostId", "==", 123));
  const snapshot = await getDocs(q);
  const vans = snapshot.docs.map((doc) => ({
    ...doc.data(),
    id: doc.id,
  }));

  return vans;
};

export const loginUser = async (creds) => {
  const userSnapshot = await getDocs(collection(db, "user"));
  const users = userSnapshot.docs.map((doc) => {
    return { ...doc.data(), id: doc.id };
  });
  const foundUser = users.find(
    (user) => user.email === creds.email && user.password === creds.password
  );
  if (!foundUser) {
    throw {
      message: "No user with those credentials found!",
      statusText: "Unauthorized",
      status: 401,
    };
  }
  return foundUser;
};
