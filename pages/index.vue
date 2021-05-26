<template>
  <v-row justify="center" align="center">
    <v-col cols="12" sm="8" md="6">
      <v-row>
        <v-icon large>mdi-home-automation</v-icon>
        <v-alert>{{ response.host }}</v-alert>
      </v-row>
      <v-row>
        <v-icon large>mdi-numeric</v-icon>
        <v-alert>{{ response.ip }}</v-alert>
      </v-row>
      <v-row>
        <v-icon large>mdi-timer</v-icon>
        <v-alert>{{ response.time }}</v-alert>
      </v-row>
      <v-row>
        <v-icon large>mdi-close-network</v-icon>
        <v-alert>{{ response.packetLoss }}</v-alert>
      </v-row>
      <v-row>
        <v-icon large>mdi-power</v-icon>
        <v-alert>{{ response.alive }}</v-alert>
      </v-row>
    </v-col>
  </v-row>
</template>

<script>
export default {
  components: {},
  data() {
    return {
      hosts: ['test'],
      headers: [{ text: 'Host' }],
      response: {
        host: '',
        ip: '',
        time: '',
        packetLoss: '',
        alive: '',
      },
      error: null,
    }
  },
  mounted() {
    this.getPing()
  },
  methods: {
    async getPing() {
      try {
        const probe = await this.$axios.$post('http://localhost:3002/ping', {
          host: 'www.google.com',
        })
        this.response = {
          host: probe.host,
          ip: probe.numeric_host,
          time: probe.time,
          packetLoss: probe.packetLoss,
          alive: probe.alive,
        }
      } catch (err) {
        this.error = err
      }
    },
  },
}
</script>
