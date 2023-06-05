class Subscribe<T> {

    private subscribers: CallableFunction[] = [];

    constructor(private readonly innerClass: T, private readonly methodName: keyof T) { }

    add(func: CallableFunction): boolean {
        if (this.subscribers.includes(func)) {
            return false;
        }
        this.subscribers.push(func);
        return true;
    }

    notify() {
        this.subscribers.forEach(func => {
            func();
        });
    }
}
