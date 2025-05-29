import Header from './components/Header';
import HeroSection from './components/HeroSection';
import WelcomeSection from './components/WelcomeSection';
import ToursSection from './components/ToursSection';
import FeaturesSection from './components/FeaturesSection';
import ActivitiesSection from './components/ActivitiesSection';
import AboutSection from './components/AboutSection';
import ResponsibleTourismSection from './components/ResponsibleTourismSection';
import ContactSection from './components/ContactSection';
import Footer from './components/Footer';
import './index.css'; // Adjust the path as needed

function App() {
  return (
    <main>
      <Header />
      <HeroSection />
      <WelcomeSection />
      <ToursSection />
      <FeaturesSection />
      <ActivitiesSection />
      <AboutSection />
      <ResponsibleTourismSection />
      <ContactSection />
      <Footer />
    </main>
  );
}

export default App;
