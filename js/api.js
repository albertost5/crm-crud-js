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

async function getClientById( clientId ) {
    const URL = `http://localhost:4000/clients/${clientId}`;
    try {
        const response = await fetch(URL);
        return await response.json();
    } catch (error) {
        console.log('Error: ', error);
    }
}

async function deleteClient( clientId ) {
    const URL = `http://localhost:4000/clients/${clientId}`;
    try {
        return await fetch(URL, {
            method: 'DELETE', 
            headers: {
                'Content-Type':'application/json'
            }
        });
    } catch (error) {
        console.log('Error: ', error);
    }
}

async function updateClient( client ) {
    const URL = `http://localhost:4000/clients/${client.id}`;
    try {
        return await fetch(URL, {
            method: 'PUT',
            headers: {
                'Content-Type':'application/json'
            },
            body: JSON.stringify(client)
        });
    } catch (error) {
        console.log('Error: ', error);
    }
}

export {
    newClient, 
    getAllClients,
    getClientById,
    deleteClient,
    updateClient
}