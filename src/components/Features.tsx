import { Card, CardContent } from './ui/card';
import { Badge } from './ui/badge';
import { 
  Brain, 
  MapPin, 
  Shield, 
  Zap, 
  Users, 
  Clock,
  AlertTriangle,
  Lock,
  Smartphone
} from 'lucide-react';

export function Features() {
  const features = [
    {
      icon: Brain,
      title: "AI-Powered Threat Detection",
      description: "Advanced machine learning algorithms analyze real-time data to identify potential safety threats before they escalate.",
      badge: "AI Technology",
      color: "text-blue-600",
      bgColor: "bg-blue-50"
    },
    {
      icon: MapPin,
      title: "Smart Geo-Fencing",
      description: "Dynamic geo-fencing technology creates virtual safety boundaries and alerts when tourists enter high-risk areas.",
      badge: "Geo-Location",
      color: "text-green-600",
      bgColor: "bg-green-50"
    },
    {
      icon: Lock,
      title: "Blockchain Digital ID",
      description: "Secure, decentralized identity verification ensures tourist authenticity while protecting personal data privacy.",
      badge: "Blockchain",
      color: "text-purple-600",
      bgColor: "bg-purple-50"
    },
    {
      icon: Zap,
      title: "Real-Time Response",
      description: "Instant incident response system connects tourists with local emergency services within seconds of threat detection.",
      badge: "Emergency Response",
      color: "text-orange-600",
      bgColor: "bg-orange-50"
    },
    {
      icon: Users,
      title: "Multi-Stakeholder Platform",
      description: "Seamlessly connects tourists, local authorities, hotels, and emergency services in one unified safety network.",
      badge: "Integration",
      color: "text-indigo-600",
      bgColor: "bg-indigo-50"
    },
    {
      icon: Smartphone,
      title: "Mobile-First Design",
      description: "Intuitive mobile app provides tourists with instant access to safety features, emergency contacts, and real-time alerts.",
      badge: "Mobile App",
      color: "text-pink-600",
      bgColor: "bg-pink-50"
    }
  ];

  return (
    <section id="features" className="py-20 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <Badge className="mb-4">Core Features</Badge>
          <h2 className="text-3xl sm:text-4xl font-bold text-gray-900 mb-4">
            Cutting-Edge Technology Stack
          </h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Our platform combines the latest in AI, blockchain, and geospatial technology 
            to create the most comprehensive tourist safety solution available.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {features.map((feature, index) => {
            const Icon = feature.icon;
            return (
              <Card key={index} className="group hover:shadow-lg transition-all duration-300 border-0 shadow-sm hover:shadow-xl">
                <CardContent className="p-8">
                  <div className={`${feature.bgColor} rounded-lg p-3 w-fit mb-6 group-hover:scale-110 transition-transform duration-300`}>
                    <Icon className={`h-6 w-6 ${feature.color}`} />
                  </div>
                  
                  <Badge variant="secondary" className="mb-3 text-xs">
                    {feature.badge}
                  </Badge>
                  
                  <h3 className="text-xl font-semibold text-gray-900 mb-3">
                    {feature.title}
                  </h3>
                  
                  <p className="text-gray-600 leading-relaxed">
                    {feature.description}
                  </p>
                </CardContent>
              </Card>
            );
          })}
        </div>

        <div className="mt-16 bg-gradient-to-r from-blue-50 to-indigo-50 rounded-2xl p-8 md:p-12">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 items-center">
            <div className="md:col-span-2">
              <h3 className="text-2xl font-bold text-gray-900 mb-4">
                Advanced Analytics Dashboard
              </h3>
              <p className="text-gray-600 mb-6">
                Real-time monitoring dashboard provides comprehensive insights into tourist safety patterns, 
                threat levels, and response effectiveness across all monitored locations.
              </p>
              <div className="flex items-center space-x-6">
                <div className="flex items-center">
                  <Clock className="h-5 w-5 text-blue-600 mr-2" />
                  <span className="text-sm text-gray-700">Real-time Updates</span>
                </div>
                <div className="flex items-center">
                  <AlertTriangle className="h-5 w-5 text-orange-600 mr-2" />
                  <span className="text-sm text-gray-700">Predictive Alerts</span>
                </div>
                <div className="flex items-center">
                  <Shield className="h-5 w-5 text-green-600 mr-2" />
                  <span className="text-sm text-gray-700">99.9% Uptime</span>
                </div>
              </div>
            </div>
            <div className="text-center md:text-right">
              <div className="bg-white rounded-lg p-6 shadow-lg border border-gray-200 inline-block">
                <div className="text-3xl font-bold text-blue-600">50ms</div>
                <div className="text-sm text-gray-600">Average Response Time</div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}