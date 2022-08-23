import * as UI from './selectors.js';
import { newClient } from './api.js';
import { getAllClients, deleteClient, getClientById, updateClient } from './api.js';

async function postClient( e ) {  
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
    
    try {
        return await newClient(CLIENT);
    } catch (error) {
        console.log('Error: ', error);
    }
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

async function showClients() {
    let clients; 

    try {
        clients = await getAllClients();
        console.log('clients: ', clients);
    } catch (error) {
        console.log('Error: ', error);
    }
    
    clients.forEach( client => {
        const { name, email, phone, company, id } = client;

        const row = document.createElement('tr');
        row.innerHTML += `
            <td class="px-6 py-4 whitespace-no-wrap border-b border-gray-200">
                <p class="text-sm leading-5 font-medium text-gray-700 text-lg  font-bold"> ${name} </p>
                <p class="text-sm leading-10 text-gray-700"> ${email} </p>
            </td>
            <td class="px-6 py-4 whitespace-no-wrap border-b border-gray-200 ">
                <p class="text-gray-700">${phone}</p>
            </td>
            <td class="px-6 py-4 whitespace-no-wrap border-b border-gray-200  leading-5 text-gray-700">    
                <p class="text-gray-600">${company}</p>
            </td>
            <td class="px-6 py-4 whitespace-no-wrap border-b border-gray-200 text-sm leading-5">
                <a href="edit-client.html?id=${id}" class="text-teal-600 hover:text-teal-900 mr-5">Edit</a>
                <a href="#" data-client="${id}" class="text-red-600 hover:text-red-900 delete">Delete</a>
            </td>
        `;

        UI.clientList.appendChild(row);
    });
}

async function confirmDelete( e ) {
    if ( e.target.classList.contains('delete') ) {
        const clientId = e.target.dataset.client;
        try {
           return await deleteClient(clientId);
        } catch (error) {
            console.log('Error: ', error);
        }
    }
}

async function getDataClient() {
    const urlParams = new URLSearchParams(window.location.search);
    const clientId = urlParams.get('id');

    try {
        const client = await getClientById(clientId);
        showDataClient(client)
    } catch (error) {
        console.log('Error: ', error);
    }
}

function showDataClient( client ) {
    const { name, email, phone, company } = client;
    UI.name.value = name;
    UI.email.value = email;
    UI.phone.value = phone;
    UI.company.value = company;
}

async function validateEdit( e ) {
    e.preventDefault();

    const clientId = new URLSearchParams(window.location.search).get('id');
    const CLIENT = {
        name: UI.name.value.trim(),
        email: UI.email.value.trim(),
        phone: UI.phone.value.trim(),
        company: UI.company.value.trim(),
        id: clientId
    }

    if ( !validateInputs(CLIENT) ) {
        showAlert('All fields are required!');
        return;
    }

    try {
        await updateClient(CLIENT);
        window.location.href = 'index.html';
    } catch (error) {
        console.log('Error: ', error);
    }


}

export {
    postClient,
    showClients,
    confirmDelete,
    getDataClient,
    validateEdit
}