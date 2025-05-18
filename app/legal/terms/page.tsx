import { Title } from "@/components/shared/title"
import type { Metadata } from "next"
import Link from "next/link"

export const metadata: Metadata = {
  title: "Privacy Policy",
  description: "Our privacy policy and data protection practices",
}

export default function PrivacyPage() {
  return (
    <main className="container mx-auto px-4 py-12 max-w-4xl">
      <Title size="xl" className="text-4xl md:text-5xl font-bold mb-6 text-center" text="Privacy Policy" />
      <div className="w-20 h-1 bg-primary mx-auto mb-12"></div>

      <div className="bg-white rounded-lg shadow-md p-6 md:p-8 lg:p-10">
        <div className="prose max-w-none">
          <p className="text-sm text-gray-500 mb-6">Last updated: September, 2025</p>

          <section className="mb-8">
            <Title size="lg" className="text-2xl font-semibold mb-4" text="1. Introduction" />
            <p className="mb-4">
              Your privacy is important to us. It is our policy to respect your privacy regarding any information we may
              collect from you across our website.
            </p>
            <p className="mb-4">
              We only ask for personal information when we truly need it to provide a service to you. We collect it by
              fair and lawful means, with your knowledge and consent. We also let you know why we are collecting it and
              how it will be used.
            </p>
          </section>

          <section className="mb-8">
            <Title className="text-2xl font-semibold mb-4" text="2. Information We Collect" size="lg" />
            <p className="mb-4">We may collect the following information:</p>
            <ul className="list-disc pl-6 mb-4 space-y-2">
              <li>Name and contact information including email address</li>
              <li>Demographic information such as preferences and interests</li>
              <li>Other information relevant to customer surveys and/or offers</li>
              <li>Information about your device and your visit, such as IP address and browser type</li>
            </ul>
          </section>

          <section className="mb-8">
            <Title className="text-2xl font-semibold mb-4" text="3. How We Use Your Information" size="lg" />
            <p className="mb-4">We use the information we collect in various ways, including to:</p>
            <ul className="list-disc pl-6 mb-4 space-y-2">
              <li>Provide, operate, and maintain our website</li>
              <li>Improve, personalize, and expand our website</li>
              <li>Understand and analyze how you use our website</li>
              <li>Develop new products, services, features, and functionality</li>
              <li>
                Communicate with you, either directly or through one of our partners, to provide you with updates and
                other information relating to the website, and for marketing and promotional purposes
              </li>
            </ul>
          </section>

          <section className="mb-8">
            <Title className="text-2xl font-semibold mb-4" size="lg" text="4. Cookies" />
            <p className="mb-4">
              We use cookies to collect information about you and your activity across our site. A cookie is a small
              piece of data that our website stores on your computer, and accesses each time you visit, so we can
              understand how you use our site and serve you content based on preferences you have specified.
            </p>
            <p className="mb-4">
              If you do not wish to accept cookies from us, you should instruct your browser to refuse cookies from our
              website, with the understanding that we may be unable to provide you with some of your desired content and
              services.
            </p>
          </section>

          <section className="mb-8">
            <Title className="text-2xl font-semibold mb-4" text="5. Third-Party Services" size="lg" />
            <p className="mb-4">
              We may employ third-party companies and individuals on our website - for example, analytics providers and
              content partners. These third parties have access to your personal information only to perform specific
              tasks on our behalf and are obligated not to disclose or use it for any other purpose.
            </p>
          </section>

          <section className="mb-8">
            <Title className="text-2xl font-semibold mb-4" size="lg" text="6. Security" />
            <p className="mb-4">
              We value your trust in providing us your personal information, thus we are striving to use commercially
              acceptable means of protecting it. But remember that no method of transmission over the internet, or
              method of electronic storage is 100% secure and reliable, and we cannot guarantee its absolute security.
            </p>
          </section>

          <section>
            <Title className="text-2xl font-semibold mb-4" size="lg" text="7. Contact Us" />
            <p className="mb-4">
              If you have any questions about our privacy practices, please feel free to contact us at{" "}
              <Link href="mailto:privacy@example.com" className="text-primary hover:underline">
                privacy@dodo.com
              </Link>
              .
            </p>
          </section>
        </div>
      </div>
    </main>
  )
}
