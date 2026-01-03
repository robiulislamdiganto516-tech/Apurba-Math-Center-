
import React from 'react';
import { 
  BookOpen, 
  Sigma, 
  PenTool, 
  Trophy, 
  BarChart3, 
  User, 
  HelpCircle,
  Plus,
  Minus,
  Divide,
  Percent,
  Calculator
} from 'lucide-react';
import { Chapter, Formula, QuizQuestion } from './types';

export const COLORS = {
  primary: '#4A90E2',
  secondary: '#50E3C2',
  accent: '#E0F7FA',
  white: '#FFFFFF',
  dark: '#2C3E50',
  grey: '#7F8C8D',
  error: '#E74C3C',
  success: '#27AE60',
  warning: '#F39C12',
  purple: '#9B59B6',
};

export const CHAPTERS: Chapter[] = [
  { id: '1', number: 1, title: 'Real Numbers', titleBn: 'বাস্তব সংখ্যা', category: 'Arithmetic', completion: 100, icon: 'number' },
  { id: '2', number: 2, title: 'Sets and Functions', titleBn: 'সেট ও ফাংশন', category: 'Algebra', completion: 85, icon: 'set' },
  { id: '3', number: 3, title: 'Algebraic Expressions', titleBn: 'বীজগাণিতিক রাশি', category: 'Algebra', completion: 40, icon: 'algebra' },
  { id: '4', number: 4, title: 'Exponents and Logarithms', titleBn: 'সূচক ও লগারিদম', category: 'Algebra', completion: 0, icon: 'log' },
  { id: '5', number: 5, title: 'Equations in One Variable', titleBn: 'এক চলকবিশিষ্ট সমীকরণ', category: 'Algebra', completion: 0, icon: 'equation' },
  { id: '6', number: 6, title: 'Geometry', titleBn: 'জ্যামিতি', category: 'Geometry', completion: 10, icon: 'geometry' },
];

export const FORMULAS: Formula[] = [
  { id: 'f1', title: 'Quadratic Formula', expression: 'x = (-b ± √(b² - 4ac)) / 2a', description: 'Used to solve quadratic equations.', category: 'Algebra', bookmarked: false },
  { id: 'f2', title: 'Pythagorean Theorem', expression: 'a² + b² = c²', description: 'Relation among sides of a right triangle.', category: 'Geometry', bookmarked: true },
  { id: 'f3', title: 'Area of Circle', expression: 'A = πr²', description: 'Calculation for circle surface area.', category: 'Geometry', bookmarked: false },
  { id: 'f4', title: 'Distance Formula', expression: 'd = √((x₂-x₁)² + (y₂-y₁)¹)', description: 'Distance between two points.', category: 'Coordinate', bookmarked: false },
];

export const MOCK_QUIZ: QuizQuestion[] = [
  {
    id: 'q1',
    text: 'What is the value of sin 90°?',
    options: ['0', '1/2', '1', '√3/2'],
    correctIndex: 2,
    hint: 'Think about the unit circle peak.',
    explanation: 'The value of sine at 90 degrees or π/2 radians is 1.'
  },
  {
    id: 'q2',
    text: 'If a = 5, b = 4, what is a² - b²?',
    options: ['1', '9', '16', '25'],
    correctIndex: 1,
    hint: 'Use the identity (a+b)(a-b).',
    explanation: 'a² - b² = (a+b)(a-b) = (5+4)(5-4) = 9*1 = 9.'
  }
];

export const MENU_TILES = [
  { id: 'CHAPTERS', icon: <BookOpen />, title: 'Chapters', titleBn: 'অধ্যায়', color: 'from-[#4A90E2] to-[#50E3C2]' },
  { id: 'FORMULAS', icon: <Sigma />, title: 'Formula Bank', titleBn: 'সূত্র ব্যাংক', color: 'from-[#9B59B6] to-[#8E44AD]' },
  { id: 'PRACTICE', icon: <PenTool />, title: 'Practice', titleBn: 'প্র্যাকটিস', color: 'from-[#F39C12] to-[#F1C40F]' },
  { id: 'QUIZ', icon: <Trophy />, title: 'Quiz / Test', titleBn: 'কুইজ / টেস্ট', color: 'from-[#E74C3C] to-[#C0392B]' },
  { id: 'PROGRESS', icon: <BarChart3 />, title: 'Progress', titleBn: 'প্রগতি', color: 'from-[#27AE60] to-[#2ECC71]' },
  { id: 'AI_SOLVER', icon: <Calculator />, title: 'AI Solver', titleBn: 'এআই সলভার', color: 'from-[#1A237E] to-[#4A90E2]' },
  { id: 'PROFILE', icon: <User />, title: 'Profile', titleBn: 'প্রোফাইল', color: 'from-[#34495E] to-[#2C3E50]' },
  { id: 'HELP', icon: <HelpCircle />, title: 'Help / About', titleBn: 'সাহায্য', color: 'from-[#7F8C8D] to-[#95A5A6]' },
];

export const FLOATING_MATH_ICONS = [
  { icon: <Plus size={24} />, top: '10%', left: '5%', delay: '0s' },
  { icon: <Minus size={24} />, top: '30%', left: '85%', delay: '1s' },
  { icon: <Divide size={24} />, top: '70%', left: '15%', delay: '2s' },
  { icon: <Percent size={24} />, top: '80%', left: '75%', delay: '0.5s' },
  { icon: <span>π</span>, top: '45%', left: '50%', delay: '1.5s' },
  { icon: <Sigma size={24} />, top: '20%', left: '30%', delay: '2.5s' },
];
