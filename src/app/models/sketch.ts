import p5 from 'p5';
import { Theme } from './theme';

export class Sketch {
    constructor(
        public p5: p5,
        public theme: Theme,
        public width: number,
        public height: number
    ) { }
}