import {Injectable} from '@angular/core';

import {TaskModel} from '../models/task.model';
import {ToastrService} from 'ngx-toastr';

@Injectable({
    providedIn: 'root',
})
export class TaskService {
    public constructor(private toastr: ToastrService) {
        this.addSampleTask();
    }

    private _tasks: TaskModel[] = [];

    public get tasks(): TaskModel[] {
        return [...this._tasks];
    }

    public findById(id: string): TaskModel | null {
        return this._tasks.find((task) => task.id === id) ?? null;
    }

    public editTask(task: TaskModel): boolean {
        const existingTaskIndex = this._tasks.findIndex((x) => x.id === task.id);
        if (existingTaskIndex < 0) {
            this.toastr.error('Cannot edit a task that does not exist.');
            return false;
        }

        this._tasks[existingTaskIndex] = task;
        return true;
    }

    public addTask(task: Omit<TaskModel, 'id'>): void {
        this._tasks.push({
            ...task,
            id: self.crypto.randomUUID(),
        });
    }

    private addSampleTask(): void {
        this.addTask({
            title: 'Sample Task',
            description: 'This is a sample task. You can edit it or remove it completely.',
        });
    }
}
