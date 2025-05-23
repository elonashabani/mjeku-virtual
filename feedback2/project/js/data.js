// Të dhënat për mjekët e QKUK-së
const doctorsData = [
  {
    id: 1,
    name: "Dr. Arben Krasniqi",
    specialty: "Kardiologji",
    specialtyIcon: "heart",
    image: "https://i.postimg.cc/dtRGRgNq/cheerful-middle-aged-chinese-male-600nw-2215576975.jpg",
    rating: 4.8,
    reviewCount: 124,
    bio: "Dr. Arben Krasniqi është kardiolog i certifikuar me mbi 15 vjet përvojë në trajtimin e sëmundjeve kardiovaskulare. Ai është specialist në kardiologjinë preventive dhe menaxhimin e dështimit të zemrës.",
    education: "Fakulteti i Mjekësisë, Universiteti i Prishtinës",
    experience: "15+ vjet",
    languages: ["Shqip", "Anglisht"],
    address: "QKUK - Klinika e Kardiologjisë, Prishtinë",
    phone: "038 500 600",
    email: "arben.krasniqi@qkuk-ks.org",
    availability: [
      { day: "Hën", available: true, hours: "09:00 - 15:00" },
      { day: "Mar", available: true, hours: "09:00 - 15:00" },
      { day: "Mër", available: true, hours: "09:00 - 15:00" },
      { day: "Enj", available: false, hours: "" },
      { day: "Pre", available: true, hours: "09:00 - 13:00" },
      { day: "Sht", available: false, hours: "" },
      { day: "Die", available: false, hours: "" }
    ],
    reviews: [
      {
        id: 101,
        name: "Blerim Gashi",
        date: "2025-03-15",
        rating: 5,
        text: "Dr. Krasniqi është mjek i shkëlqyeshëm. Shpjegoi në detaje gjendjen time dhe opsionet e trajtimit. Shumë profesional dhe i kujdesshëm."
      },
      {
        id: 102,
        name: "Vjosa Berisha",
        date: "2025-02-20",
        rating: 4,
        text: "Mjek shumë i mirë dhe profesional. Koha e pritjes ishte pak e gjatë, por kujdesi ishte i shkëlqyeshëm."
      }
    ]
  },
  {
    id: 2,
    name: "Dr. Fatmire Ahmeti",
    specialty: "Neurologji",
    specialtyIcon: "brain",
    image: "https://i.postimg.cc/wMLLGr6Q/360-F-504257032-j-Btwq-Ndvd-MN9-Xm6a-DT0hcvtx-DXPZErrn.jpg",
    rating: 4.9,
    reviewCount: 98,
    bio: "Dr. Fatmire Ahmeti është neurologe me përvojë në diagnostikimin dhe trajtimin e çrregullimeve neurologjike. Specializimi i saj përfshin parandalimin e goditjeve në tru dhe menaxhimin e dhimbjeve të kokës.",
    education: "Fakulteti i Mjekësisë, Universiteti i Prishtinës",
    experience: "12 vjet",
    languages: ["Shqip", "Anglisht", "Gjermanisht"],
    address: "QKUK - Klinika e Neurologjisë, Prishtinë",
    phone: "038 500 600",
    email: "fatmire.ahmeti@qkuk-ks.org",
    availability: [
      { day: "Hën", available: true, hours: "08:00 - 14:00" },
      { day: "Mar", available: true, hours: "08:00 - 14:00" },
      { day: "Mër", available: false, hours: "" },
      { day: "Enj", available: true, hours: "08:00 - 14:00" },
      { day: "Pre", available: true, hours: "08:00 - 14:00" },
      { day: "Sht", available: false, hours: "" },
      { day: "Die", available: false, hours: "" }
    ],
    reviews: [
      {
        id: 201,
        name: "Driton Kelmendi",
        date: "2025-04-10",
        rating: 5,
        text: "Dr. Ahmeti është mjeke e shkëlqyer. Shpjegoi në detaje gjendjen time dhe më ndihmoi të kuptoj më mirë problemin tim neurologjik."
      }
    ]
  },
  {
    id: 3,
    name: "Dr. Burim Hoxha",
    specialty: "Pediatri",
    specialtyIcon: "child",
    image: "https://i.postimg.cc/fTHRhKJc/depositphotos-394936566-stock-photo-asian-male-senior-doctor-smile.jpg",
    rating: 4.7,
    reviewCount: 156,
    bio: "Dr. Burim Hoxha është pediatër me fokus të veçantë në zhvillimin e fëmijëve dhe kujdesin parandalues. Ai beson në bashkëpunimin e ngushtë me prindërit për të siguruar shëndetin optimal të fëmijëve.",
    education: "Fakulteti i Mjekësisë, Universiteti i Prishtinës",
    experience: "10 vjet",
    languages: ["Shqip", "Anglisht"],
    address: "QKUK - Klinika e Pediatrisë, Prishtinë",
    phone: "038 500 600",
    email: "burim.hoxha@qkuk-ks.org",
    availability: [
      { day: "Hën", available: true, hours: "09:00 - 15:00" },
      { day: "Mar", available: true, hours: "09:00 - 15:00" },
      { day: "Mër", available: true, hours: "09:00 - 15:00" },
      { day: "Enj", available: true, hours: "09:00 - 15:00" },
      { day: "Pre", available: true, hours: "09:00 - 13:00" },
      { day: "Sht", available: false, hours: "" },
      { day: "Die", available: false, hours: "" }
    ],
    reviews: [
      {
        id: 301,
        name: "Arta Krasniqi",
        date: "2025-04-15",
        rating: 5,
        text: "Dr. Hoxha është fantastik me fëmijët! Vajza ime gjithmonë është e lumtur kur vizitohet tek ai. Shumë i durueshëm dhe profesional."
      }
    ]
  }
];

// Përkthimet
const translations = {
  al: {
    navHome: "Ballina",
    navDoctors: "Mjekët",
    navSpecialties: "Specialitetet",
    navAbout: "Rreth Nesh",
    heroTitle: "Gjeni dhe Vlerësoni Mjekët më të Mirë të QKUK-së",
    heroSubtitle: "Vlerësime transparente dhe informacion mbi disponueshmërinë për t'ju ndihmuar të merrni vendime të informuara shëndetësore",
    searchPlaceholder: "Kërko mjekë, specialitete...",
    searchButton: "Kërko",
    allSpecialties: "Të Gjitha Specialitetet",
    allRatings: "Të Gjitha Vlerësimet",
    topRatedDoctors: "Mjekët më të Vlerësuar",
    topRatedSubtitle: "Gjeni profesionistët më të mirë mjekësorë bazuar në vlerësimet e pacientëve",
    featuredSpecialties: "Specialitetet e Spikatura",
    viewProfile: "Shiko Profilin",
    addReview: "Shto Vlerësim",
    previousPage: "Prapa",
    nextPage: "Para",
    pageIndicator: "Faqja",
    of: "nga",
    writeReview: "Shkruaj një Vlerësim",
    yourName: "Emri Juaj",
    yourRating: "Vlerësimi Juaj",
    yourReview: "Vlerësimi Juaj",
    submit: "Dërgo",
    days: {
      Hën: "Hën",
      Mar: "Mar",
      Mër: "Mër",
      Enj: "Enj",
      Pre: "Pre",
      Sht: "Sht",
      Die: "Die"
    },
    available: "I Disponueshëm",
    notAvailable: "Jo i Disponueshëm",
    contact: "Kontakt",
    address: "Adresa",
    phone: "Telefoni",
    email: "Email",
    education: "Edukimi",
    experience: "Përvoja",
    languages: "Gjuhët",
    reviews: "Vlerësimet",
    reviewsCount: "vlerësime",
    availability: "Disponueshmëria",
    schedule: "Orari Javor"
  },
  en: {
    navHome: "Home",
    navDoctors: "Doctors",
    navSpecialties: "Specialties",
    navAbout: "About Us",
    heroTitle: "Find and Rate the Best Doctors of QKUK",
    heroSubtitle: "Transparent ratings and availability information to help you make informed health decisions",
    searchPlaceholder: "Search doctors, specialties...",
    searchButton: "Search",
    allSpecialties: "All Specialties",
    allRatings: "All Ratings",
    topRatedDoctors: "Top Rated Doctors",
    topRatedSubtitle: "Find the best medical professionals based on patient ratings",
    featuredSpecialties: "Featured Specialties",
    viewProfile: "Shiko Profilin",
    addReview: "Add Review",
    previousPage: "Previous",
    nextPage: "Next",
    pageIndicator: "Page",
    of: "of",
    addReview: "Shto Vlerësim",
    yourName: "Your Name",
    yourRating: "Your Rating",
    yourReview: "Your Review",
    submit: "Submit",
    days: {
      Hën: "Mon",
      Mar: "Tue",
      Mër: "Wed",
      Enj: "Thu",
      Pre: "Fri",
      Sht: "Sat",
      Die: "Sun"
    },
    available: "Available",
    notAvailable: "Not Available",
    contact: "Contact",
    address: "Address",
    phone: "Phone",
    email: "Email",
    education: "Education",
    experience: "Experience",
    languages: "Languages",
    reviews: "Reviews",
    reviewsCount: "reviews",
    availability: "Availability",
    schedule: "Weekly Schedule"
  }
};