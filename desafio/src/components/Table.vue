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
      :data="redacoes"
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
      @click="rowSelected"
    >
      <b-table-column field="id" label="ID" centered v-slot="props">
        {{ props.row.id }}
      </b-table-column>

      <b-table-column field="numero" label="Número" centered v-slot="props">
        {{ props.row.numero }}
      </b-table-column>

      <b-table-column
        field="created_at"
        label="Data"
        sortable
        centered
        v-slot="props"
      >
        {{ dateFormat(props.row.created_at) }}
      </b-table-column>
    </b-table>
  </div>
</template>

<script>
import barramento from "@/barramento.js";

export default {
  props: ["redacoes"],
  data() {
    let data = {... this.redacoes}
    return {
      selected: data,
      perPage: 5,
      defaultSortDirection: "asc",
      sortIcon: "arrow-up",
    };
  },
  methods: {
    dateFormat(date_created) {
      let data = new Date(date_created),
        dia = data.getDate().toString(),
        diaF = dia.length == 1 ? "0" + dia : dia,
        mes = (data.getMonth() + 1).toString(),
        mesF = mes.length == 1 ? "0" + mes : mes,
        anoF = data.getFullYear();
      let hora = data.getHours();
      let minuto = data.getMinutes();
      return `${diaF}/${mesF}/${anoF} às ${hora}:${minuto}`;
    },
    rowSelected() {
      setTimeout(() => {
        barramento.$emit("rowSelected", true);
      }, 300);
    },
    clearSelection() {
      this.selected = null;
      setTimeout(() => {
        barramento.$emit("rowSelected", false);
      }, 300);
    },
  },
};
</script>

<style>
</style>