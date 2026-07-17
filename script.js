const langToggle = document.querySelector("[data-lang-toggle]");
const menuToggle = document.querySelector("[data-menu-toggle]");
const nav = document.querySelector("[data-nav]");
const translatedItems = document.querySelectorAll("[data-i18n]");
const typingTarget = document.querySelector("[data-typing]");
const brandPhotoLink = document.querySelector(".brand-photo-link");
const profileVideo = document.querySelector("#profile-video");
const videoPlayButton = document.querySelector("[data-video-play]");
const liveTime = document.querySelector("[data-live-time]");
const hijriDate = document.querySelector("[data-hijri-date]");
const gregorianDate = document.querySelector("[data-gregorian-date]");

const typingPhrases = {
  ar: [
    "مهندس كهرباء وتحكم",
    "تصميم كهربائي",
    "تحكم وأتمتة",
    "تنفيذ مواقع",
    "صيانة كهربائية",
    "مكة - جدة - المدينة"
  ],
  en: [
    "Power & Control Engineer",
    "Electrical Design",
    "Control & Automation",
    "Site Execution",
    "Electrical Maintenance",
    "Makkah - Jeddah - Madinah"
  ]
};

const translations = {
  ar: {
    "brand.name": "عبد المنعم فاروق",
    "brand.tagline": "مهندس كهرباء وتحكم",
    "nav.about": "نبذة",
    "nav.expertise": "الخبرات",
    "nav.skills": "المهارات",
    "nav.projects": "المشاريع",
    "nav.certifications": "الشهادات",
    "nav.experience": "الخبرة",
    "nav.region": "المنطقة",
    "nav.creative": "معمل الإبداع",
    "nav.contact": "تواصل",
    "hero.eyebrow": "مكة - جدة - المدينة",
    "hero.title": "مهندس كهرباء وتحكم",
    "hero.typingLabel": "تخصصي:",
    "hero.lead": "مهندس كهرباء وتحكم جاهز للعمل في مشاريع كبرى داخل مكة وجدة والمدينة. خبرة في التحكم الكلاسيكي، PLC، أجهزة القياس والتحكم، الصيانة الكهربائية، وتنفيذ المواقع.",
    "hero.download": "تحميل CV عربي ATS",
    "hero.whatsapp": "تواصل واتساب",
    "hero.projects": "عرض المشاريع",
    "tag.power": "جهد متوسط ومنخفض",
    "tag.plc": "متحكمات منطقية",
    "tag.control": "تحكم كلاسيكي",
    "tag.instrument": "أجهزة قياس وتحكم",
    "tag.site": "تنفيذ مواقع",
    "profile.role": "مهندس كهرباء وتحكم",
    "profile.name": "عبد المنعم فاروق عبد العظيم زيد",
    "profile.summary": "خبرة في التحكم الكلاسيكي، PLC، أجهزة القياس والتحكم، الصيانة الكهربائية، لوحات التوزيع، وتنفيذ المواقع في بيئات صناعية وطبية وبترولية.",
    "profile.videoCaption": "فيديو تعريفي قصير يوضح الحضور المهني والخبرة.",
    "profile.videoPlay": "تشغيل بالصوت",
    "stats.one": "هندسة",
    "stats.two": "لغتان",
    "stats.three": "الغرب",
    "stats.four": "توثيق",
    "stats.power": "كهرباء وتحكم",
    "stats.lang": "تواصل عربي وإنجليزي",
    "stats.region": "المنطقة الغربية",
    "stats.proof": "سيرة وشهادات داعمة",
    "about.eyebrow": "نبذة عني",
    "about.title": "مهندس عملي يركز على التشغيل والصيانة والتحكم في بيئات عمل جادة.",
    "about.text1": "مهندس كهرباء وتحكم يستهدف فرص العمل في مكة وجدة والمدينة، بخبرة في التحكم الكلاسيكي، PLC، أجهزة القياس والتحكم، والصيانة الكهربائية عبر مشاريع صناعية وطبية وبترولية.",
    "about.text2": "أجمع بين الخبرة الميدانية في تنفيذ المواقع، الصيانة الوقائية، قراءة المخططات الكهربائية، والتعامل مع فرق التشغيل والمقاولين والاستشاريين في بيئات عمل تتطلب انضباطاً واعتمادية عالية.",
    "info.name": "الاسم: عبد المنعم فاروق عبد العظيم زيد",
    "info.education1": "بكالوريوس هندسة كهربائية – جامعة حلوان، مصر (2018)",
    "info.education2": "معهد فني صناعي – إلكترونيات وأنظمة تحكم (1994)",
    "info.work": "مهندس كهرباء وتحكم - عضو مشارك بالهيئة السعودية للمهندسين",
    "info.syndicate": "عضو نقابة المهندسين المصرية",
    "info.driving": "رخص القيادة: سعودية سارية، مصرية سارية، ودولية سارية.",
    "expertise.eyebrow": "الخبرات الأساسية",
    "expertise.title": "أربعة محاور هندسية تخدم صاحب العمل مباشرة.",
    "expertise.power.title": "أنظمة الكهرباء",
    "expertise.power.text": "فهم أنظمة الكهرباء ولوحات التوزيع ومتابعة التشغيل والصيانة باهتمام بالاعتمادية والسلامة.",
    "expertise.power.small": "جهد متوسط ومنخفض - لوحات توزيع - صيانة",
    "expertise.control.title": "التحكم والأتمتة",
    "expertise.control.text": "خبرة في التحكم الكلاسيكي، المتحكمات المنطقية، مغيرات السرعة، المشغلات الناعمة، وأجهزة القياس والتحكم.",
    "expertise.control.small": "متحكمات منطقية - تحكم كلاسيكي - أجهزة قياس وتحكم",
    "expertise.design.title": "التصميم الكهربائي",
    "expertise.design.text": "قراءة وتنظيم الرسومات والمتطلبات الفنية وتحويلها إلى خطوات تنفيذ ومتابعة واضحة.",
    "expertise.design.small": "رسم كهربائي - مخططات تنفيذ - جداول أحمال",
    "expertise.site.title": "تنفيذ المواقع",
    "expertise.site.text": "عقلية موقع عملية تناسب مشاريع المباني والمنشآت التي تحتاج انضباطًا ومتابعة يومية.",
    "expertise.site.small": "إشراف موقع - اختبار وتشغيل - تتبع أعطال",
    "skills.eyebrow": "المهارات",
    "skills.title": "مهارات فنية من واقع السيرة الحديثة والخبرة العملية.",
    "skills.group1": "كهرباء وتحكم",
    "skills.group2": "تصميم وتنفيذ",
    "skill.classic": "تحكم كلاسيكي",
    "skill.plc": "متحكمات منطقية",
    "skill.instrument": "أجهزة قياس وتحكم",
    "skill.maintenance": "صيانة كهربائية",
    "skill.autocad": "رسم كهربائي",
    "skill.etap": "تحليل كهربائي",
    "skill.site": "تنفيذ مواقع",
    "skill.testing": "اختبار وتشغيل",
    "level.strong": "قوي",
    "level.good": "جيد",
    "level.working": "معرفة عملية",
    "projects.eyebrow": "الأعمال والمشاريع",
    "projects.title": "نماذج أعمال هندسية تعرض طريقة التفكير والتنفيذ.",
    "projects.card1.category": "أعمال كهربائية",
    "projects.card1.title": "أعمال كهرباء وتحكم",
    "projects.card1.text": "مساحة لعرض نماذج موثقة من أعمال الكهرباء والتحكم عند تجهيز تفاصيلها وصورها المناسبة للنشر.",
    "projects.card2.category": "أعمال تحكم",
    "projects.card2.title": "حلول تحكم وصيانة",
    "projects.card2.text": "عرض منظم للأعمال المرتبطة بالتحكم الكلاسيكي والمتحكمات المنطقية وأجهزة القياس والتحكم.",
    "projects.card3.category": "صيانة ومواقع",
    "projects.card3.title": "تنفيذ ومتابعة مواقع",
    "projects.card3.text": "مساحة لعرض خبرة الموقع والتنسيق والمتابعة الفنية بطريقة مناسبة لأصحاب العمل.",
    "cert.eyebrow": "الشهادات",
    "cert.title": "اعتمادات وشهادات وخبرة داعمة للملف المهني.",
    "cert.cvAr.title": "السيرة العربية",
    "cert.cvAr.text": "ملف سيرة مناسب للتقديم الإلكتروني.",
    "cert.cvEn.title": "السيرة الإنجليزية",
    "cert.cvEn.text": "ملف سيرة مهني باللغة الإنجليزية.",
    "cert.exp.title": "شهادة خبرة كهرباء",
    "cert.exp.text": "توثيق خبرة في بيئات صناعية وبترولية وميدانية.",
    "cert.hajj.title": "شكر الحج 1446",
    "cert.hajj.text": "ملف داعم لفرص المنطقة الغربية.",
    "cert.sce.title": "الهيئة السعودية للمهندسين",
    "cert.sce.text": "عضو مهني برتبة مشارك مع مستند اعتماد قابل للمراجعة.",
    "cert.egypt.title": "نقابة المهندسين المصرية",
    "cert.egypt.text": "عضوية مهنية داعمة للملف الهندسي مع صورة بطاقة النقابة.",
    "cert.driving.title": "رخص قيادة سارية",
    "cert.driving.text": "رخص قيادة سعودية ومصرية ودولية سارية، تدعم متطلبات التنقل للمشاريع والمتابعة الميدانية.",
    "exp.eyebrow": "الخبرة",
    "exp.title": "خط زمني حديث يوضح تنوع الخبرة بين الصناعة والطب والمقاولات.",
    "exp.item1.date": "2025 - حتى الآن",
    "exp.item1.title": "شركة النجم الثاقب - أخصائي أنظمة كهرباء وتحكم",
    "exp.item1.text": "عمل هندسي في أنظمة الكهرباء والتحكم ضمن مشاريع تشغيل وتنفيذ داخل المملكة، مع متابعة لوحات التحكم والتوزيع وأعمال الموقع.",
    "exp.item2.date": "2024 - 2025",
    "exp.item2.title": "شركة جلف ميراد للبترول - مهندس كهرباء وتحكم",
    "exp.item2.text": "خبرة في بيئة بترولية تشمل التحكم والأجهزة والصيانة والأنظمة المساندة.",
    "exp.item3.date": "2023 - 2024",
    "exp.item3.title": "مجمع نايا تاور الطبي - مهندس كهرباء",
    "exp.item3.text": "تحكم وصيانة ومتابعة أنظمة كهربائية داخل منشأة طبية تحتاج اعتمادية عالية.",
    "exp.item4.date": "2015 - 2023",
    "exp.item4.title": "خبرات كهرباء وتحكم ومقاولات",
    "exp.item4.text": "خبرات متراكمة في الشركات الصناعية والمقاولات والصيانة تشمل أنظمة تحكم ولوحات ومعدات ميدانية.",
    "region.eyebrow": "جاهزية للمشاريع الحيوية",
    "region.title": "جاهز لدعم مشاريع المنطقة الغربية باحترافية وانضباط.",
    "region.text": "أستهدف بيئات عمل تحتاج انضباطًا وموثوقية في التشغيل والصيانة والتنفيذ الكهربائي، خصوصًا المنشآت عالية الحركة مثل الفنادق والمستشفيات والمباني التجارية ومشاريع إدارة المرافق.",
    "region.item1": "احترام حساسية بيئات العمل عالية الأهمية",
    "region.item2": "عقلية صيانة وتشغيل عملية",
    "region.item3": "تواصل عربي وإنجليزي",
    "region.item4": "قابلية العمل مع المقاولين والاستشاريين",
    "lab.eyebrow": "معمل الإبداع",
    "lab.title": "ألعاب وتجارب تفاعلية كجانب إبداعي ثانوي.",
    "lab.text": "هذا القسم يعرض الفضول التقني والقدرة على بناء تجارب رقمية، دون أن يطغى على الهدف المهني الأساسي.",
    "lab.knight.kicker": "تجربة تفاعلية",
    "lab.knight.title": "نايت رايزن",
    "lab.knight.text": "تجربة رقمية ضمن المعمل الإبداعي تعرض جانبًا من الاهتمام بالتفاعل وتصميم التجارب.",
    "lab.bob.kicker": "لعبة خفيفة",
    "lab.bob.title": "بوب جمب",
    "lab.bob.text": "لعبة خفيفة ضمن قسم الإبداع، تظهر كجزء داعم للشخصية الرقمية لا كهدف أساسي للموقع.",
    "lab.space.kicker": "أركيد كلاسيكي",
    "lab.space.title": "غزاة الفضاء",
    "lab.space.text": "تجربة ألعاب كلاسيكية تقدم لمحة عن الجانب التقني والتفاعلي في الموقع.",
    "game.status": "قريباً",
    "extra.summary": "خلفيات إضافية",
    "extra.dawah": "محتوى معرفي هادئ يهدف إلى التعريف بالإسلام بالحكمة، ومقارنة النصوص باحترام، وإبراز الإشارات العلمية في القرآن الكريم.",
    "extra.law": "ملم بأعمال مكاتب الخدمات العامة ومتابعة المنصات، وتنظيم الملفات، وتجهيز ورفع القضايا العمالية، ومساندة ملفات ديوان المظالم.",
    "contact.eyebrow": "التواصل",
    "contact.title": "تواصل مباشر ومنظم لأصحاب العمل.",
    "contact.whatsapp": "واتساب مباشر",
    "contact.linkedin": "لينكدإن",
    "contact.form": "نموذج التواصل",
    "contact.latest": "أحدث ملف CV",
    "contact.platformsTitle": "روابط التوظيف والبحث المهني",
    "contact.googleJobs": "Google Jobs",
    "contact.linkedinJobs": "LinkedIn Jobs",
    "contact.bayt": "بيت.كوم",
    "contact.naukrigulf": "نوكري الخليج",
    "contact.indeed": "إنديد السعودية",
    "contact.gulftalent": "جلف تالنت",
    "footer.text": "عبد المنعم فاروق عبد العظيم زيد - مهندس كهرباء وتحكم للمشاريع الحيوية."
  },
  en: {
    "brand.name": "Abdelmonaim Farouq",
    "brand.tagline": "Power & Control Engineer",
    "nav.about": "About",
    "nav.expertise": "Expertise",
    "nav.skills": "Skills",
    "nav.projects": "Projects",
    "nav.certifications": "Certifications",
    "nav.experience": "Experience",
    "nav.region": "Region",
    "nav.creative": "Creative Lab",
    "nav.contact": "Contact",
    "hero.eyebrow": "Makkah - Jeddah - Madinah",
    "hero.title": "Power & Control Engineer",
    "hero.typingLabel": "Focus:",
    "hero.lead": "Power & Control Engineer ready for major projects in Makkah, Jeddah, and Madinah. Expertise in classic control, PLC, instrumentation, electrical maintenance, and site execution.",
    "hero.download": "Download English ATS CV",
    "hero.whatsapp": "WhatsApp Contact",
    "hero.projects": "View Projects",
    "tag.power": "MV/LV",
    "tag.plc": "PLC",
    "tag.control": "Classic Control",
    "tag.instrument": "Instrumentation",
    "tag.site": "Site Execution",
    "profile.role": "Electrical & Control Engineer",
    "profile.name": "Abdelmonaim Farouq Abdelazeem Zaid",
    "profile.summary": "Experience in classic control, PLC systems, instrumentation, electrical maintenance, distribution panels, and site execution across industrial, medical, and petroleum environments.",
    "profile.videoCaption": "A short profile video presenting professional presence and experience.",
    "profile.videoPlay": "Play with sound",
    "stats.one": "Engineering",
    "stats.two": "Bilingual",
    "stats.three": "West",
    "stats.four": "Proof",
    "stats.power": "Power and Control",
    "stats.lang": "Arabic and English communication",
    "stats.region": "Western Region",
    "stats.proof": "CV and supporting certificates",
    "about.eyebrow": "About Me",
    "about.title": "A practical engineer focused on operation, maintenance, and control in serious work environments.",
    "about.text1": "Power & Control Engineer targeting opportunities in Makkah, Jeddah, and Madinah. Experience in classic control, PLC systems, instrumentation, and electrical maintenance across industrial, medical, and petroleum projects.",
    "about.text2": "Combines field site execution, preventive maintenance, electrical drawing reading, and coordination with operation teams, contractors, and consultants in demanding work environments.",
    "info.name": "Name: Abdelmonaim Farouq Abdelazeem Zaid",
    "info.education1": "B.Sc. in Electrical Engineering – Helwan University, Egypt (2018)",
    "info.education2": "Industrial Technical Institute – Electronics & Control Systems (1994)",
    "info.work": "Power & Control Engineer - Associate Engineer at Saudi Council of Engineers",
    "info.syndicate": "Member of the Egyptian Engineers Syndicate",
    "info.driving": "Driving Licenses: Valid Saudi, Egyptian, and International driving licenses.",
    "expertise.eyebrow": "Core Expertise",
    "expertise.title": "Four engineering pillars that serve employers directly.",
    "expertise.power.title": "Power Systems",
    "expertise.power.text": "Understanding electrical systems and distribution panels with operation and maintenance awareness focused on reliability and safety.",
    "expertise.power.small": "MV/LV - Distribution Panels - Maintenance",
    "expertise.control.title": "Control & Automation",
    "expertise.control.text": "Experience with classic control, PLC systems, VFDs, soft starters, and field instrumentation.",
    "expertise.control.small": "PLC - Classic Control - Instrumentation",
    "expertise.design.title": "Electrical Design",
    "expertise.design.text": "Reading and organizing technical drawings and requirements into clear execution and follow-up steps.",
    "expertise.design.small": "AutoCAD - Shop Drawings - Load Schedules",
    "expertise.site.title": "Site Execution",
    "expertise.site.text": "A practical site mindset suited for buildings and facilities that need discipline and daily follow-up.",
    "expertise.site.small": "Site Supervision - Testing - Troubleshooting",
    "skills.eyebrow": "Skills",
    "skills.title": "Technical skills based on the latest CV and practical field experience.",
    "skills.group1": "Power and Control",
    "skills.group2": "Design and Execution",
    "skill.classic": "Classic Control",
    "skill.plc": "PLC",
    "skill.instrument": "Instrumentation",
    "skill.maintenance": "Electrical Maintenance",
    "skill.autocad": "AutoCAD",
    "skill.etap": "ETAP",
    "skill.site": "Site Execution",
    "skill.testing": "Testing & Commissioning",
    "level.strong": "Strong",
    "level.good": "Good",
    "level.working": "Working Knowledge",
    "projects.eyebrow": "Projects / Portfolio",
    "projects.title": "Engineering work samples that present thinking and execution.",
    "projects.card1.category": "Electrical Project",
    "projects.card1.title": "Electrical and Control Work",
    "projects.card1.text": "A space for verified electrical and control samples when their details and public images are ready.",
    "projects.card2.category": "Control Project",
    "projects.card2.title": "Control and Maintenance Solutions",
    "projects.card2.text": "An organized presentation for Classic Control, PLC, and instrumentation-related work.",
    "projects.card3.category": "Maintenance / Site",
    "projects.card3.title": "Site Execution and Follow-up",
    "projects.card3.text": "A space for presenting site experience, coordination, and technical follow-up in an employer-friendly way.",
    "cert.eyebrow": "Certifications",
    "cert.title": "Professional certificates, memberships, and supporting experience files.",
    "cert.cvAr.title": "Arabic ATS CV",
    "cert.cvAr.text": "Resume file suitable for electronic applications.",
    "cert.cvEn.title": "English ATS CV",
    "cert.cvEn.text": "English professional resume.",
    "cert.exp.title": "Electrical Experience Certificate",
    "cert.exp.text": "Documented experience in industrial, petroleum, and field environments.",
    "cert.hajj.title": "Hajj 1446 Appreciation",
    "cert.hajj.text": "Supporting file for Western Region opportunities.",
    "cert.sce.title": "Saudi Council of Engineers",
    "cert.sce.text": "Professional member with Associate Engineer rank and a reviewable accreditation document.",
    "cert.egypt.title": "Egyptian Engineers Syndicate",
    "cert.egypt.text": "Professional membership supporting the engineering profile with a syndicate card image.",
    "cert.driving.title": "Valid Driving Licenses",
    "cert.driving.text": "Valid Saudi, Egyptian, and International driving licenses supporting project mobility and field follow-up.",
    "exp.eyebrow": "Experience",
    "exp.title": "A recent career timeline across industrial, medical, petroleum, and contracting environments.",
    "exp.item1.date": "2025 - Present",
    "exp.item1.title": "Al Najm Al Thaqib Co. - Electrical & Control Systems Specialist",
    "exp.item1.text": "Engineering work in electrical and control systems for operation and execution projects in Saudi Arabia, including control panels, distribution boards, and site follow-up.",
    "exp.item2.date": "2024 - 2025",
    "exp.item2.title": "Gulf Merad Petroleum Co. - Electrical & Control Engineer",
    "exp.item2.text": "Petroleum environment experience covering control, instrumentation, maintenance, and supporting systems.",
    "exp.item3.date": "2023 - 2024",
    "exp.item3.title": "Naya Tower Medical Complex - Electrical Engineer",
    "exp.item3.text": "Control, maintenance, and follow-up for electrical systems in a medical facility requiring high reliability.",
    "exp.item4.date": "2015 - 2023",
    "exp.item4.title": "Electrical, Control, and Contracting Experience",
    "exp.item4.text": "Accumulated experience across industrial companies, contracting, maintenance, control systems, panels, and field equipment.",
    "region.eyebrow": "Ready for Vital Projects",
    "region.title": "Ready to support Western Region projects with discipline and professionalism.",
    "region.text": "I target workplaces that need discipline and reliability in operation, maintenance, and electrical execution, especially high-traffic facilities such as hotels, hospitals, commercial buildings, and facility management projects.",
    "region.item1": "Respect for high-importance work environments",
    "region.item2": "Practical operation and maintenance mindset",
    "region.item3": "Arabic and English communication",
    "region.item4": "Ability to work with contractors and consultants",
    "lab.eyebrow": "Creative Lab",
    "lab.title": "Games and interactive experiments as a secondary creative layer.",
    "lab.text": "This section shows technical curiosity and digital experiment building without overpowering the main professional goal.",
    "lab.knight.kicker": "Interactive experiment",
    "lab.knight.title": "Knight Risen",
    "lab.knight.text": "A digital experiment inside the Creative Lab, showing interest in interaction and experience design.",
    "lab.bob.kicker": "Light game",
    "lab.bob.title": "Bob Jump Game",
    "lab.bob.text": "A light game in the creative section, supporting the digital personality without becoming the main goal.",
    "lab.space.kicker": "Classic arcade",
    "lab.space.title": "Space Invaders",
    "lab.space.text": "A classic arcade experiment that adds a technical and interactive touch to the portfolio.",
    "game.status": "Coming Soon",
    "extra.summary": "Additional Background",
    "extra.dawah": "Calm knowledge content that introduces Islam with wisdom, compares texts respectfully, and highlights scientific signs in the Quran.",
    "extra.law": "Familiarity with public service office work, platform follow-up, file organization, labor case preparation, and Board of Grievances file support.",
    "contact.eyebrow": "Contact",
    "contact.title": "Direct and organized contact for employers.",
    "contact.whatsapp": "Direct WhatsApp",
    "contact.linkedin": "LinkedIn",
    "contact.form": "Contact form",
    "contact.latest": "Latest CV",
    "contact.platformsTitle": "Recruitment and professional search links",
    "contact.googleJobs": "Google Jobs",
    "contact.linkedinJobs": "LinkedIn Jobs",
    "contact.bayt": "Bayt",
    "contact.naukrigulf": "NaukriGulf",
    "contact.indeed": "Indeed KSA",
    "contact.gulftalent": "GulfTalent",
    "footer.text": "Abdelmonaim Farouq Abdelazeem Zaid - Power & Control Engineer for vital projects."
  }
};

let currentLanguage = "ar";
let typingPhraseIndex = 0;
let typingLetterIndex = 0;
let typingDeleting = false;

function applyLanguage(language) {
  currentLanguage = language;

  translatedItems.forEach((item) => {
    const key = item.dataset.i18n;
    item.textContent = translations[language][key] || item.textContent;
  });

  document.body.classList.toggle("en", language === "en");
  document.documentElement.lang = language;
  document.documentElement.dir = language === "en" ? "ltr" : "rtl";
  langToggle.textContent = language === "en" ? "AR" : "EN";

  const title = language === "en"
    ? "Abdelmonaim Farouq | Power & Control Engineer | Makkah - Jeddah - Madinah"
    : "عبد المنعم فاروق | مهندس كهرباء وتحكم | مكة - جدة - المدينة";
  document.title = title;

  typingPhraseIndex = 0;
  typingLetterIndex = 0;
  typingDeleting = false;
  if (typingTarget) typingTarget.textContent = "";

  updateClock();

  localStorage.setItem("cv-lang", language);
  document.dispatchEvent(new CustomEvent("cv-lang-change", { detail: { language: language } }));
}

function updateClock() {
  if (!liveTime || !hijriDate || !gregorianDate) return;

  const now = new Date();
  const isEnglish = currentLanguage === "en";
  const locale = isEnglish ? "en-SA" : "ar-SA";
  const timeZone = "Asia/Riyadh";

  liveTime.textContent = new Intl.DateTimeFormat(locale, {
    hour: "2-digit", minute: "2-digit", second: "2-digit", hour12: true, timeZone
  }).format(now);

  hijriDate.textContent = new Intl.DateTimeFormat(isEnglish ? "en-SA-u-ca-islamic-umalqura" : "ar-SA-u-ca-islamic-umalqura", {
    weekday: "long", day: "numeric", month: "long", year: "numeric", timeZone
  }).format(now);

  gregorianDate.textContent = new Intl.DateTimeFormat(locale, {
    weekday: "long", day: "numeric", month: "long", year: "numeric", timeZone
  }).format(now);
}

function tickTyping() {
  if (!typingTarget) return;

  const phrases = typingPhrases[currentLanguage];
  const phrase = phrases[typingPhraseIndex];

  if (typingDeleting) {
    typingLetterIndex -= 1;
  } else {
    typingLetterIndex += 1;
  }

  typingTarget.textContent = phrase.slice(0, typingLetterIndex);

  if (!typingDeleting && typingLetterIndex === phrase.length) {
    typingDeleting = true;
    setTimeout(tickTyping, 1100);
    return;
  }

  if (typingDeleting && typingLetterIndex === 0) {
    typingDeleting = false;
    typingPhraseIndex = (typingPhraseIndex + 1) % phrases.length;
  }

  setTimeout(tickTyping, typingDeleting ? 45 : 80);
}

function focusProfileVideo({ withSound = false } = {}) {
  if (!profileVideo) return;

  profileVideo.scrollIntoView({ behavior: "smooth", block: "center" });
  profileVideo.classList.add("is-focused");

  window.clearTimeout(profileVideo.focusTimer);
  profileVideo.focusTimer = window.setTimeout(() => {
    profileVideo.classList.remove("is-focused");
  }, 2000);

  if (withSound) {
    profileVideo.muted = false;
    profileVideo.controls = true;
    profileVideo.loop = false;
    profileVideo.volume = 0.75;
  } else {
    profileVideo.muted = true;
    profileVideo.loop = true;
  }

  const playPromise = profileVideo.play();
  if (playPromise && typeof playPromise.catch === "function") {
    playPromise.catch(() => {});
  }
}

function attachVideoPauseObserver() {
  const hero = document.querySelector(".hero");
  if (!hero || !profileVideo) return;
  const obs = new IntersectionObserver(
    (entries) => {
      for (const entry of entries) {
        if (!entry.isIntersecting && !profileVideo.paused) {
          profileVideo.pause();
          profileVideo.muted = true;
          profileVideo.currentTime = 0;
        }
      }
    },
    { threshold: 0 }
  );
  obs.observe(hero);
}

if (brandPhotoLink) {
  brandPhotoLink.addEventListener("click", (event) => {
    event.preventDefault();
    focusProfileVideo();
  });
}

if (videoPlayButton) {
  videoPlayButton.addEventListener("click", () => {
    focusProfileVideo({ withSound: true });
  });
}

if (langToggle) {
  langToggle.addEventListener("click", () => {
    applyLanguage(currentLanguage === "ar" ? "en" : "ar");
  });
}

if (menuToggle && nav) {
  menuToggle.addEventListener("click", () => {
    nav.classList.toggle("is-open");
  });

  nav.querySelectorAll("a").forEach((link) => {
    link.addEventListener("click", () => nav.classList.remove("is-open"));
  });
}

function downloadCV() {
  if (currentLanguage === "en") {
    if (typeof downloadEnglishCV === "function") downloadEnglishCV();
  } else {
    if (typeof downloadArabicCV === "function") downloadArabicCV();
  }
}

const savedLang = localStorage.getItem("cv-lang");
applyLanguage(savedLang === "en" ? "en" : "ar");
setInterval(updateClock, 1000);
tickTyping();
attachVideoPauseObserver();

/* — افتح الموقع من أول الهيدر دائماً — */
(function () {
  function scrollToTop() {
    if (location.hash) {
      history.replaceState(null, '', location.pathname + location.search);
    }
    window.scrollTo(0, 0);
  }
  scrollToTop();
  window.addEventListener('pageshow', function (e) { if (e.persisted) scrollToTop(); });
})();
