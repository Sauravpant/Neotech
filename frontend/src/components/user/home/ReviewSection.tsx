import { Star, Quote, ChevronLeft, ChevronRight } from "lucide-react";
import { useState, useEffect } from "react";

const ReviewsSection = () => {
  const [currentReview, setCurrentReview] = useState(0);

  const StarRating = ({ rating }: { rating: number }) => {
    return (
      <div className="flex gap-1 justify-center md:justify-start">
        {[...Array(5)].map((_, i) => (
          <Star key={i} className={`h-4 w-4 md:h-5 md:w-5 ${i < rating ? "text-[#F59E0B] fill-[#F59E0B]" : "text-[#E2E8F0]"}`} />
        ))}
      </div>
    );
  };

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentReview((prev) => (prev + 1) % reviews.length);
    }, 4000);

    return () => clearInterval(timer);
  }, []);

  const nextReview = () => {
    setCurrentReview((prev) => (prev + 1) % reviews.length);
  };

  const prevReview = () => {
    setCurrentReview((prev) => (prev - 1 + reviews.length) % reviews.length);
  };

  return (
    <section className="py-16 md:py-20 bg-[#F8FAFC] overflow-x-hidden">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12 md:mb-16 animate-fade-in">
          <h2 className="text-2xl md:text-3xl lg:text-4xl font-bold text-[#0F172A] mb-3 md:mb-4">
            What Our <span className="text-[#2563EB]">Customers</span> Say
          </h2>
          <p className="text-base md:text-lg text-[#64748B] max-w-2xl mx-auto leading-relaxed">
            Join thousands of satisfied tech lovers who trust us for their gadgets and electronics.
          </p>
        </div>

        <div className="relative min-h-[300px] md:min-h-[260px] mb-8 md:mb-12 overflow-hidden">
          {reviews.map((review, index) => (
            <div
              key={index}
              className={`absolute inset-0 transition-all duration-500 ease-in-out ${
                index === currentReview ? "opacity-100 transform translate-x-0 scale-100 z-10" : "opacity-0 transform translate-x-full scale-95 z-0"
              }`}
            >
              <div className="bg-white rounded-3xl p-6 md:p-8 border border-[#E2E8F0] shadow-lg hover:shadow-2xl transition-transform duration-500 transform hover:-translate-y-1">
                <div className="absolute -top-3 -left-3 md:-top-4 md:-left-4 w-8 h-8 md:w-12 md:h-12 bg-gradient-to-br from-[#2563EB] to-[#0EA5E9] rounded-2xl flex items-center justify-center shadow-lg">
                  <Quote className="h-4 w-4 md:h-6 md:w-6 text-white" />
                </div>
                <div className="flex flex-col items-center text-center gap-4 md:gap-6">
                  <div className="flex flex-col items-center gap-3">
                    <div
                      className={`w-16 h-16 md:w-20 md:h-20 rounded-2xl flex items-center justify-center font-bold text-white text-lg md:text-xl shadow-lg ${review.color}`}
                    >
                      {review.avatar}
                    </div>
                    <div className="text-center">
                      <h4 className="font-bold text-[#0F172A] text-lg md:text-xl mb-1">{review.name}</h4>
                      <p className="text-[#64748B] text-sm md:text-base mb-2">{review.role}</p>
                      <StarRating rating={review.rating} />
                    </div>
                  </div>
                  <p className="text-[#334155] text-sm md:text-base leading-relaxed italic max-w-2xl">"{review.text}"</p>
                </div>
              </div>
            </div>
          ))}
        </div>

        <div className="flex flex-col items-center gap-6">
          <div className="flex justify-center items-center gap-3">
            {reviews.map((_, index) => (
              <button
                key={index}
                onClick={() => setCurrentReview(index)}
                className={`w-2 h-2 md:w-3 md:h-3 rounded-full transition-all duration-300 ${
                  index === currentReview ? "bg-[#2563EB] scale-125" : "bg-[#E2E8F0] hover:bg-[#2563EB]/50"
                }`}
              />
            ))}
          </div>
          <div className="flex justify-center items-center gap-4">
            <button
              onClick={prevReview}
              className="p-2 md:p-3 rounded-xl border border-[#E2E8F0] bg-white hover:bg-[#2563EB] hover:text-white text-[#64748B] transition-all duration-300 shadow-lg hover:shadow-2xl"
              aria-label="Previous review"
            >
              <ChevronLeft className="h-4 w-4 md:h-5 md:w-5" />
            </button>
            <button
              onClick={nextReview}
              className="p-2 md:p-3 rounded-xl border border-[#E2E8F0] bg-white hover:bg-[#2563EB] hover:text-white text-[#64748B] transition-all duration-300 shadow-lg hover:shadow-2xl"
              aria-label="Next review"
            >
              <ChevronRight className="h-4 w-4 md:h-5 md:w-5" />
            </button>
          </div>
        </div>

        <div className="mt-12 md:mt-16 text-center animate-fade-in">
          <p className="text-[#2563EB] text-lg md:text-xl font-semibold">Experience the Future of Tech Shopping Today!</p>
        </div>
      </div>
    </section>
  );
};

export default ReviewsSection;

const reviews = [
  {
    name: "Saurav Pant",
    role: "Tech Enthusiast",
    avatar: "SP",
    rating: 5,
    text: "Product quality and delivery exceeded my expectations — I found exactly what I needed for my setup!",
    color: "bg-gradient-to-br from-[#2563EB] to-[#0EA5E9]",
  },
  {
    name: "Niraj Joshi",
    role: "Gaming Professional",
    avatar: "NJ",
    rating: 5,
    text: "Best place for gaming peripherals and accessories! Fast shipping and exceptional customer support.",
    color: "bg-gradient-to-br from-[#10B981] to-[#0EA5E9]",
  },
  {
    name: "Anita Sharma",
    role: "Content Creator",
    avatar: "AS",
    rating: 5,
    text: "As a content creator, I rely on reliable equipment. This store consistently delivers high-quality gear!",
    color: "bg-gradient-to-br from-[#8B5CF6] to-[#EC4899]",
  },
  {
    name: "Rohit Thapa",
    role: "Software Engineer",
    avatar: "RT",
    rating: 5,
    text: "Upgraded my workstation with the latest gadgets. Amazing quality and fast delivery!",
    color: "bg-gradient-to-br from-[#F97316] to-[#FCD34D]",
  },
  {
    name: "Priya Koirala",
    role: "Gadget Reviewer",
    avatar: "PK",
    rating: 5,
    text: "Wide range of products and smooth shopping experience. Highly recommend for tech enthusiasts!",
    color: "bg-gradient-to-br from-[#6366F1] to-[#EC4899]",
  },
];
