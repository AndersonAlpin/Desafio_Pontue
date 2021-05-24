<template>
  <div id="alunos">
    <Table
      :list="list"
      labelButton="Limpar Seleção"
      colorButton="is-danger"
      iconButton="close"
      sort="aluno.nome_completo"
      sortDirection="asc"
    >
      <!-- Nome do aluno -->
      <b-table-column field="aluno.nome_completo" label="Aluno" centered sortable v-slot="props">
        {{ props.row.aluno.nome_completo }}
      </b-table-column>

      <!-- Nome da escola -->
      <b-table-column field="escola.nome" label="Escola" centered sortable v-slot="props">
        {{ props.row.escola.nome }}
      </b-table-column>

      <!-- Nome da turma -->
      <b-table-column field="aluno.turma.nome" label="Turma" centered sortable v-slot="props">
        {{ props.row.aluno.turma.nome }}
      </b-table-column>

      <!-- Data -->
      <b-table-column field="created_at" label="Data" centered sortable v-slot="props">
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
        </div>
      </b-table-column>
    </Table>
  </div>
</template>

<script>
import Table from "@/components/Table.vue";
import { dateFormat } from "@/global.js";

export default {
  props: ["list"],
  components: { Table },
  data() {
    return {
      dateFormat,
    };
  },
};
</script>

<style>
</style>