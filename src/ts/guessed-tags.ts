import { tagNames } from './tag-names';
import { normalizeTag } from './normalize-tag';

export type GuessedError = string|null;
export interface Guesses {
    correct: number;
    incorrect: number;
    list: string[];
    add(tag: string): GuessedError;
    reset(): void;
    /**
     *
     * @param tagString
     * @returns {number} the number of strings successfully parsed
     */
    addTagsFromString(tagString: string): number;
}

export default function useGuessedTags(): Guesses {
    const guesses: string[] = [];
    let incorrect = 0;

    return {
        get correct() {
            return guesses.length;
        },
        get incorrect() {
            return incorrect;
        },
        get list() {
            return guesses.sort();
        },
        add(tag: string): GuessedError {
            if (tag.length === 0) {
                return null;
            }
            const normalizedTag = normalizeTag(tag);
            if (!tagNames.isValid(normalizedTag)) {
                incorrect += 1;
                return `A Tag with the name ${tag} does not exist!`;
            } else if (guesses.includes(normalizedTag)) {
                incorrect += 1;
                return `A Tag with the name ${tag} was already entered!`
            }
            guesses.push(normalizedTag)
            return null;
        },
        reset() {
            guesses.length = 0;
            incorrect = 0;
        },
        addTagsFromString(tagString): number {
            if (tagString.length === 0) {
                return 0;
            }
            const tags = tagString.toLowerCase()
                .trim()
                .split(/\W+/);
            tags.forEach(tag => {
                this.add(tag);
            });
            return this.correct;
        }
    };
};


