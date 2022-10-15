var button_id;
function reply_click (clicked_id){
    button_id = clicked_id;
}


async function editMethod (e){
        //console.log(button_id);
        var url = 'https://633e4bc00dbc3309f3b374d2.mockapi.io/api/v1/vehiculos/'+ button_id;
        var data = await dataEditCar();
        
        console.log(url);

        fetch(url, {
        method: 'PUT', // Method itself
        body: JSON.stringify(data),
        headers: {
         'Content-type': 'application/json; charset=UTF-8' // Indicates the content 
        }}).then(res => res.json())
        .catch(error => console.error('Error:', error))
        .then(response => console.log('Success:', response));
        console.log("despues del fetch");    
}
    


function dataEditCar(){
    let data= {}

    data["nombre"] = document.getElementById('inputName1').value;
    data["email"] = document.getElementById('inputEmail1').value;
    data["telefono"] = document.getElementById('inputTel1').value;
    data["pais"] = document.getElementById('inputCountry1').value;
    data["placa"] = document.getElementById('inputPlaca1').value;
    data["marca"] = document.getElementById('inputMarca1').value;
    data["precio"] = document.getElementById('inputPrice1').value;
 
    let carType = document.getElementsByName('carType1');
    for(i = 0; i < carType.length; i++) {
        if(carType[i].checked)
            data["tipoVehiculo"] = document.getElementById(carType[i].id).value;
    };
    
    let characteristics = document.getElementsByName('characteristics1');
    for(i = 0; i < characteristics.length; i++) {
        if(characteristics[i].checked)
            data["caracteristicas"] = document.getElementById(characteristics[i].id).value;
    };
    
    //console.log(data);
    return data;
}
const editedFormButton = document.getElementById('buttonEditCar');
editedFormButton.addEventListener('click', editMethod)