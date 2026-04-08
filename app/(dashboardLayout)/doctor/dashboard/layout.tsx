import React from 'react'

const DoctorsDashboardLayout = ({
    children,
}:Readonly<{
    children: React.ReactNode
}>) => {
  return (
    <div>{children}</div>
  )
}

export default DoctorsDashboardLayout