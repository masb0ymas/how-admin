import { Metadata } from 'next'
import MiniCoursesTable from './partials/table'

export const metadata: Metadata = {
  title: 'Webinar - Mini Courses',
  description: 'Manage mini courses settings and preferences here - House of Wizard',
  robots: {
    index: false,
    follow: false,
  },
}

export default function WebinarMiniCoursesPage() {
  return (
    <section className="pb-10">
      <div className="mb-4">
        <h1 className="text-2xl font-bold">Webinar - Mini Courses</h1>
        <h4 className="text-muted-foreground">You can manage mini courses here</h4>
      </div>

      <MiniCoursesTable />
    </section>
  )
}
