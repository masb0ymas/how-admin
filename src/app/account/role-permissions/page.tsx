import { DataTable } from '~/components/custom/data-table'
import { columns, Payment } from './columns'

async function getData(): Promise<Payment[]> {
  // Fetch data from your API here.
  return [
    {
      id: '728ed52f',
      amount: 100,
      status: 'pending',
      email: 'm@example.com',
    },
    {
      id: '489e1d42',
      amount: 125,
      status: 'processing',
      email: 'example@gmail.com',
    },
  ]
}

export default async function RolePermissionPage() {
  const data = await getData()

  return (
    <>
      <div className="container mx-auto pb-10">
        <div className="mb-4">
          <h1 className="text-2xl font-bold">Role Permission</h1>
          <h4 className="text-muted-foreground">You can adjust your role permissions here</h4>
        </div>

        <DataTable columns={columns} data={data} />
      </div>
    </>
  )
}
