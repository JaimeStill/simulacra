import p5 from 'p5';
import { Theme } from '../theme';

export abstract class Simulation {
    protected resizer: ResizeObserver;
    protected processor?: p5;
    protected height: number = 0;
    protected width: number = 0;

    protected theme: Theme = new Theme(
        this.start.bind(this)
    );

    protected abstract sketch(s: p5): void;

    constructor(
        protected element: HTMLElement
    ) {
        this.width = element.clientWidth;
        this.height = element.clientHeight;

        const self = this;

        this.resizer = new ResizeObserver(this.handleResize.bind(self));
        this.resizer.observe(element);
    }

    protected handleResize() {
        this.height = this.element.clientHeight;
        this.width = this.element.clientWidth;

        if (this.processor)
            this.start();
    }

    destroy() {
        this.reset();
        this.resizer.disconnect();
    }

    reset() {
        if (this.processor) {
            this.processor.remove();
            this.processor = undefined;
        }
    }

    start() {
        this.reset();

        this.processor = new p5(
            this.sketch.bind(this),
            this.element
        );
    }
}