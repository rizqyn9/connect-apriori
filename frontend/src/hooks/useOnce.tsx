import React from 'react'

function useOnce(effect: React.EffectCallback, deps: React.DependencyList | undefined) {
  const shouldRender = React.useRef(false)
  return React.useEffect(() => {
    if (!shouldRender.current) {
      shouldRender.current = true
      return
    }
    effect()
  }, deps)
}

export { useOnce }
