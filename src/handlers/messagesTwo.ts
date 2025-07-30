import axios from "@/axios";

const playNotificationSound = (): void => {
  try {
    const audio = new Audio('/new-message.mp3');
    audio.play().catch(error => {
      console.error('Failed to play notification sound:', error);
    });
  } catch (error) {
    console.error('Error initializing audio:', error);
  }
};

export const checkNewMessagesO = async (): Promise<void> => {
  try {
    const userLogin = localStorage.getItem('pultik-user-login');
    if (!userLogin) return;

    const response = await axios.post('/messeges3', { user: userLogin });
    const currentMessages = response.data?.massage;
    if (!currentMessages) return;

    const storedMessagesCount = Number(localStorage.getItem('o-messages'));

    // Если нет данных в localStorage или первый запуск
    if (isNaN(storedMessagesCount)) {
      localStorage.setItem('o-messages', JSON.stringify(currentMessages.length));
      localStorage.setItem('read-o-messages', JSON.stringify(currentMessages.length));
      return;
    }

    // Если есть новые сообщения
    if (currentMessages.length > storedMessagesCount) {
      playNotificationSound();
      localStorage.setItem('o-messages', JSON.stringify(currentMessages.length));
    }

  } catch (error) {
       console.error('Не удалось получить данные по сообщениям O', error);
  }
};
