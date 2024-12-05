import { Metadata } from 'next'
import RoleTable from './table'

export const metadata: Metadata = {
  title: 'Role Permission',
  description: 'Account - Role Permission - House of Wizard',
  robots: {
    index: false,
    follow: false,
  },
}

export default async function RolePermissionPage() {
  return (
    <>
      <div className="container mx-auto pb-10">
        <div className="mb-4">
          <h1 className="text-2xl font-bold">Role Permission</h1>
          <h4 className="text-muted-foreground">You can adjust your role permissions here</h4>
        </div>

        <RoleTable />
      </div>
    </>
  )
}
