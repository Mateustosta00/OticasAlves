function enviarFormulario(event) {
    event.preventDefault();

    // Validação do campo nome
    if (!validarNome()) {
        exibirMensagemSwal("O campo nome não pode conter números ou símbolos.", "error");
        return;
    }

    // Coletar as respostas do formulário
    var nome = document.getElementById("nome").value;
    var perguntas = [
        document.querySelector('input[name="pergunta1"]:checked').value,
        document.querySelector('input[name="pergunta2"]:checked').value,
        document.querySelector('input[name="pergunta3"]:checked').value,
        document.querySelector('input[name="pergunta4"]:checked').value,
        document.querySelector('input[name="pergunta5"]:checked').value
    ];

    // Contar quantas respostas são "não"
    var respostasNao = perguntas.filter(resposta => resposta === "não").length;

    // Mensagem baseada no número de respostas "não"
    if (respostasNao >= 4) {
        exibirMensagemSwal(
            `Olá ${nome}! ,Sua visão está ótima e queremos mantê-la assim! Agende sua consulta na Óticas Alves e aproveite: você ganhou 10% de cashback no exame. Feliz Dia das Mães, com amor e saúde! ❤️`,
            "success"
        ).then((result) => {
            if (result.isConfirmed) {
                redirecionarWhatsApp(nome);
            }
        });
    } else {
        exibirMensagemSwal(
            `Olá ${nome}! Detectamos uma alteração na sua visão. Agende com nossos profissionais e aproveite: você ganhou 10% de cashback para atualizar seu exame de vista! Feliz Dia das Mães, com saúde e carinho! ❤️`
,
            "error"
        ).then((result) => {
            if (result.isConfirmed) {
                redirecionarWhatsApp(nome);
            }
        });
    }
}

// Função para validar o nome
function validarNome() {
    const nome = document.getElementById("nome").value;

    // Verificar se contém apenas letras e espaços
    const regex = /^[a-zA-ZáéíóúãõâêôçÁÉÍÓÚÃÕÂÊÔÇ\s]*$/;

    return regex.test(nome);
}

// Função para exibir mensagens usando SweetAlert2
function exibirMensagemSwal(mensagem, tipo) {
    return Swal.fire({
        text: mensagem,
        icon: tipo,
        confirmButtonText: 'OK',
        timer: null // Evita fechamento automático
    });
}

// Função para redirecionar para o WhatsApp após confirmação
function redirecionarWhatsApp(nome) {
    var mensagem = encodeURIComponent(`Olá, realizei o teste de visão do Dia das Mães e recebi 10% de cashback. Gostaria de agendar minha consulta e aproveitar o desconto.😊`
);
    window.location.href = `https://wa.me/5571981869278?text=${mensagem}`;
} document.addEventListener('contextmenu', function (e) {
    e.preventDefault(); // Desativa o menu de contexto (clicar com o botão direito)
});

document.addEventListener('keydown', function (e) {
    // Desativa teclas comuns para inspeção (F12, Ctrl + Shift + I, etc.)
    if (e.key === 'F12' || (e.ctrlKey && e.shiftKey && (e.key === 'I' || e.key === 'J'))) {
        e.preventDefault();
    }
});















// Impede o clique com o botão direito
document.addEventListener('contextmenu', function (e) {
    e.preventDefault();
});

// Impede as teclas F12, Ctrl+Shift+I, Ctrl+Shift+J, Ctrl+U
document.addEventListener('keydown', function (e) {
    if (
        e.key === 'F12' ||
        (e.ctrlKey && e.shiftKey && (e.key === 'I' || e.key === 'J')) ||
        (e.ctrlKey && e.key === 'U')
    ) {
        e.preventDefault();
    }
});

// Tenta detectar a abertura do DevTools pelo tamanho da janela
setInterval(function () {
    if (window.outerHeight - window.innerHeight > 200 || window.outerWidth - window.innerWidth > 200) {
        document.body.innerHTML = "<h1 style='text-align:center; margin-top:20%;'>Acesso bloqueado!</h1>";
    }
}, 1000);










