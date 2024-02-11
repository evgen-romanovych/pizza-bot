const Bot = require('node-telegram-bot-api');
const token = '6711959607:AAGCC0_fIvD0aDBxZ8GxHLgg5l8RWYpTQlE';

const bot = new Bot(token, {
  polling: {
    interval: 300,
    autoStart: true
  }
});
bot.on("polling_error", err => console.log(err.data.error.message));


function mainMenuKeyboard() {
  return {
    keyboard: [
      ["🍕 · Оформити замовлення"],
      ["📃 · Мої замовлення"],
      ['ℹ️ · Моя інформація', "📞 · Зворотній зв'язок"]
    ],
    resize_keyboard: true
  };
}


bot.onText(/\/start/, async (msg) => {

  const photo = './img/start.png';
  const caption = '✌️ · Вітаємо в Prudbay Pizza!\nХочеш свіженьку піцулю тут і зараз? Ти у правильному місці.\nВикористовуй меню внизу, щоб оформити замовлення.';

  await bot.sendPhoto(msg.chat.id, photo, {
    caption,
    reply_markup: mainMenuKeyboard()
  });
});


bot.onText(/🍕 · Оформити замовлення/, async (msg) => {
  const photo = './img/menu-footer.png';
  const caption = '🍕 · Оформлення замовлення.\nВибирай яку піцу хочеш: власну чи готовий варіант?';

  await bot.sendPhoto(msg.chat.id, photo, {
    caption,
    reply_markup: {
      keyboard: [
        ["😸 · Готові варіанти", "🖌️ · Власна піца"],
        ["◀️ · Назад"]
      ],
      resize_keyboard: true
    },
  });
});

bot.onText(/◀️ · Назад/, async (msg) => {
  await bot.sendMessage(msg.chat.id, '🪧 · Ви повернулись в головне меню.', {
    reply_markup: mainMenuKeyboard()
  });
});

bot.onText(/😸 · Готові варіанти/, async (msg) => {
  await bot.sendMessage(msg.chat.id, '😸 · Готові варіанти.', {
    reply_markup: {
      inline_keyboard: [
        [{ text: 'Салямі', callback_data: 'doneSalami' }, { text: 'Гавайська', callback_data: 'doneHavai' }],
        [{ text: 'Козацька', callback_data: 'doneKozak' }, { text: 'Маргарита', callback_data: 'doneMargaret' }],
        [{ text: 'Мексиканська', callback_data: 'doneMexic' }, { text: 'Карбонара', callback_data: 'doneCarbonara' }],
        [{ text: 'Вегетаріанська', callback_data: 'doneVegan' }],[{ text: 'Цезар', callback_data: 'doneCaesar' }],
        [{ text: 'Ростбіф', callback_data: 'doneBiff' }],[{ text: 'Чотири сири', callback_data: 'doneСheeses' }],
      ],
    }
  });
});


bot.on("callback_query", async (ctx) => {

  switch (ctx.data) {
    case "doneSalami":
      caption = "✌️ · Салямі.\nСклад:Томатна основа,Сир моцарела, салямі  \nЦіна:190"
      await bot.sendPhoto(ctx.message.chat.id, './img/salami.webp', { caption });
      break;

    case "doneHavai":
      caption = "✌️ · Гавайська.\nСклад:Соус вершковий, сир моцарела, куряче філе, ананас, кукурудза, маслини \nЦіна:240"
      await bot.sendPhoto(ctx.message.chat.id, './img/havai.webp', { caption });
      break;

    case "doneKozak":
      caption = "✌️ · Козацька.\nСклад:Cоус томатний, сир моцарела, шинка, салямі, мисливські ковбаски, огірки мариновані цибуля , чилі \nЦіна:240"
      await bot.sendPhoto(ctx.message.chat.id, './img/kozak.webp', { caption });
      break;

    case "doneMargaret":
      caption = "✌️ · Маргарита.\nСклад:Соус томатний, сир моцарела, помідори \nЦіна:160"
      await bot.sendPhoto(ctx.message.chat.id, './img/margaret.webp', { caption });
      break;

    case "doneMexic":
      caption = "✌️ · Мексиканська.\nСклад:Cоус томатний, сир моцарела, бекон, папероні, гриби, перець халапеньо \nЦіна:230"
      await bot.sendPhoto(ctx.message.chat.id, './img/mexic.webp', { caption });
      break;

    case "doneCarbonara":
      caption = "✌️ · Карбонара.\nСклад:Соус вершковий, сир моцарела, розмарин, бекон, варене яйце, сир пармезан, каперси, помідор чері \nЦіна:270"
      await bot.sendPhoto(ctx.message.chat.id, './img/karbonara.webp', { caption });
      break;

    case "doneVegan":
      caption = "✌️ · Вегетаріанська.\nСклад:Соус томатний, оливкова олія, сир моцарелла, перець болгарський, помідори, броколі, оливки чорні. \nЦіна:200"
      await bot.sendPhoto(ctx.message.chat.id, './img/vegan.jpg', { caption });
      break;

    case "doneCaesar":
      caption = "✌️ · Цезар .\nСклад:Соус цезар, сир моцарела, бекон, курка, помідор чері, айсберг, пармезан \nЦіна:250"
      await bot.sendPhoto(ctx.message.chat.id, './img/image.png', { caption });
      break;

    case "doneBiff":
      caption = "✌️ · Ростбіф .\nСклад:Соус вершковий, моцарела, гриби, помідори чері, телятина су-від, рукола, соус аджика \nЦіна:290"
      await bot.sendPhoto(ctx.message.chat.id, './img/image1.png', { caption });
      break;

    case "doneСheeses":
      caption = "✌️ · Чотири сири .\nСклад:Cоус вершковий, сир моцарела, сир дор блю, сир королівський, сир пармезан \nЦіна:250"
      await bot.sendPhoto(ctx.message.chat.id, './img/image2.png', { caption });
      break;
          
  }


});


//bot.onText(/📃 · Мої замовлення/, async (msg) => {})


// bot.onText(/ℹ️ · Моя інформація/, async (msg) => {
//   await bot.sendMessage(msg.chat.id, `😎 · Інформація про користувача\nІм'я: 123`, {
//     reply_markup: {
//       inline_keyboard: [
//         [{ text: "Змінити ім'я", callback_data: 'changeUsername' }, { text: 'Гавайська', callback_data: 'doneHavai' }],
//         [{ text: 'Мисливська', callback_data: 'doneHunter' }, { text: 'Маргарита', callback_data: 'doneMargaret' }],
//         [{ text: 'Барбекю', callback_data: 'doneBbq' }, { text: 'Карбонара', callback_data: 'doneCarbonara' }],
//         [{ text: 'Вегетаріанська', callback_data: 'doneVegan' }],
//       ],

//     }
//   });
// });



console.log('Bot started')