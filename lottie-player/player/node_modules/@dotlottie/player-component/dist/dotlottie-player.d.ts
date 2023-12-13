import { PlayMode, PlaybackOptions, DotLottiePlayerState, Manifest } from '@dotlottie/common';
export { PlayMode, PlaybackOptions } from '@dotlottie/common';
import { LitElement, CSSResult, TemplateResult } from 'lit';
import { AnimationItem } from 'lottie-web';

/**
 * Copyright 2023 Design Barn Inc.
 */

interface Versions {
    dotLottiePlayerVersion: string;
    lottieWebVersion: string;
}

/**
 * DotLottiePlayer web component class
 */
declare class DotLottiePlayer extends LitElement {
    defaultTheme: string;
    /**
     * Animation container.
     */
    protected container: HTMLElement;
    /**
     * Play mode.
     */
    playMode: PlayMode;
    /**
     * Autoplay animation on load.
     */
    autoplay: boolean;
    /**
     * Background color.
     */
    background?: string;
    /**
     * Show controls.
     */
    controls: boolean;
    /**
     * Direction of animation.
     */
    direction: number;
    /**
     * Whether to play on mouse hover
     */
    hover: boolean;
    /**
     * Whether to loop animation.
     */
    loop?: string;
    /**
     * Renderer to use.
     */
    renderer: string;
    /**
     * Animation speed.
     */
    speed: number;
    /**
     * Bodymovin JSON data or URL to JSON.
     */
    src?: string;
    intermission: number;
    /**
     * Animation id as string or index to play on load.
     */
    activeAnimationId?: string | null;
    light?: boolean;
    worker?: boolean;
    /**
     * Interactivity state id.
     */
    activeStateId?: string | undefined;
    private _seeker;
    private _dotLottieCommonPlayer;
    private _io?;
    private _loop?;
    private _renderer?;
    private _unsubscribeListeners?;
    private _hasMultipleAnimations;
    private _hasMultipleThemes;
    private _hasMultipleStates;
    private _popoverIsOpen;
    private _animationsTabIsOpen;
    private _statesTabIsOpen;
    private _styleTabIsOpen;
    private _themesForCurrentAnimation;
    private _statesForCurrentAnimation;
    /**
     * Get number of loops or boolean value of loop.
     *
     * @param loop - either a string representing a boolean or a number of loops to play
     * @returns boolean - if loop was activated or not
     */
    private _parseLoop;
    /**
     * Handles click and drag actions on the progress track.
     */
    private _handleSeekChange;
    private _initListeners;
    /**
     * Configure and initialize lottie-web player instance.
     */
    load(src: string | AnimationItem, overrideRendererSettings?: Record<string, unknown>, playbackOptions?: PlaybackOptions): Promise<void>;
    /**
     * @returns Current animation's id
     */
    getCurrentAnimationId(): string | undefined;
    /**
     * @returns The current number of animations
     */
    animationCount(): number;
    /**
     * @returns The ids of all the animations
     */
    animations(): string[];
    /**
     * @returns The current playing animation
     */
    currentAnimation(): string;
    /**
     * @returns the current player states
     */
    getState(): DotLottiePlayerState;
    /**
     *
     * @returns The current manifest.
     */
    getManifest(): Manifest | undefined;
    /**
     * @returns The current lottie-web instance.
     */
    getLottie(): AnimationItem | undefined;
    /**
     * @returns The current version of the dotLottie player and lottie-web.
     */
    getVersions(): Versions;
    /**
     * Play the previous animation. The order is taken from the manifest.
     */
    previous(getOptions?: (currPlaybackOptions: PlaybackOptions, manifestPlaybackOptions: PlaybackOptions) => PlaybackOptions): void;
    /**
     * Play the next animation. The order is taken from the manifest.
     */
    next(getOptions?: (currPlaybackOptions: PlaybackOptions, manifestPlaybackOptions: PlaybackOptions) => PlaybackOptions): void;
    /**
     * Reset to the initial state defined in the manifest.
     */
    reset(): void;
    play(targetAnimation?: string | number, getOptions?: (currPlaybackOptions: PlaybackOptions, manifestPlaybackOptions: PlaybackOptions) => PlaybackOptions): void;
    /**
     * Pause animation play.
     */
    pause(): void;
    /**
     * Stops animation play.
     */
    stop(): void;
    /**
     * Play the animation when it appears on screen and pause when it goes out of view.
     *
     * @param playOnShowOptions - what percentage of the target's visibility the observer's callback should be executed
     * @returns
     */
    playOnShow(playOnShowOptions?: {
        threshold: number[];
    }): void;
    /**
     * Stop the playOnShow observer.
     * @returns
     */
    stopPlayOnShow(): void;
    /**
     * Play the animation synchronized to page scroll.
     * @param scrollOptions
     *  - positionCallback: callback function to get the current position of the player relative to the whole page
     *  - segments: optional segment of animation to play
     *  - threshold: optional visibility threshold to start playing the animation. Between 0 and 1. Defaults to [0, 1].
     * @returns
     */
    playOnScroll(scrollOptions?: {
        positionCallback?: (position: number) => void;
        segments?: [number, number];
        threshold?: [number, number];
    }): void;
    /**
     * Stop the play on scroll observer.
     * @returns
     */
    stopPlayOnScroll(): void;
    /**
     * Seek to a given frame.
     */
    seek(value: number | string): void;
    /**
     * Snapshot the current frame as SVG.
     *
     * If 'download' argument is boolean true, then a download is triggered in browser.
     */
    snapshot(download?: boolean): string;
    /**
     * Set theme
     */
    setTheme(theme: string): void;
    /**
     * @returns All the theme keys
     */
    themes(): string[];
    /**
     * @returns The current applied theme
     */
    getDefaultTheme(): string;
    /**
     * @returns The current active state machine
     */
    getActiveStateMachine(): string | undefined;
    /**
     * Freeze animation play.
     * This internal state pauses animation and is used to differentiate between
     * user requested pauses and component instigated pauses.
     */
    private _freeze;
    /**
     * Sets animation play speed.
     *
     * @param value - Playback speed.
     */
    setSpeed(value?: number): void;
    /**
     * Animation play direction.
     *
     * @param value - Direction values.
     */
    setDirection(value: 1 | -1): void;
    /**
     * Sets the looping of the animation.
     *
     * @param value - Whether to enable looping. Boolean true enables looping.
     */
    setLooping(value: boolean | number): void;
    isLooping(): number | boolean;
    /**
     * Toggle playing state.
     */
    togglePlay(): void;
    /**
     * Toggles animation looping.
     */
    toggleLooping(): void;
    /**
     * Sets the player mode
     * @param mode - The mode to set ('normal', 'bounce')
     */
    setPlayMode(mode: PlayMode): void;
    /**
     * Changes the Interactivity state id and starts it.
     *
     * @param stateId - state machine id.
     */
    enterInteractiveMode(stateId: string): void;
    /**
     * Exits the Interactivity mode.
     */
    exitInteractiveMode(): void;
    /**
     * Reverts PlaybackOptions to manifest values instead of player props.
     */
    revertToManifestValues(playbackKeys?: Array<keyof PlaybackOptions | 'activeAnimationId'>): void;
    /**
     * Returns the styles for the component. Overriding causes styles to not be applied.
     */
    static get styles(): CSSResult;
    /**
     * Initialize everything on component first render.
     */
    protected firstUpdated(): Promise<void>;
    /**
     * Cleanup on component destroy.
     */
    disconnectedCallback(): void;
    private _clickOutListener;
    protected renderControls(): TemplateResult | undefined;
    render(): TemplateResult | void;
}

export { DotLottiePlayer, Versions };
