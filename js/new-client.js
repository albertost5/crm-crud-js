import * as UI from './selectors.js';
import { postClient } from './functions.js';

UI.form.addEventListener('submit', postClient);