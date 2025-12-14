'use client';

interface CategoryFilterProps {
  categories: string[];
  activeCategory: string;
  onCategoryChange: (category: string) => void;
}

export default function CategoryFilter({
  categories,
  activeCategory,
  onCategoryChange,
}: CategoryFilterProps) {
  const allCategories = ['ALL', ...categories];

  return (
    <div className="flex gap-2 mb-7 flex-wrap">
      {allCategories.map((cat) => (
        <button
          key={cat}
          onClick={() => onCategoryChange(cat)}
          className={`px-4 py-2.5 rounded-md border text-xs font-medium font-mono transition-all
            ${
              activeCategory === cat
                ? 'border-accent bg-accent/10 text-accent'
                : 'border-[rgba(126,184,255,0.08)] bg-transparent text-textMuted hover:bg-accent/10 hover:text-accent hover:border-accent/50'
            }`}
        >
          {cat}
        </button>
      ))}
    </div>
  );
}
