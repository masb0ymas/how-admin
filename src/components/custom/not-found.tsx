import AppLayout from '../layout'

export default function NotFound() {
  return (
    <AppLayout>
      <div className="flex flex-col gap-2 justify-center items-center bg-gradient-to-br from-sidebar to-sidebar/80 rounded-xl border-[1px] shadow-lg px-4 py-36 sm:h-screen">
        <h2 className="text-2xl font-medium">Requested source not found</h2>
      </div>
    </AppLayout>
  )
}
