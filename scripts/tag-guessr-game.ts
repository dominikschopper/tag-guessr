import gameFactory, {GameEventType, GameModeType, TagGuessrGame} from "./game-factory";

export interface TagGuessrGameTimed extends TagGuessrGame {
    on(type: GameEventType, fn: CallableFunction): void;
}

/** @Deprecated */
export default function useGame(mode?: GameModeType): TagGuessrGame|TagGuessrGameTimed {

    return gameFactory(mode);

}