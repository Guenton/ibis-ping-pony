export const state = () => ({
  isPinging: false,
  interval: 5,
});

export const mutations = {
  setPinging(state, bool = false) {
    state.isPinging = bool;
  },
  setInterval(state, interval = 5) {
    state.interval = interval;
  },
};
