import React from 'react'

const PatientDashboardLayout = ({
    children,
}: Readonly<{
    children: React.ReactNode
}>) => {
  return (
    <>
     {children}
    </>
  )
}

export default PatientDashboardLayout