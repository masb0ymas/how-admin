export const getChain = (chain_id: string) => {
  let chain = ''

  if (chain_id === '8453') {
    chain = 'Base'
  }

  return chain
}

export const selectChain = [
  {
    value: '8453',
    label: 'Base',
  },
  {
    value: '11155111',
    label: 'Sepolia',
  },
]
