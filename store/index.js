export const state = () => ({
  hosts: [],
})

export const mutations = {
  add(state, host) {
    state.hosts.push(host)
  },
  remove(state, host) {
    const index = state.hosts.indexOf(host)
    state.hosts.splice(index, 1)
  },
}
