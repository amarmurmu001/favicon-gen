import Link from 'next/link'
import { ArrowRight, Code, Palette, Zap } from 'lucide-react'

export default function LandingPage() {
  return (
    <div className="min-h-screen bg-base-300 text-base-content">
      <main className="container mx-auto px-4 py-16">
        <section className="hero min-h-[70vh]">
          <div className="hero-content text-center">
            <div className="max-w-md">
              <h1 className="text-5xl font-bold mb-8">Create stunning favicons in seconds</h1>
              <p className="text-lg mb-8">Transform your website&apos;s identity with our powerful and easy-to-use Text to Favicon Generator. Stand out from the crowd with unique, customized favicons.</p>
              <Link href="/text-to-favicon" className="btn btn-primary btn-lg">
                Start Creating <ArrowRight className="ml-2" />
              </Link>
            </div>
          </div>
        </section>

        <section id="features" className="py-16">
          <h2 className="text-3xl font-bold text-center mb-12">Features</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="card bg-base-100 shadow-xl">
              <div className="card-body items-center text-center">
                <Palette className="w-12 h-12 text-primary mb-4" />
                <h3 className="card-title">Customizable Design</h3>
                <p>Choose from a wide range of fonts, colors, and effects to create the perfect favicon for your brand.</p>
              </div>
            </div>
            <div className="card bg-base-100 shadow-xl">
              <div className="card-body items-center text-center">
                <Zap className="w-12 h-12 text-primary mb-4" />
                <h3 className="card-title">Instant Preview</h3>
                <p>See your favicon come to life in real-time as you make changes to its design.</p>
              </div>
            </div>
            <div className="card bg-base-100 shadow-xl">
              <div className="card-body items-center text-center">
                <Code className="w-12 h-12 text-primary mb-4" />
                <h3 className="card-title">Multiple Formats</h3>
                <p>Download your favicon in ICO and PNG formats, ready to use on any website.</p>
              </div>
            </div>
          </div>
        </section>

        <section id="how-it-works" className="py-16">
          <h2 className="text-3xl font-bold text-center mb-12">How It Works</h2>
          <div className="steps steps-vertical lg:steps-horizontal">
            <div className="step step-primary">
              <div className="step-content">
                <h3 className="text-xl font-semibold mb-2">Enter Your Text</h3>
                <p>Type in the text or initials you want to use for your favicon.</p>
              </div>
            </div>
            <div className="step step-primary">
              <div className="step-content">
                <h3 className="text-xl font-semibold mb-2">Customize Design</h3>
                <p>Choose your preferred font, colors, and apply effects like shadows or gradients.</p>
              </div>
            </div>
            <div className="step step-primary">
              <div className="step-content">
                <h3 className="text-xl font-semibold mb-2">Preview and Adjust</h3>
                <p>See a live preview of your favicon and make any necessary adjustments.</p>
              </div>
            </div>
            <div className="step step-primary">
              <div className="step-content">
                <h3 className="text-xl font-semibold mb-2">Download</h3>
                <p>Once satisfied, download your new favicon in ICO and PNG formats.</p>
              </div>
            </div>
          </div>
        </section>

        <section id="pricing" className="py-16">
          <h2 className="text-3xl font-bold text-center mb-12">Pricing</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="card bg-base-100 shadow-xl">
              <div className="card-body">
                <h3 className="card-title text-2xl font-bold mb-4">Basic</h3>
                <p className="text-4xl font-bold mb-4">Free</p>
                <ul className="list-disc list-inside mb-8">
                  <li>Create up to 5 favicons per month</li>
                  <li>Basic customization options</li>
                  <li>PNG download only</li>
                </ul>
                <div className="card-actions justify-end">
                  <Link href="/text-to-favicon" className="btn btn-primary btn-block">Get Started</Link>
                </div>
              </div>
            </div>
            <div className="card bg-primary text-primary-content shadow-xl">
              <div className="card-body">
                <h3 className="card-title text-2xl font-bold mb-4">Pro</h3>
                <p className="text-4xl font-bold mb-4">$9.99/mo</p>
                <ul className="list-disc list-inside mb-8">
                  <li>Unlimited favicon creations</li>
                  <li>Advanced customization options</li>
                  <li>ICO and PNG downloads</li>
                  <li>Priority support</li>
                </ul>
                <div className="card-actions justify-end">
                  <Link href="/generator" className="btn btn-secondary btn-block">Upgrade to Pro</Link>
                </div>
              </div>
            </div>
            <div className="card bg-base-100 shadow-xl">
              <div className="card-body">
                <h3 className="card-title text-2xl font-bold mb-4">Enterprise</h3>
                <p className="text-4xl font-bold mb-4">Custom</p>
                <ul className="list-disc list-inside mb-8">
                  <li>Custom integration options</li>
                  <li>Dedicated account manager</li>
                  <li>Custom branding</li>
                  <li>API access</li>
                </ul>
                <div className="card-actions justify-end">
                  <Link href="/contact" className="btn btn-primary btn-block">Contact Sales</Link>
                </div>
              </div>
            </div>
          </div>
        </section>
      </main>

      <footer className="footer footer-center p-10 bg-base-200 text-base-content rounded">
        <div className="grid grid-flow-col gap-4">
          <a className="link link-hover">About us</a> 
          <a className="link link-hover">Contact</a> 
          <a className="link link-hover">Privacy Policy</a> 
          <a className="link link-hover">Terms of Service</a>
        </div> 
        <div>
          <div className="grid grid-flow-col gap-4">
            <a><svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" className="fill-current"><path d="M24 4.557c-.883.392-1.832.656-2.828.775 1.017-.609 1.798-1.574 2.165-2.724-.951.564-2.005.974-3.127 1.195-.897-.957-2.178-1.555-3.594-1.555-3.179 0-5.515 2.966-4.797 6.045-4.091-.205-7.719-2.165-10.148-5.144-1.29 2.213-.669 5.108 1.523 6.574-.806-.026-1.566-.247-2.229-.616-.054 2.281 1.581 4.415 3.949 4.89-.693.188-1.452.232-2.224.084.626 1.956 2.444 3.379 4.6 3.419-2.07 1.623-4.678 2.348-7.29 2.04 2.179 1.397 4.768 2.212 7.548 2.212 9.142 0 14.307-7.721 13.995-14.646.962-.695 1.797-1.562 2.457-2.549z"></path></svg></a> 
            <a><svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" className="fill-current"><path d="M19.615 3.184c-3.604-.246-11.631-.245-15.23 0-3.897.266-4.356 2.62-4.385 8.816.029 6.185.484 8.549 4.385 8.816 3.6.245 11.626.246 15.23 0 3.897-.266 4.356-2.62 4.385-8.816-.029-6.185-.484-8.549-4.385-8.816zm-10.615 12.816v-8l8 3.993-8 4.007z"></path></svg></a> 
            <a><svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" className="fill-current"><path d="M9 8h-3v4h3v12h5v-12h3.642l.358-4h-4v-1.667c0-.955.192-1.333 1.115-1.333h2.885v-5h-3.808c-3.596 0-5.192 1.583-5.192 4.615v3.385z"></path></svg></a>
          </div>
        </div> 
        <div>
          <p>Designed & Created by Amar Murmu</p>
        </div>
      </footer>
    </div>
  )
}

