import {Injectable} from '@angular/core';

import {TaskModel} from '../models/task.model';

@Injectable({
    providedIn: 'root',
})
export class TaskService {
    public constructor() {}

    private _tasks: TaskModel[] = [
        {
            id: self.crypto.randomUUID(),
            title: 'Sample Task',
            description: 'This is a sample task. You can edit it or remove it completely.',
        },
    ];

    public get tasks(): TaskModel[] {
        return [...this._tasks];
    }

    public findById(id: string): TaskModel | null {
        return this.tasks.find((task) => task.id === id) ?? null;
    }

    public addTask(task: TaskModel): void {
        // [BIJAN] TODO: Add validation here or before this method is called.
        this._tasks.push(task);
    }
}
