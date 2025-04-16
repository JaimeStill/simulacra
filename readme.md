# Simulacra
See: [Simulacra and Simulation](https://en.wikipedia.org/wiki/Simulacra_and_Simulation).

Study of [**The Nature of Code**](https://natureofcode.com/) by [Daniel Shiffman](https://thecodingtrain.com/).

This project is organized around the following constructs:

- [**`simulation`**](./src/app/simulations/) - a self-contained [**p5.js**](https://p5js.org/) sample; encapsulates a discrete computational model that explores how fundamental principles manifest into a controlled environment.
- [**`axiom`**](./src/app/axioms/) - fundamental principles upon which different simulations are built; used to categorize **`simulations`**.
- [**`pattern`**](./src/app/models/patterns/) - patterns define common metadata parameters and are used to connect a **`simulation`** to an **`axiom`**.
- [**`theme`**](./src/app/models/theme.ts) - theme provides helpful functions for retrieving colors that respect the current preferred color scheme.

## Workflow

1. Create a class that extends from [**`Simulation`**](./src/app/simulations/simulation.ts).
    * Example: [**`RandomNumberDistribution`**](./src/app/simulations/randomness/random-number-distribution.ts).
2. Once the simulation is complete, create an instance of [**`SimulationPattern`**](./src/app/models/patterns/simulation-pattern.ts) within the appropriate [**axiom pattern**](./src/app/axioms/patterns/).
    * Example: [**`RandomnessPatterns`**](./src/app/axioms/patterns/randomness.ts).

### Creating an Axiom

1. Create a class that extends from [**`Axiom`**](./src/app/axioms/axiom.ts).
    * Example: [**`Randomness`**](./src/app/axioms/randomness.ts).
2. Create a [**pattern array**](./src/app/axioms/patterns/) for the axiom that will define the associated **`SimulationPattern`** objects.
    * Example: [**`RandomnessPatterns`**](./src/app/axioms/patterns/randomness.ts).
3. Add the axiom to the [**`Axioms`**](./src/app/axioms/) array.

## Running

This project was generated using [Angular CLI](https://github.com/angular/angular-cli) version 19.2.7.

To start a local development server, run:

```bash
npm run start
```

Once the server is running, open your browser and navigate to `http://localhost:4200/`. The application will automatically reload whenever you modify any of the source files.