import {
  type User,
  type InsertUser,
  type Artisan,
  type InsertArtisan,
  type Category,
  type InsertCategory,
  type ContactMessage,
  type InsertContactMessage,
} from "@shared/schema";
import { randomUUID } from "crypto";

export interface IStorage {
  getUser(id: string): Promise<User | undefined>;
  getUserByUsername(username: string): Promise<User | undefined>;
  createUser(user: InsertUser): Promise<User>;

  getCategories(): Promise<Category[]>;
  getCategory(id: string): Promise<Category | undefined>;
  createCategory(category: InsertCategory): Promise<Category>;

  getArtisans(filters?: {
    category?: string;
    search?: string;
    minRating?: number;
  }): Promise<Artisan[]>;
  getArtisan(id: string): Promise<Artisan | undefined>;
  createArtisan(artisan: InsertArtisan): Promise<Artisan>;

  createContactMessage(message: InsertContactMessage): Promise<ContactMessage>;
}

export class MemStorage implements IStorage {
  private users: Map<string, User>;
  private categories: Map<string, Category>;
  private artisans: Map<string, Artisan>;
  private contactMessages: Map<string, ContactMessage>;

  constructor() {
    this.users = new Map();
    this.categories = new Map();
    this.artisans = new Map();
    this.contactMessages = new Map();
    this.seedData();
  }

  private seedData() {
    const categories: Category[] = [
      {
        id: 'cooking',
        nameEn: 'Traditional Cooking',
        nameFr: 'Cuisine Traditionnelle',
        nameAr: 'الطبخ التقليدي',
        descriptionEn: 'Authentic Algerian cuisine and traditional dishes',
        descriptionFr: 'Cuisine algérienne authentique et plats traditionnels',
        descriptionAr: 'المطبخ الجزائري الأصيل والأطباق التقليدية',
        icon: 'cooking',
      },
      {
        id: 'sewing',
        nameEn: 'Sewing & Tailoring',
        nameFr: 'Couture & Retouche',
        nameAr: 'الخياطة والتفصيل',
        descriptionEn: 'Traditional dresses and modern clothing alterations',
        descriptionFr: 'Robes traditionnelles et retouches modernes',
        descriptionAr: 'الفساتين التقليدية وتعديل الملابس الحديثة',
        icon: 'sewing',
      },
      {
        id: 'repairs',
        nameEn: 'Repairs & Maintenance',
        nameFr: 'Réparations & Maintenance',
        nameAr: 'الإصلاح والصيانة',
        descriptionEn: 'Home repairs, plumbing, electrical work',
        descriptionFr: 'Réparations domestiques, plomberie, électricité',
        descriptionAr: 'إصلاحات منزلية، سباكة، كهرباء',
        icon: 'repairs',
      },
      {
        id: 'cleaning',
        nameEn: 'Cleaning Services',
        nameFr: 'Services de Nettoyage',
        nameAr: 'خدمات التنظيف',
        descriptionEn: 'Professional home and office cleaning',
        descriptionFr: 'Nettoyage professionnel de maisons et bureaux',
        descriptionAr: 'تنظيف احترافي للمنازل والمكاتب',
        icon: 'cleaning',
      },
    ];

    categories.forEach(cat => this.categories.set(cat.id, cat));

    const artisans: Artisan[] = [
      {
        id: randomUUID(),
        nameEn: 'Fatima Benali',
        nameFr: 'Fatima Benali',
        nameAr: 'فاطمة بن علي',
        categoryId: 'cooking',
        bioEn: 'Specialist in traditional Algerian cuisine with over 20 years of experience. Known for authentic couscous, tajines, and traditional pastries.',
        bioFr: 'Spécialiste de la cuisine algérienne traditionnelle avec plus de 20 ans d\'expérience. Reconnue pour le couscous authentique, les tajines et les pâtisseries traditionnelles.',
        bioAr: 'متخصصة في المطبخ الجزائري التقليدي مع أكثر من 20 عامًا من الخبرة. معروفة بالكسكس الأصيل والطواجن والحلويات التقليدية.',
        servicesEn: ['Couscous', 'Tajines', 'Traditional Pastries', 'Wedding Catering'],
        servicesFr: ['Couscous', 'Tajines', 'Pâtisseries Traditionnelles', 'Traiteur Mariage'],
        servicesAr: ['كسكس', 'طواجن', 'حلويات تقليدية', 'خدمات الأعراس'],
        location: 'Algiers',
        phone: '+213 555 123 456',
        email: 'fatima.benali@example.com',
        priceRange: '$$',
        rating: 4.8,
        reviewCount: 127,
        profileImage: 'https://api.dicebear.com/7.x/avataaars/svg?seed=Fatima',
        portfolioImages: [
          'https://images.unsplash.com/photo-1546069901-ba9599a7e63c?w=600',
          'https://images.unsplash.com/photo-1555939594-58d7cb561ad1?w=600',
        ],
        featured: 1,
      },
      {
        id: randomUUID(),
        nameEn: 'Amina Khelifi',
        nameFr: 'Amina Khelifi',
        nameAr: 'أمينة خليفي',
        categoryId: 'sewing',
        bioEn: 'Expert seamstress specializing in traditional Algerian dresses and modern alterations. Creates beautiful kaftans and custom clothing.',
        bioFr: 'Couturière experte spécialisée dans les robes algériennes traditionnelles et les retouches modernes. Crée de magnifiques kaftans et vêtements sur mesure.',
        bioAr: 'خياطة خبيرة متخصصة في الفساتين الجزائرية التقليدية والتعديلات الحديثة. تصنع قفاطين جميلة وملابس مخصصة.',
        servicesEn: ['Traditional Dresses', 'Kaftans', 'Alterations', 'Custom Designs'],
        servicesFr: ['Robes Traditionnelles', 'Kaftans', 'Retouches', 'Créations Sur Mesure'],
        servicesAr: ['فساتين تقليدية', 'قفاطين', 'تعديلات', 'تصاميم مخصصة'],
        location: 'Oran',
        phone: '+213 555 234 567',
        email: 'amina.khelifi@example.com',
        priceRange: '$$$',
        rating: 4.9,
        reviewCount: 89,
        profileImage: 'https://api.dicebear.com/7.x/avataaars/svg?seed=Amina',
        portfolioImages: [
          'https://images.unsplash.com/photo-1558769132-cb1aea9c6111?w=600',
          'https://images.unsplash.com/photo-1539533018447-63fcce2678e3?w=600',
        ],
        featured: 1,
      },
      {
        id: randomUUID(),
        nameEn: 'Karim Mansouri',
        nameFr: 'Karim Mansouri',
        nameAr: 'كريم منصوري',
        categoryId: 'repairs',
        bioEn: 'Professional handyman with expertise in plumbing, electrical work, and general home repairs. Reliable and efficient service.',
        bioFr: 'Bricoleur professionnel avec expertise en plomberie, électricité et réparations générales. Service fiable et efficace.',
        bioAr: 'فني محترف خبير في السباكة والكهرباء والإصلاحات المنزلية العامة. خدمة موثوقة وفعالة.',
        servicesEn: ['Plumbing', 'Electrical Work', 'Home Repairs', 'Appliance Installation'],
        servicesFr: ['Plomberie', 'Électricité', 'Réparations', 'Installation d\'Appareils'],
        servicesAr: ['سباكة', 'كهرباء', 'إصلاحات منزلية', 'تركيب الأجهزة'],
        location: 'Constantine',
        phone: '+213 555 345 678',
        priceRange: '$$',
        rating: 4.7,
        reviewCount: 156,
        profileImage: 'https://api.dicebear.com/7.x/avataaars/svg?seed=Karim',
        portfolioImages: [
          'https://images.unsplash.com/photo-1581578731548-c64695cc6952?w=600',
        ],
        featured: 0,
      },
      {
        id: randomUUID(),
        nameEn: 'Salma Bouazza',
        nameFr: 'Salma Bouazza',
        nameAr: 'سلمى بوعزة',
        categoryId: 'cleaning',
        bioEn: 'Professional cleaning specialist providing thorough and eco-friendly cleaning services for homes and offices.',
        bioFr: 'Spécialiste du nettoyage professionnel offrant des services de nettoyage minutieux et écologiques pour maisons et bureaux.',
        bioAr: 'متخصصة تنظيف محترفة توفر خدمات تنظيف شاملة وصديقة للبيئة للمنازل والمكاتب.',
        servicesEn: ['Deep Cleaning', 'Regular Maintenance', 'Office Cleaning', 'Move-in/Move-out'],
        servicesFr: ['Nettoyage en Profondeur', 'Entretien Régulier', 'Nettoyage de Bureau', 'Déménagement'],
        servicesAr: ['تنظيف عميق', 'صيانة منتظمة', 'تنظيف المكاتب', 'تنظيف عند الانتقال'],
        location: 'Annaba',
        phone: '+213 555 456 789',
        email: 'salma.bouazza@example.com',
        priceRange: '$',
        rating: 4.6,
        reviewCount: 98,
        profileImage: 'https://api.dicebear.com/7.x/avataaars/svg?seed=Salma',
        portfolioImages: [],
        featured: 0,
      },
      {
        id: randomUUID(),
        nameEn: 'Nadia Hamidi',
        nameFr: 'Nadia Hamidi',
        nameAr: 'نادية حميدي',
        categoryId: 'cooking',
        bioEn: 'Traditional pastry chef specializing in Algerian sweets and desserts. Perfect for special occasions and celebrations.',
        bioFr: 'Pâtissière traditionnelle spécialisée dans les douceurs et desserts algériens. Parfait pour les occasions spéciales.',
        bioAr: 'صانعة حلويات تقليدية متخصصة في الحلويات الجزائرية. مثالية للمناسبات الخاصة والاحتفالات.',
        servicesEn: ['Traditional Sweets', 'Wedding Cakes', 'Baklava', 'Makroud'],
        servicesFr: ['Douceurs Traditionnelles', 'Gâteaux de Mariage', 'Baklava', 'Makroud'],
        servicesAr: ['حلويات تقليدية', 'كعك الأعراس', 'بقلاوة', 'مقروض'],
        location: 'Blida',
        phone: '+213 555 567 890',
        priceRange: '$$',
        rating: 4.9,
        reviewCount: 143,
        profileImage: 'https://api.dicebear.com/7.x/avataaars/svg?seed=Nadia',
        portfolioImages: [
          'https://images.unsplash.com/photo-1587241321921-91a834d82b01?w=600',
          'https://images.unsplash.com/photo-1486427944299-d1955d23e34d?w=600',
        ],
        featured: 1,
      },
      {
        id: randomUUID(),
        nameEn: 'Leila Meziane',
        nameFr: 'Leila Meziane',
        nameAr: 'ليلى مزيان',
        categoryId: 'sewing',
        bioEn: 'Young talented seamstress offering modern alterations and custom clothing at affordable prices.',
        bioFr: 'Jeune couturière talentueuse offrant des retouches modernes et vêtements sur mesure à prix abordables.',
        bioAr: 'خياطة شابة موهوبة تقدم تعديلات حديثة وملابس مخصصة بأسعار معقولة.',
        servicesEn: ['Alterations', 'Custom Clothing', 'Repairs', 'Embroidery'],
        servicesFr: ['Retouches', 'Vêtements Sur Mesure', 'Réparations', 'Broderie'],
        servicesAr: ['تعديلات', 'ملابس مخصصة', 'إصلاحات', 'تطريز'],
        location: 'Tlemcen',
        phone: '+213 555 678 901',
        priceRange: '$',
        rating: 4.5,
        reviewCount: 54,
        profileImage: 'https://api.dicebear.com/7.x/avataaars/svg?seed=Leila',
        portfolioImages: [],
        featured: 0,
      },
    ];

    artisans.forEach(artisan => this.artisans.set(artisan.id, artisan));
  }

  async getUser(id: string): Promise<User | undefined> {
    return this.users.get(id);
  }

  async getUserByUsername(username: string): Promise<User | undefined> {
    return Array.from(this.users.values()).find(
      (user) => user.username === username,
    );
  }

  async createUser(insertUser: InsertUser): Promise<User> {
    const id = randomUUID();
    const user: User = { ...insertUser, id };
    this.users.set(id, user);
    return user;
  }

  async getCategories(): Promise<Category[]> {
    return Array.from(this.categories.values());
  }

  async getCategory(id: string): Promise<Category | undefined> {
    return this.categories.get(id);
  }

  async createCategory(insertCategory: InsertCategory): Promise<Category> {
    const id = randomUUID();
    const category: Category = { ...insertCategory, id };
    this.categories.set(id, category);
    return category;
  }

  async getArtisans(filters?: {
    category?: string;
    search?: string;
    minRating?: number;
  }): Promise<Artisan[]> {
    let artisans = Array.from(this.artisans.values());

    if (filters?.category && filters.category !== 'all') {
      artisans = artisans.filter(a => a.categoryId === filters.category);
    }

    if (filters?.search) {
      const searchLower = filters.search.toLowerCase();
      artisans = artisans.filter(a =>
        a.nameEn.toLowerCase().includes(searchLower) ||
        a.nameFr.toLowerCase().includes(searchLower) ||
        a.nameAr.includes(filters.search!) ||
        a.location.toLowerCase().includes(searchLower) ||
        a.bioEn.toLowerCase().includes(searchLower) ||
        a.bioFr.toLowerCase().includes(searchLower) ||
        a.bioAr.includes(filters.search!)
      );
    }

    if (filters?.minRating) {
      artisans = artisans.filter(a => a.rating >= filters.minRating!);
    }

    return artisans;
  }

  async getArtisan(id: string): Promise<Artisan | undefined> {
    return this.artisans.get(id);
  }

  async createArtisan(insertArtisan: InsertArtisan): Promise<Artisan> {
    const id = randomUUID();
    const artisan: Artisan = {
      ...insertArtisan,
      id,
      rating: 0,
      reviewCount: 0,
      featured: 0,
    };
    this.artisans.set(id, artisan);
    return artisan;
  }

  async createContactMessage(
    insertMessage: InsertContactMessage,
  ): Promise<ContactMessage> {
    const id = randomUUID();
    const message: ContactMessage = {
      ...insertMessage,
      id,
      createdAt: new Date().toISOString(),
    };
    this.contactMessages.set(id, message);
    return message;
  }
}

export const storage = new MemStorage();
