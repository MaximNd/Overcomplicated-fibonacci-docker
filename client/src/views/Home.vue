<template>
  <div class="home pt-4">
    <b-form @submit.prevent="onSubmit">
      <b-form-group
        id="input-index"
        label="Index:"
        label-for="index"
      >
        <b-form-input
          id="index"
          v-model="index"
          type="text"
          required
          placeholder="Enter index"
        ></b-form-input>
      </b-form-group>

      <b-button type="submit" variant="primary">Submit</b-button>
    </b-form>

    <p v-if="updating">Updating...</p>

    <b-card
      title="Indices I have seen:"
      class="mt-2"
    >
    <b-card-text>
      {{ seenIndices.map(row => row.index).join(', ') }}.
    </b-card-text>
  </b-card>

    <b-card
      no-body
      class="mt-2"
    >
      <h4 slot="header">Calculated values:</h4>
      <b-list-group flush>
        <b-list-group-item v-for="([index, value], i) in valuesEntries" :key="i">
          For index {{ index }} I calculated {{ value }}
        </b-list-group-item>
      </b-list-group>
    </b-card>
  </div>
</template>

<script>


export default {
  name: 'home',
  data() {
    return {
      updating: false,
      interval: null,
      seenIndices: [],
      values: {},
      index: ''
    };
  },
  computed: {
    valuesEntries() {
      return Object.entries(this.values);
    }
  },
  methods: {
    onSubmit(event) {
      fetch('/api/values', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          index: this.index
        })
      });
      this.index = '';
    },
    fetchValues() {
      return fetch('/api/values/current')
        .then(res => res.json())
        .then(values => {
          this.values = values;
        });
    },
    fetchIndices() {
      return fetch('/api/indices')
        .then(res => res.json())
        .then(indices => {
          this.seenIndices = indices;
        });
    }
  },
  created() {
    Promise.all([
      this.fetchValues(),
      this.fetchIndices()
    ]).then(() => {
      this.interval = setInterval(async () => {
        this.updating = true;
        // delay for 1.5s
        await new Promise((resolve) => {
          setTimeout(() => resolve(), 1500);
        })
        await Promise.all([
          this.fetchValues(),
          this.fetchIndices()
        ]);
        this.updating = false;
      }, 5000);
    });
  },
  beforeDestroy() {
    clearInterval(this.interval);
  }
};
</script>
