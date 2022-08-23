const URL = 'http://localhost:4000/clients';

async function newClient( clientObj ) {
    try {
        await fetch(URL , {
            method: 'POST',
            body: JSON.stringify(clientObj),
            headers: {
                'Content-Type': 'application/json'
            }
        });

        // Redirection to index
        window.location.href = 'index.html';
    } catch (error) {
        console.log('Error: ', error);
    }
}

async function getAllClients() {
    try {
        const response = await fetch(URL);
        const data = await response.json();
        return data;
    } catch (error) {
        console.log('Error: ', error);
    }
}

export {
    newClient, 
    getAllClients
}