import { create } from 'zustand'
import { createJSONStorage, persist } from 'zustand/middleware'

type AuthProps = {
  email: string
  access_token: string
}

export type StoreProps = {
  auth: AuthProps | null
}

export type ActionProps = {
  setAuthSession: (data: AuthProps) => void
  removeAuthSession: () => void
}

export type StateProps = StoreProps & ActionProps
const keyStorage = `how-admin-state`

export const useStore = create<StateProps, [['zustand/persist', StateProps]]>(
  persist(
    (set) => ({
      auth: null,

      setAuthSession: (data: AuthProps) => {
        set((state) => ({ ...state, auth: data }))
      },
      removeAuthSession: () => set({ auth: null }),
    }),
    {
      name: keyStorage, // name of the item in the storage (must be unique)
      storage: createJSONStorage(() => localStorage), // (optional) by default, 'localStorage' is used
    }
  )
)
