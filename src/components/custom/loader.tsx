import { IconLoader } from '@tabler/icons-react'

type LoaderProps = {
  label?: string
}

export default function Loader({ label = 'Loading...' }: LoaderProps) {
  return (
    <div className="flex items-center justify-center gap-2 my-10">
      <IconLoader className="h-6 w-6 animate-spin" />
      <span>{label}</span>
    </div>
  )
}
