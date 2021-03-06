const { botUsername } = require("../configs/keys");

module.exports = {
    start: `<b>Assalomu alaykum aziz do'stlar</b> 🔥🔥🔥\n\nBu Telegram Bot orqali siz <a href ="https://www.youtube.com/channel/UCX_HJo3h89sbrrcyQektvBg">YouTube</a> kanalimizdagi video darsliklarni qulay holatda ko'rishingiz mumkin bo'ladi. \n\nEndi siz o'zingizga kerakli bo'lgan video darsliklarni ko'rib chiqishingiz yoki ko'chirib olishingiz mumkin. \n\nBot asta-sekin takomillashib boradi. Agar botda xato kamchiliklar bo'lsa bizga habar berishingizni so'raymiz.\n\n <a href ="https://t.me/muzaffarovadham">Adham Muzaffarov</a>`,
    menu: "🔝 Asosiy Menyu",
    communityTxt: `<b>Quydagi bizning ijtimoiy tarmoqlarga qoshilishingiz mumkin</b> 👇 \n
<b>Telegram:</b> https://t.me/ilmizla_uz
<b>Youtube:</b> http://bit.ly/ilmizla_uz
<b>Instagram:</b> https://www.instagram.com/ilmizla_uz/
<b>Github:</b> https://github.com/Adkhambek`,
    dashboardTxt: "Admin panelga hush kelibsiz",
    feedback: {
        main: "Botimiz haqida qandaydir fikr yoki takliflaringiz bo'lsa shu yerda yozib qoldirishingiz mumkin.",
        accept: `✔️ Sizning xabaringiz qabul qilindi.\n
Qo'shimcha xabar kiriting yoki <b>✅ Yuborish</b> tugmasini bosing.\n
Xabarlaringizni bekor qilish uchun esa <b>🚫 Bekor qilish</b> tugmasini bosing.`,
        empty: `⚠️ Kamida bitta xabar yuborishingiz kerak.\n
🔄 Qayta urinib ko'ring`,
        done: `📬 Xabaringiz muvaffaqiyatli yuborildi.`,
        detail: (date, message, username) => `📆 <i>${date}</i>
--------------------------------\n
<b>${message}</b>\n
--------------------------------
👤 @${username}`,
    },
    playlist: {
        admin: {
            main: "Quydagi amallardan birini tanlang 👇",
            add: "Yangi playlist nomini kiriting:",
            remove: "Kerak bo'lmagan playlistni o'chirishingiz mumkin 👇",
            edit: "O'zgartirmoqchi bo'lga playlistingizni tanlang 👇",
        },
    },
    broadcast: "Xabaringizni kiriting 👇",
    statisticsTxt: (total) => `<b>🧑‍💻 Jami obunachilar:</b>  ${total} ta
    
📊  ${botUsername} statistikasi`,
    video: {
        admin: {
            main: "Quydagi amallardan birini tanlang 👇",
            add: "Qaysi playlistga qo'shmoqchisiz:",
            remove: "Kerak bo'lmagan videoni o'chirishingiz mumkin 👇",
            edit: "O'zgartirmoqchi bo'lga videoingizni tanlang 👇",
        },
        public: {
            main: "Quyidagi bo'limlardan birini tanlang 👇",
            playlist: (
                courseName,
                courseAuthor,
                videoNumber,
                duration
            ) => `<b>${"qisqacha".toUpperCase()}</b>\n
<b>Kurs nomi:</b> ${courseName}
<b>Kurs muallifi:</b> ${courseAuthor}
<b>Videolar soni:</b> ${videoNumber}
<b>Kurs davomiyligi</b> ${duration}`,
        },
    },
    error: {
        notFound: `<b>❌ Noma'lum buyruq!</b>

<i>Siz to'g'ridan-to'g'ri bot chatiga xabar yubordingiz, yoki
bot tuzilishi yaratuvchisi tomonidan o'zgartirilgan boʻlishi mumkin.</i>

ℹ️ Xabarlarni to'g'ridan-to'g'ri botga yubormang.`,
        limitMessage: `⚠️ <b>Juda ko'p habar yubordingiz.</b>

Iltimos, kiritga habarlaringizni oldin yuboring, yoki 🚫 <b>Bekor qilish</b>  tugmasini bosing`,
    },
    resource: {
        admin: {
            main: "Quydagi amallardan birini tanlang 👇",
            add: "Qaysi kursga qo'shmoqchisiz:",
            remove: "Kerak bo'lmagan fayllarni o'chirishingiz mumkin 👇",
            edit: "O'zgartirmoqchi bo'lga fayl nomini tanlang 👇",
        },
        public: {
            main: "Quyidagi bo'limlardan birini tanlang 👇",
        },
    },
};
