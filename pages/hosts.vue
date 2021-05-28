<template>
  <v-container>
    <v-row align="center" justify="center" class="mt-4">
      <v-toolbar>
        <v-row class="mx-2" align="center" justify="center">
          <v-col cols="2">ID</v-col>
          <v-col cols="6">Host</v-col>
          <v-col cols="2">Ping</v-col>
          <v-col cols="2">Delete</v-col>
        </v-row>
      </v-toolbar>
    </v-row>

    <v-row>
      <v-col v-for="item in hosts" :key="item.id" cols="12">
        <v-card class="my-1">
          <v-row class="mx-2" align="center" justify="center">
            <v-col cols="2">{{ item.id }}</v-col>
            <v-col cols="6">{{ item.host }}</v-col>
            <v-col cols="2">
              <v-btn color="success" fab x-small @click="pingByHost(item.host)">
                <v-icon>mdi-adjust</v-icon>
              </v-btn>
            </v-col>
            <v-col cols="2">
              <v-btn color="error" fab x-small @click="deleteById(item.id)">
                <v-icon dark>mdi-delete</v-icon>
              </v-btn>
            </v-col>
          </v-row>
        </v-card>
      </v-col>
    </v-row>

    <v-row align="center" justify="center">
      <v-col cols="12" sm="10" md="8" lg="6">
        <v-text-field
          v-model="host"
          :rules="hostRules"
          label="Host Name or IP"
          required
          @change="addHost"
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
        @click="addHost"
      >
        <v-icon left dark>mdi-home-plus</v-icon>
        ADD
      </v-btn>
    </v-row>

    <v-row v-show="pingResult" class="mt-5">
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
              <v-col cols="10" sm="4" lg="2">{{ pingResult.inputHost }}</v-col>
              <v-col cols="6" lg="3" class="d-none d-sm-flex">{{ pingResult.host }}</v-col>

              <v-col cols="3" sm="2" class="hidden-lg-and-up">
                <v-icon v-if="!pingResult.isAlive" color="error">mdi-lan-disconnect</v-icon>
                <v-icon v-if="pingResult.isAlive" color="success">mdi-lan-connect</v-icon>
              </v-col>

              <v-col cols="9" sm="4" lg="2">{{ pingResult.numeric_host }}</v-col>
              <v-col cols="12" lg="1" class="hidden-md-and-down">{{ pingResult.time }}</v-col>
              <v-col cols="12" sm="6" lg="3">{{ new Date().toLocaleString() }}</v-col>

              <v-col cols="3" lg="1" class="hidden-md-and-down">
                <v-icon v-if="!pingResult.alive" color="error">mdi-lan-disconnect</v-icon>
                <v-icon v-if="pingResult.alive" color="success">mdi-lan-connect</v-icon>
              </v-col>
            </v-row>
          </v-card>
        </v-col>
      </v-row>
    </v-row>

    <v-row v-show="deleteResult">
      <v-alert dense text type="success">
        {{ deleteResult }}
      </v-alert>
    </v-row>

    <v-row v-show="addHostResult">
      <v-alert dense text type="success">
        {{ addHostResult }}
      </v-alert>
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
      hosts: [],
      pingResult: '',
      deleteResult: '',
      addHostResult: '',
      error: '',
    }
  },
  mounted() {
    this.getListOfHosts()
  },
  methods: {
    clearResultMessages() {
      this.pingResult = ''
      this.deleteResult = ''
      this.addHostResult = ''
      this.error = ''
    },
    async getListOfHosts() {
      this.clearResultMessages()
      try {
        const res = await this.$axios.$get(`${process.env.baseUrl}/hosts`)
        this.hosts = res
      } catch (err) {
        this.error = err
      }
    },
    async pingByHost(host = '') {
      this.clearResultMessages()
      try {
        const res = await this.$axios.$post(`${process.env.baseUrl}/ping`, { host })
        this.pingResult = res
      } catch (err) {
        this.error = err
      }
    },
    async deleteById(id = null) {
      this.clearResultMessages()
      try {
        const res = await this.$axios.$post(`${process.env.baseUrl}/delete`, { id })
        this.deleteResult = res
        this.getListOfHosts()
      } catch (err) {
        this.error = err
      }
    },
    async addHost() {
      this.clearResultMessages()
      try {
        const res = await this.$axios.$post(`${process.env.baseUrl}/host`, { host: this.host })
        this.addHostResult = res
        this.getListOfHosts()
      } catch (err) {
        this.error = err
      }
    },
  },
}
</script>
