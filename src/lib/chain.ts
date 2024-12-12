export const getChain = (chain_id: string) => {
  let chain = ''

  if (chain_id === '8453') {
    chain = 'Base'
  }

  return chain
}
