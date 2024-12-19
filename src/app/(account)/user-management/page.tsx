import { Metadata } from 'next'
import UsersTable from './partials/table'

export const metadata: Metadata = {
  title: 'User Management',
  description: 'Manage users in the system - House of Wizard',
  robots: {
    index: false,
    follow: false,
  },
}

export default function UserManagement() {
  return (
    <section className="container mx-auto">
      <div className="mb-4">
        <h1 className="text-2xl font-bold">User Management</h1>
        <h4 className="text-muted-foreground">You can manage users here</h4>
      </div>

      <UsersTable />
    </section>
  )
}
