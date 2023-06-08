import useGuessedTags, {Guesses} from "./guessed-tags";

describe('the guessedTags functions', () => {
    let guesses: Guesses;

    beforeEach(() => {
        guesses = useGuessedTags();
    });

    it('should hold the correct and incorrect count', () => {
        expect(guesses.correct).toBe(0);
        expect(guesses.incorrect).toBe(0);

        guesses.add('html');
        expect(guesses.correct).toBe(1);
        expect(guesses.incorrect).toBe(0);

        guesses.add('bdy');
        expect(guesses.correct).toBe(1);
        expect(guesses.incorrect).toBe(1);

        guesses.add('body');
        expect(guesses.correct).toBe(2);
        expect(guesses.incorrect).toBe(1);

        guesses.add('ul');
        expect(guesses.correct).toBe(3);
        expect(guesses.incorrect).toBe(1);

        guesses.add('kkkk');
        expect(guesses.correct).toBe(3);
        expect(guesses.incorrect).toBe(2);

    });

    it('should reset correct and incorrect to zero if reset() eas called', () => {
        expect(guesses.correct).toBe(0);
        expect(guesses.incorrect).toBe(0);

        guesses.add('html');
        expect(guesses.correct).toBe(1);
        expect(guesses.incorrect).toBe(0);

        guesses.add('bdy');
        expect(guesses.correct).toBe(1);
        expect(guesses.incorrect).toBe(1);

        guesses.reset();
        expect(guesses.correct).toBe(0);
        expect(guesses.incorrect).toBe(0);
    });
});