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
    image: "/english1.jpeg",
    content: {
      original: "The quick brown fox jumps over the lazy dog. This sentence is often used to test typewriters or computer keyboards because it contains all 26 letters of the English alphabet. It is a pangram.",
      simplified: "",
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
    image: "/science1.jpeg",
    content: {
      original: "The water cycle, also known as the hydrologic cycle, describes the continuous movement of water on, above, and below the surface of the Earth. Water can change states among liquid, vapor, and ice at various places in the water cycle. Although the balance of water on Earth remains fairly constant over time, individual water molecules can come and go. The water moves from one reservoir to another, such as from river to ocean, or from the ocean to the atmosphere, by the physical processes of evaporation, condensation, precipitation, infiltration, surface runoff, and subsurface flow. In doing so, the water goes through different forms: liquid, solid (ice) and vapor. The hydrologic cycle also involves the exchange of heat energy, which leads to temperature changes. For instance, when water evaporates, it takes up energy from its surroundings and cools the environment. When it condenses, it releases energy and warms the environment.",
      simplified: "",
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
    image: "/mathematics1.jpeg",
    content: {
      original: "Fractions represent parts of a whole or a collection. A fraction has two parts: a numerator (the top number) and a denominator (the bottom number). The denominator tells us how many equal parts the whole is divided into, and the numerator tells us how many of those parts we are considering. Decimals are another way to represent numbers that are not whole numbers. They are based on powers of ten.",
      simplified: "",
      visualPrompt: "Illustrations of fractions like 1/2 and 1/4, and decimals like 0.5 and 0.25, with pie charts or bar graphs."
    }
  }
};