import windowImage from '~/assets/img/window.svg'

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

export interface Product {
  id: string
  title: string
  summary: string
  description: string
  image: string
  categoryId: string
  count: number
  rating: number
}

export const sortOptions: SortOption[] = [
  { id: 'count-asc', label: 'تعداد: کم به زیاد', chip: 'تعداد', direction: 'asc' },
  { id: 'count-desc', label: 'تعداد: زیاد به کم', chip: 'تعداد', direction: 'desc' },
  { id: 'rating-desc', label: 'رتبه: زیاد به کم', chip: 'رتبه', direction: 'desc' },
  { id: 'rating-asc', label: 'رتبه: کم به زیاد', chip: 'رتبه', direction: 'asc' },
]

export const categories: CategoryOption[] = [
  { id: 'housing', label: 'مسکن و ساختمان', count: 13 },
  { id: 'health', label: 'بهداشت و درمان', count: 23 },
  { id: 'industry', label: 'صنعتی و کارخانه', count: 4 },
]

const title = 'درب اتوماتیک بازویی Face مدل SW2'

export const products: Product[] = Array.from({ length: 12 }, (_, index) => ({
  id: String(index + 1),
  title,
  summary: title,
  description: 'جزئیات این محصول پس از اتصال به سرویس، از همین صفحه نمایش داده می‌شود.',
  image: windowImage,
  categoryId: 'housing',
  count: index + 1,
  rating: 5 - (index % 4),
}))

export function findProduct(id: string) {
  return products.find(product => product.id === id)
}
