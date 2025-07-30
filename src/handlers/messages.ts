import axios from "@/axios";

type MessageData = {
  massage: any[]; // Уточните тип для message согласно вашей API
};

// const playNotificationSound = (): void => {
//   try {
//     const audio = new Audio('/new-message.mp3');
//     audio.play().catch(error => {
//       console.error('Failed to play notification sound:', error);
//     });
//   } catch (error) {
//     console.error('Error initializing audio:', error);
//   }
// };

export const checkNewMessagesT = async (): Promise<void> => {
  try {
    const userLogin = localStorage.getItem('pultik-user-login');
    if (!userLogin) return;

    const response = await axios.post<MessageData>('/massages', { user: userLogin });
    const currentMessages = response.data?.massage;
    if (!currentMessages) return;

    const storedMessagesCount = Number(localStorage.getItem('messages'));

    // Если нет данных в localStorage или первый запуск
    if (isNaN(storedMessagesCount)) {
      localStorage.setItem('messages', JSON.stringify(currentMessages.length));
      localStorage.setItem('read-messages', JSON.stringify(currentMessages.length));
      return;
    }

    // Если есть новые сообщения
    if (currentMessages.length > storedMessagesCount) {
      // playNotificationSound();
      localStorage.setItem('messages', JSON.stringify(currentMessages.length));
    }

  } catch (error) {
    console.error('Не удалось получить данные по сообщениям Т', error);
  }
};
