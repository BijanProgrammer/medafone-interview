import {Component} from '@angular/core';
import {TaskService} from '../../services/task.service';
import {RouterLink} from '@angular/router';

@Component({
    selector: 'app-home',
    standalone: true,
    imports: [RouterLink],
    templateUrl: './home.component.html',
    styleUrl: './home.component.css',
})
export class HomeComponent {
    public constructor(public taskService: TaskService) {}
}
