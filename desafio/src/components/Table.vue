<template>
  <div id="table">
    <b-field grouped group-multiline>
      <b-field>
        <b-button
          :label="labelButton"
          :type="colorButton"
          :icon-left="iconButton"
          :disabled="!selected && !activeButton"
          @click="clearSelection"
        />
      </b-field>

      <b-select v-model="perPage">
        <option value="5">5 por página</option>
        <option value="10">10 por página</option>
        <option value="15">15 por página</option>
        <option value="20">20 por página</option>
      </b-select>
    </b-field>

    <b-table
      :data="list"
      paginated
      :per-page="perPage"
      pagination-position="bottom"
      :default-sort-direction="sortDirection"
      sort-icon="arrow-up"
      sort-icon-size="is-small"
      :default-sort="sort"
      aria-next-label="Próxima página"
      aria-previous-label="Página anterior"
      aria-page-label="Página"
      :selected.sync="selected"
    >
      <slot />
    </b-table>
  </div>
</template>

<script>
import barramento from "@/barramento.js";

export default {
  props: [
    "list",
    "labelButton",
    "colorButton",
    "iconButton",
    "activeButton",
    "action",
    "sort",
    "sortDirection",
  ],
  data() {
    let data = { ...this.list };
    return {
      selected: data[1],
      perPage: 5,
    };
  },
  methods: {
    clearSelection() {
      this.selected = null;
      barramento.voltarParaLista();
    },
  },
};
</script>