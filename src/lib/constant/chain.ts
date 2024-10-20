const SEPOLIA_CHAIN_ID = 11155111
const BASE_CHAIN_ID = 8453

export const chains = [SEPOLIA_CHAIN_ID, BASE_CHAIN_ID]
export const selectChains = chains.map((item) => {
  let label = ''

  if (item === SEPOLIA_CHAIN_ID) {
    label = 'Sepolia'
  }

  if (item === BASE_CHAIN_ID) {
    label = 'Base'
  }

  return { label, value: String(item) }
})
