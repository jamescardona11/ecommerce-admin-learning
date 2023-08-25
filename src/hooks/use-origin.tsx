import { useEffect, useState } from 'react'

export const useOrigin = () => {
  const [mounted, setMounted] = useState(false)
  const origin =
    (window?.location.origin).length > 0 ? window.location.origin : ''

  useEffect(() => {
    setMounted(true)
  }, [])

  if (!mounted) {
    return ''
  }

  return origin
}
