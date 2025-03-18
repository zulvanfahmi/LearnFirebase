import { initializeApp } from 'firebase/app'
import { 
    getFirestore,
    collection,
    // getDocs,
    addDoc,
    deleteDoc,
    doc,
    onSnapshot,
    query,
    where
 } from 'firebase/firestore'

const firebaseConfig = {
    apiKey: "AIzaSyCiGMc23rRe4Jg7umsO9pG5sxE-e0-Jorw",
    authDomain: "learnfirebase-76ba7.firebaseapp.com",
    projectId: "learnfirebase-76ba7",
    storageBucket: "learnfirebase-76ba7.firebasestorage.app",
    messagingSenderId: "845952668841",
    appId: "1:845952668841:web:87d2157f72ba73943985b8"
};

// init firebase app
initializeApp(firebaseConfig)

// init services
const db = getFirestore()

// collection ref
const colRef = collection(db, 'books')

// queries
const q = query(colRef, where("author", "==", "test"))

// get collection data
// getDocs(colRef)
// .then((snapshot) => {

//     // console.log(snapshot.docs)

//     let books = []
//     snapshot.docs.forEach((doc) => {
//         books.push({
//             ...doc.data(), id: doc.id
//         })
//     })

//     console.log(books)

// })
// .catch(err => {
//     console.log(err.message)
// })


// get collection data realtime
onSnapshot(q, (snapshot) => {

    let books = []
    snapshot.docs.forEach((doc) => {
        books.push({
            ...doc.data(), id: doc.id
        })
    })

    console.log(books)

})


// Adding documents
const addBookForm = document.querySelector('.add')
addBookForm.addEventListener('submit', (e) => {
    e.preventDefault()

    addDoc(colRef, {
        title: addBookForm.title.value,
        author: addBookForm.author.value,
    })
    .then(() => {
        addBookForm.reset()
    })

})

// Deleting documents
const deleteBookForm = document.querySelector('.delete')
deleteBookForm.addEventListener('submit', (e) => {
    e.preventDefault()

    const docRef = doc(db, 'books', deleteBookForm.id.value)
    deleteDoc(docRef)
    .then(() => {
        deleteBookForm.reset()
    })

})