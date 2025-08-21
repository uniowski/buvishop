import { Button } from "../ui/button"
import { Input } from "../ui/input"

export default function Footer() {
  return (
    <section className="py-16 px-4 bg-slate-900 dark:bg-slate-950 text-white">
      <div className="max-w-6xl mx-auto">
        <div className="grid md:grid-cols-2 gap-12">
          <div className="text-center md:text-left flex flex-col items-center md:items-start">
            <h2 className="text-3xl font-bold mb-6">Stay in Style</h2>
            <p className="text-xl text-gray-300 mb-8">
              Subscribe to get updates on new arrivals and exclusive offers.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 max-w-md w-full">
              <Input variant="newsletter" type="email" placeholder="Enter your email" />
              <Button variant="newsletter">Subscribe</Button>
            </div>
          </div>

          <div className="text-center md:text-left">
            <h2 className="text-3xl font-bold mb-6">Contact Us</h2>
            <div className="space-y-4 mb-8">
              <div className="flex items-center justify-center md:justify-start gap-3">
                <span className="text-xl">📞</span>
                <span className="text-gray-300">+48 793 070 996</span>
              </div>
              <div className="flex items-center justify-center md:justify-start gap-3">
                <span className="text-xl">✉️</span>
                <span className="text-gray-300">dawid.uniowski@gmail.com</span>
              </div>
              <div className="flex items-center justify-center md:justify-start gap-3">
                <span className="text-xl">📍</span>
                <span className="text-gray-300">Wodzisław Śląski, Poland</span>
              </div>
            </div>

            {/* Simple Map Placeholder */}
            <div className="bg-gray-700 dark:bg-gray-800 rounded-lg p-6 h-32 flex items-center justify-center">
              <div className="text-center">
                <span className="text-4xl mb-2 block">🗺️</span>
                <span className="text-gray-400 text-sm">Interactive Map</span>
              </div>
            </div>
          </div>
        </div>

        <div className="border-t border-gray-700 mt-12 pt-8 text-center">
          <p className="text-gray-400">
            © 2025 Buvi. All rights reserved. | Made with ❤️ by Dawid Uniowski
          </p>
        </div>
      </div>
    </section>
  )
}
