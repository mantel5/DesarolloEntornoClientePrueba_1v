const handleFillCountry = _.debounce((ev) => {
    const node = ev.target.parentNode.getElementsByClassName('search-box')[0]
    node.style.display = 'initial'
    node.innerHTML = ''

    let inputText = ev.target.value.toLowerCase()

    for (let country of countryList) {
        if (country.toLowerCase().includes(inputText)) {
            let row = document.createElement('div')
            row.innerText = country
            row.onclick = selectCountry
            node.appendChild(row)
        }
    }
}, 300);

function validateName(event) {
    const name = event.target.value
    
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
    const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    const emailCorrecto = regex.test(email);
    
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

function register(event) {
    event.preventDefault();
    
    const form = event.target;
    const email = form.querySelector('input[type="email"]').value;
    const password = form.querySelector('input[type="password"]').value;
    const name = form.querySelector('input[type="text"]').value;
    
    const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

    if (email.length > 1 && regex.test(email) && password.length > 8 && name.length > 8) {
        fetch('http://localhost:3000/', {
            method: 'POST',
            body: JSON.stringify({
                'name': name,
                'email': email
            }),
            headers: {
                'Content-type': 'application/json'
            },
        })
        return true;
    }
    return false;
}

function showElementWithClassName(node, className) {
    node.parentNode.getElementsByClassName(className)[0].style.display = 'initial'
}

function hideElementWithClassName(node, className) {
    node.parentNode.getElementsByClassName(className)[0].style.display = 'none'
}

function selectCountry(event) {
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

    const searchBox = document.getElementsByClassName('search-box')[0]
    if (searchBox) {
        searchBox.style.display = 'none'
    }
}

init()
