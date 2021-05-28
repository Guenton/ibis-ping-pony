<template>
  <v-app dark>
    <v-navigation-drawer v-model="drawer" fixed app>
      <v-list>
        <v-list-item v-for="(item, i) in items" :key="i" :to="item.to" router exact>
          <v-list-item-action>
            <v-icon>{{ item.icon }}</v-icon>
          </v-list-item-action>
          <v-list-item-content>
            <v-list-item-title v-text="item.title" />
          </v-list-item-content>
        </v-list-item>
      </v-list>
    </v-navigation-drawer>

    <v-app-bar fixed app>
      <v-app-bar-nav-icon @click.stop="drawer = !drawer" />
      <v-spacer />
      <ping-pony-logo />
      <v-spacer />
      <v-btn v-show="!isPinging" color="secondary" fab small @click="setPingState">
        <v-icon>mdi-power</v-icon>
      </v-btn>
      <v-span v-show="isPinging" class="mr-3">Pinging every {{ interval }} minutes</v-span>
      <v-btn v-show="isPinging" color="primary" fab small @click="setPingState">
        <v-icon>mdi-power</v-icon>
      </v-btn>
    </v-app-bar>

    <v-main>
      <v-container>
        <nuxt />
      </v-container>
    </v-main>

    <v-footer absolute app>
      <v-spacer />
      <span>&copy; {{ new Date().getFullYear() }} {{ ibis }}</span>
    </v-footer>
  </v-app>
</template>

<script>
import PingPonyLogo from '~/components/images/PingPonyLogo.vue';

export default {
  components: { PingPonyLogo },
  data() {
    return {
      ibis: 'IBIS Management Associates N.V.',
      drawer: false,
      items: [
        {
          icon: 'mdi-apps',
          title: 'Home',
          to: '/',
        },
        {
          icon: 'mdi-adjust',
          title: 'Ping',
          to: '/ping',
        },
        {
          icon: 'mdi-home',
          title: 'Hosts',
          to: '/hosts',
        },
        {
          icon: 'mdi-map-marker-distance',
          title: 'Interval',
          to: '/interval',
        },
      ],
      setPingStateResult: '',
      setPingStateError: '',
    };
  },
  computed: {
    isPinging() {
      return this.$store.state.isPinging;
    },
    interval() {
      return this.$store.state.interval;
    },
  },
  methods: {
    async setPingState() {
      try {
        const res = this.isPinging
          ? await this.$axios.$post(`${process.env.baseUrl}/state`, { trigger: 'off' })
          : await this.$axios.$post(`${process.env.baseUrl}/state`, { trigger: 'on' });
        this.setPingStateResult = res;

        const isOn = await this.$axios.$post(`${process.env.baseUrl}/state`, { trigger: 'check' });
        this.$store.commit('setPinging', isOn);
      } catch (err) {
        this.setPingStateError = err;
      }
    },
  },
};
</script>
