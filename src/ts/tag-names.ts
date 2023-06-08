import { normalizeTag } from './normalize-tag';
import { allTags } from "./all-tags";

export interface TagNames {
    isValid(tag: string): boolean;
}

export const tagNames: TagNames = (function (): TagNames {
    const correctTagNames = allTags.map(normalizeTag);

    return {
        isValid: (tag: string) => correctTagNames.includes(normalizeTag(tag))
    };
})()
;