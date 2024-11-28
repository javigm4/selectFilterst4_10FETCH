import { Car } from "./Car.js";
import * as datosCoche from "./mockData.js";

/*-------------------MAPEO-----------------*/
export const mapeoArray = () => {
  return new Promise((resolve, reject) => {
    const cochesArray = datosCoche.cars.map((cochesData) => {
      const coche = new Car(cochesData.id, cochesData.make);
      coche.setModel(cochesData.model);
      coche.setYear(cochesData.year);
      coche.setType(cochesData.type);
      return coche;
    });

    if (cochesArray.length > 0) {
      resolve(cochesArray);
    } else {
      reject("No se ha leído bien el mockData");
    }
  });
};

/*--------CREAR EL SELECT---------*/
document.addEventListener("DOMContentLoaded", () => {
  //esto lo que hace es que se ejecute cuando se cargue todo el documento, y garantiza que el select  esté en el dom cuadno añadamos el addeventlistener del select
  //creo los divs
  const divFilters = document.createElement("div");
  const spanYear = document.createElement("span");
  const strongYear = document.createElement("strong");
  strongYear.textContent = "Year: ";
  const spanMake = document.createElement("span");
  const strongMake = document.createElement("strong");
  strongYear.textContent = "Make: ";

  //selects:
  const selectYear = document.createElement("select"); //CREO EL SELECT
  selectYear.id = "selectYear";
  const selectMake = document.createElement("select"); //Creo el select de Make
  selectMake.id = "selectMake";

  const years = datosCoche.cars.map((coche) => coche.year);
  const sortedYears = [...new Set(years.map((year) => Number(year)))].sort(
    (a, b) => a - b
  );
  const makes = datosCoche.cars.map((coche) => coche.make);

  crearOpciones(sortedYears, selectYear);
  crearOpciones(makes, selectMake);

  spanYear.appendChild(strongYear);
  divFilters.appendChild(spanYear);
  divFilters.appendChild(selectYear);
  spanYear.appendChild(strongMake);
  divFilters.appendChild(spanMake);
  divFilters.appendChild(selectMake);
  document.body.appendChild(divFilters);

  // Añadir el eventListener para filtrar coches cuando cambie la selección
  selectYear.addEventListener("change", async () => {
    await crearDivContenido(); // Vuelve a crear el contenido cuando cambia la selección
  });
  selectMake.addEventListener("change", async () => {
    await crearDivContenido(); // Vuelve a crear el contenido cuando cambia la selección
  });

  // Crear el contenido inicial
  crearDivContenido();
});

//crearOpciones del select
export const crearOpciones = (array, select) => {
  array.forEach((opcion) => {
    const option = document.createElement("option");
    option.value = opcion;
    option.textContent = opcion;
    select.appendChild(option);
  });
};
/*---- FILTRAR COCHES POR AÑO CON EL FETCH----*/
const url = "https://car-data.p.rapidapi.com/cars?limit=10&page=0";
const options = {
  method: "GET",
  headers: {
    "x-rapidapi-key": "23d49c55f5msh4b301c63fc79be9p10a5e6jsn1f207790f863",
    "x-rapidapi-host": "car-data.p.rapidapi.com",
  },
};

export const filtrarCochesPorAño = async () => {
  try {
    const response = await fetch(url, options);
    const cochesArray = await response.json();

    const añoSeleccionado = document.getElementById("selectYear").value;
    const marcaSeleccionada = document.getElementById("selectMake").value;

    const cochesFiltrados = cochesArray
      .filter((coche) => coche.year == Number(añoSeleccionado))
      .filter((coche) => coche.make == marcaSeleccionada);

    if (cochesFiltrados.length > 0) {
      return cochesFiltrados;
    } else {
      throw "No se han encontrado coches con esos datos";
    }
  } catch (error) {
    console.log(error);
  }
};

//dasda
/*---- CREAR DIVS DE CONTENIDO ----*/
async function crearDivContenido() {
  const existingContent = document.querySelector(".container");
  if (existingContent) {
    //esta condicional sirve para borrar el container (para no sobreescribirlo)
    existingContent.remove();
  }

  const cochesFiltrados = await filtrarCochesPorAño(); //creamos el array de coches filtrados gracias a la funcion de filtrarCochesPorAño();

  const h1 = document.createElement("h1");
  h1.textContent = "Coches según su año";
  const divContainer = document.createElement("div");
  divContainer.classList.add("container");

  const divBlock = document.createElement("div");
  divBlock.classList.add("block");

  cochesFiltrados.forEach((car) => {
    //por cada coche, creamos un div con sus datos
    const div = document.createElement("div");

    const pModeloMake = document.createElement("p");
    const pTypeYear = document.createElement("p");
    pModeloMake.textContent = `${car.getModel()} / ${car.getMake()}`;
    pTypeYear.textContent = `${car.getType()} / ${car.getYear()}`;

    div.appendChild(pModeloMake);
    div.appendChild(pTypeYear);
    divBlock.appendChild(div);
  });

  divContainer.appendChild(h1);
  divContainer.appendChild(divBlock);
  document.body.appendChild(divContainer);
}
