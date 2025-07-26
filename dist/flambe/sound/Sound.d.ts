/**
 * Flambe - Rapid game development
 * TypeScript port
 */
import { Disposable } from '../util/Disposable';
export declare abstract class Sound implements Disposable {
    abstract readonly duration: number;
    abstract play(volume?: number): Playback | null;
    abstract loop(volume?: number): Playback | null;
    abstract dispose(): void;
}
export interface Playback extends Disposable {
    readonly volume: number;
    readonly paused: boolean;
    readonly complete: boolean;
    readonly position: number;
    setVolume(volume: number): Playback;
    pause(): void;
    resume(): void;
    dispose(): void;
}
export declare class HTMLSound extends Sound {
    private audio;
    readonly duration: number;
    constructor(audio: HTMLAudioElement);
    play(volume?: number): Playback | null;
    loop(volume?: number): Playback | null;
    dispose(): void;
}
//# sourceMappingURL=Sound.d.ts.map