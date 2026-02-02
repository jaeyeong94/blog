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
    <div className="flex gap-2 flex-wrap">
      {allCategories.map((cat) => (
        <button
          key={cat}
          onClick={() => onCategoryChange(cat)}
          className={`px-3 py-2 rounded-lg text-xs font-medium transition-all
            ${
              activeCategory === cat
                ? 'bg-[#b8956a] text-white shadow-paper'
                : 'bg-[#201d1b] border border-[#2a2725] text-[#9c9080] hover:bg-[#252220] hover:text-[#f0ebe4]'
            }`}
        >
          {cat}
        </button>
      ))}
    </div>
  );
}
