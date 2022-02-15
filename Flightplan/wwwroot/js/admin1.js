const uri = 'Planes';
let todos = [];

function getItems() {
    fetch(uri)
        .then(response => response.json())
        .then(data => _displayItems(data))
        .catch(error => console.error('Unable to get items.', error));
}

function addItem() {
    const addPlaneIdTextbox = document.getElementById('add-planeId');
    const addFrTextbox = document.getElementById('add-fromWhere');
    const addToTextbox = document.getElementById('add-toWhere');
    const addTimeTextbox = document.getElementById('add-time');

    const item = {
        planeId: addPlaneIdTextbox.value.trim(),
        fromWhere: addFrTextbox.value.trim(),
        toWhere: addToTextbox.value.trim(),
        Time: addTimeTextbox.value.trim()
    };

    fetch(uri, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(item)
    })
        .then(response => response.json())
        .then(() => {
            getItems();
        })
        .catch(error => console.error('Unable to add item.', error));
}

function deleteItem(id) {
    fetch(`${uri}/${id}`, {
        method: 'DELETE'
    })
        .then(() => getItems())
        .catch(error => console.error('Unable to delete item.', error));
}

function displayEditForm(id) {
    const item = todos.find(item => item.id === id);
    document.getElementById('edit-id').value = item.id;
    document.getElementById('edit-planeId').value = item.planeId;
    document.getElementById('edit-fromWhere').value = item.fromWhere;
    document.getElementById('edit-toWhere').value = item.toWhere;
    document.getElementById('edit-time').value = item.time;
    document.getElementById('editForm').style.display = 'block';
}

function updateItem() {
    const itemId = document.getElementById('edit-id').value;
    const item = {
        id: parseInt(itemId),
        planeId: document.getElementById('edit-planeId').value.trim(),
        fromWhere: document.getElementById('edit-fromWhere').value.trim(),
        toWhere: document.getElementById('edit-toWhere').value.trim(),
        time: document.getElementById('edit-time').value.trim()
    };
    console.log(parseInt(itemId));
    fetch(`${uri}/${itemId}`, {
        method: 'PUT',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(item)
    })
        .then(() => getItems())
        .catch(error => console.error('Unable to update item.', error));

    closeInput();

    return false;
}

function closeInput() {
    document.getElementById('editForm').style.display = 'none';
}

function _displayCount(itemCount) {
    const name = (itemCount === 1) ? 'Plane' : 'Planes';

    document.getElementById('counter').innerText = `${itemCount} ${name}`;
}

function _displayItems(data) {
    const tBody = document.getElementById('planes');
    tBody.innerHTML = '';

    _displayCount(data.length);

    const button = document.createElement('button');

    data.forEach(item => {

        let editButton = button.cloneNode(false);
        editButton.innerText = 'Edit';
        editButton.setAttribute('onclick', `displayEditForm(${item.id})`);

        let deleteButton = button.cloneNode(false);
        deleteButton.innerText = 'Delete';
        deleteButton.setAttribute('onclick', `deleteItem(${item.id})`);

        let tr = tBody.insertRow();

        let td1 = tr.insertCell(0);
        let planeIdNode = document.createTextNode(item.planeId);
        td1.appendChild(planeIdNode);

        let td2 = tr.insertCell(1);
        let fromWhereNode = document.createTextNode(item.fromWhere);
        td2.appendChild(fromWhereNode);

        let td3 = tr.insertCell(2);
        let toWhereNode = document.createTextNode(item.toWhere);
        td3.appendChild(toWhereNode);

        let td4 = tr.insertCell(3);
        let timeNode = document.createTextNode(item.time);
        td4.appendChild(timeNode);

        let td5 = tr.insertCell(4);
        td5.appendChild(editButton);

        let td6 = tr.insertCell(5);
        td6.appendChild(deleteButton);
    });

    todos = data;
}