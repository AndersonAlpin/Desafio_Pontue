<template>
  <div id="redacao">
    <Table
      :list="redacao"
      labelButton="Voltar"
      colorButton="is-info"
      iconButton="arrow-left"
      activeButton="true"
    >
      <!-- ID -->
      <b-table-column field="id" label="ID" centered v-slot="props">
        {{ props.row.id }}
      </b-table-column>

      <!-- Anotações -->
      <b-table-column
        field="anotacoes"
        label="Anotações"
        centered
        v-slot="props"
      >
        {{ props.row.anotacoes || "Sem anotações" }}
      </b-table-column>

      <!-- Comentários -->
      <b-table-column
        field="comentarios"
        label="Comentários"
        centered
        v-slot="props"
      >
        {{ props.row.comentarios || "Sem comentários" }}
      </b-table-column>

      <!-- Botões -->
      <b-table-column
        class="buttons"
        field="buttons"
        label="Ações"
        centered
        v-slot="props"
      >
        <div id="buttons" class="buttons">
          <!-- Mostrar redação -->
          <b-button
            class="button"
            type="is-success"
            icon-right="eye"
            name="showRedacao"
            @click="openRedacao(props.row.url)"
          />
          <!-- Editar redação -->
          <template v-if="userKey.aluno_id != null">
            <b-button
              class="button"
              type="is-warning"
              icon-right="file-edit"
              name="edit"
              @click="editRedacao(props.row.id)"
            />
          </template>
        </div>
      </b-table-column>
    </Table>
    <ViewRedacao />
  </div>
</template>

<script>
import ViewRedacao from "@/components/ViewRedacao.vue";
import Table from "@/components/Table.vue";

import barramento from "@/barramento.js";
import urlAPI from "@/api/url";
import axios from "axios";

export default {
  components: { ViewRedacao, Table },
  data() {
    return {
      redacao: [],
      userKey: null,
    };
  },
  methods: {
    backToLista() {
      barramento.voltarParaLista();
      this.redacao = [];
    },
    openRedacao(url) {
      barramento.abriRedacao(url)
    },
    editRedacao(id) {
      barramento.editarRedacao(id);
    },
  },
  created() {
    barramento.quandoVoltarParaLista(result => {
      if(result) this.redacao = []
    })

    this.userKey = JSON.parse(localStorage.getItem('userKey'))

    barramento.quandoExibirTabVisualizar((id) => {
      axios
        .get(`${urlAPI}redacao/${id}`, this.userKey.req)
        .then((res) => {
          this.redacao = res.data.data.urls;
        })
        .catch((err) => {
          console.log(err);
        });
    });
  },
};
</script>

<style>
</style>