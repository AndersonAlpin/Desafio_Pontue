<template>
  <div id="redacoes">
    <Table
      :list="list"
      labelButton="Limpar Seleção"
      colorButton="is-danger"
      iconButton="close"
      sort="created_at"
      sortDirection="desc"
    >
      <!-- ID -->
      <b-table-column field="id" label="ID" centered v-slot="props">
        {{ props.row.id }}
      </b-table-column>

      <!-- Número -->
      <b-table-column field="numero" label="Número" sortable centered v-slot="props">
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
    </Table>
  </div>
</template>

<script>
import Table from "@/components/Table.vue";

import { dateFormat } from "@/global.js";
import barramento from "@/barramento.js";
import urlAPI from "@/api/url";
import axios from "axios";

export default {
  components: { Table },
  props: ["list"],
  data() {
    return {
      dateFormat,
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