import React from 'react'

const CommonLayout = ({
    children,
}:Readonly <{
    children: React.ReactNode
}>) => {
  return (
    <>{children}</>
  )
}

export default CommonLayout