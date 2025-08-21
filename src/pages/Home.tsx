import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import Footer from "@/components/Footer"

export default function Home() {
  const featuredShoes = [
    {
      name: "Classic Sneakers",
      price: "$89",
      image: "👟",
      description: "Comfortable everyday sneakers",
    },
    {
      name: "Running Shoes",
      price: "$129",
      image: "🏃‍♂️",
      description: "High-performance athletic shoes",
    },
    {
      name: "Formal Shoes",
      price: "$199",
      image: "👔",
      description: "Elegant dress shoes for special occasions",
    },
  ]

  return (
    <div className="min-h-screen pt-16 dark:bg-slate-900">
      <section className="bg-gradient-to-br from-slate-900 to-slate-700 text-white pt-20 pb-16 px-4">
        <div className="max-w-6xl mx-auto text-center">
          <Badge variant="secondary" className="mb-4 bg-white/20 text-white">
            Premium Footwear
          </Badge>
          <h1 className="text-4xl md:text-6xl font-bold mb-6">Step Into Style with Buvi</h1>
          <p className="text-xl text-gray-200 mb-8 max-w-3xl mx-auto">
            Discover our collection of premium shoes for every occasion. Quality, comfort, and style
            in every step.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button
              variant="outline"
              size="lg"
              className="text-lg px-8 bg-white text-slate-900 hover:bg-gray-100"
            >
              Shop Now
            </Button>
            <Button
              variant="outline"
              size="lg"
              className="text-lg px-8 bg-white text-slate-900 hover:bg-gray-100"
            >
              View Collection
            </Button>
          </div>
        </div>
      </section>

      <section className="py-16 px-4 bg-gray-50 dark:bg-slate-800">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-3xl font-bold text-center text-gray-900 dark:text-white mb-12">
            Featured Shoes
          </h2>
          <div className="grid md:grid-cols-3 gap-8">
            {featuredShoes.map((shoe) => (
              <Card key={shoe.name} className="hover:shadow-lg transition-shadow cursor-pointer">
                <CardHeader className="text-center">
                  <div className="text-6xl mb-4">{shoe.image}</div>
                  <CardTitle>{shoe.name}</CardTitle>
                  <CardDescription>{shoe.description}</CardDescription>
                </CardHeader>
                <CardContent className="text-center">
                  <p className="text-2xl font-bold text-gray-900 dark:text-white mb-4">
                    {shoe.price}
                  </p>
                  <Button className="w-full">Add to Cart</Button>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      <section className="py-16 px-4">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-3xl font-bold text-center text-gray-900 dark:text-white mb-12">
            Why Choose Buvi?
          </h2>
          <div className="grid md:grid-cols-3 gap-8">
            <Card className="text-center">
              <CardHeader>
                <div className="text-4xl mb-4">🚚</div>
                <CardTitle>Free Shipping</CardTitle>
                <CardDescription>Free delivery on orders over $100</CardDescription>
              </CardHeader>
            </Card>

            <Card className="text-center">
              <CardHeader>
                <div className="text-4xl mb-4">↩️</div>
                <CardTitle>Easy Returns</CardTitle>
                <CardDescription>30-day hassle-free returns</CardDescription>
              </CardHeader>
            </Card>

            <Card className="text-center">
              <CardHeader>
                <div className="text-4xl mb-4">⭐</div>
                <CardTitle>Quality Guarantee</CardTitle>
                <CardDescription>Premium materials and craftsmanship</CardDescription>
              </CardHeader>
            </Card>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  )
}
