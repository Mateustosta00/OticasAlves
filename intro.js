// Função para aplicar a máscara
function aplicarMascaraTelefone(valor) {
    let value = valor.replace(/\D/g, ""); // Remove tudo que não é número

    // Limitar a 11 dígitos no máximo
    if (value.length > 11) value = value.slice(0, 11);

    // Se tiver entre 8 ou 9 dígitos (sem DDD ou com DDD)
    if (value.length <= 9) {
        if (value.length <= 4) {
            // Para 4 ou menos dígitos: "8356-0631"
            return value.replace(/(\d{4})(\d{0,4})/, '$1-$2');
        } else {
            // Para 9 dígitos: "98356-0631"
            return value.replace(/(\d{5})(\d{0,4})/, '$1-$2');
        }
    } else if (value.length === 10) {
        // Fixo com DDD: "(71) 3234-5678"
        return `(${value.slice(0, 2)}) ${value.slice(2, 6)}-${value.slice(6)}`;
    } else {
        // Celular com DDD: "(71) 98356-0631"
        return `(${value.slice(0, 2)}) ${value.slice(2, 7)}-${value.slice(7)}`;
    }
}

// Aplica a máscara automaticamente quando o usuário digita
document.getElementById("telefone").addEventListener("input", function (e) {
    e.target.value = aplicarMascaraTelefone(e.target.value);
});

// Função para salvar o contato
function salvarContato(event) {
    event.preventDefault();

    const input = document.getElementById("telefone");
    input.value = aplicarMascaraTelefone(input.value); // Força a máscara antes da validação

    const telefone = input.value.trim();

    // Validação de formato para 8, 9 ou 11 dígitos, com ou sem DDD
    const telefoneValido = /^(\(\d{2}\)\s?)?\d{4,5}-\d{4}$/.test(telefone);

    if (!telefoneValido) {
        Swal.fire({
            icon: 'error',
            title: 'Telefone inválido!',
            text: 'Digite um número válido, com 8, 9 ou 11 dígitos, com ou sem DDD. Ex: (71) 98356-0631 ou 983560631.'
        });
        return;
    }

    // Envia os dados para o SheetMonkey
    fetch("https://api.sheetmonkey.io/form/4Fv7geQosY2TsL1AFoYo4v", {
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify({
            Telefone: telefone,
            Data: new Date().toLocaleString("pt-BR")
        })
    })
    .then(response => {
        if (!response.ok) throw new Error("Erro ao enviar dados");

        Swal.fire({
            icon: 'success',
            title: 'Ótica Alves sua melhor escolha!',
            html: `<p>Você será redirecionado para o teste.</p>`,
            confirmButtonText: 'Começar'
        }).then(() => {
            window.location.href = 'inicio.html';
        });
    })
    .catch(error => {
        console.error("Erro na requisição:", error);
        Swal.fire({
            icon: 'error',
            title: 'Erro ao enviar!',
            text: 'Não foi possível enviar seus dados. Tente novamente.'
        });
    });
}
