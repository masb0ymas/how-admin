import { Metadata } from 'next'
import PrivatePlanTable from './partials/table'

export const metadata: Metadata = {
  title: 'Private Plan',
  description: 'Manage private plan settings and preferences here - House of Wizard',
  robots: {
    index: false,
    follow: false,
  },
}

export default function PrivatePlanPage() {
  return (
    <section className="container mx-auto pb-10">
      <div className="mb-4">
        <h1 className="text-2xl font-bold">Private Plan</h1>
        <h4 className="text-muted-foreground">You can manage private plan settings here</h4>
      </div>

      <PrivatePlanTable />
    </section>
  )
}
