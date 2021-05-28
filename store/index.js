export const state = () => ({
  isPinging: false,
});

export const mutations = {
  setPinging(state, bool = false) {
    state.isPinging = bool;
  },
};
