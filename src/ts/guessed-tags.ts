class GuessedTags {
    private tagList: string[] = [];

    constructor(private readonly allTags: HTMLTagNames) {}

    add(tag: string): boolean {
        const t = normalizeTag(tag);
        if (this.allTags.isValid(t) && !this.tagList.includes(t)) {
            return !!this.tagList.push(t);
        }
        return false;
    }

    get(): string[] {
        return this.tagList.sort();
    }

}

class HTMLTagNames {
    private allTags: string[];
    constructor(allTags: string[]) {
        this.allTags = allTags.map(normalizeTag);
    }

    isValid(tag: string): boolean {
        const t = normalizeTag(tag);
        return this.allTags.includes(t);
    }
}

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

export function normalizeTag(tag: string): string {
    return tag.trim().toUpperCase();
}