import { Card, CardContent } from './ui/card';
import { Badge } from './ui/badge';
import { ImageWithFallback } from './figma/ImageWithFallback';
import { 
  TrendingUp, 
  Users, 
  Clock, 
  MapPin, 
  Shield, 
  Award,
  Globe,
  Zap
} from 'lucide-react';

export function Statistics() {
  const stats = [
    {
      icon: Users,
      value: "500K+",
      label: "Protected Tourists",
      description: "Active users across 50+ countries",
      color: "text-blue-600",
      bgColor: "bg-blue-50"
    },
    {
      icon: Clock,
      value: "< 30s",
      label: "Response Time",
      description: "Average emergency response time",
      color: "text-green-600",
      bgColor: "bg-green-50"
    },
    {
      icon: Shield,
      value: "99.9%",
      label: "Threat Detection",
      description: "Accuracy rate for threat identification",
      color: "text-purple-600",
      bgColor: "bg-purple-50"
    },
    {
      icon: MapPin,
      value: "150+",
      label: "Cities Covered",
      description: "Major tourist destinations worldwide",
      color: "text-orange-600",
      bgColor: "bg-orange-50"
    },
    {
      icon: TrendingUp,
      value: "85%",
      label: "Incident Reduction",
      description: "Decrease in tourist-related incidents",
      color: "text-indigo-600",
      bgColor: "bg-indigo-50"
    },
    {
      icon: Zap,
      value: "24/7",
      label: "Monitoring",
      description: "Continuous AI-powered surveillance",
      color: "text-red-600",
      bgColor: "bg-red-50"
    }
  ];

  const achievements = [
    {
      icon: Award,
      title: "Innovation Award 2024",
      description: "Best AI Safety Solution"
    },
    {
      icon: Globe,
      title: "Global Recognition",
      description: "UN Tourism Technology Partner"
    },
    {
      icon: Shield,
      title: "Security Certified",
      description: "ISO 27001 & SOC 2 Compliant"
    }
  ];

  return (
    <section className="py-20 bg-gradient-to-br from-gray-900 via-blue-900 to-indigo-900 text-white relative overflow-hidden">
      {/* Background elements */}
      <div className="absolute inset-0 bg-gradient-to-r from-blue-600/20 to-purple-600/20"></div>
      <div className="absolute top-0 right-0 w-96 h-96 bg-blue-500/10 rounded-full -translate-y-48 translate-x-48"></div>
      <div className="absolute bottom-0 left-0 w-96 h-96 bg-purple-500/10 rounded-full translate-y-48 -translate-x-48"></div>
      
      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <Badge className="mb-4 bg-white/10 text-white border-white/20">
            Impact & Results
          </Badge>
          <h2 className="text-3xl sm:text-4xl font-bold mb-4">
            Proven Results Worldwide
          </h2>
          <p className="text-xl text-gray-300 max-w-3xl mx-auto">
            Our platform has demonstrated exceptional effectiveness in protecting tourists 
            and reducing safety incidents across major destinations worldwide.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-16">
          {stats.map((stat, index) => {
            const Icon = stat.icon;
            return (
              <Card key={index} className="bg-white/10 backdrop-blur-sm border-white/20 hover:bg-white/15 transition-all duration-300">
                <CardContent className="p-8 text-center">
                  <div className={`${stat.bgColor} rounded-lg p-3 w-fit mx-auto mb-4`}>
                    <Icon className={`h-8 w-8 ${stat.color}`} />
                  </div>
                  <div className="text-3xl font-bold text-white mb-2">
                    {stat.value}
                  </div>
                  <div className="text-lg font-semibold text-gray-200 mb-2">
                    {stat.label}
                  </div>
                  <div className="text-sm text-gray-400">
                    {stat.description}
                  </div>
                </CardContent>
              </Card>
            );
          })}
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          <div>
            <h3 className="text-2xl font-bold mb-6">
              Recognition & Achievements
            </h3>
            <div className="space-y-6">
              {achievements.map((achievement, index) => {
                const Icon = achievement.icon;
                return (
                  <div key={index} className="flex items-start space-x-4">
                    <div className="bg-white/10 rounded-lg p-3 backdrop-blur-sm">
                      <Icon className="h-6 w-6 text-yellow-400" />
                    </div>
                    <div>
                      <h4 className="font-semibold text-white mb-1">
                        {achievement.title}
                      </h4>
                      <p className="text-gray-300 text-sm">
                        {achievement.description}
                      </p>
                    </div>
                  </div>
                );
              })}
            </div>

            <div className="mt-8 p-6 bg-white/5 rounded-lg backdrop-blur-sm border border-white/10">
              <h4 className="font-semibold text-white mb-3">Latest Milestone</h4>
              <p className="text-gray-300 text-sm mb-3">
                Successfully prevented over 10,000 potential safety incidents in Q4 2024, 
                demonstrating the effectiveness of our AI-powered threat detection system.
              </p>
              <div className="flex items-center space-x-4 text-sm">
                <div className="flex items-center">
                  <div className="w-2 h-2 bg-green-400 rounded-full mr-2"></div>
                  <span className="text-gray-400">Live since 2023</span>
                </div>
                <div className="flex items-center">
                  <div className="w-2 h-2 bg-blue-400 rounded-full mr-2"></div>
                  <span className="text-gray-400">Growing 300% YoY</span>
                </div>
              </div>
            </div>
          </div>

          <div className="relative">
            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-4">
                <Card className="bg-white/10 backdrop-blur-sm border-white/20 p-4">
                  <div className="text-center text-white">
                    <div className="text-2xl font-bold">15M+</div>
                    <div className="text-sm text-gray-300">Safety Alerts Sent</div>
                  </div>
                </Card>
                <Card className="bg-white/10 backdrop-blur-sm border-white/20 p-4">
                  <div className="text-center text-white">
                    <div className="text-2xl font-bold">98%</div>
                    <div className="text-sm text-gray-300">User Satisfaction</div>
                  </div>
                </Card>
              </div>
              <div className="space-y-4 mt-8">
                <Card className="bg-white/10 backdrop-blur-sm border-white/20 p-4">
                  <div className="text-center text-white">
                    <div className="text-2xl font-bold">50+</div>
                    <div className="text-sm text-gray-300">Partner Countries</div>
                  </div>
                </Card>
                <Card className="bg-white/10 backdrop-blur-sm border-white/20 p-4">
                  <div className="text-center text-white">
                    <div className="text-2xl font-bold">100%</div>
                    <div className="text-sm text-gray-300">Blockchain Secured</div>
                  </div>
                </Card>
              </div>
            </div>

            {/* Floating elements */}
            <div className="absolute -top-4 -right-4 bg-green-500 text-white px-3 py-1 rounded-full text-sm font-medium">
              Live Status
            </div>
            <div className="absolute -bottom-4 -left-4 bg-blue-500 text-white px-3 py-1 rounded-full text-sm font-medium">
              AI Active
            </div>
          </div>
        </div>

        <div className="mt-16 text-center">
          <div className="inline-flex items-center px-6 py-3 bg-white/10 backdrop-blur-sm rounded-full border border-white/20">
            <Globe className="h-5 w-5 text-blue-400 mr-2" />
            <span className="text-sm text-gray-300">
              Protecting tourists in real-time across 6 continents
            </span>
          </div>
        </div>
      </div>
    </section>
  );
}