import { Metadata } from 'next'
import CategoryTable from './partials/table'

export const metadata: Metadata = {
  title: 'Category',
  description: 'Manage category settings and preferences here - House of Wizard',
  robots: {
    index: false,
    follow: false,
  },
}

export default function SettingCategoryPage() {
  return (
    <section className="container mx-auto">
      <div className="mb-4">
        <h1 className="text-2xl font-bold">Category</h1>
        <h4 className="text-muted-foreground">You can manage category settings here</h4>
      </div>

      <CategoryTable />
    </section>
  )
}
