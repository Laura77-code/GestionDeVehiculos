var vehiculo_editar_id;

async function getVehiculo(vehiculo_id) {
    console.log("all car");
    //log.textContent = `Form Submitted! Time stamp: ${event.timeStamp}`;
    var url = `https://633e4bc00dbc3309f3b374d2.mockapi.io/api/v1/vehiculos/${vehiculo_id}`;
    const respuesta = await fetch(url, {
    method: 'GET', // or 'PUT',
    headers:{
        'Content-Type': 'application/json'
    }
    }).catch(error => console.error('Error:', error))

    var vehiculo = respuesta.json();
    console.log('Success:', vehiculo);
    return vehiculo;
}

async function edit_vehiculo_from(clicked_id){
    vehiculo_editar_id = clicked_id;
    vehiculo= await getVehiculo(vehiculo_editar_id);
    edit_modal(vehiculo)
}

function edit_modal(vehiculo){

    document.getElementById('inputName1').value = vehiculo["nombre"];
    document.getElementById('inputEmail1').value = vehiculo["email"];
    document.getElementById('inputTel1').value = vehiculo["telefono"];
    document.getElementById('inputPlaca1').value = vehiculo["placa"];
    document.getElementById('inputMarca1').value = vehiculo["marca"];
    document.getElementById('inputPrice1').value = vehiculo["precio"];
    
    
    var inputPais=document.getElementById('inputCountry1');
    if (vehiculo["pais"]!=="Colombia"){
        var opt = document.createElement('option');
        opt.value = vehiculo["pais"];
        opt.innerHTML = vehiculo["pais"];
        inputPais.appendChild(opt);
        inputPais.value= vehiculo["pais"];
    }else{
        inputPais.value= vehiculo["pais"];
    }
    let carType=document.getElementsByName('carType1');
    for(i = 0; i < carType.length; i++) {
        valuecartype=carType[i].value;
        if( valuecartype == vehiculo["tipoVehiculo"] || valuecartype == "Otro"){
            carType[i].checked= true;
            if (valuecartype == "Otro"){
                document.getElementById('inputOther1').value=vehiculo["tipoVehiculo"];
            }
            break;
        }
    };
    let characteristics=document.getElementsByName('characteristics1');
    for(i = 0; i < characteristics.length; i++) {
        valuecartype=characteristics[i].value;
        if( valuecartype == vehiculo["caracteristicas"] || valuecartype == "Usado"){
            characteristics[i].checked= true;
            break;
        }
    };
    
}

async function editMethod (){
        //console.log(button_id);
        var url = 'https://633e4bc00dbc3309f3b374d2.mockapi.io/api/v1/vehiculos/'+ vehiculo_editar_id;
        var data = await dataEditCar();
        
        console.log(url);

        fetch(url, {
        method: 'PUT', // Method itself
        body: JSON.stringify(data),
        headers: {
         'Content-type': 'application/json; charset=UTF-8' // Indicates the content 
        }}).then(res => res.json())
        .catch(error => console.error('Error:', error))
        .then(response => console.log('Success:', response))
        .then(response => clearList())
        .then(response => carsCards('International'))
        ;
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
        if(carType[i].checked){
            data["tipoVehiculo"] = document.getElementById(carType[i].id).value;
            if(document.getElementById(carType[i].id).value == "Otro"){
                data["tipoVehiculo"] = document.getElementById("inputOther1").value;
            }else{
                data["tipoVehiculo"] = document.getElementById(carType[i].id).value;
            }
        }
    };
    
    let characteristics = document.getElementsByName('characteristics1');
    for(i = 0; i < characteristics.length; i++) {
        if(characteristics[i].checked){
            data["caracteristicas"] = document.getElementById(characteristics[i].id).value;
        }   
    };
    
    //console.log(data);
    return data;
}
//const editedFormButton = document.getElementById('buttonEditCar');
//editedFormButton.addEventListener('click', editMethod)