# Problemas e Diagnóstico: Spacetime Grid (Solarium)

Este documento detalha os desafios técnicos enfrentados na implementação da grade de espaço-tempo e as razões pelas quais a distorção apresentou comportamentos inconsistentes (travamento, invisibilidade e falta de retorno ao estado original).

## 1. O Problema da Reatividade (A Causa Raiz)

A falha mais crítica não era matemática, mas de **sincronização de estado**.

*   **Sintoma**: Ao trocar de astro (ex: Quasar para Gigante Vermelha), a grade permanecia com a distorção do astro anterior.
*   **Diagnóstico**: O componente `SpacetimeGrid.tsx` estava lendo o índice do astro usando `useStore.getState().activeCelestialIndex` dentro do corpo do componente ou de forma não reativa. Como ele não usava o hook de forma a assinar as mudanças, o React não re-renderizava o componente quando o astro mudava.
*   **Consequência**: A variável `targetGravity` ficava "presa" no valor que tinha quando o componente foi montado pela primeira vez.

## 2. Instabilidade Matemática e Erros de GPU (NaN)

*   **Sintoma**: A grade "congelava" em um estado distorcido e nunca mais mudava.
*   **Diagnóstico**: Uso de integradores de física manuais (como molas de Euler) sem travas de segurança. Ao transitar de uma gravidade alta (500) para uma baixa (0.1), a mola sofria um "overshoot" e o valor de gravidade se tornava negativo por um breve instante.
*   **Falha de Hardware**: O shader utiliza a função `pow(uGravity, 0.3)`. No GLSL, qualquer potência de número negativo é indefinida e retorna `NaN` (Not a Number). Isso quebra o pipeline da GPU e faz com que a malha pare de responder a novos inputs.

## 3. Limiares de Percepção Visual

*   **Sintoma**: Anã Branca e Estrela de Nêutrons pareciam não deformar a grade.
*   **Diagnóstico**: A deformação geométrica (os vértices descendo) estava ocorrendo, mas como não havia iluminação (`glow`) ou mudança de cor (`redshift`) para valores de gravidade menores (abaixo de 50), o usuário via apenas linhas cianas descendo no fundo preto, o que é visualmente imperceptível.
*   **Solução Teórica**: O `smoothstep` do Fragment Shader precisa ser calibrado para que valores baixos (como 2.0 ou 8.0) já disparem brilho e cor.

## 4. Tentativas de Solução e Resultados

| Técnica | Resultado | Motivo da Falha |
| :--- | :--- | :--- |
| **Lerp Simples** | Inconsistente | Linear demais, não passava a sensação de "tecido elástico" e sofria com reatividade lenta. |
| **Mola de Euler** | Perigosa | Causava overshoots negativos que resultavam em `NaN` na GPU, travando o shader. |
| **Framer Motion** | Estável | Resolve a física, mas exige que o componente seja reativo e que a mola tenha um "listener" ativo para não entrar em modo de espera (sleep). |

## 5. Recomendações para o Futuro

Se você decidir consertar a grid futuramente, siga este checklist:

1.  **Garanta a Reatividade**: Use `const activeIndex = useStore(state => state.activeCelestialIndex)` para que o componente re-renderize sempre.
2.  **Proteção de Valor**: No Shader, use sempre `max(0.001, uGravity)` para garantir que nunca chegue valor negativo no `pow()`.
3.  **Calibração Visual**: Ajuste os `smoothstep` de brilho no fragment shader para que a Anã Branca (gravidade ~2.0) já tenha pelo menos 20-30% de brilho no centro.
4.  **Sincronização de Render**: Verifique se o `SpacetimeGrid` não está sendo desmontado por um `<Suspense>` pai durante o carregamento de texturas de outros astros, o que resetaria o estado da mola.

---
*Documentação gerada para o projeto Solarium.*
