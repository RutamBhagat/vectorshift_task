import {
  ArrowRight,
  Bug,
  FileText,
  Filter,
  Globe,
  Layers,
  LogIn,
  MessageSquare,
  Wand2,
} from "lucide-react";

export const nodes = [
  { type: "customInput", label: "Input", icon: LogIn },
  { type: "llm", label: "LLM", icon: MessageSquare },
  { type: "customOutput", label: "Output", icon: ArrowRight },
  { type: "text", label: "Text", icon: FileText },
  { type: "aggeregate", label: "Aggregate", icon: Layers },
  { type: "debug", label: "Debug", icon: Bug },
  { type: "filter", label: "Filter", icon: Filter },
  { type: "http", label: "Http", icon: Globe },
  { type: "transform", label: "Transform", icon: Wand2 },
];
