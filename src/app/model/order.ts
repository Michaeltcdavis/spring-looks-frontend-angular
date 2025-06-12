import { UserDetails } from "./user-details"

export interface Order {
    id?: String,
    orderNumber?: String,
    skuCode: String,
    price: number,
    quantity: number,
    userDetails: UserDetails
}