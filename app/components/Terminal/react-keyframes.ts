import React from 'react'

type FrameProps = {
  children?: React.ReactNode
  component?: React.ElementType
  duration?: number
  [prop: string]: unknown
}

type KeyframesProps = {
  children: React.ReactNode
  component?: React.ElementType
  onEnd?: () => void
  [prop: string]: unknown
}

export const Frame = ({component = 'span', children, ...props}: FrameProps) => {
  const {duration: _duration, ...elementProps} = props
  void _duration

  return React.createElement(component, elementProps, children)
}

export const Keyframes = ({
  component = 'span',
  children,
  onEnd,
  ...props
}: KeyframesProps) => {
  const frames = React.Children.toArray(children) as React.ReactElement<FrameProps>[]
  const [frameNum, setFrameNum] = React.useState(0)
  const frame = frames[frameNum]
  const hasFrame = frame !== undefined
  const duration = frame?.props.duration ?? 0

  const advanceFrame = React.useEffectEvent(() => {
    if (frames.length <= frameNum + 1) {
      onEnd?.()
      return
    }

    setFrameNum(currentFrame => currentFrame + 1)
  })

  React.useEffect(() => {
    if (!hasFrame)
      return

    const timer = setTimeout(advanceFrame, duration)
    return () => clearTimeout(timer)
  }, [duration, frameNum, frames.length, hasFrame])

  if (!frame)
    return null

  return React.cloneElement(frame, {component, ...props, ...frame.props})
}
