import { getDataClient, validateEdit } from './functions.js';
import * as UI from './selectors.js';

document.addEventListener('DOMContentLoaded', getDataClient);
UI.form.addEventListener('submit', validateEdit);
