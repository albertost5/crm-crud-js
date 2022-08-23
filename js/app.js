import { getAllClients } from './api.js';
import * as UI from './selectors.js';

document.addEventListener('DOMContentLoaded', async() => {
    try {
        const clients = await getAllClients();
        console.log('clients: ', clients);
    } catch (error) {
        console.log('Error: ', error);
    }

});
