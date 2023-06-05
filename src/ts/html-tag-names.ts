import { normalizeTag } from './normalize-tag';

export class HTMLTagNames {
    private allTags: string[];

    constructor(allTags: string[]) {
        this.allTags = allTags.map(normalizeTag);
    }

    isValid(tag: string): boolean {
        const t = normalizeTag(tag);
        return this.allTags.includes(t);
    }
}
