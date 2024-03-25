const listaPalavras = ["javascript", "programacao", "computador", "desenvolvimento"];

        let palavraEscolhida;
        let exibicaoPalavra;
        let letrasChutadas;
        let tentativasRestantes;
        let numeroErros;

        function iniciar() {
            // Escolhendo palavra aleatória da Array
            document.getElementById('entrada_letra').disabled = false;
            document.getElementById('reiniciar').style.display = 'none';

            palavraEscolhida = listaPalavras[Math.floor(Math.random() * listaPalavras.length)];
            console.log(palavraEscolhida);

            // Inicializa o jogo
            exibicaoPalavra = Array(palavraEscolhida.length).fill('_');
            console.log(exibicaoPalavra);

            letrasChutadas = [];
            tentativasRestantes = 7;
            numeroErros = 0;

            atualizarExibicao();
        }

        // Função para atualizar o jogo com as palavras e a imagem do bonequinho.
        function atualizarExibicao() {
            document.getElementById('exibir_palavra').innerText = exibicaoPalavra.join(' ');
            document.getElementById('letras_chutadas').innerText = letrasChutadas.join(', ');

            document.getElementById('mensagem').innerText = '';
            document.getElementById('imagem').src = `imagem/img${numeroErros}.png`;

            // Verificação caso o jogo tenha terminado
            if (tentativasRestantes === 0) {
                jogoEncerrado('Você perdeu');
            } else if (!exibicaoPalavra.includes('_')) {
                jogoEncerrado('Parabéns! Você ajudou o boneco laranja');
            }
        }

        function jogoEncerrado(mensagem) {
            // Desabilita digitação quando o usuário perde
            document.getElementById('entrada_letra').disabled = true;
            document.getElementById('mensagem').innerText = mensagem;
            document.getElementById('mensagem').style.display = 'block';
            document.getElementById('reiniciar').style.display = 'block';
        }

        // Função que verifica a letra digitada pelo usuário
        function chutarLetra() {
            const entradaLetra = document.getElementById('entrada_letra');
            const letra = entradaLetra.value.toLowerCase();

            if (!letra.match(/[a-zà-ùç]/i)) {
                alert('Por favor, insira uma letra válida.');
                return;
            }
            
            if (letrasChutadas.includes(letra)) {
                alert('Você já tentou essa letra.');
                return;
            }

            letrasChutadas.push(letra);

            if (palavraEscolhida.includes(letra)) {
                for (let i = 0; i < palavraEscolhida.length; i++) {
                    if (palavraEscolhida[i] === letra) {
                        exibicaoPalavra[i] = letra;
                    }
                }
            } else {
                tentativasRestantes--;
                numeroErros++;
            }

            entradaLetra.value = '';

            atualizarExibicao();
        }

        iniciar(); // Chama a função iniciar assim que a página carrega