// Shared types matching the Prisma schema + API responses

export interface Service {
  id: string;
  slug: string;
  name: string;
  category: string;
  tagline: string;
  description: string;
  price: number;
  durationMin: number;
  image: string;
  featured: boolean;
  sortOrder: number;
}

export interface Doctor {
  id: string;
  name: string;
  title: string;
  credentials: string;
  bio: string;
  image: string;
  specialty: string;
  experienceY: number;
  sortOrder: number;
}

export interface Review {
  id: string;
  name: string;
  rating: number;
  treatment: string;
  text: string;
  location: string;
  featured: boolean;
  createdAt: string;
}

export interface SkinConcern {
  name: string;
  severity: "mild" | "moderate" | "advanced";
  score: number;
}

export interface SkinRecommendation {
  treatment: string;
  reason: string;
  priority: "high" | "medium" | "low";
}

export interface SkinAnalysis {
  overallScore: number;
  skinType: string;
  concerns: SkinConcern[];
  strengths: string[];
  recommendations: SkinRecommendation[];
  summary: string;
}

export interface ChatMessage {
  role: "user" | "assistant";
  content: string;
}
