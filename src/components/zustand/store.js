import create from 'zustand';

const useStateStore = create((set) => ({
  selectedComponent: 'LandingPage',
  setSelectedComponent: (component) => set({ selectedComponent: component }),
  // customerName: '',
  // setCustomerName: (customerName) => set({ customerName }),

  isCustomerTypeModal: false,
  setIsCustomerTypeModal: (component) =>
    set({ isCustomerTypeModal: component }),

  isOpen: false,
  onOpen: () => set({ isOpen: true }),
  onClose: () => set({ isOpen: false }),
  onToggle: () => set((state) => ({ isOpen: !state.isOpen })),

  customerType: 'Wholesale',
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

  rows: [],
  setRows: (component) => set({ rows: component }),
  totalAmountReceived: 0,
  setTotalAmountReceived: (component) =>
    set({ totalAmountReceived: component }),

  finalAmount: 0,
  setFinalAmount: (component) => set({ finalAmount: component }),

  discount: null,
  setDiscount: (component) => set({ discount: component }),

  customers: [],
  setCustomers: (component) => set({ customers: component }),

  selectedCustomerId: null,
  setSelectedCustomerId: (component) => set({ selectedComponent: component }),

  selectedCustomer: null,
  setSelectedCustomer: (customer) => set({ customer }),

  receivedAmount: 0,
  setReceivedAmount: (receivedAmount) => set({ receivedAmount }),

  addedBatteries: [],
  setAddedBatteries: (addedBatteries) => set({ addedBatteries }),

  returnedProductAmount: 0,
  setReturnedProductAmount: (returnedProductAmount) =>
    set({ returnedProductAmount }),

  email: '',
  password: '',
  setEmail: (email) => set({ email }),
  setPassword: (password) => set({ password }),
}));

export default useStateStore;
