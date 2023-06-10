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

    test.each([
        { input: '', expectCorrect: 0, expectIncorrect: 0 },
        { input: 'ul', expectCorrect: 1, expectIncorrect: 0 },
        { input: 'p,b', expectCorrect: 2, expectIncorrect: 0 },
        { input: 'a a', expectCorrect: 1, expectIncorrect: 1 },
        { input: '  body  ', expectCorrect: 1, expectIncorrect: 0 },
        { input: '  xy  ', expectCorrect: 0, expectIncorrect: 1 },
        { input: ' a xy  ', expectCorrect: 1, expectIncorrect: 1 },
        { input: '\nb xy', expectCorrect: 1, expectIncorrect: 1 },
        { input: 'ul\nxy, a\nmeta\nlnk, p\n', expectCorrect: 4, expectIncorrect: 2 },
    ])('it should get the amount $expectCorrect from "$input"', ({input, expectCorrect, expectIncorrect}) => {
        expect(guesses.addTagsFromString(input)).toBe(expectCorrect);
        expect(guesses.correct).toBe(expectCorrect);
        expect(guesses.incorrect).toBe(expectIncorrect);
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