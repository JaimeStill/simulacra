import { computed, signal } from '@angular/core';

export class Theme {
    private schemeQuery = window.matchMedia('(prefers-color-scheme:dark)');
    private getColorScheme() { return this.schemeQuery.matches ?? false }

    isDark = signal<boolean>(this.getColorScheme());

    bg = this.build(
        'hsla(0, 0%, 0%, 1)',
        'hsla(0, 0%, 100%, 1)'
    );

    bg1 = this.build(
        'hsla(0, 0%, 5%, 1)',
        'hsla(0, 0%, 98%, 1)'
    );

    bg2 = this.build(
        'hsla(0, 0%, 10%, 1)',
        'hsla(0, 0%, 96%, 1)'
    );

    divider = this.build(
        'hsla(212, 8%, 47%, 1)',
        'hsla(212, 9%, 59%, 1)'
    );

    translucent = this.build(
        'hsla(0, 0%, 0%, .8)',
        'hsla(0, 0%, 100%, .8)'
    );

    color = this.build(
        'hsla(210, 29%, 97%, 1)',
        'hsla(213, 13%, 16%, 1)'
    );

    color1 = this.build(
        'hsla(210, 24%, 93%, 1)',
        'hsla(212, 12%, 22%, 1)'
    );

    color2 = this.build(
        'hsla(210, 18%, 84%, 1)',
        'hsla(212, 11%, 29%, 1)'
    );

    blue = this.build(
        'hsla(204, 100%, 75%, 1)',
        'hsla(212, 92%, 45%, 1)'
    );

    blue1 = this.build(
        'hsla(208, 100%, 66%, 1)',
        'hsla(213, 94%, 35%, 1)'
    );

    blue2 = this.build(
        'hsla(211, 100%, 56%, 1)',
        'hsla(214, 96%, 28%, 1)'
    );

    blueBg = this.build(
        'hsla(216, 83%, 23%, 1)',
        'hsla(203, 100%, 86%, 1)'
    );
    
    green = this.build(
        'hsla(135, 62%, 65%, 1)',
        'hsla(137, 66%, 30%, 1)'
    );

    green1 = this.build(
        'hsla(137, 50%, 53%, 1)',
        'hsla(138, 71%, 23%, 1)'
    );

    green2 = this.build(
        'hsla(137, 57%, 41%, 1)',
        'hsla(141, 90%, 16%, 1)'
    );

    greenBg = this.build(
        'hsla(142, 100%, 12%, 1)',
        'hsla(134, 66%, 80%, 1)'
    );
    
    yellow = this.build(
        'hsla(46, 79%, 61%, 1)',
        'hsla(40, 100%, 30%, 1)'
    );

    yellow1 = this.build(
        'hsla(44, 66%, 50%, 1)',
        'hsla(37, 100%, 25%, 1)'
    );

    yellow2 = this.build(
        'hsla(42, 100%, 37%, 1)',
        'hsla(36, 98%, 20%, 1)'
    );

    yellowBg = this.build(
        'hsla(35, 100%, 15%, 1)',
        'hsla(48, 93%, 74%, 1)'
    );
    
    orange = this.build(
        'hsla(27, 100%, 74%, 1)',
        'hsla(24, 100%, 37%, 1)'
    );

    orange1 = this.build(
        'hsla(25, 96%, 63%, 1)',
        'hsla(23, 100%, 29%, 1)'
    );

    orange2 = this.build(
        'hsla(24, 76%, 51%, 1)',
        'hsla(22, 100%, 23%, 1)'
    );

    orangeBg = this.build(
        'hsla(22, 100%, 18%, 1)',
        'hsla(28, 100%, 85%, 1)'
    );
    
    red = this.build(
        'hsla(2, 100%, 83%, 1)',
        'hsla(356, 72%, 47%, 1)'
    );

    red1 = this.build(
        'hsla(360, 100%, 75%, 1)',
        'hsla(350, 84%, 35%, 1)'
    );

    red2 = this.build(
        'hsla(359, 95%, 63%, 1)',
        'hsla(349, 90%, 27%, 1)'
    );

    redBg = this.build(
        'hsla(346, 100%, 20%, 1)',
        'hsla(3, 100%, 90%, 1)'
    );
    
    purple = this.build(
        'hsla(267, 100%, 86%, 1)',
        'hsla(261, 69%, 59%, 1)'
    );

    purple1 = this.build(
        'hsla(265, 100%, 80%, 1)',
        'hsla(261, 53%, 48%, 1)'
    );

    purple2 = this.build(
        'hsla(261, 92%, 72%, 1)',
        'hsla(261, 56%, 38%, 1)'
    );

    purpleBg = this.build(
        'hsla(261, 59%, 30%, 1)',
        'hsla(271, 100%, 92%, 1)'
    );
    
    pink = this.build(
        'hsla(327, 100%, 84%, 1)',
        'hsla(324, 54%, 49%, 1)'
    );

    pink1 = this.build(
        'hsla(326, 100%, 75%, 1)',
        'hsla(323, 59%, 38%, 1)'
    );

    pink2 = this.build(
        'hsla(325, 76%, 63%, 1)',
        'hsla(322, 58%, 30%, 1)'
    );

    pinkBg = this.build(
        'hsla(320, 67%, 23%, 1)',
        'hsla(327, 100%, 91%, 1)'
    );

    coral = this.build(
        'hsla(12, 100%, 82%, 1)',
        'hsla(9, 64%, 47%, 1)'
    );

    coral1 = this.build(
        'hsla(11, 97%, 72%, 1)',
        'hsla(9, 70%, 36%, 1)'
    );

    coral2 = this.build(
        'hsla(11, 81%, 60%, 1)',
        'hsla(8, 79%, 28%, 1)'
    );

    coralBg = this.build(
        'hsla(7, 91%, 22%, 1)',
        'hsla(12, 100%, 90%, 1)'
    );

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