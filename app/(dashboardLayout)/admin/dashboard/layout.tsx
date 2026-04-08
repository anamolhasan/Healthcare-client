import React from 'react'

const AdminDashboardLayout = ({
    children,
}: Readonly<{
    children: React.ReactNode;
}>) => {
  return (
    <div>{children}</div>
  )
}

export default AdminDashboardLayout