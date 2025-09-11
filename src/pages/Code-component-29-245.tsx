import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../Router';
import { Button } from '../components/ui/button';
import { Input } from '../components/ui/input';
import { Label } from '../components/ui/label';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '../components/ui/card';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '../components/ui/select';
import { Alert, AlertDescription } from '../components/ui/alert';
import { Shield, Lock, Eye, EyeOff } from 'lucide-react';
import { ProfessionalBackground } from '../components/ProfessionalBackground';

export function SignInPage() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [role, setRole] = useState<'police' | 'tourism'>('police');
  const [showPassword, setShowPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');
  
  const { login } = useAuth();
  const navigate = useNavigate();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    setError('');

    // Demo authentication - in real app, this would be an API call
    try {
      await new Promise(resolve => setTimeout(resolve, 1000)); // Simulate API call
      
      if (email && password) {
        const user = {
          id: '123',
          name: role === 'police' ? 'Officer John Smith' : 'Sarah Johnson',
          role,
          department: role === 'police' ? 'Cyber Crime Division' : 'Tourist Safety Department'
        };
        
        login(user);
        navigate(role === 'police' ? '/police-dashboard' : '/tourism-dashboard');
      } else {
        setError('Please enter valid credentials');
      }
    } catch (err) {
      setError('Authentication failed. Please try again.');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen relative bg-gradient-to-br from-gray-900 via-blue-900 to-indigo-900 flex items-center justify-center overflow-hidden">
      <ProfessionalBackground />
      
      {/* Back to Home */}
      <Button
        variant="ghost"
        className="absolute top-4 left-4 text-white hover:bg-white/10 z-20"
        onClick={() => navigate('/')}
      >
        ← Back to Home
      </Button>

      <div className="relative z-10 w-full max-w-md mx-auto p-6">
        <Card className="backdrop-blur-xl bg-white/10 border border-white/20 shadow-2xl">
          <CardHeader className="text-center">
            <div className="mx-auto w-16 h-16 bg-gradient-to-br from-cyan-400 to-blue-500 rounded-full flex items-center justify-center mb-4">
              <Shield className="w-8 h-8 text-white" />
            </div>
            <CardTitle className="text-2xl text-white">Secure Access Portal</CardTitle>
            <CardDescription className="text-gray-300">
              Smart Tourist Safety Monitoring System
            </CardDescription>
          </CardHeader>
          
          <CardContent className="space-y-6">
            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="role" className="text-white">Department</Label>
                <Select value={role} onValueChange={(value: 'police' | 'tourism') => setRole(value)}>
                  <SelectTrigger className="bg-white/10 border-white/20 text-white">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="police">Police Department</SelectItem>
                    <SelectItem value="tourism">Tourism Department</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div className="space-y-2">
                <Label htmlFor="email" className="text-white">Official Email</Label>
                <Input
                  id="email"
                  type="email"
                  placeholder="officer@police.gov.in"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="bg-white/10 border-white/20 text-white placeholder:text-gray-400"
                  required
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="password" className="text-white">Password</Label>
                <div className="relative">
                  <Input
                    id="password"
                    type={showPassword ? "text" : "password"}
                    placeholder="Enter your secure password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    className="bg-white/10 border-white/20 text-white placeholder:text-gray-400 pr-10"
                    required
                  />
                  <Button
                    type="button"
                    variant="ghost"
                    size="sm"
                    className="absolute right-0 top-0 h-full px-3 hover:bg-transparent text-gray-400 hover:text-white"
                    onClick={() => setShowPassword(!showPassword)}
                  >
                    {showPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                  </Button>
                </div>
              </div>

              {error && (
                <Alert className="bg-red-500/20 border-red-500/50 text-red-200">
                  <AlertDescription>{error}</AlertDescription>
                </Alert>
              )}

              <Button
                type="submit"
                className="w-full bg-gradient-to-r from-cyan-500 to-blue-600 hover:from-cyan-600 hover:to-blue-700 text-white"
                disabled={isLoading}
              >
                {isLoading ? (
                  <div className="flex items-center">
                    <div className="animate-spin rounded-full h-4 w-4 border-2 border-white border-t-transparent mr-2"></div>
                    Authenticating...
                  </div>
                ) : (
                  <div className="flex items-center">
                    <Lock className="w-4 h-4 mr-2" />
                    Secure Sign In
                  </div>
                )}
              </Button>
            </form>

            <div className="text-center space-y-2">
              <p className="text-sm text-gray-400">Demo Credentials:</p>
              <div className="text-xs text-gray-500 space-y-1">
                <div>Email: demo@police.gov.in | Password: police123</div>
                <div>Email: demo@tourism.gov.in | Password: tourism123</div>
              </div>
            </div>

            <div className="pt-4 border-t border-white/20">
              <div className="flex items-center justify-center text-xs text-gray-400">
                <Shield className="w-3 h-3 mr-1" />
                256-bit encryption • Government-grade security
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}