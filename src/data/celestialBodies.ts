import type { PlanetData } from '../constants';

export interface CelestialBodyExt extends PlanetData {
    massGravity: number; // Represents the intensity of the gravity well on the spacetime grid
    componentId: string; // Identifier to know which 3D component to render
}

export const CELESTIAL_BODIES: CelestialBodyExt[] = [
    {
        id: 'redgiant',
        componentId: 'RedGiant',
        name: 'Gigante Vermelha',
        distanceAU: 'Varia',
        briefDescription: 'Estrelas em estágio final de vida que se expandiram imensamente. Sua densidade nas camadas externas é menor que a do ar na Terra.',
        fullDescription: [
            'As gigantes vermelhas são estrelas com massa baixa à intermediária, que se expandem e aumentam seu brilho por causa do consumo de hidrogênio do núcleo.',
            'Elas possuem cor avermelhada devido às baixas temperaturas em sua superfície expandida. Após o hidrogênio se esgotar, ela começa a morrer, e suas camadas externas se tornarão uma nebulosa planetária, enquanto seu núcleo se transformará em uma anã branca.',
            'Devido ao seu tamanho colossal, a gravidade na superfície é muito fraca, causando pouca distorção visual no espaço-tempo ao seu redor em comparação com remanescentes estelares compactos.'
        ],
        textureUrl: '', landscapeUrl: '', color: '#ff3300', shadowColor: '#330000', glowColor: 'rgba(255, 50, 0, 0.8)',
        moons: [], bodyType: 'star',
        stats: {
            diameter: 'Até 1000x o Sol', distanceFromSun: 'Vários Anos-luz', orbitalPeriod: 'N/A', rotationPeriod: 'Lenta', axialTilt: 'N/A',
            temperature: '3.000 a 5.000 K', gravity: 'Muito Baixa (Superfície)', density: 'Extremamente Baixa', moons: 'N/A', rings: 'Nenhum',
        },
        massGravity: 0.1,
    },
    {
        id: 'j1407b',
        componentId: 'J1407b',
        name: 'J1407b (Super Saturno)',
        distanceAU: '434 anos-luz',
        briefDescription: 'Um gigante gasoso ou anã marrom com um sistema de anéis 200 vezes maior que os de Saturno.',
        fullDescription: [
            'O sistema de anéis de J1407b é aproximadamente 200 vezes maior que o de Saturno. Seus anéis se estendem por cerca de 120 a 180 milhões de quilômetros de largura.',
            'O raio desses anéis é tão vasto que supera a distância entre a Terra e o Sol. Estima-se que a massa total de poeira e detritos contida nesses anéis seja equivalente a toda a massa da Terra.',
            'Se J1407b estivesse no lugar de Saturno em nosso Sistema Solar, seus anéis seriam facilmente visíveis a olho nu e pareceriam muitas vezes maiores que a Lua cheia, dominando o céu noturno.'
        ],
        textureUrl: '', landscapeUrl: '', color: '#3a2b22', shadowColor: '#1a100a', glowColor: 'rgba(200, 150, 100, 0.5)',
        moons: [], bodyType: 'planet',
        stats: {
            diameter: 'Até 40x Júpiter', distanceFromSun: '434 Anos-luz', orbitalPeriod: '13.3 anos', rotationPeriod: 'Desconhecido', axialTilt: 'N/A',
            temperature: 'Desconhecida', gravity: 'Alta para planetas', density: 'Gasoso denso', moons: 'N/A', rings: '120 milhões de km',
        },
        massGravity: 0.5,
    },
    {
        id: 'whitedwarf',
        componentId: 'WhiteDwarf',
        name: 'Anã Branca',
        distanceAU: 'Varia',
        briefDescription: 'O núcleo remanescente de estrelas como o Sol. Possui o tamanho da Terra, mas uma massa equivalente à do Sol.',
        fullDescription: [
            'Uma anã branca é uma estrela após todo o hidrogênio dela ter se transformado em hélio e carbono, ou seja, ela pode ser considerada uma remanescente estelar.',
            'Ela possui uma altíssima densidade. Uma colher de chá de matéria de anã branca pesaria toneladas na Terra. A grande maioria das estrelas irá se transformar em uma anã branca no fim da vida.',
            'Devido à sua alta massa concentrada em um volume pequeno, elas distorcem o espaço-tempo de forma muito mais perceptível que planetas ou estrelas normais.'
        ],
        textureUrl: '', landscapeUrl: '', color: '#ffffff', shadowColor: '#4444ff', glowColor: 'rgba(200, 200, 255, 0.9)',
        moons: [], bodyType: 'star',
        stats: {
            diameter: 'Semelhante à Terra', distanceFromSun: 'Vários Anos-luz', orbitalPeriod: 'N/A', rotationPeriod: 'Rápida', axialTilt: 'N/A',
            temperature: '100.000 K', gravity: 'Muito Alta', density: 'Milhões de kg/m³', moons: 'N/A', rings: 'Nenhum',
        },
        massGravity: 2.0,
    },
    {
        id: 'neutronstar',
        componentId: 'NeutronStar',
        name: 'Estrela de Nêutron',
        distanceAU: 'Varia',
        briefDescription: 'Núcleo colapsado de uma estrela gigante. É tão densa que prótons e elétrons se fundem formando nêutrons.',
        fullDescription: [
            'Uma estrela de nêutron nasce a partir da explosão de uma supernova. Elas são o objeto mais denso que se pode observar DIRETAMENTE (pois a singularidade do buraco negro não emite luz).',
            'Mesmo possuindo um tamanho relativamente pequeno (cerca de 20 km de diâmetro), sua densidade é tão alta que uma colher de chá de seu material pesaria o equivalente a uma montanha inteira.',
            'Sua gravidade intensa é capaz de distorcer a luz ao seu redor (lente gravitacional). Uma curiosidade é que elas funcionariam como estilingues gravitacionais incrivelmente potentes devido à sua alta gravidade.'
        ],
        textureUrl: '', landscapeUrl: '', color: '#aaaaff', shadowColor: '#111166', glowColor: 'rgba(100, 150, 255, 0.9)',
        moons: [], bodyType: 'star',
        stats: {
            diameter: '~20 km', distanceFromSun: 'Vários Anos-luz', orbitalPeriod: 'N/A', rotationPeriod: 'Muito rápida', axialTilt: 'N/A',
            temperature: 'Milhões de K', gravity: 'Extrema', density: 'Inimaginável', moons: 'N/A', rings: 'Nenhum',
        },
        massGravity: 8.0,
    },
    {
        id: 'pulsar',
        componentId: 'Pulsar',
        name: 'Pulsar',
        distanceAU: 'Varia',
        briefDescription: 'Estrela de nêutron altamente magnetizada que emite feixes de radiação enquanto gira rapidamente.',
        fullDescription: [
            'Um pulsar é um tipo de estrela de nêutron que possui pulsos de radiação sendo emitidos em intervalos precisos de tempo, variando de milissegundos a segundos.',
            'Seu campo magnético é tão forte que seus dois polos lançam partículas de luz e matéria quase à velocidade da luz, produzindo feixes que "varrem" o espaço como um farol cósmico.',
            'Ele se caracteriza principalmente pela sua incrível taxa de rotação estável, sendo utilizado pelos astrônomos como os relógios mais precisos do universo.'
        ],
        textureUrl: '', landscapeUrl: '', color: '#00ffff', shadowColor: '#003366', glowColor: 'rgba(0, 255, 255, 0.9)',
        moons: [], bodyType: 'star',
        stats: {
            diameter: '~20 km', distanceFromSun: 'Vários Anos-luz', orbitalPeriod: 'N/A', rotationPeriod: 'Milissegundos a Segundos', axialTilt: 'Varia',
            temperature: 'Milhões de K', gravity: 'Extrema', density: 'Inimaginável', moons: 'N/A', rings: 'Feixes polares',
        },
        massGravity: 10.0,
    },
    {
        id: 'magnetar',
        componentId: 'Magnetar',
        name: 'Magnetar',
        distanceAU: 'Varia',
        briefDescription: 'A estrela de nêutron com o campo magnético mais forte conhecido, capaz de apagar dados de cartões a 1000 km de distância.',
        fullDescription: [
            'Um magnetar é um subtipo raro de estrela de nêutron cujo campo magnético possui uma intensidade absurdamente alta, sendo trilhões de vezes mais forte que o da Terra.',
            'A pressão magnética é tão brutal que deforma a crosta superdensa da estrela, causando "starquakes" (terremotos estelares) que liberam explosões colossais de raios-X e raios gama.',
            'Se um magnetar estivesse a uma distância igual a da Lua, seu campo magnético seria forte o suficiente para arrancar todo o ferro do sangue humano.'
        ],
        textureUrl: '', landscapeUrl: '', color: '#ff00ff', shadowColor: '#330033', glowColor: 'rgba(255, 0, 255, 0.9)',
        moons: [], bodyType: 'star',
        stats: {
            diameter: '~20 km', distanceFromSun: 'Vários Anos-luz', orbitalPeriod: 'N/A', rotationPeriod: 'Segundos', axialTilt: 'N/A',
            temperature: 'Milhões de K', gravity: 'Extrema', density: 'Inimaginável', moons: 'N/A', rings: 'Campo Magnético Visível',
        },
        massGravity: 12.0,
    },
    {
        id: 'blackhole',
        componentId: 'BlackHole',
        name: 'Buraco Negro (Estelar)',
        distanceAU: 'Varia',
        briefDescription: 'Massa concentrada além do limite limite de fuga da luz. Seu disco de acreção incandescente revela sua presença.',
        fullDescription: [
            'Os buracos negros não são buracos, mas locais onde a matéria colapsou sobre si mesma em um ponto infinitamente pequeno e denso: a Singularidade.',
            'São formados por três partes: Disco de Acreção (gás superaquecido caindo em espiral), Horizonte de Eventos (o "ponto sem retorno" escuro) e a Singularidade.',
            'A densidade infinita faz com que deformem o espaço-tempo de maneira absoluta, parando o fluxo do tempo nas bordas do horizonte de eventos da perspectiva de quem observa de fora.'
        ],
        textureUrl: '', landscapeUrl: '', color: '#000000', shadowColor: '#111111', glowColor: 'rgba(255, 120, 0, 0.8)',
        moons: [], bodyType: 'star',
        stats: {
            diameter: 'Dezenas de km', distanceFromSun: 'Vários Anos-luz', orbitalPeriod: 'N/A', rotationPeriod: 'Alta velocidade angular', axialTilt: 'N/A',
            temperature: 'Bilhões de K (Disco)', gravity: 'Infinita (Singularidade)', density: 'Infinita', moons: 'N/A', rings: 'Disco de Acreção',
        },
        massGravity: 100.0,
    },
    {
        id: 'supermassivebh',
        componentId: 'SupermassiveBlackHole',
        name: 'Buraco Negro Supermassivo',
        distanceAU: '26.000 anos-luz (Sgr A*)',
        briefDescription: 'Os maiores buracos negros conhecidos. Encontram-se no centro das galáxias e possuem a massa de bilhões de sóis.',
        fullDescription: [
            'Buracos negros supermassivos são verdadeiros monstros cósmicos. Eles chegam a ter mais de um bilhão de massas solares, e habitam o coração de quase todas as grandes galáxias.',
            'Eles foram formados nos primórdios do universo e cresceram continuamente devorando gás, estrelas e se fundindo com outros buracos negros.',
            'Um exemplo é o Sagitário A*, localizado no centro da nossa Via Láctea. Apesar de possuírem volume massivo, a profundidade do seu poço gravitacional e o efeito de lente são titânicos.'
        ],
        textureUrl: '', landscapeUrl: '', color: '#000000', shadowColor: '#000000', glowColor: 'rgba(255, 50, 50, 0.9)',
        moons: [], bodyType: 'star',
        stats: {
            diameter: 'Milhões de km', distanceFromSun: 'Vários Anos-luz', orbitalPeriod: 'N/A', rotationPeriod: 'Rápida', axialTilt: 'N/A',
            temperature: 'Bilhões de K', gravity: 'Colossal', density: 'Variada (Média baixa)', moons: 'N/A', rings: 'Disco de Acreção Gigante',
        },
        massGravity: 250.0,
    },
    {
        id: 'quasar',
        componentId: 'Quasar',
        name: 'Quasar',
        distanceAU: 'Bilhões de anos-luz',
        briefDescription: 'Os objetos mais luminosos e destrutivos do universo. Buracos negros supermassivos consumindo matéria de forma frenética.',
        fullDescription: [
            'Os quasares estão entre os objetos mais distantes e antigos conhecidos. São núcleos galácticos ativos, alimentados por buracos negros supermassivos devorando gás em taxas assustadoras.',
            'A fricção e a energia liberada na queda do material geram uma luminosidade equivalente a milhares de vezes a de uma galáxia inteira (bilhões de estrelas combinadas).',
            'Parte dessa matéria não é consumida, sendo disparada quase à velocidade da luz pelos polos magnéticos, formando jatos de plasma que perfuram o espaço interestelar por milhões de anos-luz.'
        ],
        textureUrl: '', landscapeUrl: '', color: '#000000', shadowColor: '#000000', glowColor: 'rgba(255, 255, 255, 1.0)',
        moons: [], bodyType: 'star',
        stats: {
            diameter: 'Sistemas Solares Inteiros', distanceFromSun: 'Limites do Universo', orbitalPeriod: 'N/A', rotationPeriod: 'Extrema', axialTilt: 'N/A',
            temperature: 'Trilhões de K (Jatos)', gravity: 'A Maior do Universo', density: 'Variada', moons: 'N/A', rings: 'Jatos e Disco Massivos',
        },
        massGravity: 500.0,
    }
];
