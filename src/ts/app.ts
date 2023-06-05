import { allTags as rawTags } from "./all-tags";

const allTags = rawTags.map((t: string) => t.toUpperCase()).sort();

function initialize() {
    const doc = window.document;
    const selectors = {
        GUESS_FORM: '#guess-form',
        GUESS_INPUT: '#guessed-tag',
        GAME_FORM: '#game-form',
        NO_OF_TAGS: '#no-guessed-tags',
        ALLTAGS_LENGTH: '[data-template="alltags.length"]',
        RESULT_LIST: '#correctly-guessed-tags'
    } as const;


    function replaceLengthOnLoad(tags: string[]) {
        const allLengthElements = doc.querySelectorAll(selectors.ALLTAGS_LENGTH);
        allLengthElements.forEach(el => {
            el.textContent = tags.length.toString(10);
        });
    }

    doc.addEventListener('readystatechange', (ev) => {
        const guessInput = doc.querySelector<HTMLInputElement>(selectors.GUESS_INPUT);
        const resultList = doc.querySelector<HTMLUListElement>(selectors.RESULT_LIST);

        if (!resultList) {
            throw new Error('Cannot start game, since page is not correctly rendered');
        }

        replaceLengthOnLoad(allTags);
        doc.querySelector(selectors.GUESS_FORM)?.addEventListener('submit', (ev) => {
            ev.preventDefault();
            console.log(ev, guessInput?.value);
            const newGuessedTag = guessInput?.value ?? '-';
            guessedTags = handleTagSubmission(newGuessedTag);
            renderGuessedTagsTo(resultList, guessedTags);
        });
    });


}

initialize();

function isItInList(tag: string, list: string[]): boolean {
    return list.includes(tag);
}

function isInAllTagsList(tag: string): boolean {
    return isItInList(tag, allTags);
}

let guessedTags: string[] = [];

function isNotInGuessedTagsList(tag: string): boolean {
    return !isItInList(tag, guessedTags);
}

function handleTagSubmission(tag: string): string[] {
    const myGuessedTags = [...guessedTags];
    tag = tag.toUpperCase();
    if (isInAllTagsList(tag) && isNotInGuessedTagsList(tag)) {
        myGuessedTags.push(tag);
        myGuessedTags.sort();
    }
    return myGuessedTags;
}

function renderGuessedTagsTo(ul: HTMLUListElement, goodGuesses: string[]) {
    Array.from(ul.children).forEach(li => {
        ul.removeChild(li);
    });

    goodGuesses.forEach(tag => {
        debugger;
        const li = new HTMLLIElement();
        li.id = `guessed-tag-${tag}`;
        ul.appendChild(li);
    });
}