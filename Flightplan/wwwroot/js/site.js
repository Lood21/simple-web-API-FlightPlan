const uri = 'Planes';
const url = 'Passengers'
let planes = [];
let places = [];
function getItems() {
    fetch(uri)
        .then(response => response.json())
        .then(data => _displayItems(data))
        .catch(error => console.error('Unable to get items.', error));
}
function _displayItems(data) {
    data.forEach(item => {
        document.getElementById('Planes').insertAdjacentHTML('beforeEnd', getCoordHTML(item));

        
    });

    planes = data;
}
function getCoordHTML(obj) {
    return (
        '<div class="container">' +
        '<div class="left">' +
        '<div class="fromWhere">' + (obj.fromWhere || "") + '</div>' +'<br>'+
        '<div class="time">' + '<div class="text">DATE</div>' + (obj.time || "") + '</div>' +
        '</div>' +
        '<div class="middle"></div>' +
        '<div class="right">'+
        '<div class="toWhere">' + (obj.toWhere || "") + '</div>' + '<br>' +
        '<div class="planeId">' + '<div class="text">FLIGHT NO</div>' + (obj.planeId || "") + '</div>'+
        '</div>' +
        '<button class="Getplaces" onclick="getPlacesOfPlane(' + obj.id + ')">Book</button>' +
        '<div id="hr"><hr></div>' +
        '</div>'
    );
}
function getPlacesOfPlane(id) {
    fetch(`${uri}/${url}/${id}`)
        .then(response => response.json())
        .then(pasangers => _displayPassengers(pasangers,id))
        .catch(error => console.error('Unable to get items.', error));
    
}
function _displayPassengers(pasangers, id) {
    clearArea();
    let seats = [];
    let places = [];
    pasangers.forEach(item => {
        seats.push(item.place);
        console.log(seats);
    });
    seats.sort();
    for (var i = 1; i < 37; i++) {
        if (seats.includes(i)) {
            places.push('disabled');
        }
        else {
            places.push('')
        }
    }
    document.getElementById('ConteinerOfplanes').insertAdjacentHTML('beforeEnd', getForm(id));
    for (var i = 1; i < 37;i++) {
        
        document.getElementById('seats').insertAdjacentHTML('beforeEnd', getHTML(places[i - 1], i));
        if (i % 4 == 0) {
            document.getElementById('seats').insertAdjacentHTML('beforeEnd', getHTMLbr());
        }
    }
    document.getElementById('Booking').insertAdjacentHTML('beforeEnd', getbutton());
}
function getForm(id) {
    return (
        '<form id="Booking" action="javascript:void(0);" method="POST" onsubmit="addItem('+id+')">'+
        '<div id="seats"></div>'+
        '</form>'
    )
}
function getbutton() {
    return (
        '<div id="formNew">' +
        '<input type="text" id="PassportId" placeholder="Passport">' +'<br>'+
        '<input type="submit" value="Book">' +
        '</div >'
        )
}
function getHTML(places,val) {
    return (
        '<input type="radio" class="regular-checkbox" name="Seats" value="'+val+'" ' + places + '/>'
        )
}
function getHTMLbr() {
    return('<br>')
}
function clearArea() {
    document.getElementById('ConteinerOfplanes').innerHTML = '';
}
function addItem(id) {
    const addPassportTextbox = document.getElementById('PassportId');
    const seats = document.querySelector('input[name="Seats"]:checked').value;
    console.log(id);
    const item = {
        planeId: id,
        place: seats,
        pasportId: addPassportTextbox.value.trim()
    };
    fetch(url, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(item)
    })
    clearArea();
    getPlacesOfPlane(id);
}