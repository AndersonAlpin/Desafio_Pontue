<template>
  <div id="table">
    <b-field grouped group-multiline>
      <b-field>
        <b-button
          label="Limpar Seleção"
          type="is-danger"
          icon-left="close"
          :disabled="!selected"
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
      :default-sort-direction="defaultSortDirection"
      :sort-icon="sortIcon"
      sort-icon-size="is-small"
      default-sort="created_at"
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
  props: ["list"],
  data() {
    let data = { ...this.list };
    return {
      selected: data,
      perPage: 5,
      defaultSortDirection: "asc",
      sortIcon: "arrow-up",
    };
  },
  methods: {
    clearSelection() {
      this.selected = null;
      barramento.$emit("rowSelected", false);
    },
  },
};
</script>

<style>
</style>