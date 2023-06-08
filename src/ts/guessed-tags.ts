import { tagNames } from './tag-names';
import { normalizeTag } from './normalize-tag';

export type GuessedError = string|null;
export interface Guesses {
    correctCount(): number;
    incorrectCount(): number;
    add(tag: string): GuessedError;
    reset(): void;
}

export const guessedTags: Guesses = (function (): Guesses {
    const guesses: string[] = [];
    let incorrect = 0;
    return {
        correctCount: () => guesses.length,
        incorrectCount: () => incorrect,
        add: (tag: string): GuessedError => {
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
        }
    };
})()


