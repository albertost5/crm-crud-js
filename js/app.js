import { showClients, confirmDelete } from './functions.js';
import * as UI from './selectors.js';

document.addEventListener('DOMContentLoaded', showClients);
UI.clientList.addEventListener('click', confirmDelete);
