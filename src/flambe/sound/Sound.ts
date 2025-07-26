/**
 * Flambe - Rapid game development
 * TypeScript port
 */

import { Disposable } from '../util/Disposable';

export abstract class Sound implements Disposable {
    public abstract readonly duration: number;

    public abstract play(volume?: number): Playback | null;
    public abstract loop(volume?: number): Playback | null;
    public abstract dispose(): void;
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

export class HTMLSound extends Sound {
    public readonly duration: number;

    constructor(private audio: HTMLAudioElement) {
        super();
        this.duration = audio.duration || 0;
    }

    public play(volume = 1): Playback | null {
        try {
            const audio = this.audio.cloneNode() as HTMLAudioElement;
            audio.volume = volume;
            audio.play();
            return new HTMLPlayback(audio);
        } catch (e) {
            return null;
        }
    }

    public loop(volume = 1): Playback | null {
        try {
            const audio = this.audio.cloneNode() as HTMLAudioElement;
            audio.volume = volume;
            audio.loop = true;
            audio.play();
            return new HTMLPlayback(audio);
        } catch (e) {
            return null;
        }
    }

    public dispose(): void {
        // HTML audio elements are managed by the browser
    }
}

class HTMLPlayback implements Playback {
    constructor(private audio: HTMLAudioElement) {
    }

    public get volume(): number {
        return this.audio.volume;
    }

    public get paused(): boolean {
        return this.audio.paused;
    }

    public get complete(): boolean {
        return this.audio.ended;
    }

    public get position(): number {
        return this.audio.currentTime;
    }

    public setVolume(volume: number): Playback {
        this.audio.volume = volume;
        return this;
    }

    public pause(): void {
        this.audio.pause();
    }

    public resume(): void {
        this.audio.play();
    }

    public dispose(): void {
        this.audio.pause();
        this.audio.src = "";
    }
}
