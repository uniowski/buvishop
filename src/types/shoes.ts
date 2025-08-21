export type Shoe = {
  id: number
  name: string
  price: string
  image: string
  description: string
  category?: string
  badges?: Array<{
    label: string
    color: string
  }>
}
