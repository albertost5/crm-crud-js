import * as UI from './selectors.js';
import { newClient } from './api.js';

function postClient( e ) {  
    e.preventDefault();

    const nameInput = UI.name.value.trim();
    const emailInput = UI.email.value.trim();
    const phoneInput = UI.phone.value.trim();
    const companyInput = UI.company.value.trim();

    const CLIENT = {
        name: nameInput,
        email: emailInput,
        phone: phoneInput,
        company: companyInput
    }

    if ( !validateInputs(CLIENT) ) {
        showAlert('All fields are required!');
        return;
    }

    newClient(CLIENT);
}

function validateInputs( Obj ) {
    return Object.values(Obj).every( input => input !== '');
}

function showAlert( message ) {
    let alert = document.querySelector('.bg-red-100');

    if ( !alert ) {
        alert = document.createElement('p');
        alert.classList.add(
            'bg-red-100', 'rounded', 'text-red-700', 'border-red-400', 
            'px-4', 'py-3', 'text-center', 'max-w-lg', 'mx-auto', 'mt-6'
        );

        alert.innerHTML = `
            <strong class="font-bold">
                Error: <span class="block sm:inline font-light">${message}</span>
            </strong>
        `;

        UI.form.appendChild(alert);
    }

    setTimeout(() => {
        alert.remove();
    }, 3000);
}

export {
    postClient
}