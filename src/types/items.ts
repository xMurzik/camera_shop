type TAllower = 'Коллекционная' | 'Моментальная' | 'Цифровая' | 'Плёночная';
type TLevel = 'Нулевой' | 'Любительский' | 'Профессиональный';
type TCategory = 'Видеокамера' | 'Фотоаппарат';

export interface IItem {
  id: number;
  name: string;
  vendorCode: string;
  type: TAllower;
  category: TCategory;
  description: string;
  level: TLevel;
  price: number;
  rating: number;
  reviewCount: number;
  previewImg: string;
  previewImg2x: string;
  previewImgWebp: string;
  previewImgWebp2x: string;
}
