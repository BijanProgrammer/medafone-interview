import {Component, OnDestroy, OnInit} from '@angular/core';
import {ActivatedRoute, Router, RouterLink} from '@angular/router';
import {TaskModel} from '../../models/task.model';
import {TaskService} from '../../services/task.service';
import {Subscription} from 'rxjs';
import {FormsModule} from '@angular/forms';
import {ToastrService} from 'ngx-toastr';

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

    protected id: string = '';

    private subscriptions: Subscription[] = [];

    public constructor(
        private router: Router,
        private activatedRoute: ActivatedRoute,
        private toastr: ToastrService,
        private taskService: TaskService
    ) {}

    public ngOnInit(): void {
        this.initializeSubscriptions();
    }

    public ngOnDestroy(): void {
        this.subscriptions.forEach((subscription) => subscription.unsubscribe());
    }

    public formSubmitHandler(): void {
        const title = this.title.trim();
        const description = this.description.trim();

        if (!this.isTitleValid(title)) {
            return;
        }

        if (!!this.id) {
            this.editTask(title, description);
        } else {
            this.addTask(title, description);
        }

        this.router.navigate(['/']).then();
    }

    private initializeSubscriptions(): void {
        const subscription = this.activatedRoute.paramMap.subscribe((paramMap) => {
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

            return;
        }

        this.id = task.id;
        this.title = task.title;
        this.description = task.description ?? '';
    }

    private isTitleValid(title: string): boolean {
        if (!title?.trim()) {
            this.toastr.warning('Title is required.');
            return false;
        }

        if (title.trim().length < 3) {
            this.toastr.warning('Title has to be more than 3 characters.');
            return false;
        }

        return true;
    }

    private editTask(title: string, description: string): void {
        const isSuccessful = this.taskService.editTask({id: this.id, title, description});
        if (!isSuccessful) {
            return;
        }

        this.toastr.success('Task edited successfully.');
    }

    private addTask(title: string, description: string): void {
        this.taskService.addTask({title, description});
        this.toastr.success('Task added successfully.');
    }
}
