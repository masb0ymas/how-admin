import { IconLoader } from '@tabler/icons-react'

export default function Loader() {
  return (
    <div className="flex items-center justify-center gap-2 mt-10">
      <IconLoader className="h-6 w-6 animate-spin" />
      <span>Loading...</span>
    </div>
  )
}
