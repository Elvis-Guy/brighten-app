// ============================================================================
// FILE: data/curriculumData.ts
// Description: Static data for curriculum content.
// ============================================================================
import type { CurriculumSubject } from '@/types';

interface CurriculumContentMap {
  [key: string]: CurriculumSubject;
}

export const curriculumContent: CurriculumContentMap = {
  english: {
    id: 'english',
    title: "English",
    lessons: 12,
    progress: 60,
    topic: "Reading Comprehension",
    description: "Learn to understand stories and answer questions about what you've read.",
    image: "https://placehold.co/400x200/FEECE2/6B4F4F?text=English+Class",
    content: {
      original: "The quick brown fox jumps over the lazy dog. This sentence is often used to test typewriters or computer keyboards because it contains all 26 letters of the English alphabet. It is a pangram.",
      simplified: "A fast brown fox jumps over a sleepy dog. This sentence helps check keyboards because it uses every letter.",
      visualPrompt: "A brown fox jumping over a sleeping dog in a field."
    }
  },
  science: {
    id: 'science',
    title: "Science",
    lessons: 8,
    progress: 25,
    topic: "The Water Cycle",
    description: "Discover how water moves through our environment in a continuous cycle.",
    image: "https://placehold.co/400x200/E0F7FA/00796B?text=Science+Lab",
    content: {
      original: "The water cycle, also known as the hydrologic cycle, describes the continuous movement of water on, above, and below the surface of the Earth. Water can change states among liquid, vapor, and ice at various places in the water cycle. Although the balance of water on Earth remains fairly constant over time, individual water molecules can come and go. The water moves from one reservoir to another, such as from river to ocean, or from the ocean to the atmosphere, by the physical processes of evaporation, condensation, precipitation, infiltration, surface runoff, and subsurface flow. In doing so, the water goes through different forms: liquid, solid (ice) and vapor. The hydrologic cycle also involves the exchange of heat energy, which leads to temperature changes. For instance, when water evaporates, it takes up energy from its surroundings and cools the environment. When it condenses, it releases energy and warms the environment.",
      simplified: "The water cycle shows how water moves around Earth. Water can be liquid, gas (vapor), or solid (ice).\n\nThe amount of water on Earth stays the same, but water moves from place to place. It moves from rivers to oceans, or from oceans to the air.\n\nWater changes through these steps:\n- Evaporation: Water turns into vapor and rises\n- Condensation: Vapor turns into clouds\n- Precipitation: Rain or snow falls\n- Collection: Water goes into rivers, lakes, and oceans\n\nWhen water evaporates, it makes the area cooler. When it condenses, it makes the area warmer.",
      visualPrompt: "A simple diagram of the water cycle showing evaporation, condensation, precipitation, and collection with clouds, rain, sun, river, and land."
    }
  },
  mathematics: {
    id: 'mathematics',
    title: "Mathematics",
    lessons: 10,
    progress: 45,
    topic: "Fractions & Decimals",
    description: "Learn how to work with fractions and convert them to decimals.",
    image: "https://placehold.co/400x200/D1C4E9/512DA8?text=Math+Class",
    content: {
      original: "Fractions represent parts of a whole or a collection. A fraction has two parts: a numerator (the top number) and a denominator (the bottom number). The denominator tells us how many equal parts the whole is divided into, and the numerator tells us how many of those parts we are considering. Decimals are another way to represent numbers that are not whole numbers. They are based on powers of ten.",
      simplified: "Fractions are parts of something whole. The top number is how many parts you have. The bottom number is how many total parts there are. Decimals are another way to write numbers that are not whole, using tens.",
      visualPrompt: "Illustrations of fractions like 1/2 and 1/4, and decimals like 0.5 and 0.25, with pie charts or bar graphs."
    }
  }
};