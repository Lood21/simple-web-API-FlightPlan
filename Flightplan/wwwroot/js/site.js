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
        '<button onclick="getPlacesOfPlane(' + obj.id + ')">Click me</button>' +
        '<div id="hr"><hr></div>' +
        '</div>'
    );
}
function getPlacesOfPlane(id) {
    fetch(`${uri}/${url}/${id}`)
        .then(response => response.json())
        .then(pasangers => _displayPassengers(pasangers))
        .catch(error => console.error('Unable to get items.', error));
    
}
function _displayPassengers(pasangers) {
    document.getElementById('Booking').innerHTML = '';
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
    for (var i = 1; i < 37;i++) {
        
        document.getElementById('Booking').insertAdjacentHTML('beforeEnd', getHTML(places[i - 1], i));
        if (i % 4 == 0) {
            document.getElementById('Booking').insertAdjacentHTML('beforeEnd', getHTMLbr());
        }
    }
}
function getHTML(places,val) {
    return (
        '<input type="checkbox" value="'+val+'" ' + places + '/>'
        )
}
function getHTMLbr() {
    return('<br>')
}
