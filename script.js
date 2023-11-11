import "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyBpmYttAkw55HTA7s90Pd5YhKUhYyZlxGw",
  authDomain: "dataform2-14179.firebaseapp.com",
  projectId: "dataform2-14179",
  storageBucket: "dataform2-14179.appspot.com",
  messagingSenderId: "631601428068",
  appId: "1:631601428068:web:2d7e00373272f671889171",
  measurementId: "G-F4NZYRSWFQ"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);

// Initialize Cloud Firestore and get a reference to the service
const db = firebase.firestore();

document.getElementById('formulario').addEventListener('submit', (event) => {
    event.preventDefault()

    //Validar Nombre
    let entradaNombre = document.getElementById('name')
    let errorNombre = document.getElementById('nameError')

    if(entradaNombre.value.trim() === '') {
        errorNombre.textContent = 'Por favor, introduzca su nombre'
        errorNombre.classList.add('error-message')
    }else {
        errorNombre.textContent = ''
        errorNombre.classList.remove('error-message')
    }

    //Validar Email
    let emailEntrada = document.getElementById('email')
    let emailError = document.getElementById('emailError')
    let emailPattern = /^\w+([.-_+]?\w+)*@\w+([.-]?\w+)*(\.\w{2,10})+$/;     //Patron de validacion basico

    if(!emailPattern.test(emailEntrada.value)){
        emailError.textContent = 'Por favor, introduzca su Email'
        emailError.classList.add('error-message')
    }else {
        emailError.textContent = ''
        emailError.classList.remove('error-message')
    }
    //Validar password
    let passEntrada = document.getElementById('password')
    let passError = document.getElementById('passwordError')
    let passPattern = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[$@$!%*?&])[A-Za-z\d$@$!%*?&]{8,15}/;

    if(!passPattern.test(passEntrada.value)) {
        passError.textContent = 'La contraseña debe tener al menos 8 caracteres, numeros, mayusculas, minusculas y caracteres especiales'
        passError.classList.add('error-message')
    }else {
        passError.textContent = ''
        passError.classList.remove('error-message')
    }
    
    //Si todo OK se envia el form
    if(!errorNombre.textContent && !emailError.textContent && !passError.textContent){
        db.collection("users").add({
            nombre: entradaNombre.value,
            email: emailEntrada.value,
            password: passEntrada.value
        })
        .then((docRef) => {
            console.log("Document written with ID: ", docRef.id);
        })
        .catch((error) => {
            console.error("Error adding document: ", error);
        });
        alert('El formulario se ha enviado con éxito')
        document.getElementById('formulario').reset();
    }

    
});
