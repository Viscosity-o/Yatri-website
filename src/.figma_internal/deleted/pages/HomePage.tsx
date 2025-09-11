import { useNavigate } from 'react-router-dom';
import { Hero } from "../components/Hero";
import { Features } from "../components/Features";
import { HowItWorks } from "../components/HowItWorks";
import { Statistics } from "../components/Statistics";
import { CallToAction } from "../components/CallToAction";
import { Navigation } from "../components/Navigation";

export function HomePage() {
  const navigate = useNavigate();

  const handleSignInClick = () => {
    navigate('/signin');
  };

  return (
    <div className="min-h-screen bg-background">
      <Navigation onSignInClick={handleSignInClick} />
      <Hero />
      <Features />
      <HowItWorks />
      <Statistics />
      <CallToAction />
    </div>
  );
}