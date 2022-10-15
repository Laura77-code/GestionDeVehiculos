async function newCar(event) {
    event.preventDefault();
    console.log("Hello World");
    //log.textContent = `Form Submitted! Time stamp: ${event.timeStamp}`;
    var url = 'https://633e4bc00dbc3309f3b374d2.mockapi.io/api/v1/vehiculos';
    var data = await dataFormNewCar();

    fetch(url, {
    method: 'POST', // or 'PUT'
    body: JSON.stringify(data), // data can be `string` or {object}!
    headers:{
        'Content-Type': 'application/json'
    }
    }).then(res => res.json())
    .catch(error => console.error('Error:', error))
    .then(response => console.log('Success:', response));
    console.log("despues del fetch");    
}


function dataFormNewCar(){
    let data= {}

    data["nombre"] = document.getElementById('inputName').value;
    data["email"] = document.getElementById('inputEmail').value;
    data["telefono"] = document.getElementById('inputTel').value;
    data["pais"] = document.getElementById('inputCountry').value;
    data["placa"] = document.getElementById('inputPlaca').value;
    data["marca"] = document.getElementById('inputMarca').value;
    data["precio"] = document.getElementById('inputPrice').value;
 
    let carType = document.getElementsByName('carType');
    for(i = 0; i < carType.length; i++) {
        if(carType[i].checked)
            data["tipoVehiculo"] = document.getElementById(carType[i].id).value;
    };
    
    let characteristics = document.getElementsByName('characteristics');
    for(i = 0; i < characteristics.length; i++) {
        if(characteristics[i].checked)
            data["caracteristicas"] = document.getElementById(characteristics[i].id).value;
    };
    
    //console.log(data);
    return data;
}
const form = document.getElementById('formNewCar');
const log = document.getElementById('log');
form.addEventListener('submit', newCar);