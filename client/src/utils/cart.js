const CART_STORAGE_KEY = "daakooCart";

const toNumber = (value) => {
  const parsed = Number(value);
  return Number.isFinite(parsed) ? parsed : 0;
};

export const readCartItems = () => {
  try {
    const stored = localStorage.getItem(CART_STORAGE_KEY);
    if (!stored) {
      return [];
    }

    const parsed = JSON.parse(stored);
    if (!Array.isArray(parsed)) {
      return [];
    }

    return parsed
      .map((item) => ({
        id: item.id,
        name: item.name || "Item",
        price: toNumber(item.price),
        qty: Math.max(1, Number(item.qty) || 1),
      }))
      .filter((item) => item.id);
  } catch {
    return [];
  }
};

const writeCartItems = (items) => {
  localStorage.setItem(CART_STORAGE_KEY, JSON.stringify(items));
  window.dispatchEvent(new Event("daakoo-cart-updated"));
};

export const addItemToCart = (dish) => {
  if (!dish?.id) {
    return;
  }

  const currentItems = readCartItems();
  const existingIndex = currentItems.findIndex((item) => item.id === dish.id);

  if (existingIndex >= 0) {
    const updatedItems = [...currentItems];
    updatedItems[existingIndex] = {
      ...updatedItems[existingIndex],
      qty: updatedItems[existingIndex].qty + 1,
    };
    writeCartItems(updatedItems);
    return;
  }

  writeCartItems([
    ...currentItems,
    {
      id: dish.id,
      name: dish.name || "Item",
      price: toNumber(dish.price),
      qty: 1,
    },
  ]);
};

export const getCartItemCount = (items) => {
  return items.reduce((sum, item) => sum + (Number(item.qty) || 0), 0);
};
