import { Metadata } from 'next'
import { redirect } from 'next/navigation'
import AppLayout from '~/components/layout'
import { auth } from '~/lib/auth/handler'

export const metadata: Metadata = {
  title: 'Home',
  description: 'Home - House of Wizard',
  robots: {
    index: false,
    follow: false,
  },
}

export default async function Home() {
  const session = await auth()

  if (!session?.user) {
    redirect('/sign-in')
  }

  return (
    <AppLayout>
      <section className="container mx-auto">
        <div className="flex flex-1 flex-col gap-4">
          <div className="grid auto-rows-min gap-4 md:grid-cols-3">
            <div className="aspect-video rounded-xl bg-muted/50" />
            <div className="aspect-video rounded-xl bg-muted/50" />
            <div className="aspect-video rounded-xl bg-muted/50" />
          </div>
          <div className="min-h-[100vh] flex-1 rounded-xl bg-muted/50 md:min-h-min" />
        </div>
      </section>
    </AppLayout>
  )
}
