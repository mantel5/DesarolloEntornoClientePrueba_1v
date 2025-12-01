const handleFillCountry = _.debounce((ev) => {
    // only show matched events

    const node = ev.target.parentNode.getElementsByClassName('search-box')[0]
    node.style.display = 'initial'
    node.innerHTML = ''

    let inputText = ev.target.value.toLowerCase()
    console.log(`search for ${inputText}`);

    for (let country of countryList) {
        let row = document.createElement('div')
        row.innerText = country
        row.onclick = selectCountry

        node.appendChild(row)
    }
}, 300);

// --- FUNCIONES DE VALIDACIÓN CORREGIDAS ---

function validateName(event) {
    const name = event.target.value
    console.log('validate name: ' + name);
    
    // Corregido: Lógica simplificada y arreglado el error de sintaxis 'name.length = null'
    if (name.length > 8) {
        showElementWithClassName(event.target, 'valid-feedback')
        hideElementWithClassName(event.target, 'invalid-feedback')
        return true
    } else {
        showElementWithClassName(event.target, 'invalid-feedback')
        hideElementWithClassName(event.target, 'valid-feedback')
        return false
    }
}

function validatePassword(event) {
    const password = event.target.value
    const Numeros = /[0-9]/.test(password)
    const Minusculas = /[a-z]/.test(password)
    const Mayusculas = /[A-Z]/.test(password)
    console.log('validate password: ' + password);
    
    const passwordCorrecto = Numeros && password.length > 8 && Minusculas && Mayusculas

    if (passwordCorrecto) {
        showElementWithClassName(event.target, 'valid-feedback')
        hideElementWithClassName(event.target, 'invalid-feedback')
    } else {
        showElementWithClassName(event.target, 'invalid-feedback')
        hideElementWithClassName(event.target, 'valid-feedback')
    }

    return passwordCorrecto
}

function validateEmail(event) {
    const email = event.target.value
    // Corregido: Eliminados espacios sobrantes en el regex original
    const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    const emailCorrecto = regex.test(email);
    console.log('validate email: ' + email);
    
    // Corregido: Eliminado el error de sintaxis '}el else{'
    if (emailCorrecto) {
        showElementWithClassName(event.target, 'valid-feedback')
        hideElementWithClassName(event.target, 'invalid-feedback')
        return true
    } else {
        showElementWithClassName(event.target, 'invalid-feedback')
        hideElementWithClassName(event.target, 'valid-feedback')
        return false
    }
}

// --- RESTO DEL CÓDIGO ORIGINAL (INTACTO) ---

// general register
function register(event) {
    const email = event.target.value
    const regex = /^[^\s@] + @[^\s@]+\.[^\s@]+$/;
    const password = event.target.value
    const name = event.target.value

    if (email.length > 1, email.length = regex, password.length > 8, name.length > 8){
        fetch('http://localhost:3000/', {
            method: 'POST',
            body: JSON.stringify({
                'name': 'sample'
                
            }),
            headers: {
                'Content-type': 'application/json'
            },
        })
        event.preventDefault();
        return false;

    }
   
    
}

// utility functions
//nombre
function showElementWithClassName(node, className) {
    node.parentNode.getElementsByClassName(className)[0].style.display = 'initial'
}
function hideElementWithClassName(node, className) {
    node.parentNode.getElementsByClassName(className)[0].style.display = 'none'
}

function selectCountry(event) {
    console.log(event);
    document.forms[0].country.value = event.target.innerText

    const node = document.getElementsByClassName('search-box')[0]
    node.style.display = 'none'
    node.innerHTML = ''
}

function init() {
    let items = document.getElementsByClassName('valid-feedback')
    for (const item of items) {
        item.style.display = 'none'
    }
    items = document.getElementsByClassName('invalid-feedback')
    for (const item of items) {
        item.style.display = 'none'
    }

    document.getElementsByClassName('search-box')[0].style.display = 'none'
}

init()
