import { Button } from './ui/button';
import { Card, CardContent } from './ui/card';
import { ImageWithFallback } from './figma/ImageWithFallback';
import { 
  ArrowRight, 
  Mail, 
  Phone, 
  MapPin, 
  Calendar,
  Users,
  Shield,
  Star
} from 'lucide-react';

export function CallToAction() {
  return (
    <section className="py-20 bg-gradient-to-br from-blue-50 via-white to-indigo-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Main CTA */}
        <div className="text-center mb-16">
          <div className="inline-flex items-center px-4 py-2 bg-blue-100 text-blue-800 rounded-full text-sm font-medium mb-6">
            <Star className="h-4 w-4 mr-2" />
            Join the Future of Tourist Safety
          </div>
          
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-gray-900 mb-6">
            Ready to Transform Tourist Safety?
          </h2>
          
          <p className="text-xl text-gray-600 max-w-3xl mx-auto mb-8">
            Experience the power of AI-driven safety monitoring. Start protecting your tourists 
            today with our comprehensive platform that combines cutting-edge technology with 
            real-world effectiveness.
          </p>
          
          <div className="flex flex-col sm:flex-row gap-4 justify-center mb-12">
            <Button size="lg" className="px-8 py-4 text-lg">
              Start Free Trial
              <ArrowRight className="ml-2 h-5 w-5" />
            </Button>
            <Button variant="outline" size="lg" className="px-8 py-4 text-lg">
              Schedule Demo
              <Calendar className="ml-2 h-5 w-5" />
            </Button>
          </div>
          
          <div className="flex flex-wrap justify-center gap-8 text-sm text-gray-500">
            <div className="flex items-center">
              <Shield className="h-4 w-4 mr-2 text-green-600" />
              30-day free trial
            </div>
            <div className="flex items-center">
              <Users className="h-4 w-4 mr-2 text-blue-600" />
              No setup fees
            </div>
            <div className="flex items-center">
              <Star className="h-4 w-4 mr-2 text-yellow-600" />
              24/7 support included
            </div>
          </div>
        </div>

        {/* Contact Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-16">
          <Card className="text-center hover:shadow-lg transition-shadow border-0 shadow-sm">
            <CardContent className="p-8">
              <div className="bg-blue-50 rounded-full p-4 w-fit mx-auto mb-4">
                <Mail className="h-8 w-8 text-blue-600" />
              </div>
              <h3 className="text-lg font-semibold text-gray-900 mb-2">
                Email Us
              </h3>
              <p className="text-gray-600 mb-4">
                Get detailed information about our platform and pricing
              </p>
              <Button variant="outline" className="w-full">
                contact@safetourism.ai
              </Button>
            </CardContent>
          </Card>

          <Card className="text-center hover:shadow-lg transition-shadow border-0 shadow-sm">
            <CardContent className="p-8">
              <div className="bg-green-50 rounded-full p-4 w-fit mx-auto mb-4">
                <Phone className="h-8 w-8 text-green-600" />
              </div>
              <h3 className="text-lg font-semibold text-gray-900 mb-2">
                Call Us
              </h3>
              <p className="text-gray-600 mb-4">
                Speak directly with our safety technology experts
              </p>
              <Button variant="outline" className="w-full">
                +1 (555) 123-SAFE
              </Button>
            </CardContent>
          </Card>

          <Card className="text-center hover:shadow-lg transition-shadow border-0 shadow-sm">
            <CardContent className="p-8">
              <div className="bg-purple-50 rounded-full p-4 w-fit mx-auto mb-4">
                <MapPin className="h-8 w-8 text-purple-600" />
              </div>
              <h3 className="text-lg font-semibold text-gray-900 mb-2">
                Visit Us
              </h3>
              <p className="text-gray-600 mb-4">
                See our technology in action at our demo center
              </p>
              <Button variant="outline" className="w-full">
                San Francisco, CA
              </Button>
            </CardContent>
          </Card>
        </div>

        {/* Final CTA with image */}
        <div className="bg-gradient-to-r from-blue-600 to-indigo-600 rounded-3xl overflow-hidden">
          <div className="grid grid-cols-1 lg:grid-cols-2 items-center">
            <div className="p-8 md:p-12 text-white">
              <h3 className="text-2xl md:text-3xl font-bold mb-4">
                Ready to Lead in Tourist Safety Innovation?
              </h3>
              <p className="text-blue-100 mb-6 text-lg">
                Join leading tourism boards, hotels, and government agencies who trust 
                our platform to protect millions of tourists worldwide.
              </p>
              
              <div className="space-y-3 mb-8">
                <div className="flex items-center text-blue-100">
                  <ArrowRight className="h-4 w-4 mr-3 text-blue-300" />
                  Implementation in just 48 hours
                </div>
                <div className="flex items-center text-blue-100">
                  <ArrowRight className="h-4 w-4 mr-3 text-blue-300" />
                  Full integration with existing systems
                </div>
                <div className="flex items-center text-blue-100">
                  <ArrowRight className="h-4 w-4 mr-3 text-blue-300" />
                  Dedicated success manager
                </div>
              </div>
              
              <Button size="lg" variant="secondary" className="bg-white text-blue-600 hover:bg-blue-50">
                Get Started Today
                <ArrowRight className="ml-2 h-5 w-5" />
              </Button>
            </div>
            
            <div className="relative h-64 lg:h-full">
              <ImageWithFallback
                src="https://images.unsplash.com/photo-1738003667850-a2fb736e31b3?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxBSSUyMGFydGlmaWNpYWwlMjBpbnRlbGxpZ2VuY2UlMjB0ZWNobm9sb2d5fGVufDF8fHx8MTc1NjY4OTg1M3ww&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral"
                alt="AI technology and artificial intelligence"
                className="w-full h-full object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-l from-transparent to-blue-600/20"></div>
            </div>
          </div>
        </div>

        {/* Footer */}
        <div className="mt-16 pt-8 border-t border-gray-200 text-center text-gray-500">
          <p className="text-sm">
            © 2024 SafeTourism AI. All rights reserved. | Privacy Policy | Terms of Service
          </p>
        </div>
      </div>
    </section>
  );
}