<template>
  <v-container>
    <v-row align="center" justify="center">
      <v-col cols="12" sm="10" md="8" lg="6">
        <v-text-field
          v-model="host"
          :rules="hostRules"
          label="Host Name or IP"
          required
          @change="ping"
        ></v-text-field>
      </v-col>
    </v-row>

    <v-row align="center" justify="center" class="mt-5">
      <v-btn
        color="primary"
        elevation="10"
        min-width="200px"
        large
        rounded
        :disabled="!host"
        @click="ping"
      >
        <v-icon left dark>mdi-adjust</v-icon>
        PING
      </v-btn>
    </v-row>

    <v-row v-show="result" class="mt-5">
      <v-col cols="12">
        <v-row class="mt-5 mb-2 hidden-md-and-down">
          <v-toolbar>
            <v-row class="mx-2" align="center" justify="center">
              <v-col cols="2">InputHost</v-col>
              <v-col cols="3">Host</v-col>
              <v-col cols="2">IP</v-col>
              <v-col cols="1">Time</v-col>
              <v-col cols="3">TimeStamp</v-col>
              <v-col cols="1">isAlive</v-col>
            </v-row>
          </v-toolbar>
        </v-row>
      </v-col>
      <v-row>
        <v-col cols="12">
          <v-card class="my-1">
            <v-row class="mx-2" align="center" justify="center">
              <v-col cols="10" sm="4" lg="2">{{ result.inputHost }}</v-col>
              <v-col cols="6" lg="3" class="d-none d-sm-flex">{{ result.host }}</v-col>

              <v-col cols="3" sm="2" class="hidden-lg-and-up">
                <v-icon v-if="!result.alive" color="error">mdi-lan-disconnect</v-icon>
                <v-icon v-if="result.alive" color="success">mdi-lan-connect</v-icon>
              </v-col>

              <v-col cols="9" sm="4" lg="2">{{ result.numeric_host }}</v-col>
              <v-col cols="12" lg="1" class="hidden-md-and-down">{{ result.time }}</v-col>
              <v-col cols="12" sm="6" lg="3">{{ new Date().toLocaleString() }}</v-col>

              <v-col cols="3" lg="1" class="hidden-md-and-down">
                <v-icon v-if="!result.alive" color="error">mdi-lan-disconnect</v-icon>
                <v-icon v-if="result.alive" color="success">mdi-lan-connect</v-icon>
              </v-col>
            </v-row>
          </v-card>
        </v-col>
      </v-row>
    </v-row>

    <v-row v-show="error" class="mt-5">
      {{ error }}
    </v-row>
  </v-container>
</template>

<script>
export default {
  data() {
    return {
      host: '',
      hostRules: [(val) => !!val || 'Host is required'],
      result: '',
      error: '',
    }
  },
  methods: {
    async ping() {
      try {
        const res = await this.$axios.$post(`${process.env.baseUrl}/ping`, { host: this.host })
        this.result = res
      } catch (err) {
        this.error = err
      }
    },
  },
}
</script>
