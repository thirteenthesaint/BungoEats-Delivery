import { CartItem } from '@/lib/store/cartStore';

interface OrderDetails {
  items: CartItem[];
  customerName: string;
  phone: string;
  address: string;
  subtotal: number;
  deliveryFee: number;
  total: number;
}

export function generateWhatsAppOrderMessage(orderDetails: OrderDetails): string {
  const { items, customerName, phone, address, subtotal, deliveryFee, total } = orderDetails;

  // Group items by restaurant
  const itemsByRestaurant = items.reduce((acc, item) => {
    if (!acc[item.restaurantName]) {
      acc[item.restaurantName] = [];
    }
    acc[item.restaurantName].push(item);
    return acc;
  }, {} as Record<string, CartItem[]>);

  let message = '🍔 NEW ORDER FROM BUNGOEATS\n\n';
  message += '📦 ORDER DETAILS:\n';

  let itemNumber = 1;
  Object.entries(itemsByRestaurant).forEach(([restaurantName, restaurantItems]) => {
    restaurantItems.forEach((item) => {
      const itemTotal = item.price * item.quantity;
      message += `${itemNumber}. ${item.name}\n`;
      message += `   Restaurant: ${restaurantName}\n`;
      message += `   Quantity: ${item.quantity}\n`;
      message += `   Price: KSh ${item.price} x ${item.quantity} = KSh ${itemTotal}\n\n`;
      itemNumber++;
    });
  });

  message += '💰 PAYMENT SUMMARY:\n';
  message += `Subtotal: KSh ${subtotal}\n`;
  message += `Delivery Fee: KSh ${deliveryFee}\n`;
  message += `Total: KSh ${total}\n\n`;

  message += '📍 DELIVERY DETAILS:\n';
  message += `Name: ${customerName}\n`;
  message += `Phone: ${phone}\n`;
  message += `Address: ${address}\n`;

  return encodeURIComponent(message);
}

export function sendWhatsAppOrder(orderDetails: OrderDetails, whatsappNumber: string = '254795588857') {
  const message = generateWhatsAppOrderMessage(orderDetails);
  const whatsappUrl = `https://wa.me/${whatsappNumber}?text=${message}`;
  window.open(whatsappUrl, '_blank');
}
