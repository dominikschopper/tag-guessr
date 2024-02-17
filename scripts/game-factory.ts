import {TagGuessrGameTimed} from "./tag-guessr-game";

export const GameMode = {
    NORMAL: 'NORMAL',
    TIMING_90: 'TIMING_90',
    TIMING_60: 'TIMING_60',
} as const;
export type GameModeType = keyof typeof GameMode;

export interface TagGuessrGame {
    isRunning: boolean;
    isOver: boolean;
    wasNotStartedYet: boolean;
    /**
     * returns the elapsed game time in seconds
     * @property elapsedTime
     */
    elapsedTime: number;
    start(): void;
    stop(): void;
    reset(): void;
}

export default function gameFactory(mode: GameModeType = GameMode.NORMAL): TagGuessrGame|TagGuessrGameTimed {
    const game = createBaseGame();
    if (mode === GameMode.NORMAL) {
        return game;
    }
    let timeout: 90000 | 60000;
    timeout = (mode === GameMode.TIMING_90 ? 90000 : 60000);
    return createTimedGameFrom(game, timeout);
}

function createBaseGame(): TagGuessrGame {

    let startTime: Date|null = null;
    let stopTime: Date|null = null;

    return {
        start() {
            startTime = new Date();
        },
        stop() {
            stopTime = new Date();
        },
        reset() {
            startTime = null;
            stopTime = null;
        },
        get elapsedTime(): number {
            let stop = stopTime ?? new Date();
            if (startTime === null) {
                return 0;
            }
            return Math.round((stop.getTime() - startTime.getTime()) / 1000);
        },
        get isRunning() {
            return startTime !== null && stopTime === null;
        },
        get isOver() {
            return startTime !== null && stopTime !== null;
        },
        get wasNotStartedYet(): boolean {
            return startTime === null && stopTime === null;
        }
    };
}

function getAllUnguessedTags(): string[] {
    return [];
}

export type GameEventType = 'onstart' | 'onstop' | 'onreset';

function createTimedGameFrom(game: TagGuessrGame, timeout: 90000 | 60000): TagGuessrGameTimed {

    type CallbackStore = Record<GameEventType, (() => void)[]>;
    const callbacks: CallbackStore  = {
        onstop: [],
        onstart: [],
        onreset: []
    };

    function handleCallbacks(type: GameEventType) {
        callbacks[type].forEach(fn => { fn() });
    }

    let timedGame: TagGuessrGameTimed;
    timedGame = {
        on(eventType: GameEventType, cb: (() => void)) {
            callbacks[eventType].push(cb);
        },
        start() {
            setTimeout(function() { timedGame.stop() }, timeout);
            handleCallbacks('onstart');
            game.start();
        },
        stop() {
            handleCallbacks('onstop');
            game.stop();
        },
        reset() {
            handleCallbacks('onreset');
            game.stop();
        },
        elapsedTime: game.elapsedTime,
        wasNotStartedYet: game.wasNotStartedYet,
        isRunning: game.isRunning,
        isOver: game.isOver
    };

    return timedGame;
}
