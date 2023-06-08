
export interface TagGuessrGame {
    isRunning: boolean;
    isOver: boolean;
    wasNotStartedYet: boolean;
    elapsedTime: number;
    start(): void;
    stop(): void;
    reset(): void;
}

export default function useGame(): TagGuessrGame {
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