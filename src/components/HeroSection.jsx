import "./HeroSection.css";
import { motion } from "framer-motion";

const HeroSection = () => {
  return (
    <section className="hero">
      <div className="hero-blur"></div>

      <motion.div
        className="hero-content"
        initial={{ opacity: 0, y: 80 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 1 }}
      >
        <span className="hero-badge">
          PREMIUM TECH COLLECTION
        </span>

        <h1>
          SHOP THE
          <br />
          FUTURE
        </h1>

        <p>
          Discover premium gadgets, laptops,
          electronics and smart devices.
        </p>

    
            <button
                className="hero-btn"
                onClick={() => {
                    document
                    .querySelector(".products-section")
                    ?.scrollIntoView({
                        behavior: "smooth",
                    });
             }}
>
  Explore Collection
</button>



      </motion.div>
    </section>
  );
};

export default HeroSection;