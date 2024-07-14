import create from "zustand";

const useStateStore = create((set) => ({
  selectedComponent: "All Batteries",
  setSelectedComponent: (component) => set({ selectedComponent: component }),
  isCustomerTypeModal: false,
  setIsCustomerTypeModal: (component) =>
    set({ isCustomerTypeModal: component }),

  isOpen: false,
  onOpen: () => set({ isOpen: true }),
  onClose: () => set({ isOpen: false }),
  onToggle: () => set((state) => ({ isOpen: !state.isOpen })),

  customerType: "",
  setCustomerType: (component) => set({ customerType: component }),
}));

export default useStateStore;
