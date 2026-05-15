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
        nameEn: 'Home Cooking',
        nameFr: 'Cuisine Maison',
        nameAr: 'الطبخ المنزلي',
        descriptionEn: 'Traditional & home-cooked meals, pastries and catering',
        descriptionFr: 'Repas traditionnels, pâtisseries et traiteur',
        descriptionAr: 'الوجبات التقليدية والمنزلية والحلويات والخدمات',
        icon: 'cooking',
      },
      {
        id: 'sewing',
        nameEn: 'Sewing & Fashion',
        nameFr: 'Couture & Mode',
        nameAr: 'الخياطة والأزياء',
        descriptionEn: 'Custom clothing, alterations, embroidery and fashion design',
        descriptionFr: 'Vêtements sur mesure, retouches et broderie',
        descriptionAr: 'الملابس المخصصة والتعديلات والتطريز',
        icon: 'sewing',
      },
      {
        id: 'repairs',
        nameEn: 'Repairs & Maintenance',
        nameFr: 'Réparations & Maintenance',
        nameAr: 'الإصلاح والصيانة',
        descriptionEn: 'Home repairs, plumbing, electrical and handyman services',
        descriptionFr: 'Réparations, plomberie et électricité',
        descriptionAr: 'إصلاحات منزلية وسباكة وكهرباء',
        icon: 'repairs',
      },
      {
        id: 'cleaning',
        nameEn: 'Cleaning Services',
        nameFr: 'Services de Nettoyage',
        nameAr: 'خدمات التنظيف',
        descriptionEn: 'Professional home, office and deep cleaning',
        descriptionFr: 'Nettoyage professionnel de maisons et bureaux',
        descriptionAr: 'تنظيف احترافي للمنازل والمكاتب',
        icon: 'cleaning',
      },
      {
        id: 'design',
        nameEn: 'Design & Creative',
        nameFr: 'Design & Créatif',
        nameAr: 'التصميم والإبداع',
        descriptionEn: 'Graphic design, logo, illustration, calligraphy and visual arts',
        descriptionFr: 'Design graphique, logo, illustration et arts visuels',
        descriptionAr: 'التصميم الجرافيكي والشعار والرسم والخط العربي',
        icon: 'design',
      },
      {
        id: 'tutoring',
        nameEn: 'Tutoring & Education',
        nameFr: 'Cours & Éducation',
        nameAr: 'الدروس والتعليم',
        descriptionEn: 'Private lessons, tutoring, language learning and skill coaching',
        descriptionFr: 'Cours particuliers, soutien scolaire et langues',
        descriptionAr: 'دروس خصوصية ودعم دراسي وتعلم اللغات',
        icon: 'tutoring',
      },
      {
        id: 'beauty',
        nameEn: 'Beauty & Wellness',
        nameFr: 'Beauté & Bien-être',
        nameAr: 'الجمال والعناية',
        descriptionEn: 'Makeup, hair styling, skincare, henna and wellness services',
        descriptionFr: 'Maquillage, coiffure, soins de la peau et henné',
        descriptionAr: 'المكياج والشعر والعناية بالبشرة والحناء',
        icon: 'beauty',
      },
      {
        id: 'tech',
        nameEn: 'Technology & IT',
        nameFr: 'Technologie & Informatique',
        nameAr: 'التكنولوجيا والمعلوماتية',
        descriptionEn: 'Web development, IT support, social media and digital services',
        descriptionFr: 'Développement web, support IT et réseaux sociaux',
        descriptionAr: 'تطوير الويب ودعم تقنية المعلومات والتسويق الرقمي',
        icon: 'tech',
      },
    ];

    categories.forEach(cat => this.categories.set(cat.id, cat));

    const artisans: Artisan[] = [
      // COOKING
      {
        id: randomUUID(),
        nameEn: 'Fatima Benali',
        nameFr: 'Fatima Benali',
        nameAr: 'فاطمة بن علي',
        categoryId: 'cooking',
        bioEn: 'Specialist in traditional Algerian cuisine with over 20 years of experience. Known for authentic couscous, tajines, and traditional pastries.',
        bioFr: 'Spécialiste de la cuisine algérienne traditionnelle avec plus de 20 ans d\'expérience. Reconnue pour le couscous authentique, les tajines et les pâtisseries.',
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
        nameEn: 'Nadia Hamidi',
        nameFr: 'Nadia Hamidi',
        nameAr: 'نادية حميدي',
        categoryId: 'cooking',
        bioEn: 'Traditional pastry chef specializing in Algerian sweets and desserts. Perfect for special occasions and celebrations.',
        bioFr: 'Pâtissière spécialisée dans les douceurs et desserts algériens. Parfait pour les occasions spéciales.',
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
      // SEWING
      {
        id: randomUUID(),
        nameEn: 'Amina Khelifi',
        nameFr: 'Amina Khelifi',
        nameAr: 'أمينة خليفي',
        categoryId: 'sewing',
        bioEn: 'Expert seamstress specializing in traditional Algerian dresses and modern alterations. Creates beautiful kaftans and custom clothing.',
        bioFr: 'Couturière experte spécialisée dans les robes algériennes traditionnelles et les retouches modernes. Crée de magnifiques kaftans.',
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
        nameEn: 'Leila Meziane',
        nameFr: 'Leila Meziane',
        nameAr: 'ليلى مزيان',
        categoryId: 'sewing',
        bioEn: 'Young talented seamstress offering modern alterations, embroidery, and custom clothing at affordable prices.',
        bioFr: 'Jeune couturière talentueuse offrant des retouches modernes, broderie et vêtements sur mesure à prix abordables.',
        bioAr: 'خياطة شابة موهوبة تقدم تعديلات حديثة وتطريزاً وملابس مخصصة بأسعار معقولة.',
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
      // REPAIRS
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
      // CLEANING
      {
        id: randomUUID(),
        nameEn: 'Salma Bouazza',
        nameFr: 'Salma Bouazza',
        nameAr: 'سلمى بوعزة',
        categoryId: 'cleaning',
        bioEn: 'Professional cleaning specialist providing thorough and eco-friendly cleaning services for homes and offices.',
        bioFr: 'Spécialiste du nettoyage offrant des services de nettoyage minutieux et écologiques pour maisons et bureaux.',
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
      // DESIGN
      {
        id: randomUUID(),
        nameEn: 'Rania Boucherit',
        nameFr: 'Rania Boucherit',
        nameAr: 'رانيا بوشريط',
        categoryId: 'design',
        bioEn: 'Creative graphic designer with 6 years of experience in branding, logo design, social media visuals, and Arabic calligraphy art.',
        bioFr: 'Designer graphique créative avec 6 ans d\'expérience en branding, logos, visuels pour réseaux sociaux et calligraphie arabe.',
        bioAr: 'مصممة جرافيك إبداعية مع 6 سنوات خبرة في تصميم الهوية التجارية والشعارات ومحتوى السوشيال ميديا والخط العربي.',
        servicesEn: ['Logo Design', 'Brand Identity', 'Social Media Graphics', 'Arabic Calligraphy'],
        servicesFr: ['Design de Logo', 'Identité de Marque', 'Visuels Réseaux Sociaux', 'Calligraphie Arabe'],
        servicesAr: ['تصميم الشعار', 'هوية بصرية', 'جرافيك سوشيال ميديا', 'خط عربي'],
        location: 'Algiers',
        phone: '+213 555 111 222',
        email: 'rania.design@example.com',
        priceRange: '$$',
        rating: 4.9,
        reviewCount: 211,
        profileImage: 'https://api.dicebear.com/7.x/avataaars/svg?seed=Rania',
        portfolioImages: [
          'https://images.unsplash.com/photo-1561070791-2526d30994b5?w=600',
          'https://images.unsplash.com/photo-1558655146-9f40138edfeb?w=600',
        ],
        featured: 1,
      },
      {
        id: randomUUID(),
        nameEn: 'Younes Hadjab',
        nameFr: 'Younes Hadjab',
        nameAr: 'يونس حجاب',
        categoryId: 'design',
        bioEn: 'Freelance illustrator and UI/UX designer. Specializes in digital illustration, app mockups, and creative visual storytelling.',
        bioFr: 'Illustrateur freelance et designer UI/UX. Spécialisé en illustration numérique, maquettes d\'applications et narration visuelle.',
        bioAr: 'مصور توضيحي ومصمم UI/UX مستقل. متخصص في الرسم الرقمي والنماذج التجريبية للتطبيقات.',
        servicesEn: ['Digital Illustration', 'UI/UX Design', 'App Mockups', 'Motion Graphics'],
        servicesFr: ['Illustration Numérique', 'Design UI/UX', 'Maquettes d\'App', 'Motion Graphics'],
        servicesAr: ['رسم رقمي', 'تصميم UI/UX', 'نماذج تطبيقات', 'موشن جرافيك'],
        location: 'Oran',
        phone: '+213 555 333 444',
        priceRange: '$$$',
        rating: 4.7,
        reviewCount: 78,
        profileImage: 'https://api.dicebear.com/7.x/avataaars/svg?seed=Younes',
        portfolioImages: [
          'https://images.unsplash.com/photo-1626785774573-4b799315345d?w=600',
        ],
        featured: 0,
      },
      // TUTORING
      {
        id: randomUUID(),
        nameEn: 'Samia Ferhat',
        nameFr: 'Samia Ferhat',
        nameAr: 'سامية فرحات',
        categoryId: 'tutoring',
        bioEn: 'Passionate math and science tutor with a master\'s degree in mathematics. Specializes in high school and university-level preparation.',
        bioFr: 'Professeure passionnée en maths et sciences avec un master en mathématiques. Spécialisée en préparation lycée et université.',
        bioAr: 'مدرّسة متحمسة في الرياضيات والعلوم بشهادة ماستر في الرياضيات. متخصصة في التحضير للثانوية والجامعة.',
        servicesEn: ['Math Tutoring', 'Physics', 'Exam Prep (BAC)', 'University Entrance', 'Online Sessions'],
        servicesFr: ['Cours de Maths', 'Physique', 'Préparation BAC', 'Accès Université', 'Sessions en Ligne'],
        servicesAr: ['دروس رياضيات', 'فيزياء', 'تحضير البكالوريا', 'دخول الجامعة', 'جلسات أونلاين'],
        location: 'Constantine',
        phone: '+213 555 555 666',
        email: 'samia.ferhat@example.com',
        priceRange: '$',
        rating: 4.8,
        reviewCount: 164,
        profileImage: 'https://api.dicebear.com/7.x/avataaars/svg?seed=Samia',
        portfolioImages: [],
        featured: 1,
      },
      {
        id: randomUUID(),
        nameEn: 'Omar Bendjelloul',
        nameFr: 'Omar Bendjelloul',
        nameAr: 'عمر بن جلول',
        categoryId: 'tutoring',
        bioEn: 'Certified English and French language instructor. Offers conversational classes, business English, and IELTS preparation for all levels.',
        bioFr: 'Instructeur certifié en anglais et français. Cours de conversation, anglais des affaires et préparation IELTS pour tous niveaux.',
        bioAr: 'مدرب لغة إنجليزية وفرنسية معتمد. دروس محادثة وإنجليزية أعمال وتحضير IELTS لجميع المستويات.',
        servicesEn: ['English Lessons', 'French Lessons', 'IELTS Prep', 'Business English', 'Kids Classes'],
        servicesFr: ['Cours d\'Anglais', 'Cours de Français', 'Prépa IELTS', 'Anglais Pro', 'Cours Enfants'],
        servicesAr: ['دروس إنجليزية', 'دروس فرنسية', 'تحضير IELTS', 'إنجليزية أعمال', 'دروس أطفال'],
        location: 'Algiers',
        phone: '+213 555 777 888',
        priceRange: '$$',
        rating: 4.9,
        reviewCount: 203,
        profileImage: 'https://api.dicebear.com/7.x/avataaars/svg?seed=Omar',
        portfolioImages: [],
        featured: 0,
      },
      // BEAUTY
      {
        id: randomUUID(),
        nameEn: 'Houda Ziani',
        nameFr: 'Houda Ziani',
        nameAr: 'هدى زياني',
        categoryId: 'beauty',
        bioEn: 'Professional makeup artist specializing in bridal, editorial, and event makeup. Trained in Paris with 8 years of experience.',
        bioFr: 'Maquilleuse professionnelle spécialisée en maquillage de mariée, éditorial et événements. Formée à Paris avec 8 ans d\'expérience.',
        bioAr: 'فنانة مكياج احترافية متخصصة في مكياج العرائس والمناسبات. درّبت في باريس مع 8 سنوات خبرة.',
        servicesEn: ['Bridal Makeup', 'Event Makeup', 'Skincare', 'Henna', 'Lashes'],
        servicesFr: ['Maquillage Mariée', 'Maquillage Événement', 'Soins Peau', 'Henné', 'Cils'],
        servicesAr: ['مكياج العرائس', 'مكياج مناسبات', 'عناية بالبشرة', 'حناء', 'رموش'],
        location: 'Algiers',
        phone: '+213 555 999 000',
        email: 'houda.ziani@example.com',
        priceRange: '$$$',
        rating: 5.0,
        reviewCount: 312,
        profileImage: 'https://api.dicebear.com/7.x/avataaars/svg?seed=Houda',
        portfolioImages: [
          'https://images.unsplash.com/photo-1487412947147-5cebf100ffc2?w=600',
          'https://images.unsplash.com/photo-1522337360788-8b13dee7a37e?w=600',
        ],
        featured: 1,
      },
      {
        id: randomUUID(),
        nameEn: 'Zineb Rahmani',
        nameFr: 'Zineb Rahmani',
        nameAr: 'زينب رحماني',
        categoryId: 'beauty',
        bioEn: 'Home-based hairdresser offering hair cutting, coloring, keratin treatments, and braiding. Convenient at-home service for women.',
        bioFr: 'Coiffeuse à domicile proposant coupes, colorations, soins kératine et tressage. Service à domicile pour femmes.',
        bioAr: 'حلاقة منزلية تقدم قص الشعر والصبغ ومعالجة الكيراتين والضفائر. خدمة مريحة في المنزل للنساء.',
        servicesEn: ['Hair Cutting', 'Coloring', 'Keratin Treatment', 'Braiding', 'Blow-dry'],
        servicesFr: ['Coupe', 'Coloration', 'Kératine', 'Tressage', 'Brushing'],
        servicesAr: ['قص شعر', 'صبغ', 'كيراتين', 'ضفائر', 'تمليس'],
        location: 'Oran',
        phone: '+213 555 111 333',
        priceRange: '$',
        rating: 4.6,
        reviewCount: 87,
        profileImage: 'https://api.dicebear.com/7.x/avataaars/svg?seed=Zineb',
        portfolioImages: [],
        featured: 0,
      },
      // TECH
      {
        id: randomUUID(),
        nameEn: 'Bilal Messad',
        nameFr: 'Bilal Messad',
        nameAr: 'بلال مسعد',
        categoryId: 'tech',
        bioEn: 'Full-stack web developer and IT specialist. Builds websites, online stores, and business tools. Also offers PC repair and network setup.',
        bioFr: 'Développeur web full-stack et spécialiste IT. Crée des sites web, boutiques en ligne et outils métier. Aussi réparation PC et réseau.',
        bioAr: 'مطوّر ويب متكامل ومتخصص في تقنية المعلومات. يبني مواقع وأسواق إلكترونية وأدوات أعمال. كذلك إصلاح الحاسوب والشبكات.',
        servicesEn: ['Website Development', 'E-commerce', 'PC Repair', 'Network Setup', 'WordPress'],
        servicesFr: ['Création de Site', 'E-commerce', 'Réparation PC', 'Configuration Réseau', 'WordPress'],
        servicesAr: ['تطوير مواقع', 'متاجر إلكترونية', 'إصلاح حاسوب', 'إعداد الشبكة', 'ووردبريس'],
        location: 'Setif',
        phone: '+213 555 444 555',
        email: 'bilal.messad@example.com',
        priceRange: '$$',
        rating: 4.8,
        reviewCount: 134,
        profileImage: 'https://api.dicebear.com/7.x/avataaars/svg?seed=Bilal',
        portfolioImages: [
          'https://images.unsplash.com/photo-1461749280684-dccba630e2f6?w=600',
        ],
        featured: 1,
      },
      {
        id: randomUUID(),
        nameEn: 'Dounia Larbi',
        nameFr: 'Dounia Larbi',
        nameAr: 'دنيا العربي',
        categoryId: 'tech',
        bioEn: 'Social media manager and content creator. Helps small businesses grow their online presence with targeted content strategies.',
        bioFr: 'Gestionnaire de réseaux sociaux et créatrice de contenu. Aide les petites entreprises à développer leur présence en ligne.',
        bioAr: 'مديرة سوشيال ميديا وصانعة محتوى. تساعد الشركات الصغيرة على تنمية حضورها الرقمي باستراتيجيات محتوى مستهدفة.',
        servicesEn: ['Social Media Management', 'Content Creation', 'Reels & TikTok', 'Ad Campaigns', 'Copywriting'],
        servicesFr: ['Gestion Réseaux Sociaux', 'Création Contenu', 'Reels & TikTok', 'Campagnes Pub', 'Copywriting'],
        servicesAr: ['إدارة سوشيال ميديا', 'صناعة محتوى', 'ريلز وتيك توك', 'حملات إعلانية', 'كتابة إبداعية'],
        location: 'Algiers',
        phone: '+213 555 666 777',
        priceRange: '$$',
        rating: 4.7,
        reviewCount: 91,
        profileImage: 'https://api.dicebear.com/7.x/avataaars/svg?seed=Dounia',
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
