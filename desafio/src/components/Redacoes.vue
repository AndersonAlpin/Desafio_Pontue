<template>
  <div id="redacoes">
    <Modal :isModalActive="isModalActive">
      <b-button @click="isModalActive = false" type="is-primary" label="Fechar"></b-button>
      <b-button @click="deleteRedacao" type="is-warning" label="Excluir"></b-button>
    </Modal>
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
      <b-table-column
        field="numero"
        label="Número"
        sortable
        centered
        v-slot="props"
      >
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
            @click="confirmDelecao(props.row.id)"
          />
        </div>
      </b-table-column>
    </Table>
  </div>
</template>

<script>
import Table from "@/components/Table.vue";
import Modal from "@/components/Modal.vue";

import { dateFormat } from "@/global.js";
import barramento from "@/barramento.js";
import urlAPI from "@/api/url";
import axios from "axios";

export default {
  components: { Table, Modal },
  props: ["list"],
  data() {
    return {
      dateFormat,
      isModalActive: false,
      redacao_id: null,
    };
  },
  methods: {
    showRedacao(id) {
      barramento.exibirTabVisualizar(id);
    },
    confirmDelecao(id) {
      this.redacao_id = id;
      this.isModalActive = true;
    },
    deleteRedacao() {
      
      this.isModalActive = false;

      let user = this.$store.state.login[0];

      axios
        .delete(`${urlAPI}redacao/${this.redacao_id}/delete`, user.req)
        .then((res) => {
          console.log(res);
          barramento.deletarRedacao()
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