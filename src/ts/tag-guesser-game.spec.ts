import useGame, { TagGuessrGame } from "./tag-guessr-game";

describe('the TagGuessr Game Functionality', () => {
    let game: TagGuessrGame;
    describe('starting and running the game', () => {
        beforeEach(() => {
            game = useGame();
        });

        it('should return 0s as elapsed time when the game is not yet started', () => {
            expect(game.elapsedTime).toBe(0);
        });

        it('should return the elapsed time, when the game is started', () => {
            jest.useFakeTimers();

            game.start();

            jest.advanceTimersByTime(1100);
            expect(game.elapsedTime).toBeGreaterThanOrEqual(1);

            jest.advanceTimersByTime(1100);
            expect(game.elapsedTime).toBeGreaterThanOrEqual(2);
            jest.clearAllTimers();
        });

        it('should return the elapsed time, when the game is stopped', () => {
            jest.useFakeTimers();

            const gameTimeMs = 121100;
            const gameTimeS = Math.floor(gameTimeMs / 1000);

            game.start();

            jest.advanceTimersByTime(gameTimeMs);
            game.stop();
            expect(game.elapsedTime).toBeGreaterThanOrEqual(gameTimeS);

            jest.advanceTimersByTime(11000);
            expect(game.elapsedTime).toBeGreaterThanOrEqual(gameTimeS);

            jest.clearAllTimers();
        });

        it('after a game.reset() the time should be zero again', () => {
            jest.useFakeTimers();

            const gameTimeMs = 121100;

            game.start();

            jest.advanceTimersByTime(gameTimeMs);
            game.stop();
            game.reset();
            expect(game.elapsedTime).toBe(0);

            jest.clearAllTimers();
        });
    });
});