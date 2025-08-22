import { useLoaderData } from "@tanstack/react-router"
import Autoplay from "embla-carousel-autoplay"
import type { Shoe } from "@/types/shoe"
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
  const { shoes } = useLoaderData({ from: "/" })
  console.log(shoes)
  const featuredShoes: Array<Shoe> = [
    {
      id: "5zH7flI2JW2k0tHdFxAs",
      size: [39, 41, 42, 43, 44],
      brand: "Adidas",
      price: 299.99,
      imageLink:
        "https://firebasestorage.googleapis.com/v0/b/buvi-db.appspot.com/o/shoes%2Fimg%20(10).png?alt=media&token=f4d66507-8af4-4311-9a20-6af5dfc99477",
      fabric: "skóra syntetyczna",
      model: "Superstar",
    },
    {
      id: "2sM2wDyr5Gn1funLAmBH",
      fabric: "tkanina",
      imageLink:
        "https://firebasestorage.googleapis.com/v0/b/buvi-db.appspot.com/o/shoes%2Fimg%20(20).png?alt=media&token=d315c15d-b556-4622-92da-cefb6e5c45d8",
      model: "Authentic",
      price: 79.99,
      size: [38, 39, 40, 41, 42],
      brand: "Vans",
    },
    {
      id: "E9jmvYF069ItS6rwXoR2",
      price: 599.0,
      fabric: "Skóra ekologiczna",
      model: "Jordan Color",
      imageLink:
        "https://firebasestorage.googleapis.com/v0/b/buvi-db.appspot.com/o/shoes%2FGraphic_Design_shoe_2.jpg?alt=media&token=a6db0ec7-81cc-47f3-93f6-4453acecc30c",
      brand: "Nike",
      size: [41, 42],
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
            Special Offer
          </h2>
          <div className="flex flex-wrap gap-8 justify-center">
            {featuredShoes.map((shoe) => (
              <div key={shoe.id} className="flex-1 min-w-[300px] max-w-[400px]">
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
