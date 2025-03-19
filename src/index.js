import { initializeApp } from 'firebase/app'
import { 
    getFirestore,
    collection,
    addDoc,
    deleteDoc,
    doc,
    onSnapshot,
    query,
    orderBy,
    serverTimestamp,
    getDoc
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
const q = query(colRef, orderBy('createdAt'))


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
        createdAt: serverTimestamp(),
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

// get single document
const docRef = doc(db, 'books', '8l3jVPRBaoTWrjfJCEtZ')

// === not realtime update
// getDoc(docRef)
// .then((doc) => {
//     console.log(doc.data(), doc.id)
// })

// === realtime update
onSnapshot(docRef, (doc) => {
    console.log(doc.data(), doc.id)
})
