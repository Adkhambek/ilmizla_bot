module.exports = {
    start: `<b>Assalomu alaykum aziz do'stlar</b> 🔥🔥🔥\n\nBu Telegram Bot orqali siz <a href ="https://www.youtube.com/channel/UCX_HJo3h89sbrrcyQektvBg">YouTube</a> kanalimizdagi video darsliklarni qulay holatda ko'rishingiz mumkin bo'ladi. \n\nEndi siz o'zingizga kerakli bo'lgan video darsliklarni ko'rib chiqishingiz yoki ko'chirib olishingiz mumkin. \n\nBot asta-sekin takomillashib boradi. Agar botda xato kamchiliklar bo'lsa bizga habar berishingizni so'raymiz.\n\n <a href ="https://t.me/muzaffarovadham">Adham Muzaffarov</a>`,
    menu: "🔝 Asosiy Menyu",
    communityTxt: `<b>Quydagi bizning ijtimoiy tarmoqlarga qoshilishingiz mumkin</b> 👇 \n
<b>Telegram:</b> https://t.me/ilmizla_uz
<b>Youtube:</b> http://bit.ly/ilmizla_uz
<b>Instagram:</b>
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
        },
    },
};
