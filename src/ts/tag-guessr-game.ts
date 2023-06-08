
export interface TagGuessrGame {
    isRunning: boolean;
    isOver: boolean;
    wasNotStartedYet: boolean;
    start(): void;
    stop(): void;
    reset(): void;
    elapsedTime(): number;
}

export const tagGuessrGame = (function (): TagGuessrGame {
    let startTime: Date|null = null;
    let stopTime: Date|null = null;

    return {
        start() {
            startTime = new Date();
        },
        elapsedTime(): number {
            let stop = stopTime ?? new Date();
            if (startTime === null) {
                return 0;
            }
            return Math.round((stop.getTime() - startTime.getTime()) / 1000);
        },
        stop() {
            stopTime = new Date();
        },
        reset() {
            startTime = null;
            stopTime = null;
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

})()