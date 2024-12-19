import { Metadata } from 'next'
import InstructorTable from './partials/table'

export const metadata: Metadata = {
  title: 'Instructor',
  description: 'Manage instructor settings and preferences here - House of Wizard',
  robots: {
    index: false,
    follow: false,
  },
}

export default function InstructorPage() {
  return (
    <section className="container mx-auto pb-10">
      <div className="mb-4">
        <h1 className="text-2xl font-bold">Instructor</h1>
        <h4 className="text-muted-foreground">You can manage instructor settings here</h4>
      </div>

      <InstructorTable />
    </section>
  )
}

