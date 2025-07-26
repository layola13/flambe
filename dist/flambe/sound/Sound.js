/**
 * Flambe - Rapid game development
 * TypeScript port
 */
export class Sound {
}
export class HTMLSound extends Sound {
    constructor(audio) {
        super();
        this.audio = audio;
        this.duration = audio.duration || 0;
    }
    play(volume = 1) {
        try {
            const audio = this.audio.cloneNode();
            audio.volume = volume;
            audio.play();
            return new HTMLPlayback(audio);
        }
        catch (e) {
            return null;
        }
    }
    loop(volume = 1) {
        try {
            const audio = this.audio.cloneNode();
            audio.volume = volume;
            audio.loop = true;
            audio.play();
            return new HTMLPlayback(audio);
        }
        catch (e) {
            return null;
        }
    }
    dispose() {
        // HTML audio elements are managed by the browser
    }
}
class HTMLPlayback {
    constructor(audio) {
        this.audio = audio;
    }
    get volume() {
        return this.audio.volume;
    }
    get paused() {
        return this.audio.paused;
    }
    get complete() {
        return this.audio.ended;
    }
    get position() {
        return this.audio.currentTime;
    }
    setVolume(volume) {
        this.audio.volume = volume;
        return this;
    }
    pause() {
        this.audio.pause();
    }
    resume() {
        this.audio.play();
    }
    dispose() {
        this.audio.pause();
        this.audio.src = "";
    }
}
//# sourceMappingURL=Sound.js.map