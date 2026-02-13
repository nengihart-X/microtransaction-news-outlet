"use client"

import { categories } from "@/lib/data"

interface CategoryFilterProps {
  selected: string
  onSelect: (category: string) => void
}

export function CategoryFilter({ selected, onSelect }: CategoryFilterProps) {
  return (
    <div className="flex items-center gap-1 overflow-x-auto pb-1">
      {categories.map((cat) => (
        <button
          key={cat}
          onClick={() => onSelect(cat)}
          className={`shrink-0 rounded-full px-4 py-1.5 text-sm font-medium transition-colors ${
            selected === cat
              ? "bg-primary text-primary-foreground"
              : "bg-secondary text-muted-foreground hover:bg-muted hover:text-foreground"
          }`}
        >
          {cat}
        </button>
      ))}
    </div>
  )
}
