
import { Level } from './types';

export const EMOJI_SETS = {
  smiley: ['😀', '😅', '😍', '😎', '🤔', '😴', '😡'],
  vehicle: ['🚗', '🚌', '🚲', '✈️', '🚀', '🚑', '🚒'],
  heart: ['❤️', '🧡', '💛', '💚', '💙', '💜', '🖤', '🤍'],
};

export const RULES = ['ABAB', 'ABC', 'AABB', 'AAB', 'ABB', 'ABBC'];

export const DEFAULT_LEVELS: Level[] = [
  // 1-3: NEXT, ABAB smileys
  { id: 1, title: 'Wat komt nu?', instruction: 'Kies de emoji die past.', type: 'NEXT', slotCount: 8, category: 'smiley', pattern: ['😀', '😅', '😀', '😅', '😀', '😅', '😀', '?'], options: ['😀', '😅', '😡'], correct: '😅', ruleLabel: 'ABAB' },
  { id: 2, title: 'Wat komt nu?', instruction: 'Kies de emoji die past.', type: 'NEXT', slotCount: 8, category: 'smiley', pattern: ['😍', '😎', '😍', '😎', '😍', '😎', '😍', '?'], options: ['😍', '😎', '😴'], correct: '😎', ruleLabel: 'ABAB' },
  { id: 3, title: 'Wat komt nu?', instruction: 'Kies de emoji die past.', type: 'NEXT', slotCount: 10, category: 'smiley', pattern: ['🤔', '😡', '🤔', '😡', '🤔', '😡', '🤔', '😡', '🤔', '?'], options: ['🤔', '😡', '😅'], correct: '😡', ruleLabel: 'ABAB' },
  // 4-6: NEXT, ABC vehicles
  { id: 4, title: 'Volgende in de rij', instruction: 'Welke auto komt nu?', type: 'NEXT', slotCount: 9, category: 'vehicle', pattern: ['🚗', '🚌', '🚲', '🚗', '🚌', '🚲', '🚗', '🚌', '?'], options: ['🚗', '🚌', '🚲'], correct: '🚲', ruleLabel: 'ABC' },
  { id: 5, title: 'Vliegen of rijden?', instruction: 'Kijk naar het patroon.', type: 'NEXT', slotCount: 9, category: 'vehicle', pattern: ['✈️', '🚀', '🚑', '✈️', '🚀', '🚑', '✈️', '🚀', '?'], options: ['✈️', '🚀', '🚑'], correct: '🚑', ruleLabel: 'ABC' },
  { id: 6, title: 'Lange rij', instruction: 'Vul de laatste in.', type: 'NEXT', slotCount: 12, category: 'vehicle', pattern: ['🚒', '🚑', '🚀', '🚒', '🚑', '🚀', '🚒', '🚑', '🚀', '🚒', '🚑', '?'], options: ['🚒', '🚑', '🚀'], correct: '🚀', ruleLabel: 'ABC' },
  // 7-8: RULE (ABAB/ABC) hearts
  { id: 7, title: 'Welke regel?', instruction: 'Kies de juiste regel.', type: 'RULE', slotCount: 8, category: 'heart', pattern: ['❤️', '💙', '❤️', '💙', '❤️', '💙', '❤️', '💙'], options: ['ABAB', 'ABC', 'AABB'], correct: 'ABAB', ruleLabel: 'ABAB' },
  { id: 8, title: 'Welke regel?', instruction: 'Kies de juiste regel.', type: 'RULE', slotCount: 9, category: 'heart', pattern: ['🧡', '💛', '💚', '🧡', '💛', '💚', '🧡', '💛', '💚'], options: ['ABAB', 'ABC', 'ABB'], correct: 'ABC', ruleLabel: 'ABC' },
  // 9-10: ODD (1 fout) ABAB/AABB
  { id: 9, title: 'Zoek de fout', instruction: 'Eén emoji klopt niet. Klik er op.', type: 'ODD', slotCount: 8, category: 'smiley', pattern: ['😀', '😅', '😀', '😡', '😀', '😅', '😀', '😅'], options: [], correct: 3, ruleLabel: 'ABAB' },
  { id: 10, title: 'Zoek de fout', instruction: 'Klik op de foute emoji.', type: 'ODD', slotCount: 8, category: 'heart', pattern: ['❤️', '❤️', '💙', '💙', '❤️', '🧡', '💙', '💙'], options: [], correct: 5, ruleLabel: 'AABB' },
  // 11-12: ODD (Zoek de fout)
  { id: 11, title: 'Zoek de fout', instruction: 'Klik op de foute emoji.', type: 'ODD', slotCount: 10, category: 'heart', pattern: ['❤️', '💙', '❤️', '💙', '❤️', '🧡', '❤️', '💙', '❤️', '💙'], options: [], correct: 5, ruleLabel: 'ABAB' },
  { id: 12, title: 'Zoek de fout', instruction: 'Klik op de foute emoji.', type: 'ODD', slotCount: 12, category: 'vehicle', pattern: ['🚀', '🚀', '🚑', '🚀', '🚀', '🚑', '🚀', '✈️', '🚑', '🚀', '🚀', '🚑'], options: [], correct: 7, ruleLabel: 'AAB' },
  // 13-14: FILL (2 ?) ABC/AAB
  { id: 13, title: 'Vul de vakjes', instruction: 'Vul de 2 vraagtekens in.', type: 'FILL', slotCount: 9, category: 'vehicle', pattern: ['🚗', '?', '🚲', '🚗', '🚌', '?', '🚗', '🚌', '🚲'], options: ['🚗', '🚌', '🚲'], correct: ['🚌', '🚲'], ruleLabel: 'ABC' },
  { id: 14, title: 'Vul de vakjes', instruction: 'Vul de 2 vraagtekens in.', type: 'FILL', slotCount: 9, category: 'smiley', pattern: ['😀', '😀', '😅', '?', '😀', '😅', '😀', '?', '😅'], options: ['😀', '😅'], correct: ['😀', '😀'], ruleLabel: 'AAB' },
  // 15-16: ODD (difficult)
  { id: 15, title: 'Zoek de fout', instruction: 'Klik op de foute emoji.', type: 'ODD', slotCount: 10, category: 'heart', pattern: ['❤️', '🧡', '🧡', '💙', '❤️', '🧡', '💛', '💙', '❤️', '🧡'], options: [], correct: 6, ruleLabel: 'ABBC' },
  { id: 16, title: 'Zoek de fout', instruction: 'Klik op de foute emoji.', type: 'ODD', slotCount: 9, category: 'vehicle', pattern: ['✈️', '✈️', '🚀', '✈️', '🚑', '🚀', '✈️', '✈️', '🚀'], options: [], correct: 4, ruleLabel: 'AAB' },
  // 17-18: MIX Categories NEXT/FILL
  { id: 17, title: 'Mix patroon', instruction: 'Smiley of Hart?', type: 'NEXT', slotCount: 10, category: 'mix', pattern: ['😀', '❤️', '😀', '❤️', '😀', '❤️', '😀', '❤️', '😀', '?'], options: ['😀', '❤️', '😅', '💙'], correct: '❤️', ruleLabel: 'ABAB' },
  { id: 18, title: 'Mix patroon vullen', instruction: 'Vul de 2 gaten.', type: 'FILL', slotCount: 8, category: 'mix', pattern: ['🚀', '💙', '?', '💙', '🚀', '?', '🚀', '💙'], options: ['🚀', '💙'], correct: ['🚀', '💙'], ruleLabel: 'ABAB' },
  // 19-20: HARD MIX
  { id: 19, title: 'Super patroon', instruction: 'Vul de vraagtekens.', type: 'FILL', slotCount: 12, category: 'mix', pattern: ['😍', '😎', '💙', '😍', '?', '💙', '😍', '😎', '?', '😍', '😎', '💙'], options: ['😍', '😎', '💙'], correct: ['😎', '💙'], ruleLabel: 'ABC' },
  { id: 20, title: 'De laatste regel', instruction: 'Kies de regel van deze rij.', type: 'RULE', slotCount: 12, category: 'mix', pattern: ['🚗', '🚗', '🤔', '💙', '🚗', '🚗', '🤔', '💙', '🚗', '🚗', '🤔', '💙'], options: ['ABAB', 'ABC', 'AABB', 'AAB', 'ABB', 'ABBC'], correct: 'ABBC', ruleLabel: 'ABBC' },
  // 21-35: Mix levels (geen Tellen)
  { id: 21, title: 'Hart voor hartjes', instruction: 'Wat komt nu?', type: 'NEXT', slotCount: 10, category: 'heart', pattern: ['❤️', '❤️', '💙', '❤️', '❤️', '💙', '❤️', '❤️', '💙', '?'], options: ['❤️', '💙', '💛'], correct: '❤️', ruleLabel: 'AAB' },
  { id: 22, title: 'Moeilijke rij', instruction: 'Klik op de fout.', type: 'ODD', slotCount: 12, category: 'vehicle', pattern: ['🚗', '🚌', '🚲', '🚲', '🚗', '🚌', '🚲', '🚲', '🚗', '✈️', '🚲', '🚲'], options: [], correct: 9, ruleLabel: 'ABCC' },
  { id: 23, title: 'Welke regel past?', instruction: 'Kies de juiste regel.', type: 'RULE', slotCount: 10, category: 'smiley', pattern: ['😀', '😅', '😅', '😀', '😅', '😅', '😀', '😅', '😅', '😀'], options: ['ABAB', 'ABC', 'AABB', 'ABB'], correct: 'ABB', ruleLabel: 'ABB' },
  { id: 24, title: 'Vul het gat', instruction: 'Vul de 2 vraagtekens in.', type: 'FILL', slotCount: 9, category: 'heart', pattern: ['🧡', '💛', '💚', '🧡', '?', '💚', '🧡', '💛', '?'], options: ['🧡', '💛', '💚'], correct: ['💛', '💚'], ruleLabel: 'ABC' },
  { id: 25, title: 'Zoek de fout', instruction: 'Klik op de fout.', type: 'ODD', slotCount: 12, category: 'mix', pattern: ['😍', '😍', '🚀', '😍', '😍', '🚀', '😍', '💙', '🚀', '😍', '😍', '🚀'], options: [], correct: 7, ruleLabel: 'AAB' },
  { id: 26, title: 'Mix van alles', instruction: 'Wat komt er nu?', type: 'NEXT', slotCount: 12, category: 'mix', pattern: ['🚗', '❤️', '😀', '🚗', '❤️', '😀', '🚗', '❤️', '😀', '🚗', '❤️', '?'], options: ['🚗', '❤️', '😀', '💙'], correct: '😀', ruleLabel: 'ABC' },
  { id: 27, title: 'Welke regel?', instruction: 'Kies de juiste regel.', type: 'RULE', slotCount: 12, category: 'vehicle', pattern: ['🚀', '🚀', '🚑', '🚑', '🚀', '🚀', '🚑', '🚑', '🚀', '🚀', '🚑', '🚑'], options: ['ABAB', 'ABC', 'AABB', 'AAB', 'ABB'], correct: 'AABB', ruleLabel: 'AABB' },
  { id: 28, title: 'Vul de gaten', instruction: 'Vul de 2 vraagtekens in.', type: 'FILL', slotCount: 10, category: 'smiley', pattern: ['😀', '😅', '😍', '😎', '?', '😅', '😍', '😎', '😀', '?'], options: ['😀', '😅', '😍', '😎'], correct: ['😀', '😅'], ruleLabel: 'ABCD' },
  { id: 29, title: 'Zoek de fout', instruction: 'Klik op de fout.', type: 'ODD', slotCount: 10, category: 'heart', pattern: ['❤️', '🧡', '🧡', '❤️', '🧡', '💛', '❤️', '🧡', '🧡', '❤️'], options: [], correct: 5, ruleLabel: 'ABB' },
  { id: 30, title: 'Wat komt nu?', instruction: 'Vul de laatste in.', type: 'NEXT', slotCount: 12, category: 'vehicle', pattern: ['🚗', '🚗', '🚌', '🚗', '🚗', '🚌', '🚗', '🚗', '🚌', '🚗', '🚗', '?'], options: ['🚗', '🚌', '🚲'], correct: '🚌', ruleLabel: 'AAB' },
  { id: 31, title: 'Grote uitdaging', instruction: 'Vul de 2 vraagtekens in.', type: 'FILL', slotCount: 12, category: 'mix', pattern: ['💙', '💙', '🚀', '😀', '💙', '?', '🚀', '😀', '💙', '💙', '?', '😀'], options: ['💙', '🚀', '😀'], correct: ['💙', '🚀'], ruleLabel: 'AABC' },
  { id: 32, title: 'Zoek de fout', instruction: 'Klik op de fout.', type: 'ODD', slotCount: 12, category: 'smiley', pattern: ['😀', '😀', '😅', '😅', '😀', '😀', '😅', '😅', '😍', '😀', '😅', '😅'], options: [], correct: 8, ruleLabel: 'AABB' },
  { id: 33, title: 'Welke regel is dit?', instruction: 'Kies de juiste regel.', type: 'RULE', slotCount: 12, category: 'mix', pattern: ['🚗', '❤️', '❤️', '🚗', '❤️', '❤️', '🚗', '❤️', '❤️', '🚗', '❤️', '❤️'], options: ['ABAB', 'ABC', 'AABB', 'AAB', 'ABB'], correct: 'ABB', ruleLabel: 'ABB' },
  { id: 34, title: 'Wat komt hierna?', instruction: 'Kies de volgende.', type: 'NEXT', slotCount: 12, category: 'heart', pattern: ['❤️', '🧡', '💛', '💚', '❤️', '🧡', '💛', '💚', '❤️', '🧡', '💛', '?'], options: ['❤️', '🧡', '💛', '💚', '💙'], correct: '💚', ruleLabel: 'ABCD' },
  { id: 35, title: 'Laatste uitdaging', instruction: 'Vul de 2 vraagtekens in.', type: 'FILL', slotCount: 12, category: 'mix', pattern: ['😍', '😎', '?', '💙', '😍', '😎', '🚀', '?', '😍', '😎', '🚀', '💙'], options: ['😍', '😎', '🚀', '💙'], correct: ['🚀', '💙'], ruleLabel: 'ABCD' },
];
