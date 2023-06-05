import { HTMLTagNames } from './html-tag-names';
import { normalizeTag } from './normalize-tag';

class GuessedTags {
    private tagList: string[] = [];

    constructor(private readonly allTags: HTMLTagNames) {}

    get list(): string[] {
        return this.tagList.sort();
    }

    add(tag: string): boolean {
        const t = normalizeTag(tag);
        if (this.allTags.isValid(t) && !this.tagList.includes(t)) {
            return !!this.tagList.push(t);
        }
        return false;
    }

}
