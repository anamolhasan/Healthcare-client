import React from 'react'

const CommonLayout = ({
    children,
}:Readonly <{
    children: React.ReactNode
}>) => {
  return (
    <div>{children}</div>
  )
}

export default CommonLayout