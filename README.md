# Jogo do Semáforo — Grupo 5

Projeto de Ciências sobre a onda verde. O jogador escolhe uma velocidade e tenta atravessar três semáforos durante a abertura dos sinais.

## Páginas e lógica

- `main_file.html`: apresentação do trabalho, integrantes e objetivo do jogo.
- `frontend/game/pagina de  desafios/segunda_pagina.html`: escolha dos desafios e controle das escolhas da rodada.
- `frontend/game/game.html`: página única do jogo; recebe o desafio selecionado pela URL e executa o movimento e os ciclos dos semáforos.
- `frontend/game/challenge-config.js`: configurações centralizadas dos desafios.

## Desafios

Cada desafio usa três semáforos, vale 10 pontos por passagem no verde e permite até 30 pontos.

| Desafio | Distância de cada trecho | Fechado | Aberto | Velocidade ideal |
| --- | ---: | ---: | ---: | ---: |
| 1 | 300 m | 25 s | 5 s | 12 m/s (43,2 km/h) |
| 2 | 700 m | 20 s | 5 s | 35 m/s (126 km/h) |
| 3 | 100 m | 20 s | 5 s | 5 m/s (18 km/h) |

O cálculo é `velocidade (m/s) = distância entre sinais (m) / tempo fechado (s)`. A contagem do primeiro sinal começa na largada; a contagem de cada sinal seguinte começa quando o carro passa pelo anterior. Depois do tempo fechado, o sinal abre por 5 segundos. Para comparar com o seletor, converta para km/h multiplicando por 3,6. O seletor aceita velocidades de 2 a 150 km/h, em passos de 0,1 km/h, e começa em 20 km/h.

Os quatro trechos têm a mesma distância: início ao primeiro semáforo, entre os três semáforos e do último semáforo ao final. O relógio de jogo corre 6 vezes mais rápido que o relógio real. Movimento, contagem regressiva e semáforos usam os mesmos segundos simulados; cada abertura verde dura exatamente 5 segundos simulados.

As escolhas da rodada ficam em `sessionStorage`: permanecem ao navegar entre as páginas na mesma aba e voltam ao início quando a sessão da aba termina.

PROXIMO PASSO:
RETIRAR TODAS AS IMPURESAS DA TELA DE DESAFIOS

OBS: O RESULTADO SERÁ EM M/S, PARA ISSO DEVE MULTIPLICAR POR 3,6

O QUE COLOCAR:
BARULHO DE VITORIA
PAGINA DE ACERTOS
GABARITO AO TERMINAR A PAGINA
COLOCAR SONS DURANTE O CARRO PERCORRER
DEIXAR MENOS TEXTOS, POIS FICA CONFUSA


BUGS:
O JOGO NÃO ESTÁ CONTANDO OS 10 PONTOS POR PARTIDA