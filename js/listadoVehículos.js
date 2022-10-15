window.addEventListener('load', async function() {
    //console.log('La página ha terminado de cargarse!!');
    let cars = await allCar();
    console.log('Car:', cars);
    tableRows(cars);
});

async function allCar() {
    console.log("all car");
    //log.textContent = `Form Submitted! Time stamp: ${event.timeStamp}`;
    var url = 'https://633e4bc00dbc3309f3b374d2.mockapi.io/api/v1/vehiculos';
    const respuesta = await fetch(url, {
    method: 'GET', // or 'PUT',
    headers:{
        'Content-Type': 'application/json'
    }
    }).catch(error => console.error('Error:', error))

    var cars = respuesta.json();
    console.log('Success:', cars);
    console.log("despues del fetch");
    return cars;
}



function tableRows(cars){
    let consultTableRef = document.getElementById("consultTable"); 

    for (let index = 0; index < cars.length; index++) {
        const car = cars[index];
        console.log(car);
        let newConsultRow = consultTableRef.insertRow(-1);
        let newCell = newConsultRow.insertCell(0);
        newCell.textContent = car["id"];
        newCell.style.fontWeight = 'bold';

        newCell = newConsultRow.insertCell(1);
        newCell.textContent = car["placa"];

        newCell = newConsultRow.insertCell(2);
        newCell.textContent = car["pais"] + ", " + car["marca"] + ", $" + car["precio"] + ", " + car["tipoVehiculo"] + ", " + car["caracteristicas"];

        newCell = newConsultRow.insertCell(3);
        newCell.innerHTML = "<button class='deleteButton btn-secondary bi bi-trash3'><img src='./assets/img/trash.svg'></button>";
        function deleteRow(e){
            if (!e.target.classList.contains("deleteButton")){
                return;
            }
            const btn = e.target;
            btn.closest('tr').remove();
                
            const deleteMethod = {
                method: 'DELETE', // Method itself
                headers: {
                 'Content-type': 'application/json; charset=UTF-8' // Indicates the content 
                },
                // No need to have body, because we don't send nothing to the server.
            }
               // Make the HTTP Delete call using fetch api
            var id = 'https://633e4bc00dbc3309f3b374d2.mockapi.io/api/v1/vehiculos/'+ car["id"];
            fetch(id, deleteMethod) 
            .then(response => response.json())
            .then(data => console.log(data)) // Manipulate the data retrieved back, if we want to do something with it
            .catch(err => console.log(err)) // Do something with the error
               
        }
        consultTableRef.addEventListener('click', deleteRow)

        newCell = newConsultRow.insertCell(4);
        newCell.innerHTML = "<button name='editButton' onClick='reply_click(this.id)' id='"+ car["id"] +"' type='button' class='btn btn-secondary' data-bs-toggle='modal' data-bs-target='#exampleModal'><img src='./assets/img/pencil.svg'></button>";
        
    }
    
}

