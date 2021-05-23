<template>
  <div id="redacoes">
    <b-field grouped group-multiline>
      <b-field>
        <b-button
          label="Voltar"
          type="is-info"
          icon-left="arrow-left"
          :disabled="false"
          @click="backToLista"
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
      :data="redacao"
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
          <b-button
            class="button"
            type="is-warning"
            icon-right="file-edit"
            name="edit"
            @click="editRedacao(props.row.id)"
          />
        </div>
      </b-table-column>
    </b-table>
    <ViewRedacao :link="redacaoUrl" />
  </div>
</template>

<script>
import barramento from "@/barramento.js";
import urlAPI from "@/api/url";
import axios from "axios";

import ViewRedacao from "@/components/ViewRedacao.vue";

export default {
  components: { ViewRedacao },
  data() {
    return {
      redacao: [],
      redacaoUrl: "",
      selected: null,
      req: null,
      perPage: 5,
      defaultSortDirection: "asc",
      sortIcon: "arrow-up",
    };
  },
  methods: {
    backToLista() {
      barramento.voltarParaLista();
      this.redacao = [];
    },
    openRedacao(url) {
      this.redacaoUrl = url;
    },
    editRedacao(id) {
      barramento.editarRedacao(id);
    },
  },
  created() {
    barramento.quandoExibirTabVisualizar((id) => {
      let json = localStorage.getItem("userKey");
      let userKey = JSON.parse(json);

      this.req = {
        headers: {
          Authorization: `Bearer ${userKey.token}`,
        },
      };

      axios
        .get(`${urlAPI}redacao/${id}`, this.req)
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