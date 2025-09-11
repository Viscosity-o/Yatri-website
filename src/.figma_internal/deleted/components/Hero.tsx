import { Button } from './ui/button';
import { ImageWithFallback } from './figma/ImageWithFallback';
import { ProfessionalBackground } from './ProfessionalBackground';
import { ArrowRight, Play } from 'lucide-react';

export function Hero() {
  return (
    <section className="relative bg-gradient-to-br from-gray-900 via-blue-900 to-indigo-900 pt-16 pb-20 sm:pt-24 sm:pb-32 overflow-hidden">
      <ProfessionalBackground />
      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 z-10">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          <div className="text-center lg:text-left">
            <div className="inline-flex items-center px-3 py-1 rounded-full bg-cyan-500/20 backdrop-blur-sm text-cyan-100 text-sm mb-6 border border-cyan-400/30">
              <span className="w-2 h-2 bg-cyan-400 rounded-full mr-2 animate-pulse"></span>
              Award-Winning AI Safety Technology
            </div>
            
            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold text-white leading-tight mb-6 drop-shadow-lg">
              Smart Tourist Safety
              <span className="text-cyan-400 block">Monitoring System</span>
            </h1>
            
            <p className="text-xl text-gray-200 mb-8 max-w-2xl drop-shadow">
              Revolutionary AI-powered platform that combines geo-fencing, blockchain-based digital identity, 
              and real-time monitoring to ensure tourist safety worldwide.
            </p>
            
            <div className="flex flex-col sm:flex-row gap-4 justify-center lg:justify-start">
              <Button size="lg" className="px-8 py-3">
                Start Free Trial
                <ArrowRight className="ml-2 h-5 w-5" />
              </Button>
              <Button variant="outline" size="lg" className="px-8 py-3">
                <Play className="mr-2 h-5 w-5" />
                Watch Demo
              </Button>
            </div>
            
            <div className="mt-8 flex items-center justify-center lg:justify-start space-x-6 text-sm text-gray-300">
              <div className="flex items-center">
                <span className="font-semibold text-white">500K+</span>
                <span className="ml-1">Protected Tourists</span>
              </div>
              <div className="flex items-center">
                <span className="font-semibold text-white">99.9%</span>
                <span className="ml-1">Response Rate</span>
              </div>
              <div className="flex items-center">
                <span className="font-semibold text-white">24/7</span>
                <span className="ml-1">Monitoring</span>
              </div>
            </div>
          </div>
          
          <div className="relative">
            <div className="relative rounded-2xl overflow-hidden shadow-2xl bg-gradient-to-br from-blue-500 to-indigo-600">
              <ImageWithFallback
                src="https://images.unsplash.com/photo-1590560711594-85381f33d036?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxzbWFydCUyMGNpdHklMjB0ZWNobm9sb2d5JTIwc2FmZXR5JTIwbW9uaXRvcmluZ3xlbnwxfHx8fDE3NTY3MTA3MTl8MA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral"
                alt="Smart city technology monitoring"
                className="w-full h-auto"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent"></div>
            </div>
            
            {/* Enhanced Floating cards with professional styling */}
            <div className="absolute -top-4 -left-4 bg-gray-900/90 backdrop-blur-md rounded-lg shadow-2xl p-4 border border-cyan-400/30">
              <div className="flex items-center space-x-2">
                <div className="relative">
                  <div className="w-3 h-3 bg-green-400 rounded-full animate-pulse"></div>
                  <div className="absolute inset-0 w-3 h-3 bg-green-400 rounded-full animate-ping opacity-75"></div>
                </div>
                <span className="text-sm font-medium text-white">AI Monitoring Active</span>
              </div>
              <div className="mt-2 text-xs text-gray-300">15.2M data points processed</div>
            </div>
            
            <div className="absolute -bottom-4 -right-4 bg-gray-900/90 backdrop-blur-md rounded-lg shadow-2xl p-4 border border-green-400/30">
              <div className="text-sm">
                <div className="font-semibold text-white">Response Time</div>
                <div className="text-green-400 font-bold">&lt; 30 seconds</div>
                <div className="text-xs text-gray-300 mt-1">Last incident: 2 min ago</div>
              </div>
            </div>

            {/* Additional floating indicators */}
            <div className="absolute top-1/2 -left-8 bg-blue-500/20 backdrop-blur-sm rounded-full p-3 border border-blue-400/50">
              <div className="w-2 h-2 bg-blue-400 rounded-full animate-pulse"></div>
            </div>
            
            <div className="absolute top-1/4 -right-6 bg-purple-500/20 backdrop-blur-sm rounded-full p-3 border border-purple-400/50">
              <div className="w-2 h-2 bg-purple-400 rounded-full animate-pulse" style={{ animationDelay: '0.5s' }}></div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}