import { Metadata } from 'next'
import WebinarBatchTable from './partials/table'

export const metadata: Metadata = {
  title: 'Webinar Batch',
  description: 'Manage webinar batch settings and preferences here - House of Wizard',
  robots: {
    index: false,
    follow: false,
  },
}

export default function SettingWebinarBatchPage() {
  return (
    <section className="container mx-auto pb-10">
      <div className="mb-4">
        <h1 className="text-2xl font-bold">Webinar Batch</h1>
        <h4 className="text-muted-foreground">You can manage webinar batch settings here</h4>
      </div>

      <WebinarBatchTable />
    </section>
  )
}
