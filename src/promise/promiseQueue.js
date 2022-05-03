import EventEmitter from 'events';
import os from 'os';
import { sleep } from '../../test/testUtils/async.js';

const PromiseQueueItemStatus = {
    Ready: 'ready',
    Pending: 'pending',
    Success: 'success',
    Error: 'error',
};

class PromiseQueue extends EventEmitter {
    constructor(currencyCount) {
        super();
        this.currencyCount = currencyCount ?? os.cpus.length;
        this.runningCount = 0;
        this.taskMapper = new Map();
        this.tasksInReady = [];
        this.results = [];
    }

    addTask(promiseCreator) {
        const task = this.taskMapper.get(promiseCreator) ?? {
            index: this.taskMapper.size,
            status: PromiseQueueItemStatus.Ready,
        };
        this.taskMapper.set(promiseCreator, task);

        if (this.runningCount < this.currencyCount) {
            const promise = Promise.resolve(promiseCreator());
            this.runningCount++;
            task.status = PromiseQueueItemStatus.Pending;
            promise.then(
                (value) => {
                    this.runningCount--;
                    this.results[task.index] = value;
                    task.status = PromiseQueueItemStatus.Success;

                    this.emit('success', value);

                    if (this.runningCount === 0 && this.tasksInReady.length === 0) {
                        this.emit('idle', this.results);
                    }

                    const taskCountToRun = Math.min(
                        this.currencyCount - this.runningCount,
                        this.tasksInReady.length,
                    );
                    for (let i = 0; i < taskCountToRun; i++) {
                        this.addTask(this.tasksInReady.shift());
                    }
                },
                (error) => {
                    this.runningCount--;
                    task.status = PromiseQueueItemStatus.Error;
                    this.emit('error', error);
                },
            );
        } else {
            this.tasksInReady.push(promiseCreator);
        }

        return this;
    }
}

async function main() {
    const queue = new PromiseQueue(2);
    queue
        .addTask(async () => {
            await sleep(1000);
            return 1;
        })
        .addTask(async () => {
            await sleep(500);
            return 2;
        })
        .addTask(async () => {
            await sleep(300);
            return 3;
        })
        .addTask(async () => {
            await sleep(400);
            return 4;
        });

    const start = Date.now();
    queue.on('success', (v) => {
        console.log(`success after ${Date.now() - start}ms, value:`, v);
    });
    queue.on('idle', (results) => {
        console.log('idle:', results);
    });

    /*
        success after 501ms, value: 2
        success after 808ms, value: 3
        success after 1001ms, value: 1
        success after 1209ms, value: 4
        idle: [ 1, 2, 3, 4 ]
     */
}

main();
