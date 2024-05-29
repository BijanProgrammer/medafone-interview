import {Component, OnDestroy, OnInit} from '@angular/core';
import {ActivatedRoute, RouterLink} from '@angular/router';
import {TaskModel} from '../../models/task.model';
import {TaskService} from '../../services/task.service';
import {Subscription} from 'rxjs';
import {FormsModule} from '@angular/forms';

@Component({
    selector: 'app-task',
    standalone: true,
    imports: [FormsModule, RouterLink],
    templateUrl: './task.component.html',
    styleUrl: './task.component.css',
})
export class TaskComponent implements OnInit, OnDestroy {
    protected title: string = '';
    protected description: string = '';
    protected isEditing: boolean = false;

    private subscriptions: Subscription[] = [];

    public constructor(
        private route: ActivatedRoute,
        private taskService: TaskService
    ) {}

    public ngOnInit(): void {
        this.initializeSubscriptions();
    }

    public ngOnDestroy(): void {
        this.subscriptions.forEach((subscription) => subscription.unsubscribe());
    }

    private initializeSubscriptions(): void {
        const subscription = this.route.paramMap.subscribe((paramMap) => {
            const id = paramMap.get('id');
            if (typeof id !== 'string') {
                this.initializeValues(null);
                return;
            }

            const task = this.taskService.findById(id!);
            this.initializeValues(task);
        });

        this.subscriptions.push(subscription);
    }

    private initializeValues(task: TaskModel | null): void {
        if (task === null) {
            this.title = '';
            this.description = '';
            this.isEditing = false;

            return;
        }

        this.title = task.title;
        this.description = task.description ?? '';
        this.isEditing = true;
    }
}
