import { ElementRef, inject, Injectable, signal } from '@angular/core';
import { Router } from '@angular/router';
import { filter, map } from 'rxjs';
import { Axiom, Axioms, ParamState, SimulationPattern } from '../models';

@Injectable({
    providedIn: 'root'
})
export class AppService {
    private router = inject(Router);

    axioms = signal<Axiom[]>(Axioms);
    body = signal<ElementRef<HTMLBodyElement> | null>(null);
    pattern = signal<SimulationPattern | undefined>(undefined);

    constructor() {
        this.router
            .routerState
            .root
            .queryParams
            .pipe(
                filter((params) => {
                    const hasSimulation = 'axiom' in params && 'simulation' in params;
                    const noParams = Object.keys(params).length === 0;

                    return hasSimulation || noParams
                }),
                map((params) => Object.keys(params).length > 0
                    ? params as ParamState
                    : null
                )
            )
            .subscribe((state: ParamState | null) => {
                if (state)
                    this.pattern.set(this.find(state));
                else
                    this.pattern.set(undefined);
            });
    }

    private find(state: ParamState): SimulationPattern | undefined {
        return this.axioms()
            .find((a) => a.pattern.url === state.axiom)
            ?.pattern
            .find(state.simulation);
    }

    load(state?: ParamState) {
        this.router.navigate([], { queryParams: state });
    }
}