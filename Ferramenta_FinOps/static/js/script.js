console.log("O arquivo script.js foi carregado.");

// =====================================
// Script de boas-vindas na página inicial
// =====================================
document.addEventListener("DOMContentLoaded", function() {
  const button = document.querySelector("#welcome-button");
  
  if (button) {
      button.addEventListener("click", function() {
          alert("Bem-vindo à Ferramenta FinOps!");
      });
  }
});

// =====================================
// Função para calcular porcentagem de diminuição
// =====================================
function calcularPorcentagem(consumo, recomendacao) {
  return (recomendacao / consumo) * 100;
}

// =====================================
// Função para calcular severidade com base na porcentagem
// =====================================
function calcularSeveridade(porcentagem) {
  if (porcentagem >= 50) {
      return 'Alta';
  } else if (porcentagem >= 20) {
      return 'Média';
  } else {
      return 'Baixa';
  }
}

// =====================================
// Limpar feedback visual
// =====================================
function limparFeedbackVisual() {
  document.querySelectorAll('.is-invalid').forEach(function(element) {
    element.classList.remove('is-invalid');
  });
}

// =====================================
// Event Listener do formulário - Unificado
// =====================================
document.querySelector('form').addEventListener('submit', function(event) {
  event.preventDefault();  // Impede o envio do formulário

  limparFeedbackVisual();  // Remove feedback visual anterior

  // Validação do formulário
  var nome = document.getElementById('nome').value;
  var consumo = parseFloat(document.getElementById('consumo').value);
  var formularioValido = true;

  if (nome === '') {
      document.getElementById('nome').classList.add('is-invalid');
      formularioValido = false;
  }

  if (consumo <= 0 || isNaN(consumo)) {
      document.getElementById('consumo').classList.add('is-invalid');
      formularioValido = false;
  }

  if (!formularioValido) {
      return;  // Para o processo caso o formulário não seja válido
  }

  // Cálculo de porcentagens e atualização da tabela
  var recomendacoes = document.querySelectorAll('#valorRecoContainer input');
  var tbody = document.querySelector('#tabela-dados tbody');

  // Limpa a tabela antes de inserir novos dados para evitar duplicações
  tbody.innerHTML = '';

  recomendacoes.forEach(function(recomendacao) {
      var valorReco = parseFloat(recomendacao.value);
      if (isNaN(valorReco)) {
          recomendacao.classList.add('is-invalid');
          return;
      }

      var porcentagemDimin = calcularPorcentagem(consumo, valorReco);
      var severidade = calcularSeveridade(porcentagemDimin);

      // Criando uma nova linha na tabela
      var newRow = `
        <tr class="${severidade.toLowerCase()}">
          <td>${nome}</td>
          <td>${porcentagemDimin.toFixed(2)}%</td>
          <td>${valorReco}</td>
          <td>${consumo}</td>
          <td>${severidade}</td>
        </tr>`;

      tbody.innerHTML += newRow;
  });

  // Limpa os campos de entrada após a submissão
  document.getElementById('nome').value = '';
  document.getElementById('consumo').value = '';
  document.getElementById('quantidade').value = '';
  document.getElementById('valorRecoContainer').innerHTML = '';
});
