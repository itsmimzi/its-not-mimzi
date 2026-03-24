/*'use client'
import { useState, useEffect } from 'react'


export default function useShowBackToTop(offset =100) {
  const [show, setShow] = useState(false)

  useEffect(() => {
    const onScroll = () => setShow(window.scrollY > offset)
    window.addEventListener('scroll', onScroll)
    onScroll()
    return () => window.removeEventListener('scroll', onScroll)
  }, [offset])

  return show
}*/
