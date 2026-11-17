import { businessConfig } from '../config/businessConfig';

export function buildWhatsAppLink(message, phone = businessConfig.whatsappNumber) {
  const cleanPhone = phone.replace(/\D/g, '');
  const cleanMessage = encodeURIComponent(message || 'Hello');
  return `https://wa.me/${cleanPhone}?text=${cleanMessage}`;
}

export function openWhatsAppChat(message, phone = businessConfig.whatsappNumber) {
  window.open(buildWhatsAppLink(message, phone), '_blank', 'noopener,noreferrer');
}

export function getCommunityJoinLink() {
  if (businessConfig.communityInviteUrl) {
    return businessConfig.communityInviteUrl;
  }

  return buildWhatsAppLink(businessConfig.communityMessage);
}
