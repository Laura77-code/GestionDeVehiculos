var countryId;

window.addEventListener('load', function() {
  //console.log('La página ha terminado de cargarse!!');
  filterCountry("Internacional");
});

async function filterCountry(clicked_id){
  countryId = clicked_id;
  vehiculo = await allCar(countryId);
  carsCards(countryId);
}

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
  //console.log('Success:', cars);
  //console.log("despues del fetch");
  return cars;
}

function clearListCards(){
  const table = document.getElementById("cardSearch");
  table.innerHTML = '';
}

async function carsCards(countryId){
    await clearListCards();
    let cars = await allCar();
    //console.log('Car:', cars);
    for (let index = 0; index < cars.length; index++) {
      if (countryId =="Nacional"){
        if(cars[index]["pais"]=="Colombia"){
          createCard(cars[index]);
        }
      }else{
        if(cars[index]["pais"] != "Colombia"){
          createCard(cars[index]);
        }
      }
    }
}


function createCard(car){
    const cardSearchRef = document.getElementById("cardSearch"); 
    //div 1
    let newCol = document.createElement('div');
    newCol.className = 'col';
    //div 2
    let newCard = document.createElement('div');
    newCard.className = 'card h-100';
    // title
    let titlePlaca = document.createElement('h5');
    titlePlaca.className = 'card-header';
    titlePlaca.textContent = car["placa"];
    newCard.appendChild(titlePlaca);
    // List
    let itemsCard = document.createElement('ul');
    itemsCard.className = 'list-group list-group-flush';
    //   Item 1 List
    let itemCard1 = document.createElement('li');
    itemCard1.className = 'list-group-item';
    itemCard1.textContent = `Precio: ${car["precio"]}`;
    itemsCard.appendChild(itemCard1);
    //   Item 2 List
    let itemCard2 = document.createElement('li');
    itemCard2.className = 'list-group-item';
    itemCard2.textContent = `País: ${car["pais"]}`;;
    itemsCard.appendChild(itemCard2);
    //   Item 3 List
    let itemCard3 = document.createElement('li');
    itemCard3.className = 'list-group-item';
    itemCard3.textContent = `Tipo de vehículo: ${car["tipoVehiculo"]}`;
    itemsCard.appendChild(itemCard3);
    //   Item 4 List
    let itemCard4 = document.createElement('li');
    itemCard4.className = 'list-group-item';
    itemCard4.textContent = `Características: ${car["caracteristicas"]}`;
    itemsCard.appendChild(itemCard4);
    // End List
    newCard.appendChild(itemsCard);
    // end div
    newCol.appendChild(newCard);
    cardSearchRef.appendChild(newCol);
}







/* <div class="col">
                  <div class="card h-100">
                    <h5 class="card-header">WJS234</h5>
                    <ul class="list-group list-group-flush">
                      <li class="list-group-item">Precio: </li>
                      <li class="list-group-item">País: </li>
                      <li class="list-group-item">Tipo de vehículo: </li>
                      <li class="list-group-item">Características: </li>
                    </ul>
                    <div class="card-body">
                        <button type="button" class="btn-secondary">
                            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-trash3" viewBox="0 0 16 16">
                                <path d="M6.5 1h3a.5.5 0 0 1 .5.5v1H6v-1a.5.5 0 0 1 .5-.5ZM11 2.5v-1A1.5 1.5 0 0 0 9.5 0h-3A1.5 1.5 0 0 0 5 1.5v1H2.506a.58.58 0 0 0-.01 0H1.5a.5.5 0 0 0 0 1h.538l.853 10.66A2 2 0 0 0 4.885 16h6.23a2 2 0 0 0 1.994-1.84l.853-10.66h.538a.5.5 0 0 0 0-1h-.995a.59.59 0 0 0-.01 0H11Zm1.958 1-.846 10.58a1 1 0 0 1-.997.92h-6.23a1 1 0 0 1-.997-.92L3.042 3.5h9.916Zm-7.487 1a.5.5 0 0 1 .528.47l.5 8.5a.5.5 0 0 1-.998.06L5 5.03a.5.5 0 0 1 .47-.53Zm5.058 0a.5.5 0 0 1 .47.53l-.5 8.5a.5.5 0 1 1-.998-.06l.5-8.5a.5.5 0 0 1 .528-.47ZM8 4.5a.5.5 0 0 1 .5.5v8.5a.5.5 0 0 1-1 0V5a.5.5 0 0 1 .5-.5Z"/>
                            </svg>
                        </button>
                        <button type="button" class="btn-secondary">
                            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-pencil" viewBox="0 0 16 16">
                                <path d="M12.146.146a.5.5 0 0 1 .708 0l3 3a.5.5 0 0 1 0 .708l-10 10a.5.5 0 0 1-.168.11l-5 2a.5.5 0 0 1-.65-.65l2-5a.5.5 0 0 1 .11-.168l10-10zM11.207 2.5 13.5 4.793 14.793 3.5 12.5 1.207 11.207 2.5zm1.586 3L10.5 3.207 4 9.707V10h.5a.5.5 0 0 1 .5.5v.5h.5a.5.5 0 0 1 .5.5v.5h.293l6.5-6.5zm-9.761 5.175-.106.106-1.528 3.821 3.821-1.528.106-.106A.5.5 0 0 1 5 12.5V12h-.5a.5.5 0 0 1-.5-.5V11h-.5a.5.5 0 0 1-.468-.325z"/>
                            </svg>
                        </button>  
                    </div>
                  </div>
                </div> */