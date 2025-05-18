import Link from "next/link";
import { Facebook, Instagram, Twitter, Youtube } from "lucide-react";
import Logo from "../common/logo";
import { Title } from "./title";

export function Footer() {
  return (
    <footer className="bg-secondary border-t border-orange-100">
      <div className="container mx-auto px-4 py-12">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          <div className="space-y-4">
            <Logo />
            <p className="text-gray-600">
              Serving the most delicious, handcrafted pizzas since 1995. Made
              with love and the freshest ingredients.
            </p>
          </div>

          <div>
            <Title size="md" text="Quick Links" className="text-lg font-semibold mb-4 text-primary" />
           
            <ul className="space-y-2">
              <li>
                <Link
                  href="/"
                  className="text-gray-600 hover:text-primary transition-colors"
                >
                  All Pizzas
                </Link>
              </li>

              <li>
                <Link
                  href="/about"
                  className="text-gray-600 hover:text-primary transition-colors"
                >
                  About Us
                </Link>
              </li>
              <li>
                <Link
                  href="/about"
                  className="text-gray-600 hover:text-primary transition-colors"
                >
                  Careers
                </Link>
              </li>
              <li>
                <a
                  href="tel:+1234567890"
                  className="text-gray-600 hover:text-primary transition-colors"
                >
                  Contact Us
                </a>
              </li>
            </ul>
          </div>

          <div>
            <Title text="Contact Us" className="text-lg font-semibold mb-4 text-primary" />
            <address className="not-italic space-y-2 text-gray-600">
              <p>123 Pizza Street</p>
              <p>New York, NY 10001</p>
              <p className="pt-2">
                <strong>Phone:</strong> (555) 123-4567
              </p>
              <p>
                <strong>Email:</strong> info@dodo.com
              </p>
              <p className="pt-2">
                <strong>Hours:</strong>
                <br />
                Mon-Thu: 11am-10pm
                <br />
                Fri-Sun: 11am-12am
              </p>
            </address>
          </div>
        </div>

        <div className="mt-12 pt-8 border-t border-orange-200">
          <div className="flex flex-col md:flex-row justify-between items-center">
            <div className="flex space-x-4 mb-4 md:mb-0">
              <Link
                href="#"
                className="text-gray-500 hover:text-primary transition-colors"
              >
                <Facebook className="h-6 w-6" />
                <span className="sr-only">Facebook</span>
              </Link>
              <Link
                href="#"
                className="text-gray-500 hover:text-primary transition-colors"
              >
                <Instagram className="h-6 w-6" />
                <span className="sr-only">Instagram</span>
              </Link>
              <Link
                href="#"
                className="text-gray-500 hover:text-primary transition-colors"
              >
                <Twitter className="h-6 w-6" />
                <span className="sr-only">Twitter</span>
              </Link>
              <Link
                href="#"
                className="text-gray-500 hover:text-primary transition-colors"
              >
                <Youtube className="h-6 w-6" />
                <span className="sr-only">YouTube</span>
              </Link>
            </div>
            <div className="text-gray-600 text-sm">
              © {new Date().getFullYear()} PizzaDelight. All rights reserved.
              <div className="mt-1 flex space-x-4 justify-center md:justify-end">
                <Link
                  href="/legal/terms"
                  className="hover:text-primary transition-colors"
                >
                  Privacy Policy
                </Link>
                <Link
                  href="/legal/terms"
                  className="hover:text-primary transition-colors"
                >
                  Terms of Service
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}
