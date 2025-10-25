import { Metadata } from "next";
import ProductIdeaGeneratorClient from "./_components/product-idea-generator-client";

export const metadata: Metadata = {
  title: "AI Product Ideas - Generate Marketable Product Concepts",
  description:
    "Generate innovative, marketable product ideas tailored to your industry, audience, and goals with our AI-powered Product Ideas tool.",
  openGraph: {
    title: "AI Product Ideas - Generate Marketable Product Concepts",
    description:
      "Generate innovative, marketable product ideas tailored to your industry, audience, and goals with our AI-powered Product Ideas tool.",
  },
};

export default function ProductIdeaGeneratorPage() {
  return <ProductIdeaGeneratorClient />;
}