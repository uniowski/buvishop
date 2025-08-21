import { Button } from "../ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "../ui/card"
import type { Shoe } from "@/types/shoes"

export default function ShoeCard({ shoe }: { shoe: Shoe }) {
  return (
    <Card
      key={shoe.name}
      className="sm:basis-1/2 lg:basis-1/3 hover:shadow-lg transition-shadow cursor-pointer"
    >
      <CardHeader className="text-center">
        <div className="text-6xl mb-4">{shoe.image}</div>
        <CardTitle>{shoe.name}</CardTitle>
        <CardDescription>{shoe.description}</CardDescription>
      </CardHeader>
      <CardContent className="text-center">
        <p className="text-2xl font-bold text-gray-900 dark:text-white mb-4">{shoe.price}</p>
        <Button className="w-full">Add to Cart</Button>
      </CardContent>
    </Card>
  )
}
