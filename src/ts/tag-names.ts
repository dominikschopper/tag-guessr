import { normalizeTag } from './normalize-tag';
import { allTags } from "./all-tags";

export interface TagNames {
    isValid(tag: string): boolean;
    allUnmentionedTags(guessedTags: string[]): string[];
}

export const tagNames: TagNames = (function (): TagNames {
    const correctTagNames = allTags.map(normalizeTag);
    return {
        isValid: (tag: string) => correctTagNames.includes(normalizeTag(tag)),
        allUnmentionedTags: (guessedTags: string[]) => {
            const guessedTagsMap = new Map<string, string>(guessedTags.map(normalizeTag).map(tag => ([tag, tag])));
            return correctTagNames.filter(t => !guessedTagsMap.has(t));
        }
    };
})();