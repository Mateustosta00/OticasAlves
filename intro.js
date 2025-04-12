// Máscara automática para o campo de telefone
document.getElementById("telefone").addEventListener("input", function(e) {
    let input = e.target;
    let value = input.value.replace(/\D/g, ""); // Remove não-dígitos

    if (value.length > 11) value = value.slice(0, 11); // Limita a 11 dígitos

    // Formatação dinâmica
    if (value.length >= 2 && value.length <= 6) {
        input.value = `(${value.slice(0, 2)}) ${value.slice(2)}`;
    } else if (value.length > 6 && value.length <= 10) {
        input.value = `(${value.slice(0, 2)}) ${value.slice(2, 6)}-${value.slice(6)}`;
    } else if (value.length > 10) {
        input.value = `(${value.slice(0, 2)}) ${value.slice(2, 7)}-${value.slice(7)}`;
    } else {
        input.value = value;
    }
});

// Função para salvar o contato
function salvarContato(event) {
    event.preventDefault();

    const telefone = document.getElementById("telefone").value.trim();

    // Validação no formato (99) 99999-9999 ou (99) 9999-9999
    const telefoneValido = /^\(\d{2}\)\s\d{4,5}-\d{4}$/.test(telefone);

    if (!telefoneValido) {
        Swal.fire({
            icon: 'error',
            title: 'Telefone inválido!',
            text: 'Digite um número válido no formato (XX) XXXXX-XXXX.'
        });
        return;
    }

    // Envia apenas o telefone e a data para a planilha via SheetMonkey
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
            title: 'Ótica alves agradece!',
            html: `<p>Você será redirecionado para o teste.</p>`,
            confirmButtonText: 'Começar'
        }).then(() => {
            // Redireciona para index.html após o sucesso
            window.location.href = `index.html`;
        });
    })
    .catch(error => {
        Swal.fire({
            icon: 'error',
            title: 'Erro ao salvar!',
            text: 'Não foi possível enviar os dados. Tente novamente mais tarde.'
        });
        console.error(error);
    });
}
