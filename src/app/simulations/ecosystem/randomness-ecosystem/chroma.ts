import p5 from 'p5';

export class Chroma {
    color: p5.Color;
    hue: number;
    saturation: number;
    lightness: number;
    alpha: number

    constructor(public s: p5) {
        this.hue = s.floor(s.random(0, 360));
        this.saturation = s.floor(s.random(70, 100));
        this.lightness = s.floor(s.random(30, 70));
        this.alpha = s.random(.5, .8);

        this.color = s.color(
            this.hue,
            this.saturation,
            this.lightness,
            this.alpha
        );
    }
}