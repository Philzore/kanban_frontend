export class Task {
    createdFrom:string;
    task:string;
    for:string;


    constructor(obj?:any) {
        this.createdFrom = obj ? obj.from : '' ;
        this.task = obj ? obj.task : '' ;
        this.for = obj ? obj.for : '' ;
    }

    public toJSON() {
        return {
            from : this.createdFrom,
            task : this.task,
            for : this.for,
        };
    }
}