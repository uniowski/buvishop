export type Shoe = {
  id: string
  fabric: string
  imageLink: string
  model: string
  price: number
  originalPrice?: number
  category?: string
  description?: string
  size: Array<number>
  brand: string
  badge?: Array<{
    name: string
    color: string
  }>
}
