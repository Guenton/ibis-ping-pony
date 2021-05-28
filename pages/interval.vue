<template>
  <v-container>
    <v-row align="center" justify="center" class="my-5">
      <v-col cols="12" sm="6">
        <v-alert type="info" color="secondary">
          The Ping intervals are currently set to: {{ currentInterval }} minutes
        </v-alert>
      </v-col>
    </v-row>

    <v-row align="center" justify="center" class="my-5">
      <v-col cols="12">
        <v-slider
          v-model="interval"
          :label="label"
          :min="min"
          :max="max"
          thumb-color="primary"
          thumb-label="always"
        ></v-slider>
      </v-col>
    </v-row>

    <v-row align="center" justify="center" class="my-5">
      <v-btn color="primary" elevation="10" min-width="200px" large rounded @click="setInterval">
        <v-icon left dark>mdi-map-marker-distance</v-icon>
        UPDATE INTERVAL
      </v-btn>
    </v-row>

    <v-row v-show="error" align="center" justify="center" class="my-5">
      <v-col cols="12" sm="6">
        <v-alert type="error">
          {{ error }}
        </v-alert>
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
export default {
  data() {
    return {
      interval: 5,
      label: 'Interval',
      min: 1,
      max: 180,
      error: '',
    };
  },
  computed: {
    currentInterval() {
      return this.$store.state.interval;
    },
  },
  mounted() {
    this.getInterval();
  },
  methods: {
    clearResultMessages() {
      this.error = '';
    },
    async getInterval() {
      this.clearResultMessages();
      try {
        const interval = await this.$axios.$get(`${process.env.baseUrl}/interval`);
        this.$store.commit('setInterval', interval);
      } catch (err) {
        this.error = err;
      }
    },
    async setInterval() {
      this.clearResultMessages();
      try {
        const interval = await this.$axios.$post(`${process.env.baseUrl}/interval`, {
          interval: this.interval,
        });
        this.$store.commit('setInterval', interval);
      } catch (err) {
        this.error = err;
      }
    },
  },
};
</script>
