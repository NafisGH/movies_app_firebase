import { initializeApp } from "firebase/app";
import {
  getFirestore,
  collection,
  addDoc,
  getDocs,
  setDoc,
  doc,
  serverTimestamp,
  deleteDoc,
} from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyCgcZBSJmUSyH9xdcZ_9LZ4877ckPrT0W4",
  authDomain: "movie-app-firebase-1691f.firebaseapp.com",
  projectId: "movie-app-firebase-1691f",
  storageBucket: "movie-app-firebase-1691f.appspot.com",
  messagingSenderId: "1025728046211",
  appId: "1:1025728046211:web:7eafaa51944ba0fbfde7b6",
};


export function createFirebase(key) {
  const app = initializeApp(firebaseConfig);
  const db = getFirestore(app);

  return {
    key,
    db,
    pull: async function () {
      const querySnapshot = await getDocs(collection(this.db, this.key));
      const movies = [];

      querySnapshot.forEach((doc) => {
        movies.push({
          id: doc.id,
          title: doc.data().title,
          status: "active",
        });
      });
      return movies;
    },

    push: async function (movie) {
      try {
        await setDoc(doc(this.db, this.key, movie.id), {
          title: movie.title,
          status: "active",
          createAdd: serverTimestamp(),
        });
      } catch (e) {
        console.error("Error adding document: ", e);
      }
    },
    delete: async function (movieId) {
      try {
        await deleteDoc(doc(this.db, this.key, movieId))
      } catch (e) {
        console.error("Error delete document: ", e);
      }
    },
  };
}


