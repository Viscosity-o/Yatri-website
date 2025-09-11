import { Card, CardContent } from './ui/card';
import { Badge } from './ui/badge';
import { ImageWithFallback } from './figma/ImageWithFallback';
import { 
  UserCheck, 
  MapPin, 
  Brain, 
  AlertTriangle, 
  Shield,
  ArrowRight,
  CheckCircle
} from 'lucide-react';

export function HowItWorks() {
  const steps = [
    {
      step: "01",
      icon: UserCheck,
      title: "Secure Registration",
      description: "Tourists register using blockchain-based digital identity verification, ensuring secure and private authentication.",
      details: ["Biometric verification", "Blockchain ID creation", "Privacy protection"]
    },
    {
      step: "02",
      icon: MapPin,
      title: "Smart Monitoring",
      description: "AI-powered geo-fencing continuously monitors tourist locations and analyzes environmental safety factors.",
      details: ["Real-time location tracking", "Dynamic geo-fencing", "Environmental analysis"]
    },
    {
      step: "03",
      icon: Brain,
      title: "Threat Detection",
      description: "Machine learning algorithms process multiple data sources to identify potential safety threats and risks.",
      details: ["Multi-source data analysis", "Pattern recognition", "Risk assessment"]
    },
    {
      step: "04",
      icon: AlertTriangle,
      title: "Instant Alerts",
      description: "Automated alert system immediately notifies tourists and emergency services when threats are detected.",
      details: ["Push notifications", "Emergency contacts", "Location sharing"]
    },
    {
      step: "05",
      icon: Shield,
      title: "Response Coordination",
      description: "Coordinated response involving local authorities, hotels, and emergency services ensures rapid assistance.",
      details: ["Multi-agency coordination", "Resource allocation", "Status tracking"]
    }
  ];

  return (
    <section id="how-it-works" className="py-20 bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <Badge className="mb-4">System Workflow</Badge>
          <h2 className="text-3xl sm:text-4xl font-bold text-gray-900 mb-4">
            How Our System Works
          </h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Our comprehensive safety system follows a streamlined process that ensures 
            maximum protection with minimal user intervention.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center mb-16">
          <div className="space-y-8">
            {steps.map((step, index) => {
              const Icon = step.icon;
              return (
                <div key={index} className="flex items-start space-x-4 group">
                  <div className="flex-shrink-0">
                    <div className="bg-blue-600 text-white rounded-full w-12 h-12 flex items-center justify-center font-bold text-sm">
                      {step.step}
                    </div>
                  </div>
                  <div className="flex-1">
                    <div className="flex items-center space-x-3 mb-2">
                      <Icon className="h-5 w-5 text-blue-600" />
                      <h3 className="text-lg font-semibold text-gray-900">
                        {step.title}
                      </h3>
                    </div>
                    <p className="text-gray-600 mb-3">
                      {step.description}
                    </p>
                    <div className="flex flex-wrap gap-2">
                      {step.details.map((detail, idx) => (
                        <div key={idx} className="flex items-center space-x-1">
                          <CheckCircle className="h-3 w-3 text-green-600" />
                          <span className="text-sm text-gray-500">{detail}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                  {index < steps.length - 1 && (
                    <ArrowRight className="h-5 w-5 text-gray-300 hidden lg:block" />
                  )}
                </div>
              );
            })}
          </div>

          <div className="relative">
            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-4">
                <Card className="p-4 border-0 shadow-lg">
                  <ImageWithFallback
                    src="https://images.unsplash.com/photo-1652739758426-56a564265f9e?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHx0b3VyaXN0JTIwdHJhdmVsJTIwc2FmZXR5JTIwc2VjdXJpdHl8ZW58MXx8fHwxNzU2NzEwNzIwfDA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral"
                    alt="Tourist safety and security"
                    className="w-full h-32 object-cover rounded-lg"
                  />
                  <div className="mt-2 text-center">
                    <div className="text-sm font-medium text-gray-900">Tourist Protection</div>
                    <div className="text-xs text-gray-500">24/7 Monitoring</div>
                  </div>
                </Card>
                
                <Card className="p-4 border-0 shadow-lg bg-gradient-to-br from-blue-50 to-indigo-50">
                  <div className="text-center">
                    <Brain className="h-8 w-8 text-blue-600 mx-auto mb-2" />
                    <div className="text-sm font-medium text-gray-900">AI Analysis</div>
                    <div className="text-xs text-gray-500">Real-time Processing</div>
                  </div>
                </Card>
              </div>
              
              <div className="space-y-4 mt-8">
                <Card className="p-4 border-0 shadow-lg bg-gradient-to-br from-green-50 to-emerald-50">
                  <div className="text-center">
                    <Shield className="h-8 w-8 text-green-600 mx-auto mb-2" />
                    <div className="text-sm font-medium text-gray-900">Blockchain Security</div>
                    <div className="text-xs text-gray-500">Identity Protection</div>
                  </div>
                </Card>
                
                <Card className="p-4 border-0 shadow-lg">
                  <ImageWithFallback
                    src="https://images.unsplash.com/photo-1526378800651-c32d170fe6f8?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxibG9ja2NoYWluJTIwZGlnaXRhbCUyMGlkZW50aXR5fGVufDF8fHx8MTc1NjcxMDcyMHww&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral"
                    alt="Blockchain digital identity technology"
                    className="w-full h-32 object-cover rounded-lg"
                  />
                  <div className="mt-2 text-center">
                    <div className="text-sm font-medium text-gray-900">Digital Identity</div>
                    <div className="text-xs text-gray-500">Secure & Private</div>
                  </div>
                </Card>
              </div>
            </div>
          </div>
        </div>

        <div className="bg-white rounded-2xl p-8 md:p-12 shadow-lg border border-gray-200">
          <div className="text-center mb-8">
            <h3 className="text-2xl font-bold text-gray-900 mb-4">
              System Integration Architecture
            </h3>
            <p className="text-gray-600 max-w-2xl mx-auto">
              Our platform seamlessly integrates with existing tourism infrastructure, 
              emergency services, and government systems for comprehensive coverage.
            </p>
          </div>
          
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
            {[
              { name: "Tourism Boards", icon: "🏛️" },
              { name: "Hotels & Resorts", icon: "🏨" },
              { name: "Emergency Services", icon: "🚨" },
              { name: "Local Authorities", icon: "👮‍♂️" },
              { name: "Transportation", icon: "🚗" },
              { name: "Healthcare", icon: "🏥" },
              { name: "Weather Services", icon: "🌤️" },
              { name: "Mobile Networks", icon: "📡" }
            ].map((integration, index) => (
              <div key={index} className="text-center p-4 bg-gray-50 rounded-lg hover:bg-gray-100 transition-colors">
                <div className="text-2xl mb-2">{integration.icon}</div>
                <div className="text-sm font-medium text-gray-900">{integration.name}</div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}