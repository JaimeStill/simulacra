import p5 from 'p5';

export class Ball {
    radius: number = 10;

    position: p5.Vector;
    velocity: p5.Vector;

    constructor(
        public s: p5,
        public bounds: number,
        public width: number,
        public height: number
    ) {
        this.position = s.createVector(0, 0, 0);
        this.velocity = s.createVector(2, 4, 3);
    }

    update() {
        this.position.add(this.velocity);
    }

    render() {
        this.s.push();
        this.s.translate(this.position.x, this.position.y, this.position.z);
        this.s.normalMaterial();
        this.s.sphere(this.radius);
        this.s.pop();
    }

    checkEdges() {
        const edgeHit = (val: number) => {
            if (
                val > this.bounds / 2 - this.radius ||
                val < -this.bounds / 2 + this.radius
            )
                return true;
            
            return false;
        }

        if (edgeHit(this.position.x))
            this.velocity.x *= -1;

        if (edgeHit(this.position.y))
            this.velocity.y *= -1;

        if (edgeHit(this.position.z))
            this.velocity.z *= -1;
    }
}