import { SpringConfig, a, config, useSpring } from '@react-spring/web'
import React, { CSSProperties, Children, ReactNode, useEffect } from 'react'

/**
 * The props for the SlideInOut component.
 */
export type SlideInOutProps = {
  /**
   * Whether the children should be visible or not.
   */
  readonly active?: boolean | undefined

  /**
   * The delay between each child's animation.
   */
  readonly delay?: number | ((i: number) => number) | undefined

  /**
   * The spring config for the content animation. See https://www.react-spring.dev/docs/advanced/config for more info.
   */
  readonly contentSpringConfig?: SpringConfig | undefined

  /**
   * The spring config for the belt animation. See https://www.react-spring.dev/docs/advanced/config for more info.
   */
  readonly beltSpringConfig?: SpringConfig | undefined

  /**
   * The class name for the belt.
   */
  readonly beltClassName?: string | undefined

  /**
   * The style for the belt.
   */
  readonly beltStyle?: CSSProperties | undefined

  /**
   * The children to slide in and out.
   */
  readonly children?: ReactNode | undefined

  /**
   * The class name for the container.
   */
  readonly className?: string | undefined

  /**
   * The style for the container.
   */
  readonly style?: CSSProperties | undefined
}

/**
 * A component that slides its children in and out.
 */
export const SlideInOut = ({
  active = false,
  delay = 50,
  contentSpringConfig,
  beltSpringConfig,
  beltClassName,
  beltStyle,
  children,
  className,
  style,
}: SlideInOutProps) => (
  <div
    className={className}
    style={{
      alignItems: 'flex-start',
      display: 'flex',
      flexDirection: 'column',
      ...style,
    }}
  >
    {Children.map(children, (child, i) => (
      <SlideInOutItem
        key={i}
        active={active}
        delay={typeof delay === 'function' ? delay(i) : i * delay}
        contentSpringConfig={contentSpringConfig}
        beltSpringConfig={beltSpringConfig}
        beltClassName={beltClassName}
        beltStyle={beltStyle}
      >
        {child}
      </SlideInOutItem>
    ))}
  </div>
)

/**
 * The props for the SlideInOutItem component.
 */
type SlideInOutItemProps = {
  readonly active: boolean
  readonly delay: number
  readonly contentSpringConfig?: SpringConfig | undefined
  readonly beltSpringConfig?: SpringConfig | undefined
  readonly beltClassName?: string | undefined
  readonly beltStyle?: CSSProperties | undefined
  readonly children?: ReactNode | undefined
}

/**
 * The default spring config for the content animation.
 */
export const defaultContentSpringConfig = {
  ...config.default,
} as const

/**
 * The default spring config for the belt animation.
 */
export const defaultBeltSpringConfig = {
  mass: 0.5,
  tension: 170,
  friction: 15,
  clamp: true,
} as const

/**
 * An internal component that slides its children in and out.
 */
const SlideInOutItem = ({
  active,
  delay,
  contentSpringConfig = { ...defaultContentSpringConfig },
  beltSpringConfig = { ...defaultBeltSpringConfig },
  beltClassName,
  beltStyle,
  children,
}: SlideInOutItemProps) => {
  const [contentSpring, contentSpringApi] = useSpring(() => ({
    visibility: 'hidden' as 'hidden' | 'visible',
    x: '-0.5em',
    config: contentSpringConfig,
  }))

  const [beltSpring, beltSpringApi] = useSpring(() => ({
    // To avoid a flash of the belt, -100.5% is used instead of -100%
    x: '-100.5%',
    config: beltSpringConfig,
  }))

  // Animate the belt and the content when the `active` prop changes
  useEffect(() => {
    if (active) {
      beltSpringApi.start({
        to: async (next) => {
          // Start the belt animation to cover the whole content area
          await next({ x: '0%' })
          // Start the content animation after the half of the belt animation
          contentSpringApi.start({ x: '0em', visibility: 'visible' })
          // To avoid a flash of the belt, 100.5% is used instead of 100%
          await next({ x: '100.5%' })
        },
        delay,
      })
    } else {
      // If the belt is already hidden, don't animate it
      if (beltSpring.x.get() === '-100.5%') return

      beltSpringApi.start({
        to: async (next) => {
          // Start the content animation and the belt animation at the same time
          contentSpringApi.start({ x: '-0.5em' })
          await next({ x: '0%' })
          // Hide the content after the half of the belt animation
          contentSpringApi.start({ visibility: 'hidden' })
          // To avoid a flash of the belt, -100.5% is used instead of -100%
          await next({ x: '-100.5%' })
        },
        delay,
      })
    }
  }, [active, delay, beltSpringApi, contentSpringApi])

  return (
    <div
      style={{
        position: 'relative',
        overflow: 'hidden',
      }}
    >
      {/* content */}
      <a.div
        style={{
          position: 'relative',
          ...contentSpring,
        }}
      >
        {children}
      </a.div>

      {/* belt */}
      <a.div
        className={beltClassName}
        style={{
          background: 'currentColor',
          blockSize: '100%',
          inlineSize: '100%',
          insetBlockStart: 0,
          position: 'absolute',
          ...beltStyle,
          ...beltSpring,
        }}
      />
    </div>
  )
}
