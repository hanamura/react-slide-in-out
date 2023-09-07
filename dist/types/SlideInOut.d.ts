import { SpringConfig } from '@react-spring/web';
import React, { CSSProperties, ReactNode } from 'react';
/**
 * The props for the SlideInOut component.
 */
export type SlideInOutProps = {
    /**
     * Whether the children should be visible or not.
     */
    readonly active?: boolean | undefined;
    /**
     * The delay between each child's animation.
     */
    readonly delay?: number | ((i: number) => number) | undefined;
    /**
     * The spring config for the content animation. See https://www.react-spring.dev/docs/advanced/config for more info.
     */
    readonly contentSpringConfig?: SpringConfig | undefined;
    /**
     * The spring config for the belt animation. See https://www.react-spring.dev/docs/advanced/config for more info.
     */
    readonly beltSpringConfig?: SpringConfig | undefined;
    /**
     * The class name for the belt.
     */
    readonly beltClassName?: string | undefined;
    /**
     * The style for the belt.
     */
    readonly beltStyle?: CSSProperties | undefined;
    /**
     * The children to slide in and out.
     */
    readonly children?: ReactNode | undefined;
    /**
     * The class name for the container.
     */
    readonly className?: string | undefined;
    /**
     * The style for the container.
     */
    readonly style?: CSSProperties | undefined;
};
/**
 * A component that slides its children in and out.
 */
export declare const SlideInOut: ({ active, delay, contentSpringConfig, beltSpringConfig, beltClassName, beltStyle, children, className, style, }: SlideInOutProps) => React.JSX.Element;
/**
 * The default spring config for the content animation.
 */
export declare const defaultContentSpringConfig: {
    readonly tension: 170;
    readonly friction: 26;
};
/**
 * The default spring config for the belt animation.
 */
export declare const defaultBeltSpringConfig: {
    readonly mass: 0.5;
    readonly tension: 170;
    readonly friction: 15;
    readonly clamp: true;
};
