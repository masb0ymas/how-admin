import { DataTable } from '~/components/custom/data-table'
import { findRoles } from './action'
import { columns } from './columns'
import { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Role Permission',
  description: 'Account - Role Permission - House of Wizard',
  robots: {
    index: false,
    follow: false,
  },
}

export default async function RolePermissionPage() {
  const { data } = await findRoles()

  return (
    <>
      <div className="container mx-auto pb-10">
        <div className="mb-4">
          <h1 className="text-2xl font-bold">Role Permission</h1>
          <h4 className="text-muted-foreground">You can adjust your role permissions here</h4>
        </div>

        <DataTable columns={columns} data={data} baseUrl="/account/role-permissions" />
      </div>
    </>
  )
}
