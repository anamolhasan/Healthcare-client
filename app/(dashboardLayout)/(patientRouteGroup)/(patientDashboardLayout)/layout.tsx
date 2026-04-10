import React from 'react'

const PatientDashboardLayout = ({
    children,
}: Readonly<{
    children: React.ReactNode
}>) => {
  return (
    <>
    Patient Dashboard Layout
     {children}
    </>
  )
}

export default PatientDashboardLayout