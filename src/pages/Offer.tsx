import { useLoaderData } from "@tanstack/react-router"
import { Button } from "@/components/ui/button"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import Footer from "@/components/shared/Footer"
import ShoeCard from "@/components/shared/ShoeCard"

export default function Shop() {
  const { shoes } = useLoaderData({ from: "/shop" })
  const categories = ["All", "Sneakers", "Running", "Formal", "Casual", "Boots"]

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-slate-900">
      <section className="pt-20 pb-8 px-4 bg-white dark:bg-slate-800">
        <div className="max-w-6xl mx-auto">
          <h1 className="text-4xl font-bold text-gray-900 dark:text-white mb-4">Our Offer</h1>
          <p className="text-xl text-gray-600 dark:text-gray-300 mb-8">
            Discover our complete collection of premium footwear
          </p>

          {/* Filters */}
          <div className="flex flex-col sm:flex-row gap-4 items-center justify-between">
            <div className="flex gap-2 flex-wrap">
              {categories.map((category) => (
                <Button
                  key={category}
                  variant={category === "All" ? "default" : "outline"}
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
              <ShoeCard key={shoe.id} shoe={shoe} />
            ))}
          </div>
        </div>
      </section>

      <Footer />
    </div>
  )
}
