import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { FaAngleLeft, FaAngleRight } from "react-icons/fa6";
import banner from "../../assets/banner.jpg";
import bannerMobile from "../../assets/banner-mobile.jpg";
import fast from "../../assets/fast.png";
import superfast from "../../assets/Superfast.png";

const slides = [
  {
    id: "paan-corner",
    type: "image",
    title: "Paan corner is now online",
    desktopImage: banner,
    mobileImage: bannerMobile,
    to: "/search",
  },
  {
    id: "fresh-essentials",
    type: "promotion",
    eyebrow: "Fresh picks, every day",
    title: "Good food starts with fresh groceries.",
    description: "Discover daily essentials, fruits, and more—delivered to your door.",
    action: "Explore products",
    image: fast,
    imageAlt: "Fresh fruits",
    to: "/search",
    theme: "from-lime-100 via-emerald-100 to-teal-200",
    accent: "text-emerald-800",
    button: "bg-emerald-700 hover:bg-emerald-800",
  },
  {
    id: "quick-delivery",
    type: "promotion",
    eyebrow: "Quicko promise",
    title: "Your essentials, delivered superfast.",
    description: "From pantry staples to everyday needs, shop in a few simple taps.",
    action: "Start shopping",
    image: superfast,
    imageAlt: "Quick delivery illustration",
    to: "/search",
    theme: "from-amber-100 via-yellow-100 to-orange-200",
    accent: "text-amber-950",
    button: "bg-amber-500 hover:bg-amber-600",
  },
];

const AdvertisementCarousel = () => {
  const [activeIndex, setActiveIndex] = useState(0);
  const [isPaused, setIsPaused] = useState(false);

  useEffect(() => {
    if (isPaused) return undefined;

    const intervalId = window.setInterval(() => {
      setActiveIndex((currentIndex) => (currentIndex + 1) % slides.length);
    }, 6000);

    return () => window.clearInterval(intervalId);
  }, [isPaused]);

  const showPreviousSlide = () => {
    setActiveIndex((currentIndex) =>
      currentIndex === 0 ? slides.length - 1 : currentIndex - 1
    );
  };

  const showNextSlide = () => {
    setActiveIndex((currentIndex) => (currentIndex + 1) % slides.length);
  };

  return (
    <section
      className="container mx-auto px-3 pt-3 sm:px-4"
      aria-roledescription="carousel"
      aria-label="Quicko promotions"
      onMouseEnter={() => setIsPaused(true)}
      onMouseLeave={() => setIsPaused(false)}
      onFocus={() => setIsPaused(true)}
      onBlur={(event) => {
        if (!event.currentTarget.contains(event.relatedTarget)) {
          setIsPaused(false);
        }
      }}
    >
      <div className="relative overflow-hidden rounded-xl bg-slate-100 shadow-sm">
        <div className="aspect-[1.38] lg:aspect-[5.45]">
          {slides.map((slide, index) => {
            const isActive = index === activeIndex;

            return (
              <article
                key={slide.id}
                aria-hidden={!isActive}
                className={`absolute inset-0 transition-opacity duration-500 motion-reduce:transition-none ${
                  isActive ? "z-10 opacity-100" : "pointer-events-none opacity-0"
                }`}
              >
                {slide.type === "image" ? (
                  <Link to={slide.to} tabIndex={isActive ? 0 : -1} className="block h-full">
                    <picture>
                      <source media="(min-width: 1024px)" srcSet={slide.desktopImage} />
                      <img
                        src={slide.mobileImage}
                        alt={slide.title}
                        className="h-full w-full object-cover"
                      />
                    </picture>
                  </Link>
                ) : (
                  <div className={`grid h-full grid-cols-2 items-center bg-gradient-to-r px-6 sm:px-10 lg:px-20 ${slide.theme}`}>
                    <div className="z-10 max-w-xl">
                      <p className={`mb-2 text-xs font-bold uppercase tracking-[0.18em] sm:text-sm ${slide.accent}`}>
                        {slide.eyebrow}
                      </p>
                      <h2 className={`max-w-md text-xl font-bold leading-tight sm:text-3xl lg:text-5xl ${slide.accent}`}>
                        {slide.title}
                      </h2>
                      <p className="mt-2 hidden max-w-md text-sm text-slate-700 sm:block lg:text-base">
                        {slide.description}
                      </p>
                      <Link
                        to={slide.to}
                        tabIndex={isActive ? 0 : -1}
                        className={`mt-4 inline-flex rounded-md px-3 py-2 text-xs font-semibold text-white transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-slate-900 focus-visible:ring-offset-2 sm:px-4 sm:text-sm ${slide.button}`}
                      >
                        {slide.action}
                      </Link>
                    </div>
                    <div className="flex h-full items-end justify-center overflow-hidden">
                      <img
                        src={slide.image}
                        alt={slide.imageAlt}
                        className="h-[92%] max-w-full object-contain drop-shadow-xl"
                      />
                    </div>
                  </div>
                )}
              </article>
            );
          })}
        </div>

        <button
          type="button"
          onClick={showPreviousSlide}
          className="absolute left-2 top-1/2 z-20 grid h-9 w-9 -translate-y-1/2 place-items-center rounded-full bg-white/90 text-slate-800 shadow transition hover:bg-white focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary-100 sm:left-4 sm:h-11 sm:w-11"
          aria-label="Show previous promotion"
        >
          <FaAngleLeft aria-hidden="true" />
        </button>
        <button
          type="button"
          onClick={showNextSlide}
          className="absolute right-2 top-1/2 z-20 grid h-9 w-9 -translate-y-1/2 place-items-center rounded-full bg-white/90 text-slate-800 shadow transition hover:bg-white focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary-100 sm:right-4 sm:h-11 sm:w-11"
          aria-label="Show next promotion"
        >
          <FaAngleRight aria-hidden="true" />
        </button>

        <div className="absolute bottom-3 left-1/2 z-20 flex -translate-x-1/2 gap-2" aria-label="Choose a promotion">
          {slides.map((slide, index) => (
            <button
              key={slide.id}
              type="button"
              onClick={() => setActiveIndex(index)}
              className={`h-2 rounded-full transition-all focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary-100 ${
                index === activeIndex ? "w-6 bg-white" : "w-2 bg-white/60 hover:bg-white"
              }`}
              aria-label={`Show promotion ${index + 1}: ${slide.title}`}
              aria-current={index === activeIndex ? "true" : undefined}
            />
          ))}
        </div>
      </div>
    </section>
  );
};

export default AdvertisementCarousel;
