<template>
  <v-container fluid>
    <v-data-iterator
      :items="items"
      :search="search"
      :sort-by="sortBy.toLowerCase()"
      :sort-desc="sortDesc"
      hide-default-footer
    >
      <template #header>
        <v-toolbar dark color="accent" class="mb-1">
          <v-text-field
            v-model="search"
            clearable
            flat
            solo-inverted
            hide-details
            prepend-inner-icon="mdi-magnify"
            label="Search"
          ></v-text-field>
          <template v-if="$vuetify.breakpoint.mdAndUp">
            <v-spacer></v-spacer>
            <v-select
              v-model="sortBy"
              flat
              solo-inverted
              hide-details
              :items="keys"
              prepend-inner-icon="mdi-magnify"
              label="Sort by"
            ></v-select>
            <v-spacer></v-spacer>
            <v-btn-toggle v-model="sortDesc" mandatory>
              <v-btn large depressed color="primary" :value="false">
                <v-icon>mdi-arrow-up</v-icon>
              </v-btn>
              <v-btn large depressed color="primary" :value="true">
                <v-icon>mdi-arrow-down</v-icon>
              </v-btn>
            </v-btn-toggle>
          </template>
        </v-toolbar>
      </template>

      <template #default="props">
        <v-row class="mt-5 mb-2 hidden-md-and-down">
          <v-toolbar>
            <v-row class="mx-2" align="center" justify="center">
              <v-col cols="1">ID</v-col>
              <v-col cols="2">InputHost</v-col>
              <v-col cols="2">Host</v-col>
              <v-col cols="2">IP</v-col>
              <v-col cols="1">Time</v-col>
              <v-col cols="3">TimeStamp</v-col>
              <v-col cols="1">isAlive</v-col>
            </v-row>
          </v-toolbar>
        </v-row>
        <v-row>
          <v-col v-for="item in props.items" :key="item.id" cols="12">
            <v-card class="my-1">
              <v-row class="mx-2" align="center" justify="center">
                <v-col cols="2" lg="1">{{ item.id }}</v-col>
                <v-col cols="10" sm="4" lg="2">{{ item.inputHost }}</v-col>
                <v-col cols="6" lg="2" class="d-none d-sm-flex">{{ item.host }}</v-col>

                <v-col cols="3" sm="2" class="hidden-lg-and-up">
                  <v-icon v-if="!item.isAlive" color="error">mdi-lan-disconnect</v-icon>
                  <v-icon v-if="item.isAlive" color="success">mdi-lan-connect</v-icon>
                </v-col>

                <v-col cols="9" sm="4" lg="2">{{ item.ip }}</v-col>
                <v-col cols="12" lg="1" class="hidden-md-and-down">{{ item.time }}</v-col>
                <v-col cols="12" sm="6" lg="3">{{ item.timestamp }}</v-col>

                <v-col cols="3" lg="1" class="hidden-md-and-down">
                  <v-icon v-if="!item.isAlive" color="error">mdi-lan-disconnect</v-icon>
                  <v-icon v-if="item.isAlive" color="success">mdi-lan-connect</v-icon>
                </v-col>
              </v-row>
            </v-card>
          </v-col>
        </v-row>
      </template>
    </v-data-iterator>
  </v-container>
</template>

<script>
export default {
  data() {
    return {
      items: [],
      search: '',
      filter: {},
      sortDesc: false,
      sortBy: 'name',
      keys: ['Id', 'InputHost', 'Host', 'Ip', 'Time', 'Timestamp', 'IsAlive'],
    };
  },
  mounted() {
    this.getProbes();
  },
  methods: {
    async getProbes() {
      try {
        const probes = await this.$axios.$get(`${process.env.baseUrl}/probes`);

        this.items = probes.map((probe) => ({
          id: probe.id,
          inputHost: probe.inputHost,
          host: probe.host,
          ip: probe.numericHost,
          time: probe.time,
          timestamp: new Date(probe.timestamp).toLocaleString(),
          isAlive: probe.isAlive,
        }));
      } catch (err) {
        this.error = err;
      }
    },
  },
};
</script>
