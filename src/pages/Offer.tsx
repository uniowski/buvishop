import { Button } from '@/components/ui/button'
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select'

export default function Shop() {
  const categories = ['All', 'Sneakers', 'Running', 'Formal', 'Casual', 'Boots']

  const shoes = [
    {
      id: 1,
      name: 'Air Max Sneakers',
      price: '$120',
      originalPrice: '$150',
      image: '👟',
      category: 'Sneakers',
      popular: true,
    },
    {
      id: 2,
      name: 'Professional Runner',
      price: '$180',
      image: '🏃‍♂️',
      category: 'Running',
      popular: false,
    },
    {
      id: 3,
      name: 'Classic Oxford',
      price: '$220',
      image: '👔',
      category: 'Formal',
      popular: false,
    },
    {
      id: 4,
      name: 'Casual Loafers',
      price: '$95',
      originalPrice: '$120',
      image: '👞',
      category: 'Casual',
      popular: false,
    },
    {
      id: 5,
      name: 'Sport Trainers',
      price: '$140',
      image: '🏋️‍♂️',
      category: 'Sneakers',
      popular: true,
    },
    {
      id: 6,
      name: 'Winter Boots',
      price: '$200',
      image: '🥾',
      category: 'Boots',
      popular: false,
    },
  ]

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-slate-900">
      {/* Header Section */}
      <section className="pt-20 pb-8 px-4 bg-white dark:bg-slate-800">
        <div className="max-w-6xl mx-auto">
          <h1 className="text-4xl font-bold text-gray-900 dark:text-white mb-4">
            Shop All Shoes
          </h1>
          <p className="text-xl text-gray-600 dark:text-gray-300 mb-8">
            Discover our complete collection of premium footwear
          </p>

          {/* Filters */}
          <div className="flex flex-col sm:flex-row gap-4 items-center justify-between">
            <div className="flex gap-2 flex-wrap">
              {categories.map((category) => (
                <Button
                  key={category}
                  variant={category === 'All' ? 'default' : 'outline'}
                  size="sm"
                >
                  {category}
                </Button>
              ))}
            </div>
            <Select>
              <SelectTrigger className="w-48">
                <SelectValue placeholder="Sort by" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="price-low">Price: Low to High</SelectItem>
                <SelectItem value="price-high">Price: High to Low</SelectItem>
                <SelectItem value="name">Name A-Z</SelectItem>
                <SelectItem value="popular">Most Popular</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </div>
      </section>

      {/* Products Grid */}
      <section className="py-8 px-4">
        <div className="max-w-6xl mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {shoes.map((shoe) => (
              <Card
                key={shoe.id}
                className="hover:shadow-lg transition-shadow cursor-pointer group"
              >
                <CardHeader className="text-center relative">
                  {shoe.popular && (
                    <Badge className="absolute top-2 left-2 bg-red-500">
                      Popular
                    </Badge>
                  )}
                  <div className="text-8xl mb-4 group-hover:scale-110 transition-transform">
                    {shoe.image}
                  </div>
                  <CardTitle className="text-lg">{shoe.name}</CardTitle>
                  <CardDescription className="text-sm text-gray-500">
                    {shoe.category}
                  </CardDescription>
                </CardHeader>
                <CardContent className="text-center">
                  <div className="flex items-center justify-center gap-2 mb-4">
                    <span className="text-2xl font-bold text-gray-900 dark:text-white">
                      {shoe.price}
                    </span>
                    {shoe.originalPrice && (
                      <span className="text-lg text-gray-500 line-through">
                        {shoe.originalPrice}
                      </span>
                    )}
                  </div>
                  <Button className="w-full group-hover:bg-gray-900 transition-colors">
                    Add to Cart
                  </Button>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Newsletter Section */}
      <section className="py-16 px-4 bg-slate-900 text-white">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-3xl font-bold mb-6">Get Exclusive Deals</h2>
          <p className="text-xl text-gray-300 mb-8">
            Subscribe to our newsletter and be the first to know about sales and
            new arrivals.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center max-w-md mx-auto">
            <input
              type="email"
              placeholder="Enter your email"
              className="flex-1 px-4 py-2 rounded-md text-slate-900"
            />
            <Button className="bg-white text-slate-900 hover:bg-gray-100">
              Subscribe
            </Button>
          </div>
        </div>
      </section>
    </div>
  )
}
