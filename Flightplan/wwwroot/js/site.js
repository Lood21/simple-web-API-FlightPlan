const uri = 'Planes';
let planes = [];
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
        '<section class="container">' +
        '<div class="planeId">' +'Plane Number: ' + (obj.planeId || "") + '</div>' +
        '<ul class="container1">'+
        '<li class="link">' + (obj.fromWhere || "")+'</li>'+
        '<li class="link">' + (obj.toWhere || "") + '</li>' +
        '</ul>'+
        '<div class="time">' + 'Date: '+(obj.time || "") + '</div>' +
        '</section>'
    );
}