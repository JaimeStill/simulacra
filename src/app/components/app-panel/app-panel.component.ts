import { Component, output } from '@angular/core';

@Component({
    selector: 'app-panel',
    templateUrl: 'app-panel.component.html',
    styleUrl: 'app-panel.component.css'
})
export class AppPanelComponent {
    navigate = output();
}