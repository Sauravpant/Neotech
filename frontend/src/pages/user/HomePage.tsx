import AboutPlatform from "@/components/user/home/AboutPlatform";
import HeroSection from "@/components/user/home/HeroSection";
import ReviewSection from "@/components/user/home/ReviewSection";

const HomePage = () => {
  return (
    <div className="min-h-screen bg-[#F8FAFC]">
      <HeroSection />
      <AboutPlatform />
      <ReviewSection />
    </div>
  );
};

export default HomePage;
