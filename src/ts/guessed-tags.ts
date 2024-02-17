import { tagNames } from './tag-names';
import { normalizeTag } from './normalize-tag';

export type GuessedError = string|null;
export interface Guesses {
    correct: number;
    incorrect: number;
    notGuessed: string[];
    wrongEntries: string[];
    doubleEntries: string[];
    list: string[];
    lastAdded: string[];
    add(tagOrTags: string): GuessedError;
    reset(): void;
    parseTagString(tags: string): string[];
}

export default function useGuessedTags(): Guesses {
    const correctGuesses: string[] = [];
    const wrongGuesses: string[] = [];
    const doubleGuesses: string[] = [];

    return {
        get correct() {
            return correctGuesses.length;
        },
        get incorrect() {
            return wrongGuesses.length + doubleGuesses.length;
        },
        get list() {
            return correctGuesses.sort();
        },
        get notGuessed(): string[] {
            return tagNames.allUnmentionedTags(correctGuesses);
        },
        get wrongEntries() {
            return wrongGuesses;
        },
        get doubleEntries() {
            return doubleGuesses;
        },
        lastAdded: [],
        parseTagString(tags: string): string[] {
            return tags.toLowerCase()
                .trim()
                .split(/\W+/)
                .filter(t => t.length > 0)
                .map(t => normalizeTag(t));
        },
        add(tagOrTags: string): GuessedError {
            const tags = this.parseTagString(tagOrTags);
            if (tags.length === 0) {
                return null;
            }
            let errors: string[] = [];
            let correct: string[] = []
            tags.forEach(tag => {
                if (!tagNames.isValid(tag)) {
                    wrongGuesses.push(tag);
                    errors.push(`A Tag with the name ${tag} does not exist!`);
                } else if (correctGuesses.includes(tag)) {
                    doubleGuesses.push(tag);
                    errors.push(`A Tag with the name ${tag} was already entered!`);
                } else {
                    correctGuesses.push(tag);
                    correct.push(tag);
                }
            });
            this.lastAdded = correct;
            return errors.length > 0 ? errors.join('\n') : null;
        },
        reset() {
            correctGuesses.length = 0;
            wrongGuesses.length = 0;
            doubleGuesses.length = 0;
        }
    };
};
