import { Metadata } from 'next'
import TransactionTable from './partials/table'

export const metadata: Metadata = {
  title: 'Transaction',
  description: 'Manage transaction settings and preferences here - House of Wizard',
  robots: {
    index: false,
    follow: false,
  },
}

export default function TransactionPage() {
  return (
    <section className="container mx-auto">
      <div className="mb-4">
        <h1 className="text-2xl font-bold">Transaction</h1>
        <h4 className="text-muted-foreground">You can manage transaction settings here</h4>
      </div>

      <TransactionTable />
    </section>
  )
}
