import { computed, signal } from '@angular/core';

export class Theme {
    private schemeQuery = window.matchMedia('(prefers-color-scheme:dark)');
    private getColorScheme() { return this.schemeQuery.matches ?? false }

    isDark = signal<boolean>(this.getColorScheme());

    hsla(hue: number, saturation: number, brightness: number, alpha: number) {
        return `hsla(${hue}, ${saturation}%, ${brightness}%, ${alpha})`
    };

    bg(alpha: number = 1) {
        return this.isDark()
            ? this.hsla(0, 0, 0, alpha)
            : this.hsla(0, 0, 100, alpha);
    }

    bg1(alpha: number = 1) {
        return this.isDark()
            ? this.hsla(0, 0, 5, alpha)
            : this.hsla(0, 0, 98, 1);
    }
    
    bg2(alpha: number = 1) {
        return this.isDark()
            ? this.hsla(0, 0, 10, alpha)
            : this.hsla(0, 0, 96, alpha);
    }

    divider(alpha: number = 1) {
        return this.isDark()
            ? this.hsla(212, 8, 47, alpha)
            : this.hsla(212, 9, 59, alpha);
    }

    color(alpha: number = 1) {
        return this.isDark()
            ? this.hsla(210, 29, 97, alpha)
            : this.hsla(213, 13, 16, alpha);
    }

    color1(alpha: number = 1) {
        return this.isDark()
            ? this.hsla(210, 24, 93, alpha)
            : this.hsla(212, 12, 22, alpha);
    }

    color2(alpha: number = 1) {
        return this.isDark()
            ? this.hsla(210, 18, 84, alpha)
            : this.hsla(212, 11, 29, alpha);
    }

    blue(alpha: number = 1) {
        return this.isDark()
            ? this.hsla(204, 100, 75, alpha)
            : this.hsla(212, 92, 45, alpha);
    }

    blue1(alpha: number = 1) {
        return this.isDark()
            ? this.hsla(208, 100, 66, alpha)
            : this.hsla(213, 94, 35, alpha);
    }

    blue2(alpha: number = 1) {
        return this.isDark()
            ? this.hsla(211, 100, 56, alpha)
            : this.hsla(214, 96, 28, alpha);
    }

    blueBg(alpha: number = 1) {
        return this.isDark()
            ? this.hsla(216, 83, 23, alpha)
            : this.hsla(203, 100, 86, alpha);
    }

    green(alpha: number = 1) {
        return this.isDark()
            ? this.hsla(135, 62, 65, alpha)
            : this.hsla(137, 66, 30, alpha);
    }

    green1(alpha: number = 1) {
        return this.isDark()
            ? this.hsla(137, 50, 53, alpha)
            : this.hsla(138, 71, 23, alpha);
    }

    green2(alpha: number = 1) {
        return this.isDark()
            ? this.hsla(137, 57, 41, alpha)
            : this.hsla(141, 90, 16, alpha);
    }

    greenBg(alpha: number = 1) {
        return this.isDark()
            ? this.hsla(142, 100, 12, alpha)
            : this.hsla(134, 66, 80, alpha);
    }

    yellow(alpha: number = 1) {
        return this.isDark()
            ? this.hsla(46, 79, 61, alpha)
            : this.hsla(40, 100, 30, alpha);
    }
    
    yellow1(alpha: number = 1) {
        return this.isDark()
            ? this.hsla(44, 66, 50, alpha)
            : this.hsla(37, 100, 25, alpha);
    }

    yellow2(alpha: number = 1) {
        return this.isDark()
            ? this.hsla(42, 100, 37, alpha)
            : this.hsla(36, 98, 20, alpha);
    }

    yellowBg(alpha: number = 1) {
        return this.isDark()
            ? this.hsla(35, 100, 15, alpha)
            : this.hsla(48, 93, 74, alpha);
    }

    orange(alpha: number = 1) {
        return this.isDark()
            ? this.hsla(27, 100, 74, alpha)
            : this.hsla(24, 100, 37, alpha);
    }

    orange1(alpha: number = 1) {
        return this.isDark()
            ? this.hsla(25, 96, 63, alpha)
            : this.hsla(23, 100, 29, alpha);
    }

    orange2(alpha: number = 1) {
        return this.isDark()
            ? this.hsla(24, 76, 51, alpha)
            : this.hsla(22, 100, 23, alpha);
    }

    orangeBg(alpha: number = 1) {
        return this.isDark()
            ? this.hsla(22, 100, 18, alpha)
            : this.hsla(28, 100, 85, alpha);
    }

    red(alpha: number = 1) {
        return this.isDark()
            ? this.hsla(2, 100, 83, alpha)
            : this.hsla(356, 72, 47, alpha);
    }

    red1(alpha: number = 1) {
        return this.isDark()
            ? this.hsla(360, 100, 75, alpha)
            : this.hsla(350, 84, 35, alpha);
    }

    red2(alpha: number = 1) {
        return this.isDark()
            ? this.hsla(359, 95, 63, alpha)
            : this.hsla(349, 90, 27, alpha);
    }

    redBg(alpha: number = 1) {
        return this.isDark()
            ? this.hsla(346, 100, 20, alpha)
            : this.hsla(3, 100, 90, alpha);
    }

    purple(alpha: number = 1) {
        return this.isDark()
            ? this.hsla(267, 100, 86, alpha)
            : this.hsla(261, 69, 59, alpha);
    }

    purple1(alpha: number = 1) {
        return this.isDark()
            ? this.hsla(265, 100, 80, alpha)
            : this.hsla(261, 53, 48, alpha);
    }

    purple2(alpha: number = 1) {
        return this.isDark()
            ? this.hsla(261, 92, 72, alpha)
            : this.hsla(261, 56, 38, alpha);
    }

    purpleBg(alpha: number = 1) {
        return this.isDark()
            ? this.hsla(261, 59, 30, alpha)
            : this.hsla(271, 100, 92, alpha);
    }

    pink(alpha: number = 1) {
        return this.isDark()
            ? this.hsla(327, 100, 84, alpha)
            : this.hsla(324, 54, 49, alpha);
    }

    pink1(alpha: number = 1) {
        return this.isDark()
            ? this.hsla(326, 100, 75, alpha)
            : this.hsla(323, 59, 38, alpha);
    }

    pink2(alpha: number = 1) {
        return this.isDark()
            ? this.hsla(325, 76, 63, alpha)
            : this.hsla(322, 58, 30, alpha);
    }

    pinkBg(alpha: number = 1) {
        return this.isDark()
            ? this.hsla(320, 67, 23, alpha)
            : this.hsla(327, 100, 91, alpha);
    }

    coral(alpha: number = 1) {
        return this.isDark()
            ? this.hsla(12, 100, 82, alpha)
            : this.hsla(9, 64, 47, alpha);
    }

    coral1(alpha: number = 1) {
        return this.isDark()
            ? this.hsla(11, 97, 72, alpha)
            : this.hsla(9, 70, 36, alpha);
    }

    coral2(alpha: number = 1) {
        return this.isDark()
            ? this.hsla(11, 81, 60, alpha)
            : this.hsla(8, 79, 28, alpha);
    }

    coralBg(alpha: number = 1) {
        return this.isDark()
            ? this.hsla(7, 91, 22, alpha)
            : this.hsla(12, 100, 90, alpha);
    }

    constructor(refresh: () => void) {
        this.schemeQuery.addEventListener(
            'change',
            () => {
                this.isDark.set(this.getColorScheme());
                refresh();
            }
        );
    }

    protected build(dark: string, light: string) {
        return computed<string>(() =>
            this.isDark()
                ? dark
                : light
        );
    }
}