export class ClockData {
    private _timeZone: string;
    public get timeZone(): string {
        return this._timeZone;
    }
    public set timeZone(v: string) {
        this._timeZone = v;
    }

    private _dim: number;
    public get dim(): number {
        return this._dim;
    }
    public set dim(v: number) {
        this._dim = v;
    }
    constructor(timeZone: string, dim: number) {
        this._timeZone = timeZone;
        this.dim = dim;
    }
}