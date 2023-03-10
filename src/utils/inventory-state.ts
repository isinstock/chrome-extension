import {ItemAvailability, Product} from '../@types/linked-data'
import {findOffer, isInStock, isNewCondition} from './helpers'
import {InventoryState} from '../@types/inventory-states'
import {MessageAction} from '../@types/messages'

export const calculateInventoryState = (product: Product): InventoryState => {
  console.log('Found product', product)

  const offer = findOffer(product)
  if (offer) {
    if (isNewCondition(offer) && isInStock(offer)) {
      return InventoryState.IsInStock
    } else {
      return InventoryState.NotInStock
    }
  } else {
    return InventoryState.Unknown
  }
}

export const broadcastInventoryState = (inventoryState: InventoryState) => {
  chrome.runtime.sendMessage({
    action: MessageAction.InventoryState,
    value: inventoryState,
  })
}
