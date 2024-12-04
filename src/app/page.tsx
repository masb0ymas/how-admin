import { Metadata } from 'next'
import AppLayout from '~/components/layout'

export const metadata: Metadata = {
  title: 'Home',
  description: 'Home - House of Wizard',
  robots: {
    index: false,
    follow: false,
  },
}

export default function Home() {
  return (
    <AppLayout>
      <div className="flex flex-1 flex-col gap-4">
        <div className="grid auto-rows-min gap-4 md:grid-cols-3">
          <div className="aspect-video rounded-xl bg-muted/50" />
          <div className="aspect-video rounded-xl bg-muted/50" />
          <div className="aspect-video rounded-xl bg-muted/50" />
        </div>
        <div className="min-h-[100vh] flex-1 rounded-xl bg-muted/50 md:min-h-min" />
      </div>
    </AppLayout>
  )
}
