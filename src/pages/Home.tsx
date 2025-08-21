import Autoplay from "embla-carousel-autoplay"
import type { Shoe } from "@/types/shoes"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import Footer from "@/components/shared/Footer"
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel"
import ShoeCard from "@/components/shared/ShoeCard"

export default function Home() {
  const featuredShoes: Array<Shoe> = [
    {
      id: 1,
      name: "Classic Sneakers",
      price: "$89",
      image: "👟",
      description: "Comfortable everyday sneakers",
    },
    {
      id: 2,
      name: "Running Shoes",
      price: "$129",
      image: "🏃‍♂️",
      description: "High-performance athletic shoes",
    },
    {
      id: 3,
      name: "Formal Shoes",
      price: "$199",
      image: "👔",
      description: "Elegant dress shoes for special occasions",
    },
  ]

  const whyChooseBuvi = [
    {
      title: "Free Shipping",
      description: "Free delivery on orders over $100",
      icon: "🚚",
    },
    {
      title: "Easy Returns",
      description: "30-day hassle-free returns",
      icon: "↩️",
    },
    {
      title: "Quality Guarantee",
      description: "Premium materials and craftsmanship",
      icon: "⭐",
    },
    {
      title: "Secure Payments",
      description: "Your data is protected with encryption",
      icon: "🔒",
    },
    {
      title: "24/7 Support",
      description: "We’re here to help anytime, any day",
      icon: "📞",
    },
    {
      title: "Eco-Friendly Packaging",
      description: "Sustainable and recyclable materials",
      icon: "🌱",
    },
    {
      title: "Over 100 Countries",
      description: "We deliver to over 100 countries.",
      icon: "🌍",
    },
    {
      title: "Exclusive Discounts",
      description: "Special deals for our loyal customers",
      icon: "💸",
    },
  ]

  return (
    <div className="min-h-screen pt-16">
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

      <section className="py-16 px-4">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-3xl font-bold text-center text-gray-900 dark:text-white mb-12">
            Featured Shoes
          </h2>
          <div className="flex flex-wrap gap-8 justify-center">
            {featuredShoes.map((shoe) => (
              <div className="flex-1 min-w-[300px] max-w-[400px]">
                <ShoeCard key={shoe.id} shoe={shoe} />
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="py-16 px-4">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-3xl font-bold text-center text-gray-900 dark:text-white mb-12">
            Why Choose Buvi?
          </h2>
          <div className="mx-10">
            <Carousel
              opts={{
                align: "start",
                loop: true,
              }}
              plugins={[
                Autoplay({
                  delay: 5000,
                }),
              ]}
            >
              <CarouselContent>
                {whyChooseBuvi.map((item) => (
                  <CarouselItem className="lg:basis-1/3 md:basis-1/2" key={item.title}>
                    <Card className="text-center">
                      <CardHeader>
                        <div className="text-4xl mb-4">{item.icon}</div>
                      </CardHeader>
                      <CardContent>
                        <CardTitle>{item.title}</CardTitle>
                        <CardDescription>{item.description}</CardDescription>
                      </CardContent>
                    </Card>
                  </CarouselItem>
                ))}
              </CarouselContent>
              <CarouselNext />
              <CarouselPrevious />
            </Carousel>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  )
}
