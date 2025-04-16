export abstract class Pattern {
    constructor(
        public name: string,
        public url: string,
        public index: number,
        public reference?: string
    ) { }
}