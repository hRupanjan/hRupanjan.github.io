import { Guid } from 'guid-typescript';

export class ClockData {
    public timeZone: string;
    public dim: number;
    public id: Guid;

    constructor(timeZone: string, dim: number, id?: Guid) {
        this.timeZone = timeZone;
        this.dim = dim;
        if (!id) {
            this.id = Guid.create();
        }
    }
}
