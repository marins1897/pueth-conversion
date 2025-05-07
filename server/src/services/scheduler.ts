import cron from 'node-cron';
import { fetchConversionRate } from './vault';
import { saveRate } from './db';

export const startScheduler = () => {
  cron.schedule('*/10 * * * *', async () => { // Every 10 minutes
    try {
      console.log(`Running scheduled task at ${new Date().toISOString()}`);
      const rate = await fetchConversionRate();

      if (rate) {
        await saveRate(rate);
        console.log('Conversion rate updated:', rate);
      } else {
        console.warn('Conversion rate is null, skipping save.');
      }
    } catch (error) {
      console.error('Error updating conversion rate', error);
    }
  });
};
