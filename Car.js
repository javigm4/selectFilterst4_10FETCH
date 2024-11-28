  export class Car {
  #id;
  make;
  model;
  year;
  type;

  constructor(id, make) {
    this.#id = id;
    this.make = make;
  }

  getId() {
    return this.#id;
  }

  getMake() {
    return this.make;
  }

  getYear() {
    return this.year;
  }

  getModel() {
    return this.model;
  }

  getType() {
    return this.type;
  }

  setMake(newMake) {
    this.make = newMake;
  }

  setId(newId) {
    this.#id = newId;
  }

  setYear(newYear) {
    this.year = newYear;
  }

  setModel(newModel) {
    this.model = newModel;
  }

  setType(newType) {
    this.type = newType;
  }
}
