/**
 * Flambe - Rapid game development
 * TypeScript port - Main exports
 */

// Core classes
export { Entity } from './flambe/Entity';
export { Component } from './flambe/Component';
export { System } from './flambe/System';

// Utilities
export { Disposable, Value, Signal0, Signal1, SignalConnection } from './flambe/util/Disposable';
export { Promise } from './flambe/util/Promise';
export { Log, Logger, LogLevel } from './flambe/Log';

// Math
export { FMath } from './flambe/math/FMath';
export { Point } from './flambe/math/Point';
export { Rectangle } from './flambe/math/Rectangle';
export { Matrix } from './flambe/math/Matrix';

// Animation
export { AnimatedFloat, Behavior, Ease, EaseFunction } from './flambe/animation/AnimatedFloat';

// Assets
export { AssetPack } from './flambe/asset/AssetPack';
export { Manifest, AssetFormat, AssetEntry } from './flambe/asset/Manifest';
export { File, Asset, StringFile, BinaryFile } from './flambe/asset/File';

// Display
export { Texture, HTMLTexture, SubTexture } from './flambe/display/Texture';
export { Sprite, BlendMode } from './flambe/display/Sprite';
export { ImageSprite } from './flambe/display/ImageSprite';
export { FillSprite } from './flambe/display/FillSprite';

// Input
export { MouseEvent, MouseButton } from './flambe/input/MouseEvent';
export { Key } from './flambe/input/Key';
export { MouseCursor } from './flambe/input/MouseCursor';

// Sound
export { Sound, Playback, HTMLSound } from './flambe/sound/Sound';

// Scene
export { Scene } from './flambe/scene/Scene';
export { Director } from './flambe/scene/Director';
export { Transition } from './flambe/scene/Transition';

// Subsystems
export { StageSystem, Orientation } from './flambe/subsystem/StageSystem';
export { KeyboardSystem, HTMLKeyboardSystem, KeyboardEvent } from './flambe/subsystem/KeyboardSystem';
export { MouseSystem, HTMLMouseSystem } from './flambe/subsystem/MouseSystem';
export { RendererSystem, RendererType, HTMLCanvasRenderer, HTMLWebGLRenderer } from './flambe/subsystem/RendererSystem';

// Script
export { Action } from './flambe/script/Action';
export { Script } from './flambe/script/Script';
export { Delay } from './flambe/script/Delay';
export { CallFunction } from './flambe/script/CallFunction';

// Platform
export { MainLoop } from './flambe/platform/MainLoop';
