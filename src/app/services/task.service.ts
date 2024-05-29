import {Injectable} from '@angular/core';

import {TaskModel} from '../models/task.model';

@Injectable({
    providedIn: 'root',
})
export class TaskService {
    public constructor() {
        this.addSampleTask();
    }

    private _tasks: TaskModel[] = [];

    public get tasks(): TaskModel[] {
        return [...this._tasks];
    }

    public findById(id: string): TaskModel | null {
        return this._tasks.find((task) => task.id === id) ?? null;
    }

    public addTask(task: Omit<TaskModel, 'id'>): void {
        // [BIJAN] TODO: Add validation here or before this method is called.

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
