import { Metadata } from 'next'
import SessionsTable from './partials/table'

export const metadata: Metadata = {
  title: 'Sessions',
  description: 'Account - Sessions - House of Wizard',
}

export default function SessionsPage() {
  return (
    <>
      <div className="container mx-auto pb-10">
        <div className="mb-4">
          <h1 className="text-2xl font-bold">Sessions</h1>
          <h4 className="text-muted-foreground">You can view your sessions here</h4>
        </div>

        <SessionsTable />
      </div>
    </>
  )
}
