class Car {
  #brand;
  #model;
  speed;
  isTrunkOpen;

  constructor(carDetails) {
    this.#brand = carDetails.brand;
    this.#model = carDetails.model;
    this.speed = 0;
    this.isTrunkOpen = false;
  }

  displayInfo() {
    console.log(`Brand: ${this.#brand} Model: ${this.#model} Speed: ${this.speed} Trunk open?:${this.isTrunkOpen}`);
  }

  go() {
    if (this.speed <=200 && (!this.isTrunkOpen)) {
      this.speed += 5;
    }
  }

  brake() {
    if (this.speed >= 0) {
      this.speed -= 5;
      if (this.speed < 0) {
        this.speed += 5;
      } 
    }
  }
  
  openTrunk() {
    this.isTrunkOpen = true;
  }

  closeTrunk() {
    this.isTrunkOpen = false;
  }
};

const toyotaCar = new Car({
  brand: 'Toyota',
  model : 'Corolla'
});

const tesla = new Car({
  brand: 'Tesla',
  model : 'Model 3'
});

class RaceCar extends Car {
  acceleration;
  constructor(carDetails) {
    super(carDetails);
    this.acceleration = carDetails.acceleration;
  };

  go() {
    if (this.speed <=300 && this.isTrunkOpen === false) {
      this.speed += this.acceleration;
    }
  };

  openTrunk() {
    console.log("Race cars do not have trunks!");
  };

  closeTrunk() {
    console.log("Race cars do not have trunks!");
  }
};

const mclaren = new RaceCar({
  brand: 'McLaren',
  model: 'F1',
  acceleration: 20
});

console.log(mclaren);

// console.log(toyotaCar);
// console.log(tesla);
// toyotaCar.displayInfo();
// tesla.displayInfo();
// toyotaCar.go();
// toyotaCar.go();
// toyotaCar.go();
// toyotaCar.go();
// toyotaCar.go();
// toyotaCar.go();
// toyotaCar.openTrunk();
// toyotaCar.go();


// toyotaCar.displayInfo();

// mclaren.go();
// mclaren.displayInfo();
// tesla.go();
// tesla.brake();
// tesla.brake();
// tesla.brake();

// tesla.brake();
// tesla.brake();

// tesla.displayInfo();
