import { useCallback } from 'react';
import { createWhatsAppUrl } from '../utils/helpers';

/**
 * Custom hook for WhatsApp contact functionality
 */
export const useWhatsAppContact = () => {
  const sendWhatsAppMessage = useCallback((
    contactName: string,
    phone: string,
    propertyTitle: string
  ) => {
    const message = `Hi ${contactName}, I saw your property "${propertyTitle}" on DormDash and I'm interested. Can we discuss?`;
    const whatsappUrl = createWhatsAppUrl(phone, message);
    window.open(whatsappUrl, '_blank');
  }, []);

  return { sendWhatsAppMessage };
};
