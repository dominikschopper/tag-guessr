import { allTags as rawTags } from "./all-tags";
import useGuessedTags from "./guessed-tags";

import gameFactory, {TagGuessrGame} from "./game-factory";

const allTags = rawTags.map((t: string) => t.toUpperCase()).sort();

function initialize() {
    const doc = window.document;
    const selectors = {
        GUESS_FORM: '#guess-form',
        GUESS_INPUT: '#guessed-tag',
        GAME_FORM: '#game-form',
        NO_OF_TAGS: '#no-guessed-tags',
        NO_OF_BAD_TAGS: '#no-wrong-tags',
        ALLTAGS_LENGTH: '[data-template="alltags.length"]',
        RESULT_LIST: '#correctly-guessed-tags',
        WRONG_LIST: '#unmentioned-tags',
        GUESS_ERROR: '#tag-error',
        timer: '#game-timer'
    } as const;


    const game = gameFactory();
    const guesses = useGuessedTags();

    doc.addEventListener('readystatechange', () => {
        const guessInput = doc.querySelector<HTMLInputElement>(selectors.GUESS_INPUT) ?? doc.createElement('input');
        const resultList = doc.querySelector<HTMLUListElement>(selectors.RESULT_LIST) ?? doc.createElement('ul');
        const wrongList = doc.querySelector<HTMLUListElement>(selectors.WRONG_LIST) ?? doc.createElement('ul');
        const resultNo: HTMLInputElement | null = doc.querySelector<HTMLInputElement>(selectors.NO_OF_TAGS) ?? doc.createElement('input');
        const wrongNo: HTMLInputElement | null = doc.querySelector<HTMLInputElement>(selectors.NO_OF_BAD_TAGS) ?? doc.createElement('input');
        const errorElement = doc.querySelector(selectors.GUESS_ERROR) ?? doc.createElement('p');
        const gameTimer: HTMLElement = doc.querySelector(selectors.timer) ?? doc.createElement('span');
        const allLengthElements = doc.querySelectorAll(selectors.ALLTAGS_LENGTH);

        function replaceCompleteTagLength(tags: string[]) {
            allLengthElements.forEach(el => {
                el.textContent = `${tags.length}`;
            });
        }
        replaceCompleteTagLength(allTags);

        if (!resultList) {
            throw new Error('Cannot start game, since page is not correctly rendered');
        }

        let timerId: any;
        doc.querySelector(selectors.GUESS_FORM)?.addEventListener('submit', (ev) => {
            ev.preventDefault();
            if (game.wasNotStartedYet) {
                game.start();
                timerId = startAutoUpdate(gameTimer, game);
            }
            const newGuessedTag = guessInput?.value.trim() ?? '';
            if (newGuessedTag.length < 1) {
                return;
            }
            const err = guesses.add(newGuessedTag);
            errorElement.textContent = '';
            if (err === null) {
                guesses.lastAdded.forEach(t => renderGuessedTagsTo(resultList, t));
            } else {
                errorElement.textContent = err;
            }

            setValueOf(resultNo, guesses.correct);
            setValueOf(wrongNo, guesses.incorrect);

            guessInput.value = '';
            guessInput.focus();
        });

        // this gets submitted when the user clicks to end the game
        doc.querySelector(selectors.GAME_FORM)?.addEventListener('submit', (ev) => {
            ev.preventDefault();
            if (game.isRunning) {
                game.stop();
                guesses.notGuessed.forEach(t => renderGuessedTagsTo(wrongList, t));
                clearInterval(timerId);
            }
            guessInput.focus();
        });

        // this is triggered when the user clicks to start from fresh
        doc.querySelector(selectors.GAME_FORM)?.addEventListener('reset', (ev) => {
            ev.preventDefault();
            if (game.isRunning) {
                game.stop();
                clearInterval(timerId);
            }

            game.reset();
            guesses.reset();

            resetList(resultList);
            updateTimeElapsed(gameTimer, 0);
            setValueOf(resultNo, guesses.correct);
            setValueOf(wrongNo, guesses.incorrect);

            guessInput.focus();
        });
    });

    function updateTimeElapsed(el: HTMLElement, timeInSecs: number) {
        el.textContent = secAsHumanReadable(timeInSecs);
    }

    function startAutoUpdate(el: HTMLElement, game: TagGuessrGame): any {
        return setInterval(() => {
            updateTimeElapsed(el, game.elapsedTime);
        }, 500);
    }
}

initialize();

function renderGuessedTagsTo(ul: HTMLUListElement, nextGoodGuess: string) {
    const li = document.createElement('li');
    li.id = `guessed-tag-${nextGoodGuess}`;
    li.innerText = nextGoodGuess.toLowerCase();
    ul.appendChild(li);
}

function resetList(ul: HTMLUListElement) {
    ul.innerHTML = '';
}

function setValueOf(inputEl: HTMLInputElement, value: string|number) {
    inputEl.value = `${value}`;
}

function secAsHumanReadable(sec: number): string {
    const minInSec = 60;
    if (sec < 60) {
        return `${sec}s`;
    }
    const remaining = sec % minInSec;
    const min = (sec - remaining) / minInSec;
    return `${min}min ${remaining}s`;
}