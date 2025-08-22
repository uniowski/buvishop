import { Edit, Trash } from "lucide-react"
import { Badge } from "../ui/badge"
import { Button } from "../ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "../ui/card"
import type { Shoe } from "@/types/shoe"

export default function ShoeCard({
  key,
  shoe,
  enableEditing = true,
}: {
  key: string
  shoe: Shoe
  enableEditing?: boolean
}) {
  return (
    <Card key={key} className="sm:basis-1/2 lg:basis-1/3 hover:shadow-lg transition-shadow">
      <CardHeader className="text-center">
        <div className="relative">
          {shoe.badge && (
            <div className="absolute top-2 left-2">
              {shoe.badge.map((badge) => (
                <Badge key={badge.name} className={`bg-${badge.color}-500`}>
                  {badge.name}
                </Badge>
              ))}
            </div>
          )}
          {enableEditing && (
            <div className="absolute top-2 right-2">
              <Button variant="options" size="icon" className="rounded-s-md">
                <Edit />
              </Button>
              <Button
                variant="options"
                size="icon"
                className="rounded-e-md text-destructive hover:bg-red-200 dark:hover:text-red-200 dark:hover:bg-destructive"
              >
                <Trash />
              </Button>
            </div>
          )}
          <img
            src={shoe.imageLink}
            alt={shoe.model}
            className="mb-4 rounded-xl w-full h-64 object-cover"
          />
        </div>
        <CardTitle>
          {shoe.brand} {shoe.model}
        </CardTitle>
        <CardDescription>
          {shoe.category}
          {shoe.description}
        </CardDescription>
      </CardHeader>
      <CardContent className="text-center">
        <div className="flex items-center justify-center gap-2 mb-4">
          <span className="text-2xl font-bold text-gray-900 dark:text-white">${shoe.price}</span>
          {shoe.originalPrice && (
            <span className="text-lg text-gray-500 line-through">${shoe.originalPrice}</span>
          )}
        </div>
        <Button className="w-full">Add to Cart</Button>
      </CardContent>
    </Card>
  )
}
