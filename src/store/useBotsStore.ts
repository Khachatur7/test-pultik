import { create } from 'zustand'
// import axios from "axios";
import { nanoid } from 'nanoid';

export const infoBlockItems = [
    // Main Page
    {
        id: nanoid(),
        text: "Https server",
        link: "https://hjklhkjlhkljhpjhkhddhgfdghfdgfcycffgh.ru:2999/test",
        errorText: "Https server is DOWN!",
        saveField: "pultikBack",
        connected: false,
        noIndicator: false,
        isOpened: false,
        page: "main",
    },
    {
        id: nanoid(),
        text: "Ya bot",
        link: "http://95.165.6.177:9052/test",
        errorText: "YandexMarket stocks bot is DOWN!",
        saveField: "yandexmarket",
        connected: false,
        noIndicator: false,
        isOpened: false,
        page: "main",
    },
    {
        id: nanoid(),
        text: "Oz bot",
        link: "http://95.165.6.177:9051/test",
        errorText: "Ozon stocks bot is DOWN!",
        saveField: "ozon",
        connected: false,
        noIndicator: false,
        isOpened: false,
        page: "main",
    },
    {
        id: nanoid(),
        text: "Oz2 bot",
        link: "http://95.165.6.177:9065/test",
        errorText: "Ozon stocks bot2 is DOWN!",
        saveField: "ozon2",
        connected: false,
        noIndicator: false,
        isOpened: false,
        page: "main",
    },
    {
        id: nanoid(),
        text: "Mongo res bot2",
        link: "http://95.165.6.177:9054/test",
        errorText: "Wildberries stocks bot is DOWN!",
        saveField: "wb",
        connected: false,
        noIndicator: false,
        isOpened: false,
        page: "main",
    },
    {
        id: nanoid(),
        text: "YaE bot",
        link: "http://95.165.6.177:9053/test",
        errorText: "YandexExpress stocks bot is DOWN!",
        saveField: "yae",
        connected: false,
        noIndicator: false,
        isOpened: false,
        page: "main",
    },
    {
        id: nanoid(),
        text: "Stocks bot",
        link: "http://95.165.6.177:9067/test",
        errorText: "Stocks bot is DOWN!",
        saveField: "mailer",
        connected: false,
        noIndicator: false,
        isOpened: false,
        page: "main",
    },
    {
        id: nanoid(),
        text: "Ship bot",
        link: "http://95.165.6.177:9056/test",
        errorText: "Shipment bot is DOWN!",
        saveField: "shipment",
        connected: false,
        noIndicator: false,
        isOpened: false,
        page: "main",
    },
    {
        id: nanoid(),
        text: "Mm bot",
        link: "http://95.165.6.177:9060/test",
        errorText: "MegaMarket stocks bot is DOWN!",
        saveField: "mm",
        connected: false,
        noIndicator: false,
        isOpened: false,
        page: "main",
    },
    {
        id: nanoid(),
        text: "Prices bot",
        link: "http://95.165.6.177:9073/test",
        errorText: "Prices bot is DOWN!",
        saveField: "ya-bus-bot",
        connected: false,
        noIndicator: false,
        isOpened: false,
        page: "main",
    },
    // {
    //     id: nanoid(),
    //     text: "Cancel bot",
    //     link: "http://95.165.6.177:9071/test",
    //     errorText: "Cancel bot is DOWN!",
    //     saveField: "cancel-bot",
    //     connected: false,
    //     noIndicator: false,
    //     isOpened: false,
    //     page: "main",
    // },

    // Bots Page

    {
        id: nanoid(),
        text: "Wb bot",
        link: "http://94.158.166.11:10001/test",
        errorText: "Не удалось получить инфу по Wb bot",
        saveField: "bot1-info",
        connected: false,
        noIndicator: false,
        isOpened: false,
        page: "main",
    },
    {
        id: nanoid(),
        text: "BTC bot",
        link: "http://94.158.166.11:10002/test",
        errorText: "Не удалось получить инфу по BTC bot",
        saveField: "bot2-info",
        connected: false,
        noIndicator: false,
        isOpened: false,
        page: "main",
    },
    {
        id: nanoid(),
        text: "ozCancel bot",
        link: "http://94.158.166.11:10003/test",
        errorText: "Не удалось получить инфу по ozCancel bot",
        saveField: "bot3-info",
        connected: false,
        noIndicator: false,
        isOpened: false,
        page: "main",
    },
    {
        id: nanoid(),
        text: "ozDel Bot",
        link: "http://94.158.166.11:10004/test",
        errorText: "Не удалось получить инфу по ozDel bot",
        saveField: "bot4-info",
        connected: false,
        noIndicator: false,
        isOpened: false,
        page: "main",
    },
    {
        id: nanoid(),
        text: "SynchroOz bot",
        link: "http://94.158.166.11:10005/test",
        errorText: "Не удалось получить инфу по SynchroOz bot",
        saveField: "bot5-info",
        connected: false,
        noIndicator: false,
        isOpened: false,
        page: "main",
    },
    {
        id: nanoid(),
        text: "StocksAn bot",
        link: "http://94.158.166.11:10006/test",
        errorText: "Не удалось получить инфу по Stocks analizator",
        saveField: "bot6-info",
        connected: false,
        noIndicator: false,
        isOpened: false,
        page: "main",
    },
    {
        id: nanoid(),
        text: "gBot",
        link: "http://94.158.166.11:10007/test",
        errorText: "Не удалось получить инфу по gBot",
        saveField: "bot7-info",
        connected: false,
        noIndicator: false,
        isOpened: false,
        page: "main",
    },
    {
        id: nanoid(),
        text: "ozCom",
        link: "http://94.158.166.11:10008/test",
        errorText: "Не удалось получить инфу по ozCom bot",
        saveField: "bot8-info",
        connected: false,
        noIndicator: false,
        isOpened: false,
        page: "main",
    },
    {
        id: nanoid(),
        text: "Mongo res bot",
        link: "http://94.158.166.11:10009/test",
        errorText: "Не удалось получить инфу по Mongo res bot",
        saveField: "bot9-info",
        connected: false,
        noIndicator: false,
        isOpened: false,
        page: "main",
    },
    {
        id: nanoid(),
        text: "ozonFS bot",
        link: "http://94.158.166.11:10001/test",
        errorText: "Не удалось получить инфу по ozonFS bot1",
        saveField: "bot10-info",
        connected: false,
        noIndicator: false,
        isOpened: false,
        page: "main",
    },
    {
        id: nanoid(),
        text: "some bot",
        link: "http://94.158.166.11:10010/test",
        errorText: "Не удалось получить инфу по bot10",
        saveField: "bot11-info",
        connected: false,
        noIndicator: false,
        isOpened: false,
        page: "bots",
    },
    {
        id: nanoid(),
        text: "some bot",
        link: "http://94.158.166.11:10011/test",
        errorText: "Не удалось получить инфу по bot11",
        saveField: "bot12-info",
        connected: false,
        noIndicator: false,
        isOpened: false,
        page: "bots",
    },
    {
        id: nanoid(),
        text: "some bot",
        link: "http://94.158.166.11:10012/test",
        errorText: "Не удалось получить инфу по bot12",
        saveField: "bot13-info",
        connected: false,
        noIndicator: false,
        isOpened: false,
        page: "bots",
    },
    {
        id: nanoid(),
        text: "some bot",
        link: "http://94.158.166.11:10013/test",
        errorText: "Не удалось получить инфу по bot13",
        saveField: "bot14-info",
        connected: false,
        noIndicator: false,
        isOpened: false,
        page: "bots",
    },
    {
        id: nanoid(),
        text: "some bot",
        link: "http://94.158.166.11:10014/test",
        errorText: "Не удалось получить инфу по bot14",
        saveField: "bot15-info",
        connected: false,
        noIndicator: false,
        isOpened: false,
        page: "bots",
    },
    {
        id: nanoid(),
        text: "some bot",
        link: "http://94.158.166.11:10015/test",
        errorText: "Не удалось получить инфу по bot15",
        saveField: "bot16-info",
        connected: false,
        noIndicator: false,
        isOpened: false,
        page: "bots",
    },
    {
        id: nanoid(),
        text: "some bot",
        link: "http://94.158.166.11:10016/test",
        errorText: "Не удалось получить инфу по bot16",
        saveField: "bot17-info",
        connected: false,
        noIndicator: false,
        isOpened: false,
        page: "bots",
    },
    {
        id: nanoid(),
        text: "some bot",
        link: "http://94.158.166.11:10017/test",
        errorText: "Не удалось получить инфу по bot17",
        saveField: "bot18-info",
        connected: false,
        noIndicator: false,
        isOpened: false,
        page: "bots",
    },
    {
        id: nanoid(),
        text: "some bot",
        link: "http://94.158.166.11:10018/test",
        errorText: "Не удалось получить инфу по bot18",
        saveField: "bot19-info",
        connected: false,
        noIndicator: false,
        isOpened: false,
        page: "bots",
    },
    {
        id: nanoid(),
        text: "some bot",
        link: "http://94.158.166.11:100019/test",
        errorText: "Не удалось получить инфу по bot19",
        saveField: "bot20-info",
        connected: false,
        noIndicator: false,
        isOpened: false,
        page: "bots",
    },
    {
        id: nanoid(),
        text: "some bot",
        link: "http://94.158.166.11:10020/test",
        errorText: "Не удалось получить инфу по bot20",
        saveField: "bot21-info",
        connected: false,
        noIndicator: false,
        isOpened: false,
        page: "bots",
    },
];

export interface BotItem {
    id: string;
    link: string;
    text: string;
    errorText: string;
    connected: boolean;
    isOpened: boolean;
    saveField?: string;
    noIndicator?: boolean;
    page: string;
}

interface BotsStoreState {
    bots: BotItem[];
    setBotConnected: (id: string, connected: boolean) => void;
    fetchBotInfo: (bot: BotItem) => void;
    getBotPreset: (bot: BotItem) => void; 
    changeBotOpened: (id: string, opened: boolean, saveField?: string) => void;
}

const useBotsStore = create<BotsStoreState>((set, get) => ({
  bots: infoBlockItems,
  setBotConnected: (id, connected) => {
    set({ 
        bots: [...get().bots.map((bot) => (
            bot.id === id ? 
                { ...bot, connected } 
            : 
                bot
        ))] 
    });
  },
  fetchBotInfo: async (bot) => {
    if (!bot.link) {
        return;
    }

    // const sendErrorText = async () => {
    //     axios(`https://api.telegram.org/bot6596473438:AAEVcM6Al4l8zxJ8MBeloRmeOfZn0fXvfTY/sendMessage?chat_id=-4144681037&text=${bot.errorText}`)
    // }

    // const getInfo = async () => {
    //     try {
    //         const res = await axios(bot.link);

    //         if (res.status !== 200) {
    //             throw Error();
    //         }

    //         get().setBotConnected(bot.id, true);

    //     } catch (error) {
    //         get().setBotConnected(bot.id, false);
    //         if (bot.isOpened) {
    //             sendErrorText();
    //         }
    //     }
    // }

    // await getInfo();
  },
  getBotPreset: (bot) => {
    if (!bot.saveField) {
        return;
    }

    const savedValue = localStorage.getItem(bot.saveField);

    if (!savedValue) {
        return;
    }

    set({ 
        bots: [
            ...get().bots.map((el) => el.id === bot.id ? { ...el, isOpened: savedValue === "true" } : el)
        ] 
    })

  },
  changeBotOpened: (id, opened, saveField) => {

    if (saveField) {
        localStorage.setItem(saveField, `${opened}`);
    }

    set({ 
        bots: [
            ...get().bots.map((el) => el.id === id ? { ...el, isOpened: opened } : el)
        ] 
    })
  },
}))

export default useBotsStore;