import create from 'zustand';

const useStateStore = create((set) => ({
  selectedComponent: 'LandingPage',
  setSelectedComponent: (component) => set({ selectedComponent: component }),
   customerName: '',
  setCustomerName: (component) => set({ customerName: component }),
  isCustomerTypeModal: false,
  setIsCustomerTypeModal: (component) =>
    set({ isCustomerTypeModal: component }),

  isOpen: false,
  onOpen: () => set({ isOpen: true }),
  onClose: () => set({ isOpen: false }),
  onToggle: () => set((state) => ({ isOpen: !state.isOpen })),

  customerType: '',
  setCustomerType: (component) => set({ customerType: component }),

  cartItems: [],
  setCartItems: (component) => set({ cartItems: component }),

  cart: {},
  addToCart: (id) =>
    set((state) => {
      const cart = { ...state.cart };
      cart[id] = (cart[id] || 0) + 1;
      return { cart };
    }),
  removeFromCart: (id) =>
    set((state) => {
      const cart = { ...state.cart };
      if (cart[id]) {
        cart[id] -= 1;
        if (cart[id] === 0) {
          delete cart[id];
        }
      }
      return { cart };
    }),
}));

export default useStateStore;
