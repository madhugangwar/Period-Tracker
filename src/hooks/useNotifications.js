import { useEffect } from 'react';

export const useNotifications = (predictions, enabled) => {
  useEffect(() => {
    if (!enabled || !predictions || !('Notification' in window)) return;

    const checkReminder = () => {
      const today = new Date();
      const tomorrow = new Date(today);
      tomorrow.setDate(tomorrow.getDate() + 1);
      
      const nextPeriodDate = new Date(predictions.nextPeriodStart);
      const reminderDate = new Date(nextPeriodDate);
      reminderDate.setDate(reminderDate.getDate() - 1);

      // Check if tomorrow is the reminder date
      if (tomorrow.toDateString() === reminderDate.toDateString()) {
        const lastNotification = localStorage.getItem('lastPeriodReminder');
        const today = new Date().toDateString();
        
        if (lastNotification !== today) {
          new Notification('Period Reminder', {
            body: `Your period is expected to start tomorrow (${nextPeriodDate.toLocaleDateString()})`,
            icon: '/favicon.ico',
            tag: 'period-reminder'
          });
          localStorage.setItem('lastPeriodReminder', today);
        }
      }
    };

    // Request permission
    if (Notification.permission === 'default') {
      Notification.requestPermission();
    }

    // Check immediately and then every hour
    checkReminder();
    const interval = setInterval(checkReminder, 60 * 60 * 1000);

    return () => clearInterval(interval);
  }, [predictions, enabled]);
};