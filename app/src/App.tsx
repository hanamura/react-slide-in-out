import { useEffect, useState } from 'react'

import { SlideInOut } from '../../src/SlideInOut'

export const App = () => {
  const [active, setActive] = useState(false)

  useEffect(() => {
    const onClick = () => setActive((active) => !active)
    document.addEventListener('click', onClick)
    return () => document.removeEventListener('click', onClick)
  }, [])

  return (
    <>
      <SlideInOut active={active}>
        <>Water </>
        <>Sugar </>
        <>Salt </>
        <>Pepper</>
      </SlideInOut>

      <div style={{ blockSize: '1em' }} />

      <SlideInOut active={active} beltStyle={{ color: 'crimson' }}>
        <>Water </>
        <>Sugar </>
        <>Salt </>
        <>Pepper</>
      </SlideInOut>
    </>
  )
}
