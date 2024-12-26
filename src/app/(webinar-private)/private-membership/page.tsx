import { Metadata } from 'next'
import WebinarPrivateMemberTable from './partials/table'

export const metadata: Metadata = {
  title: 'Membership',
  description: 'Manage webinar membership settings and preferences here - House of Wizard',
  robots: {
    index: false,
    follow: false,
  },
}

export default function WebinarPrivateMemberPage() {
  return (
    <section className="container mx-auto">
      <div className="mb-4">
        <h1 className="text-2xl font-bold">Private Membership</h1>
        <h4 className="text-muted-foreground">You can manage private membership settings here</h4>
      </div>

      <WebinarPrivateMemberTable />
    </section>
  )
}
