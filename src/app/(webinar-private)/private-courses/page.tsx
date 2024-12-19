import { Metadata } from 'next'
import PrivateCoursesTable from './partials/table'

export const metadata: Metadata = {
  title: 'Private Courses',
  description: 'Manage private courses settings and preferences here - House of Wizard',
  robots: {
    index: false,
    follow: false,
  },
}

export default function PrivateCoursesPage() {
  return (
    <section className="container mx-auto">
      <div className="mb-4">
        <h1 className="text-2xl font-bold">Private Courses</h1>
        <h4 className="text-muted-foreground">You can manage private courses settings here</h4>
      </div>

      <PrivateCoursesTable />
    </section>
  )
}
