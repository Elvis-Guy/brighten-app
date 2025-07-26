// ============================================================================
// FILE: data/sampleQuizzes.ts
// Description: Sample quiz data for demonstration and testing
// ============================================================================

import type { Quiz } from '@/types';

export const sampleQuizzes: Record<string, Quiz> = {
  'linear_equations': {
    id: 'quiz_linear_equations',
    topicId: 'linear_equations',
    title: 'Linear Equations Quiz',
    description: 'Test your understanding of linear equations and their applications',
    timeLimit: 15, // 15 minutes
    passingScore: 70,
    maxAttempts: 3,
    isActive: true,
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
    questions: [
      {
        id: 'q1',
        question: 'What is the slope-intercept form of a linear equation?',
        options: [
          'y = mx + b',
          'ax + by = c',
          'y - y₁ = m(x - x₁)',
          'x = my + b'
        ],
        correctAnswer: 0,
        explanation: 'The slope-intercept form is y = mx + b, where m is the slope and b is the y-intercept.',
        difficulty: 'easy'
      },
      {
        id: 'q2',
        question: 'In the equation y = 3x + 2, what is the slope?',
        options: ['2', '3', '5', '1'],
        correctAnswer: 1,
        explanation: 'In y = mx + b form, the coefficient of x (which is 3) represents the slope.',
        difficulty: 'easy'
      },
      {
        id: 'q3',
        question: 'What does the y-intercept represent in a linear equation?',
        options: [
          'The rate of change',
          'Where the line crosses the x-axis',
          'Where the line crosses the y-axis',
          'The steepness of the line'
        ],
        correctAnswer: 2,
        explanation: 'The y-intercept is the point where the line crosses the y-axis (when x = 0).',
        difficulty: 'medium'
      },
      {
        id: 'q4',
        question: 'If a line has slope 2 and passes through point (1, 3), what is its equation?',
        options: [
          'y = 2x + 1',
          'y = 2x + 3',
          'y = 2x - 1',
          'y = x + 2'
        ],
        correctAnswer: 0,
        explanation: 'Using point-slope form: y - 3 = 2(x - 1), which simplifies to y = 2x + 1.',
        difficulty: 'medium'
      },
      {
        id: 'q5',
        question: 'What is the slope of a horizontal line?',
        options: ['1', '0', 'Undefined', '-1'],
        correctAnswer: 1,
        explanation: 'A horizontal line has no vertical change, so its slope is 0.',
        difficulty: 'hard'
      }
    ]
  },
  
  'quadratic_functions': {
    id: 'quiz_quadratic_functions',
    topicId: 'quadratic_functions',
    title: 'Quadratic Functions Quiz',
    description: 'Assess your knowledge of quadratic functions and parabolas',
    timeLimit: 20,
    passingScore: 70,
    maxAttempts: 3,
    isActive: true,
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
    questions: [
      {
        id: 'q1',
        question: 'What is the general form of a quadratic function?',
        options: [
          'y = mx + b',
          'y = ax² + bx + c',
          'y = a(x - h)² + k',
          'y = x² + 1'
        ],
        correctAnswer: 1,
        explanation: 'The general form of a quadratic function is y = ax² + bx + c, where a ≠ 0.',
        difficulty: 'easy'
      },
      {
        id: 'q2',
        question: 'What shape does a quadratic function make when graphed?',
        options: ['Straight line', 'Circle', 'Parabola', 'Triangle'],
        correctAnswer: 2,
        explanation: 'Quadratic functions always form a parabola when graphed.',
        difficulty: 'easy'
      },
      {
        id: 'q3',
        question: 'In y = ax² + bx + c, what happens when a > 0?',
        options: [
          'Parabola opens downward',
          'Parabola opens upward',
          'No parabola is formed',
          'Parabola is horizontal'
        ],
        correctAnswer: 1,
        explanation: 'When a > 0, the parabola opens upward like a smile.',
        difficulty: 'medium'
      },
      {
        id: 'q4',
        question: 'What is the vertex of the parabola y = (x - 2)² + 3?',
        options: ['(2, 3)', '(-2, 3)', '(2, -3)', '(-2, -3)'],
        correctAnswer: 0,
        explanation: 'In vertex form y = a(x - h)² + k, the vertex is at (h, k), so (2, 3).',
        difficulty: 'medium'
      },
      {
        id: 'q5',
        question: 'How many real solutions does x² + 2x + 5 = 0 have?',
        options: ['0', '1', '2', '3'],
        correctAnswer: 0,
        explanation: 'The discriminant b² - 4ac = 4 - 20 = -16 < 0, so there are no real solutions.',
        difficulty: 'hard'
      }
    ]
  },

  'the_water_cycle': {
    id: 'quiz_water_cycle',
    topicId: 'the_water_cycle',
    title: 'Water Cycle Quiz',
    description: 'Test your understanding of how water moves through our environment',
    timeLimit: 12,
    passingScore: 70,
    maxAttempts: 3,
    isActive: true,
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
    questions: [
      {
        id: 'q1',
        question: 'What is the process called when water changes from liquid to gas?',
        options: ['Condensation', 'Precipitation', 'Evaporation', 'Collection'],
        correctAnswer: 2,
        explanation: 'Evaporation is when water changes from liquid to gas due to heat energy.',
        difficulty: 'easy'
      },
      {
        id: 'q2',
        question: 'Where does most evaporation occur?',
        options: ['Rivers', 'Lakes', 'Oceans', 'Clouds'],
        correctAnswer: 2,
        explanation: 'Oceans cover most of Earth\'s surface and provide the most water for evaporation.',
        difficulty: 'easy'
      },
      {
        id: 'q3',
        question: 'What happens during condensation?',
        options: [
          'Water vapor turns into liquid droplets',
          'Liquid water turns into vapor',
          'Ice melts into water',
          'Water falls as rain'
        ],
        correctAnswer: 0,
        explanation: 'Condensation occurs when water vapor cools and forms tiny liquid droplets.',
        difficulty: 'medium'
      },
      {
        id: 'q4',
        question: 'Which of these is NOT a form of precipitation?',
        options: ['Rain', 'Snow', 'Hail', 'Evaporation'],
        correctAnswer: 3,
        explanation: 'Evaporation is the opposite of precipitation - it\'s when water goes up, not down.',
        difficulty: 'medium'
      }
    ]
  },

  'reading_comprehension': {
    id: 'quiz_reading_comprehension',
    topicId: 'reading_comprehension',
    title: 'Reading Comprehension Quiz',
    description: 'Improve your understanding of texts and story analysis',
    timeLimit: 18,
    passingScore: 70,
    maxAttempts: 3,
    isActive: true,
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
    questions: [
      {
        id: 'q1',
        question: 'What is the main idea of a paragraph?',
        options: [
          'The first sentence',
          'The most important point the author is making',
          'The longest sentence',
          'The last sentence'
        ],
        correctAnswer: 1,
        explanation: 'The main idea is the central point or message that the author wants to communicate.',
        difficulty: 'easy'
      },
      {
        id: 'q2',
        question: 'What are supporting details?',
        options: [
          'The title of the story',
          'Information that explains or proves the main idea',
          'The author\'s name',
          'The page numbers'
        ],
        correctAnswer: 1,
        explanation: 'Supporting details provide evidence, examples, or explanations for the main idea.',
        difficulty: 'easy'
      },
      {
        id: 'q3',
        question: 'When you make an inference, you are:',
        options: [
          'Reading exactly what is written',
          'Using clues to figure out something not directly stated',
          'Copying the text word for word',
          'Skipping parts of the text'
        ],
        correctAnswer: 1,
        explanation: 'An inference is an educated guess based on clues in the text and your own knowledge.',
        difficulty: 'medium'
      },
      {
        id: 'q4',
        question: 'What is the purpose of a conclusion in a story?',
        options: [
          'To introduce new characters',
          'To wrap up the story and show how problems are resolved',
          'To start a new adventure',
          'To confuse the reader'
        ],
        correctAnswer: 1,
        explanation: 'A conclusion ties up loose ends and shows how conflicts are resolved.',
        difficulty: 'medium'
      }
    ]
  }
};

// Helper function to get quiz by topic
export const getQuizByTopic = (topicName: string): Quiz | null => {
  const topicKey = topicName.toLowerCase().replace(/\s+/g, '_');
  return sampleQuizzes[topicKey] || null;
}; 