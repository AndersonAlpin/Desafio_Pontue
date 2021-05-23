<template>
  <div id="redacoes">
    <b-field grouped group-multiline>
      <b-field>
        <b-button
          label="Limpar seleção"
          type="is-danger"
          icon-left="close"
          :disabled="!selected"
          @click="selected = null"
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
      <!-- ID -->
      <b-table-column field="id" label="ID" centered v-slot="props">
        {{ props.row.id }}
      </b-table-column>

      <!-- Número -->
      <b-table-column field="numero" label="Número" centered v-slot="props">
        {{ props.row.numero }}
      </b-table-column>
      <!-- Data -->
      <b-table-column
        field="created_at"
        label="Data"
        centered
        sortable
        v-slot="props"
      >
        {{ dateFormat(props.row.created_at) }}
      </b-table-column>

      <!-- BOTÕES -->
      <b-table-column
        class="buttons"
        field="buttons"
        label="Ações"
        centered
        v-slot="props"
      >
        <div id="buttons" class="buttons">
          <!-- Mostrar URL das redações -->
          <b-button
            class="button"
            type="is-success"
            icon-right="eye"
            name="showRedacao"
            @click="showRedacao(props.row.id)"
          />
          <!-- Deletar redação -->
          <b-button
            class="button"
            type="is-danger"
            icon-right="delete"
            name="delete"
            @click="deleteRedacao(props.row.id)"
          />
        </div>
      </b-table-column>
    </b-table>
  </div>
</template>

<script>
import { dateFormat } from "@/global.js";
import barramento from "@/barramento.js";
import urlAPI from "@/api/url";
import axios from "axios";

export default {
  props: ["list"],
  data() {
    let data = { ...this.list };
    return {
      defaultSortDirection: "asc",
      sortIcon: "arrow-up",
      selected: data[1],
      dateFormat,
      perPage: 5,
    };
  },
  methods: {
    showRedacao(id) {
      barramento.exibirTabVisualizar(id);
    },
    deleteRedacao(id) {
      let json = localStorage.getItem("userKey");
      let userKey = JSON.parse(json);

      let req = {
        headers: {
          Authorization: `Bearer ${userKey.token}`,
        },
      };

      axios
        .delete(`${urlAPI}redacao/${id}/delete`, req)
        .then((res) => {
          this.listRedacoes;
          console.log(res);
        })
        .catch((err) => {
          console.log(err);
        });
    },
  },
};
</script>

<style>
</style>