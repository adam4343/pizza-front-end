"use client";

import Image from "next/image";
import { ChefHat, Clock, Award, Utensils, MapPin, Phone } from "lucide-react";
import { useEffect, useState } from "react";
import { Title } from "@/components/shared/title";

export default function AboutPage() {
  const [scrollY, setScrollY] = useState(0);

  useEffect(() => {
    const handleScroll = () => {
      setScrollY(window.scrollY);
    };

    window.addEventListener("scroll", handleScroll, { passive: true });

    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  return (
    <div>
      <section className="relative h-[50vh] min-h-[400px] w-full overflow-hidden">
        <div
          className="absolute inset-0 w-full h-[120%] -top-10"
          style={{
            transform: `translateY(${scrollY * 0.4}px)`,
            transition: "transform 0.1s ease-out",
          }}
        >
          <Image
            src="https://cdn.dodostatic.net/pizza-site/dist/assets/2b4b63d9c3466cc0884e..jpg"
            alt="Pizza being made"
            fill
            className="object-cover brightness-50"
            priority
          />
        </div>
        <div className="absolute inset-0 flex flex-col items-center justify-center text-center text-white-color p-4 z-10">
          <Title text="Our Story" size="xl" className="text-4xl md:text-5xl lg:text-6xl font-bold mb-4" />
       
          <p className="text-xl max-w-2xl">
            Crafting the perfect slice since 1985
          </p>
        </div>
      </section>

      <section className="py-16 px-4 max-w-6xl mx-auto">
        <div className="grid md:grid-cols-2 gap-12 items-center">
          <div>
            <Title text="From Family Table to Your Doorstep" size="lg" className="text-3xl font-bold text-primary mb-6" />
              
            <p className="text-gray-700 mb-4">
              Our journey began in a small kitchen in Naples, where Grandpa
              Giuseppe perfected his dough recipe. What started as Sunday family
              gatherings around a wood-fired oven has grown into a beloved pizza
              destination.
            </p>
            <p className="text-gray-700 mb-4">
              We have carried his passion for authentic ingredients and
              traditional techniques through three generations. Every pizza we
              make honors his legacy and our Italian roots.
            </p>
            <p className="text-gray-700">
              While we have grown, our commitment remains the same: create
              exceptional pizza with love in every bite.
            </p>
          </div>
          <div className="relative h-[400px] rounded-lg overflow-hidden shadow-xl">
            <Image
              src="https://cdn.dodostatic.net/pizza-site/dist/assets/c17c2ace9e36be315457..jpg"
              alt="Our founder making pizza"
              fill
              className="object-cover"
            />
          </div>
        </div>
      </section>

      <section className="py-16 px-4 bg-secondary">
        <div className="max-w-6xl mx-auto">
          <Title size="lg" text="What Makes Our Pizza Special" className="text-3xl font-bold text-center text-primary mb-12" />
          
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            <div className="bg-white-color p-6 rounded-lg shadow-md text-center">
              <div className="w-16 h-16 bg-secondary rounded-full flex items-center justify-center mx-auto mb-4">
                <ChefHat className="w-8 h-8 text-primary" />
              </div>
              <Title className="text-xl font-semibold mb-2" text="Artisan Crafted" size="md"/>
              <p className="text-gray-600">
                Each pizza is handcrafted by our master pizzaiolos with decades
                of experience.
              </p>
            </div>

            <div className="bg-white-color p-6 rounded-lg shadow-md text-center">
              <div className="w-16 h-16 bg-secondary rounded-full flex items-center justify-center mx-auto mb-4">
                <Clock className="w-8 h-8 text-primary" />
              </div>
              <Title className="text-xl font-semibold mb-2" size="md" text="48-Hour Dough"/>
              <p className="text-gray-600">
                Our dough ferments for 48 hours, creating perfect texture and
                complex flavors.
              </p>
            </div>

            <div className="bg-white-color p-6 rounded-lg shadow-md text-center">
              <div className="w-16 h-16 bg-secondary rounded-full flex items-center justify-center mx-auto mb-4">
                <Award className="w-8 h-8 text-primary" />
              </div>
              <Title className="text-xl font-semibold mb-2" text="Premium Ingredients" size="md" />
                
              <p className="text-gray-600">
                We source the finest local and imported ingredients for
                authentic flavor.
              </p>
            </div>

            <div className="bg-white-color p-6 rounded-lg shadow-md text-center">
              <div className="w-16 h-16 bg-secondary rounded-full flex items-center justify-center mx-auto mb-4">
                <Utensils className="w-8 h-8 text-primary" />
              </div>
              <Title className="text-xl font-semibold mb-2" text="Secret Recipe" size="md" />
              <p className="text-gray-600">
                Our signature sauce recipe has been kept secret for three
                generations.
              </p>
            </div>
          </div>
        </div>
      </section>

      <section className="py-16 px-4 max-w-6xl mx-auto">
        <Title size="lg" text="Fun Pizza Facts" className="text-3xl font-bold text-center text-primary mb-12" />
        <div className="bg-secondary p-8 rounded-xl shadow-lg">
          <div className="grid md:grid-cols-2 gap-8">
            <div>
              <Title className="text-2xl font-semibold mb-4" size="md" text="Did You Know?" />
              <ul className="space-y-4">
                <li className="flex items-start">
                  <span className="bg-primary text-white-color rounded-full w-6 h-6 flex items-center justify-center mr-3 mt-1 flex-shrink-0">
                    1
                  </span>
                  <p>
                    The world largest pizza was made in Rome, Italy in 2012,
                    measuring 13,580 square feet!
                  </p>
                </li>
                <li className="flex items-start">
                  <span className="bg-primary text-white-color rounded-full w-6 h-6 flex items-center justify-center mr-3 mt-1 flex-shrink-0">
                    2
                  </span>
                  <p>
                    The first pizzeria in the United States opened in 1905 in
                    New York City.
                  </p>
                </li>
                <li className="flex items-start">
                  <span className="bg-primary text-white-color rounded-full w-6 h-6 flex items-center justify-center mr-3 mt-1 flex-shrink-0">
                    3
                  </span>
                  <p>
                    Americans eat approximately 350 slices of pizza every
                    second!
                  </p>
                </li>
              </ul>
            </div>
            <div>
              <Title className="text-2xl font-semibold mb-4" text="Our Pizza By The Numbers" size="md" />
                
              <ul className="space-y-4">
                <li className="flex items-start">
                  <span className="bg-primary text-white-color rounded-full w-6 h-6 flex items-center justify-center mr-3 mt-1 flex-shrink-0">
                    4
                  </span>
                  <p>
                    We use over 1,000 pounds of fresh mozzarella every month.
                  </p>
                </li>
                <li className="flex items-start">
                  <span className="bg-primary text-white-color rounded-full w-6 h-6 flex items-center justify-center mr-3 mt-1 flex-shrink-0">
                    5
                  </span>
                  <p>
                    Our wood-fired oven reaches temperatures of 850°F, cooking a
                    pizza in just 90 seconds.
                  </p>
                </li>
                <li className="flex items-start">
                  <span className="bg-primary text-white-color rounded-full w-6 h-6 flex items-center justify-center mr-3 mt-1 flex-shrink-0">
                    6
                  </span>
                  <p>
                    Our most popular pizza, the Signature Margherita, has won 3
                    regional awards.
                  </p>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </section>

      <section className="py-16 px-4 bg-secondary">
        <div className="max-w-6xl mx-auto">
          <Title text="Meet Our Pizza Family" size="lg" className="text-3xl font-bold text-center text-primary mb-12" />
            
          <div className="grid md:grid-cols-3 gap-8">
            <div className="bg-white-color rounded-lg overflow-hidden shadow-md">
              <div className="relative h-80">
                <Image
                  src="https://cdn.dodostatic.net/pizza-site/dist/assets/1bd251798ebb3bd14034..jpg"
                  alt="Head Chef"
                  fill
                  className="object-cover"
                />
              </div>
              <div className="p-6">
                <Title text="Nina Rossi" size="md" className="text-xl font-semibold mb-1" />
                <p className="text-primary mb-3">Head Pizzaiolo</p>
                <p className="text-gray-600">
                  With 5 years of experience, Nina leads our kitchen with
                  passion and precision.
                </p>
              </div>
            </div>

            <div className="bg-white-color rounded-lg overflow-hidden shadow-md">
              <div className="relative h-80">
                <Image
                  src="https://cdn.dodostatic.net/pizza-site/dist/assets/e94f688596908bcfad09..jpg"
                  alt="Sous Chef"
                  fill
                  className="object-cover"
                />
              </div>
              <div className="p-6">
                <Title className="text-xl font-semibold mb-1" size="md" text="Sofia Bianchi" />
                <p className="text-primary mb-3">Dough Master</p>
                <p className="text-gray-600">
                  Sofia is dough-making skills have been perfected over three
                  generations of family tradition.
                </p>
              </div>
            </div>

            <div className="bg-white-color rounded-lg overflow-hidden shadow-md">
              <div className="relative h-80">
                <Image
                  src="https://cdn.dodostatic.net/pizza-site/dist/assets/ee76bdcf48c5180b49a3..jpg"
                  alt="Owner"
                  fill
                  className="object-cover"
                />
              </div>
              <div className="p-6">
                <Title className="text-xl font-semibold mb-1" size="md" text="San Marino" />
                <p className="text-primary mb-3">Manager</p>
                <p className="text-gray-600">
                  San vision and dedication to quality has made our pizzeria a
                  local favorite.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="py-16 px-4 max-w-6xl mx-auto">
        <div className="grid md:grid-cols-2 gap-12 items-center">
          <div>
            <Title className="text-3xl font-bold text-primary mb-6" text="Come Visit Us" size="lg"/>
            <p className="text-gray-700 mb-6">
              We would love to share our passion for pizza with you. Stop by our
              restaurant to experience the authentic flavors and warm atmosphere
              that make us special.
            </p>

            <div className="space-y-4">
              <div className="flex items-start">
                <MapPin className="w-5 h-5 text-primary mr-3 mt-1" />
                <div>
                  <Title className="font-semibold" text="Location" size="md" />
                  <p className="text-gray-600">
                    123 Pizza Lane, Flavor Town, FT 12345
                  </p>
                </div>
              </div>

              <div className="flex items-start">
                <Clock className="w-5 h-5 text-primary mr-3 mt-1" />
                <div>
                  <Title className="font-semibold" text="Hours" size="md" />
                  <p className="text-gray-600">Tuesday - Sunday: 11am - 10pm</p>
                  <p className="text-gray-600">Closed Mondays</p>
                </div>
              </div>

              <div className="flex items-start">
                <Phone className="w-5 h-5 text-primary mr-3 mt-1" />
                <div>
                  <Title className="font-semibold" text="Contact" size="md" />
                  <p className="text-gray-600">(555) 123-4567</p>
                  <p className="text-gray-600">info@dodo.com</p>
                </div>
              </div>
            </div>

            <div className="mt-8">
              <a
                href="tel:+359881234567"
                className="inline-block bg-primary hover:bg-orange-700 text-white-color font-semibold py-3 px-6 rounded-lg transition-colors"
              >
                Contact Us
              </a>
            </div>
          </div>

          <div className="relative h-[400px] rounded-lg overflow-hidden shadow-xl">
            <Image
              src="https://dodofranchise.ru/images/franchise-ru/slider-3/slide-1.png"
              alt="Our restaurant"
              fill
              className="object-cover"
            />
          </div>
        </div>
      </section>
    </div>
  );
}
