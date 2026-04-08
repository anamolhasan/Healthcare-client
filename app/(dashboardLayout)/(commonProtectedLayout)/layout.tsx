import React from 'react'

const CommonProtectedLayout = ({
    children,
}: Readonly<{
    children: React.ReactNode
}>) => {
  return (
    <div>{children}</div>
  )
}

export default CommonProtectedLayout