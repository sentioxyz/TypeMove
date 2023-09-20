import { TransactionBlock } from '@mysten/sui.js/transactions'

export function isTransactionArgument(value: any): boolean {
  if (typeof value !== 'object') return false
  if (value === null || value === undefined) return false

  return value.kind === 'GasCoin' || value.kind === 'Result' || value.kind === 'NestedResult' || value.kind === 'Input'
}

export function transactionArgumentOrObject(value: any, transactionBlock: TransactionBlock): any {
  if (isTransactionArgument(value)) {
    return value
  }
  return transactionBlock.object(value)
}

export function transactionArgumentOrPure(value: any, transactionBlock: TransactionBlock): any {
  if (isTransactionArgument(value)) {
    return value
  }
  return transactionBlock.pure(value)
}

export function transactionArgumentOrVec(value: any, transactionBlock: TransactionBlock): any {
  if (isTransactionArgument(value)) {
    return value
  }
  return transactionBlock.makeMoveVec({
    objects: value.map((a: any) => transactionBlock.object(a))
  })
}
