export type SiteConfig = typeof siteConfig;

export const siteConfig = {
  name: "Decentrathon 5.0",
  favicon: "/favicon.ico",
  description: [
    "Kazakhstan's national hackathon returns. Built for builders. Back on a national scale.",
    "Главный хакатон страны возвращается. Создан билдерами для билдеров. Снова в национальном масштабе.",
    "Елдің басты хакатоны оралды. Құрушылардан құрушыларға арналған. Қайтадан республикалық деңгейде.",
  ],
  navItems: [
    {
      label: ["Locations", "Локации", "Локациялар"],
      href: "#locations",
    },
    {
      label: ["Tracks", "Треки", "Тректер"],
      href: "#tracks",
    },
    {
      label: ["Partners", "Партнеры", "Серіктестер"],
      href: "#partners",
    },
    {
      label: ["FAQ", "Вопросы", "Сұрақ-жауап"],
      href: "#faq",
    },
  ],
  navMenuItems: [
    {
      label: ["Locations", "Локации", "Локациялар"],
      href: "#locations",
    },
    {
      label: ["Tracks", "Треки", "Тректер"],
      href: "#tracks",
    },
    {
      label: ["Partners", "Партнеры", "Серіктестер"],
      href: "#partners",
    },
    {
      label: ["FAQ", "Вопросы", "Сұрақ-жауап"],
      href: "#faq",
    },
    {
      label: ["Register", "Регистрация", "Тіркелу"],
      href: "#register",
    },
  ],
  event_date: "2026-03-27T10:00:00+06:00",
  regions: [
    {
      id: "astana",
      name: "Astana",
      path: "M492 176.755V103.162H468.5V83H449V103.162H439.5V118.284H416.5V136.934H401V176.755H492Z",
      image: "/images/cities/astana.webp",
      title: "Astana IT University",
      address: "Astana, Mangilik El Ave, C1",
      link: "https://go.2gis.com/ZEEka",
    },
    {
      id: "almaty",
      name: "Almaty",
      path: "M466 264.719H506V326.214H483.5V317.645H466V324.197H425.5V290H448.5V299H474V279H466V264.719Z",
      image: "/images/cities/almaty.webp",
      title: "Narxoz University (Almaty)",
      address: "Almaty, Zhandosov Street, 55",
      link: "https://go.2gis.com/CILBI",
    },
    {
      id: "almatys",
      name: "Almaty (Solana)",
      path: "M466 264.719H506V326.214H483.5V317.645H466V324.197H425.5V290H448.5V299H474V279H466V264.719Z",
      image: "/images/cities/almatys.webp",
      title: "Farabi Hub (Almaty)",
      address: "Almaty, Al-Farabi Ave. 71, C20",
      link: "https://go.2gis.com/wfT6u",
    },
    {
      id: "shymkent",
      name: "Shymkent",
      path: "M360.5 320V295.5H328V311.5H316V343.5H328V353H352.5V320H360.5Z",
      image: "/images/cities/shymkent.webp",
      title: "Shymkent Hub",
      address: "Shymkent, Zeyin Business Center, Severnaya District, 66/2",
      link: "https://go.2gis.com/rkDsp",
    },
    {
      id: "karagandy",
      name: "Karaganda",
      path: "M545.5 117.535H493V175.502H402V158.364H379V164.917V200.705H358V225.907H368.5V247.582H426H441V256.655H466V264.216H505.5H524V238.509H551.5V201.713H540.5V175.502L551.5 170.965V146.77H545.5V117.535Z",
      image: "/images/cities/karaganda.webp",
      title: "Terricon Valley (Karaganda)",
      address: "Karaganda, Alalykyna St., 12/1",
      link: "https://go.2gis.com/ucVQF",
    },
    {
      id: "aktobe",
      name: "Aktobe",
      path: "M171 208.769V266.231H178H215V253.63H229.5V225.907H243V209.273H273V184.574H255.5V152.819H243V117.031H208.5V99.3887H173.5V117.031H157V173.485H171V208.769Z",
      image: "/images/cities/aqtobe.webp",
      title: "Zhubanov University (Aqtobe)",
      address: "Aktobe, Aliya Moldagulova Avenue, 34",
      link: "https://go.2gis.com/z4dV4",
    },
    {
      id: "zhambyl",
      name: "Taraz",
      path: "M351.5 371.58V352.93V319.662H359.5V296.475H388V276.817H378.5V264.216H367.5V248.59H426V324.702V340.328H411V350.409H398.5V358.978H388V371.58H351.5Z",
      image: "/images/cities/taraz.webp",
      title: "ITU (Taraz)",
      address: "Taraz, Zheltoksan Street, 69B",
      link: "https://go.2gis.com/ysFBG",
    },
    {
      id: "pavlodar",
      name: "Pavlodar",
      path: "M450.5 55.0314V74.6896V83.7627H470.5V101.909H492V117.534H563V94.8519H552.5V83.7627H536V68.641H525V42.43H511.5V28.3164H492V42.43H470.5V55.0314H450.5Z",
      image: "/images/cities/pavlodar.webp",
      title: "Toraighyrov University (Pavlodar)",
      address: "Pavlodar, Pavlodar, Lomov Street 64",
      link: "https://go.2gis.com/5zeof",
    },
    {
      id: "east",
      name: "Oskemen",
      path: "M632.5 117.535H598.5V145.762H606.5V165.421H620V183.567H633.5V201.713H620V222.883H652V210.282H662.5V192.64H673V171.469H684.5V152.819H673V137.193H660.75H648.5V128.624H632.5V117.535Z",
      image: "/images/cities/oskemen.webp",
      title: "Oskemen Hub",
      address: "Oskemen (Ust-Kamenogorsk), Kazakhstan Street 59/1",
      link: "https://go.2gis.com/wHuBO",
    },
    {
      id: "qostanay",
      name: "Qostanay",
      path: "M218.5 93.3399V116.526H243V152.819H308.5V132.152H339V96.3642V82.7547H325.5V54.0235H303.5V27.8125H278V41.422H243V69.6492H229.5V93.3399H218.5Z",
      image: "/images/cities/qostanay.webp",
      title: "Qostanai Hub",
      address: "Kostanay, Abay Avenue. 28/1",
      link: "https://go.2gis.com/P5awY",
    },
    {
      id: "atyrau",
      name: "Atyrau",
      path: "M35 215.321V198.687V165.419H88V152.818H138.5V147.777H156.5V174.492H171V208.768H156.5V221.874H129.5V227.922H108V217.841H83.5V217.841H50.5V215.321H35Z",
      image: "/images/cities/atyrau.webp",
      title: "Dosmukhamedov University (Atyrau)",
      address: "Atyrau, Atyrau, Studencheskiy Av., Building 1, Zhaiyk Sports Complex",
      link: "https://go.2gis.com/jiULL",
    },
    {
      id: "abai",
      name: "Semey",
      path: "M598.5 117.535V146.77H606V164.412H620V184.575H633.5V201.713H620V222.883V247.582H571V239.013H551V201.713H541V176.006L551 171.973V146.77H545.5V117.535H563H598.5Z",
      image: "/images/cities/semey.webp",
      title: "Alikhan Bokeikhan University (Semey)",
      address: "Semey, Mangilik El St., 11",
      link: "https://go.2gis.com/T1aNa",
    },
    {
      id: "zhetisu",
      name: "Taldykorgan",
      path: "M534.5 324.702H505.5V264.719H523.5V238.508H551.5H571V247.581H600.5V281.857H582.5V335.791H534.5V324.702Z",
      image: "/images/cities/taldykorgan.webp",
      title: "Jetisu Digital (Taldykorgan)",
      address: "Taldykorgan, Kunayev St., 47",
      link: "https://go.2gis.com/BIkht",
    },
    {
      id: "kyzylorda",
      name: "Kyzylorda",
      path: "M229.5 225.907V253.127V284.882H243V298.492H299V310.589H315.5H326.5V247.582H308.5V225.907L299 221.371V208.77H272.5H243V225.907H229.5Z",
      image: "/images/cities/kyzylorda.webp",
      title: "Kyzylorda Hub",
      address: "Kyzylorda, Aiteke Bi St., 29A",
      link: "https://go.2gis.com/BZnMy",
    },
    {
      id: "west",
      name: "Uralsk",
      path: "M15 197.175H35.5V165.42H89V159.119V152.818H138V146.769H157V101.404H138V87.2907H96.5V75.1934H62.5V87.2907H50.5V98.884H24V113.502H10.5V133.16H3V184.574H15V197.175Z",
      image: "/images/cities/uralsk.webp",
      title: "WKITU (Uralsk)",
      address: "Uralsk, Ikhsanova St., 44/1",
      link: "https://go.2gis.com/ogLhP",
    },
    {
      id: "north",
      name: "Petropavl",
      path: "M329.5 27.3083L303.5 27.3083V55.5355H324.5V81.7465H340V97.3722H376.5V87.7951H402.5V74.6897H450.5V53.5193V31H433.5V18H418.5V3H367V18L329.5 18V27.3083Z",
      image: "/images/cities/petropavl.webp",
      title: "SKO Hub (Petropavl)",
      address: "Petropavl, Zhambyl Zhabayev St., Bldg. 19",
      link: "https://2gis.kz/petropavl",
    },
    {
      id: "turkistan",
      name: "Turkistan",
      path: "M360.5 296.5H327.5V247H367V265H379V277.5H388V296.5H360.5Z",
      image: "/images/cities/turkistan.webp",
      title: "Turkistan Hub",
      address: "Turkistan, Bekzat Sattarkhanov Ave, 36, 2nd floor",
      link: "https://2gis.kz/turkistan",
    },
    {
      id: "kokshetau",
      name: "Kokshetau",
      path: "M450.5 82.7541V101.404H441V117.534H418V137.192H402V158.363H376.5V163.403H339.5V98.3798H376.5V88.2987H402V75.6973H450.5V82.7541Z",
      image: "/images/cities/kokshetau.webp",
      title: "Ualikhanov University (Kokshetau)",
      address: "Kokshetau, 76 Abay Street",
      link: "https://go.2gis.com/UPACa",
    },
    {
      id: "aktau",
      name: "Aktau",
      path: "M90.5 227.924H108H129.5V222.379H156V208.77H170.5V266.232H178V353.938H147V344.361H138.5V330.751H98.5V318.15H83.5V305.044H75V275.809H67.5V238.509H90.5V227.924Z",
      image: "/images/cities/aktau.webp",
      title: "Yessenov University (Aktau)",
      address: "Aktau, 32nd microdistrict, Building 1",
      link: "https://go.2gis.com/38wps",
    },
    {
      id: "konaev",
      name: "Konaev",
      path: "M448.5 290.5H426V245.5H444V256H465.5V279.5H474V299H448.5V290.5Z",
      image: "/images/cities/konaev.webp",
      title: "Alatau Hub (Konaev)",
      address: "Konaev, Kunayev Ave, 5B",
      link: "https://go.2gis.com/jlMWT",
    },
    {
      id: "ulytau",
      name: "Zhezkazgan",
      path: "M379 201.208V163.404H338.5V132.152H308V153.323H256V186.59H273V209.777H298.5V220.362L308 224.899V246.573H368.5V224.899H357V201.208H379Z",
      image: "/images/cities/zhezkazgan.webp",
      title: "Ulytau Hub (Zhezkazgan)",
      address: "Zhezkazgan, Abai St., 99",
      link: "https://go.2gis.com/Iujd5",
    },
  ],
  tracks: [
    {
      title: ["To Be Announced", "Скоро объявим", "Жақында хабарланады"],
      description: [
        "Details coming soon",
        "Подробности появятся совсем скоро",
        "Толық мәлімет жақын арада болады",
      ],
    },
    {
      title: ["To Be Announced", "Скоро объявим", "Жақында хабарланады"],
      description: [
        "Details coming soon",
        "Подробности появятся совсем скоро",
        "Толық мәлімет жақын арада болады",
      ],
    },
  ],
  faqSection: {
    badge: ["Got Questions?", "Остались вопросы?", "Сұрақтарыңыз бар ма?"],
  },
  faq: [
    {
      question: ["What is a hackathon?", "Что такое хакатон?", "Хакатон дегеніміз не?"],
      answer: [
        "A high-energy competition for tech innovators — solve real-world challenges in a limited time, non-stop. Build. Ship. Win.",
        "Это драйвовый марафон для IT-инноваторов: решение реальных бизнес-кейсов за ограниченное время. Создавай. Запускай. Побеждай.",
        "Бұл IT-инноваторларға арналған нағыз марафон: шектеулі уақыт ішінде нақты бизнес-кейстерді шешу. Құрастыр. Іске қос. Жеңіске жет.",
      ],
    },
    {
      question: [
        "How does the 10-day format work?",
        "Как устроены 10 дней хакатона?",
        "10 күндік формат қалай жұмыс істейді?",
      ],
      answer: [
        "First 3 days: You can work offline at one of the official locations across Kazakhstan. Remaining days: The hackathon continues online. Teams finalize and submit their projects remotely.",
        "Первые 3 дня: Работаем оффлайн на официальных локациях по всему Казахстану. Остальное время: Хакатон продолжается в онлайн-режиме, где команды финализируют и сдают свои проекты.",
        "Алғашқы 3 күн: Қазақстан бойынша ресми локацияларда оффлайн жұмыс істейміз. Қалған уақытта: Хакатон онлайн форматта жалғасады, командалар жобаларын аяқтап, қашықтан тапсырады.",
      ],
    },
    {
      question: [
        "Where will the offline days take place?",
        "Где будут проходить оффлайн-дни?",
        "Оффлайн күндер қай жерде өтеді?",
      ],
      answer: [
        "Offline participation will be available at selected official locations across Kazakhstan. The full list of cities will be announced soon.",
        "Оффлайн-этап пройдет на базе региональных IT-хабов и университетов по всему Казахстану. Полный список локаций доступен в разделе «Локации».",
        "Оффлайн кезең Қазақстан бойынша аймақтық IT-хабтар мен университеттер базасында өтеді. Локациялардың толық тізімі «Локациялар» бөлімінде көрсетілген.",
      ],
    },
    {
      question: [
        "Can I participate fully online?",
        "Можно ли участвовать полностью онлайн?",
        "Толығымен онлайн қатысуға бола ма?",
      ],
      answer: [
        "You may join online from any city. Offline attendance during the first 3 days is optional but recommended for networking and atmosphere.",
        "Да, вы можете подключиться из любого города. Оффлайн-присутствие в первые 3 дня желательно для нетворкинга, но не обязательно.",
        "Иә, кез келген қаладан қосыла аласыз. Алғашқы 3 күнде оффлайн қатысу нетворкинг үшін пайдалы, бірақ міндетті емес.",
      ],
    },
    {
      question: [
        "What if I don't have a team?",
        "Что делать, если у меня нет команды?",
        "Егер командам болмаса не істеймін?",
      ],
      answer: [
        "No team? No problem. Connect with fellow builders in our Decentrathon Telegram community or go solo — great ideas can come from anywhere.",
        "Нет команды? Не беда! Найди единомышленников в нашем Telegram-сообществе Decentrathon или участвуй соло — крутые идеи могут родиться и в одиночку.",
        "Команда жоқ па? Ештеңе етпейді! Біздің Decentrathon Telegram қауымдастығында серіктестер тап немесе жеке қатыс — керемет идеялар жалғыз да тууы мүмкін.",
      ],
    },
    {
      question: ["What about meals?", "Будет ли питание?", "Тамақтану мәселесі қалай болады?"],
      answer: [
        "A pizza break will be provided on the first day of the hackathon.",
        "В первый день хакатона всех участников ждет бодрящий пицца-брейк.",
        "Хакатонның бірінші күні барлық қатысушыларды пицца-брейк күтеді.",
      ],
    },
    {
      question: [
        "I didn't find an answer to my question. What should I do?",
        "Не нашли ответа на свой вопрос?",
        "Сұрағыңызға жауап таппадыңыз ба?",
      ],
      answer: [
        "Jump into our Telegram community — our team and fellow hackers are always ready to help. It's the fastest way to get answers and stay in the loop.",
        "Заглядывай в наше Telegram-комьюнити! Команда и другие участники всегда на связи. Это самый быстрый способ получить инсайд и помощь.",
        "Біздің Telegram қауымдастығымызға қосылыңыз! Ұйымдастырушылар мен басқа қатысушылар әрқашан көмекке дайын. Бұл жауап алудың ең жылдам жолы.",
      ],
    },
  ],
  mapSection: {
    badge: ["Nationwide", "По всей стране", "Бүкіл ел бойынша"],
    title: ["Hack From *Your City*", "Твой город — *твоя арена*", "Өз қалаңда *бағыңды сына*"],
    subtitle: [
      "Join *Decentrathon 5.0* from your city. Connected nationwide. Competing as one.",
      "Присоединяйся к *Decentrathon 5.0* из своего города. Мы объединяем всю страну в одну большую команду.",
      "*Decentrathon 5.0* хакатонына өз қалаңнан қосыл. Біз бүкіл елді бір үлкен командаға біріктіреміз.",
    ],
    openIn2GIS: ["Open in 2GIS", "Открыть в 2GIS", "2GIS-те ашу"],
    autoScrollSpeed: 0.5,
  },
  tracksSection: {
    badge: ["Industry-Backed", "При поддержке индустрии", "Индустрия қолдауымен"],
    title: [
      "Hack the system.\n*Solve real industry challenges.*",
      "Меняй правила игры.\n*Решай реальные задачи индустрии.*",
      "Жүйені өзгерт.\n*Индустрияның нақты міндеттерін шеш.*",
    ],
    subtitle: [
      "Tracks are being finalized with our industry partners. Stay tuned for the reveal.",
      "Мы финализируем треки вместе с нашими партнерами. Совсем скоро здесь появятся подробности.",
      "Біз тректерді серіктестерімізбен бірге нақтылап жатырмыз. Жақын арада толық ақпарат пайда болады.",
    ],
    trackLabel: ["Track", "Трек", "Трек"],
    decrypting: ["Decrypting...", "Расшифровка...", "Шифр шешілуде..."],
  },
  heroLabels: {
    register: ["Register Now", "Подать заявку", "Өтінім беру"],
    telegram: ["Join Our Community", "Вступить в комьюнити", "Қауымдастыққа қосылу"],
    locations: ["20+ cities • Offline", "20+ городов • Оффлайн", "20+ қала • Оффлайн"],
  },
  links: {
    register: "#register",
    telegram: "https://t.me/+BF7-mS199-Q4YjAy",
  },
  solanaDay: {
    badge: ["Special Event", "Специальное событие", "Арнайы іс-шара"],
    title: ["*Solana Build Station*", "*Solana Build Station*", "*Solana Build Station*"],
    poweredBy: ["powered by Decentrathon", "при поддержке Decentrathon", "Decentrathon қолдауымен"],
    stats: [
      {
        value: ["2 Tasks", "2 задачи", "2 тапсырма"],
        label: ["Industry challenges to solve", "Индустриальные кейсы", "Индустриялық кейстер"],
      },
      {
        value: ["For Central Asia", "Для Центральной Азии", "Орталық Азия үшін"],
        label: ["Regional scope & impact", "Региональный масштаб", "Аймақтық ауқым"],
      },
      {
        value: ["Kazakhstan 20 cities", "20 городов Казахстана", "Қазақстанның 20 қаласы"],
        label: [
          "Offline locations nationwide",
          "Оффлайн-локации по стране",
          "Ел бойынша оффлайн локациялар",
        ],
      },
    ],
  },
  highlightsSection: {
    badge: ["Why Join?", "Зачем участвовать?", "Неліктен қатысу керек?"],
    title: [
      "More Than Just a *Hackathon*",
      "Больше, чем просто *хакатон*",
      "Бұл тек *хакатон* емес",
    ],
    subtitle: ["", "", ""],
  },
  highlights: [
    {
      title: ["Real Industry Cases", "Реальные кейсы бизнеса", "Нақты бизнес-кейстер"],
      description: [
        "Work on real challenges from leading organizations. No fake tasks. No academic simulations.",
        "Решай задачи от топовых компаний. Никаких учебных примеров — только реальные вызовы рынка.",
        "Үздік компаниялардың тапсырмаларын шеш. Оқу мысалдары емес — тек нақты нарықтық міндеттер.",
      ],
    },
    {
      title: ["Pizza Time!", "Пицца-тайм!", "Пицца-тайм!"],
      description: [
        "Long coding hours? We've got you covered. Pizza, drinks, and energy to keep building.",
        "Много кодинга? Мы позаботимся о тебе. Пицца, напитки и заряд энергии для твоего проекта.",
        "Код жазудан шаршадың ба? Біз сені қолдаймыз. Жобаңды жалғастыру үшін пицца, сусындар және қуат.",
      ],
    },
    {
      title: ["Exclusive Merch", "Эксклюзивный мерч", "Эксклюзивті мерч"],
      description: [
        "Limited Decentrathon 5.0 drops. Only for participants.",
        "Лимитированная серия Decentrathon 5.0. Доступна только для участников.",
        "Decentrathon 5.0 шектеулі топтамасы. Тек қатысушыларға ғана қолжетімді.",
      ],
    },
    {
      title: ["Mentors & Experts", "Менторство и экспертиза", "Менторлық пен сараптама"],
      description: [
        "Direct access to industry mentors. Get feedback. Refine. Ship stronger.",
        "Прямой фидбэк от экспертов индустрии. Улучшай свой продукт и запускайся уверенно.",
        "Индустрия сарапшыларынан тікелей кері байланыс. Өніміңді жетілдіріп, сенімді іске қос.",
      ],
    },
    {
      title: ["Networking & Hiring", "Нетворкинг и карьера", "Нетворкинг және мансап"],
      description: [
        "Meet founders, companies, and future teammates. Real connections. Real opportunities.",
        "Знакомься с фаундерами, компаниями и будущими тиммейтами. Твоя возможность найти работу мечты.",
        "Фаундерлермен, компаниялармен және болашақ командаластарыңмен таныс. Арман болған жұмысты табу мүмкіндігі.",
      ],
    },
  ],
  partnersSection: {
    badge: ["Partners", "Партнеры", "Серіктестер"],
    title: ["OUR PARTNERS", "НАШИ ПАРТНЕРЫ", "БІЗДІҢ СЕРІКТЕСТЕР"],
  },
  partners: [
    {
      name: ["Astana Hub", "Astana Hub", "Astana Hub"],
      image: "/images/logos/logo_ahub.webp",
    },
    {
      name: ["AIDM", "AIDM", "AIDM"],
      image: "/images/logos/logo_aidm.webp",
    },
    {
      name: ["BAITC", "BAITC", "BAITC"],
      image: "/images/logos/logo_baitc.webp",
    },
  ],
  aboutSection: {
    badge: ["Our Story", "Наша история", "Біздің тарихымыз"],
    title: ["About Decentrathon", "О Decentrathon", "Decentrathon туралы"],
    subtitle: [
      "From local hackathon to national movement.",
      "Путь от локального ивента до масштабного национального движения.",
      "Жергілікті шарадан ауқымды ұлттық қозғалысқа дейінгі жол.",
    ],
    stats: [
      {
        value: "12,000+",
        label: ["developers", "разработчиков", "әзірлеушілер"],
      },
      {
        value: "1,300+",
        label: ["projects", "проектов", "жобалар"],
      },
      {
        value: "20+",
        label: ["cities", "городов", "қалалар"],
      },
      {
        value: "4",
        label: ["editions", "сезонов", "маусым"],
      },
    ],
    pastEditionsLabel: ["Past Editions", "Прошлые сезоны", "Өткен маусымдар"],
    editions: [
      { label: "Decentrathon 1.0", link: "https://decentrathon.ai/1/" },
      { label: "Decentrathon 2.0", link: "https://decentrathon.ai/2/" },
      { label: "Decentrathon 3.0", link: null },
      { label: "Decentrathon 4.0", link: "https://decentrathon.ai/4/" },
    ],
  },
  footer: {
    description: [
      "Decentrathon 5.0 is the largest AI hackathon in Kazakhstan. This year, Decentrathon returns in an offline format, spanning 20 regions across the country. The event will bring together developers and AI enthusiasts to create innovative solutions, exchange knowledge, and foster the growth of the AI ecosystem in Kazakhstan.",
      "Decentrathon 5.0 — крупнейший ИИ-хакатон в Казахстане. В этом году Decentrathon возвращается в оффлайн-формате, охватывая 20 регионов страны. Событие объединит разработчиков и энтузиастов ИИ для создания инновационных решений, обмена знаниями и развития экосистемы ИИ в Казахстане.",
      "Decentrathon 5.0 — Қазақстандағы ең ірі AI хакатоны. Биыл Decentrathon еліміздің 20 аймағын қамтып, оффлайн форматта оралады. Іс-шара әзірлеушілер мен AI энтузиастарын инновациялық шешімдер құру, білім алмасу және Қазақстандағы AI экожүйесін дамыту үшін біріктіреді.",
    ],
    reachOut: ["reach out to us", "связаться с нами", "бізбен байланысу"],
    email: "team@baitc.org",
    socials: [
      { name: "Instagram", link: "https://www.instagram.com/decentrathon/" },
      { name: "Telegram", link: "https://t.me/+uwG_E1MZj31hOTAy" },
      { name: "LinkedIn", link: "https://www.linkedin.com/company/centerofblockchain/" },
      { name: "BAITC", link: "https://baitc.org" },
    ],
  },
};
