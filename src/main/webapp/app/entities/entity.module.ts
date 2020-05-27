import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';

@NgModule({
  imports: [
    RouterModule.forChild([
      {
        path: 'pais',
        loadChildren: () => import('./projetoBaseChronus/pais/pais.module').then(m => m.ProjetoBaseChronusPaisModule),
      },
      {
        path: 'uf',
        loadChildren: () => import('./projetoBaseChronus/uf/uf.module').then(m => m.ProjetoBaseChronusUfModule),
      },
      {
        path: 'cidade',
        loadChildren: () => import('./projetoBaseChronus/cidade/cidade.module').then(m => m.ProjetoBaseChronusCidadeModule),
      },
      {
        path: 'classificacao-usuario',
        loadChildren: () =>
          import('./projetoBaseChronus/classificacao-usuario/classificacao-usuario.module').then(
            m => m.ProjetoBaseChronusClassificacaoUsuarioModule
          ),
      },
      {
        path: 'endereco',
        loadChildren: () => import('./projetoBaseChronus/endereco/endereco.module').then(m => m.ProjetoBaseChronusEnderecoModule),
      },
      {
        path: 'unidade-atendimento',
        loadChildren: () =>
          import('./projetoBaseChronus/unidade-atendimento/unidade-atendimento.module').then(
            m => m.ProjetoBaseChronusUnidadeAtendimentoModule
          ),
      },
      {
        path: 'entidade',
        loadChildren: () => import('./projetoBaseChronus/entidade/entidade.module').then(m => m.ProjetoBaseChronusEntidadeModule),
      },
      {
        path: 'raca',
        loadChildren: () => import('./projetoBaseChronus/raca/raca.module').then(m => m.ProjetoBaseChronusRacaModule),
      },
      {
        path: 'tipo-sanguineo',
        loadChildren: () =>
          import('./projetoBaseChronus/tipo-sanguineo/tipo-sanguineo.module').then(m => m.ProjetoBaseChronusTipoSanguineoModule),
      },
      {
        path: 'pessoa',
        loadChildren: () => import('./projetoBaseChronus/pessoa/pessoa.module').then(m => m.ProjetoBaseChronusPessoaModule),
      },
      {
        path: 'tipo-usuario',
        loadChildren: () =>
          import('./projetoBaseChronus/tipo-usuario/tipo-usuario.module').then(m => m.ProjetoBaseChronusTipoUsuarioModule),
      },
      {
        path: 'tip-usu-pessoa-entid',
        loadChildren: () =>
          import('./projetoBaseChronus/tip-usu-pessoa-entid/tip-usu-pessoa-entid.module').then(
            m => m.ProjetoBaseChronusTipUsuPessoaEntidModule
          ),
      }
      /* jhipster-needle-add-entity-route - JHipster will add entity modules routes here */
    ]),
  ],
})
export class ProjetoBaseChronusGatewayEntityModule {}
