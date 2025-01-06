import { Metadata } from 'next'
import { redirect } from 'next/navigation'
import AppLayout from '~/components/layout'
import { auth } from '~/lib/auth/handler'
import { ActivityChart } from './dashboard/activity-chart'
import AnimatedGridPattern from '~/components/ui/animated-grid-pattern'
import { cn } from '~/lib/utils'
import NumberTicker from '~/components/ui/number-ticker'

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

  const totals = [
    {
      title: 'Total Users',
      value: 100,
    },
    {
      title: 'Total Mini Course',
      value: 20,
    },
    {
      title: 'Total Private Course',
      value: 1,
    },
    {
      title: 'Total Membership',
      value: 10,
    },
  ]

  return (
    <AppLayout>
      <section className="container mx-auto">
        <div className="flex flex-1 flex-col gap-4">
          <ActivityChart />

          <div className="relative flex h-full w-full items-center justify-center overflow-hidden rounded-lg bg-background p-20">
            <div className="grid auto-rows-min gap-12 md:grid-cols-4 z-10">
              {totals.map((total) => (
                <div key={total.title} className="flex flex-col gap-4 items-center">
                  <h3 className="text-2xl">{total.title}</h3>
                  <p className="whitespace-pre-wrap text-8xl font-medium tracking-tighter text-black dark:text-white">
                    <NumberTicker value={total.value} />
                  </p>
                </div>
              ))}
            </div>

            <AnimatedGridPattern
              numSquares={30}
              maxOpacity={0.1}
              duration={3}
              repeatDelay={1}
              className={cn(
                '[mask-image:radial-gradient(500px_circle_at_center,white,transparent)]',
                'inset-x-0 inset-y-[-30%] h-[200%] skew-y-12'
              )}
            />
          </div>

          <div className="min-h-[100vh] flex-1 rounded-xl bg-muted/50 md:min-h-min" />
        </div>
      </section>
    </AppLayout>
  )
}
