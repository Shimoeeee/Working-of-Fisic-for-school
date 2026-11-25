(() => {
    const QUANTIDADE_SEMAFOROS = 3;
    const PONTOS_POR_SEMAFORO = 10;
    function criarDesafio(id, distanciaPorTrechoMetros, tempoFechadoSegundos, duracaoVerdeSegundos) {
        const velocidadeIdealMps = distanciaPorTrechoMetros / tempoFechadoSegundos;

        return Object.freeze({
            id,
            distanciaPorTrechoMetros,
            tempoFechadoSegundos,
            duracaoVerdeSegundos,
            quantidadeSemaforos: QUANTIDADE_SEMAFOROS,
            pontosPorSemaforo: PONTOS_POR_SEMAFORO,
            pontosMaximos: QUANTIDADE_SEMAFOROS * PONTOS_POR_SEMAFORO,
            velocidadeIdealMps,
            velocidadeIdealKmh: velocidadeIdealMps * 3.6
        });
    }

    const DESAFIOS = Object.freeze({
        1: criarDesafio(1, 300, 25, 5),
        2: criarDesafio(2, 700, 20, 5),
        3: criarDesafio(3, 100, 20, 5)
    });

    window.SEMAFORO_GAME = Object.freeze({
        desafios: DESAFIOS,
        velocidadeMaximaKmh: 150
    });
})();
