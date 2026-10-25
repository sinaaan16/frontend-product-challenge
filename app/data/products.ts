export type SortOptionId = 'count-asc' | 'count-desc' | 'rating-desc' | 'rating-asc'

export interface SortOption {
  id: SortOptionId
  label: string
  chip: string
  direction: 'asc' | 'desc'
}

export interface CategoryOption {
  id: string
  label: string
  count: number
}

export interface ApiProduct {
  id: number
  title: string
  price: number
  description: string
  category: string
  image: string
  rating?: {
    rate: number
    count: number
  }
}

export interface Product {
  id: string
  title: string
  price: number
  description: string
  image: string
  categoryId: string
  categoryLabel: string
  count: number
  rating: number
}

export const PRODUCTS_API_URL = 'https://fakestoreapi.com/products'

export const sortOptions: SortOption[] = [
  { id: 'count-asc', label: 'تعداد: کم به زیاد', chip: 'تعداد', direction: 'asc' },
  { id: 'count-desc', label: 'تعداد: زیاد به کم', chip: 'تعداد', direction: 'desc' },
  { id: 'rating-desc', label: 'رتبه: زیاد به کم', chip: 'رتبه', direction: 'desc' },
  { id: 'rating-asc', label: 'رتبه: کم به زیاد', chip: 'رتبه', direction: 'asc' },
]

const categoryLabels: Record<string, string> = {
  "men's clothing": 'پوشاک مردانه',
  "women's clothing": 'پوشاک زنانه',
  jewelery: 'جواهرات',
  electronics: 'الکترونیک',
}

export function formatCategoryLabel(category: string): string {
  return categoryLabels[category] ?? category
}

export function normalizeProduct(item: ApiProduct): Product {
  return {
    id: String(item.id),
    title: item.title,
    price: item.price,
    description: item.description,
    image: item.image,
    categoryId: item.category,
    categoryLabel: formatCategoryLabel(item.category),
    count: item.rating?.count ?? 0,
    rating: item.rating?.rate ?? 0,
  }
}

export function buildCategories(products: Product[]): CategoryOption[] {
  const counts = new Map<string, number>()

  for (const product of products) {
    counts.set(product.categoryId, (counts.get(product.categoryId) ?? 0) + 1)
  }

  return Array.from(counts, ([id, count]) => ({
    id,
    label: formatCategoryLabel(id),
    count,
  }))
}
