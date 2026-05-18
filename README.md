# 🪐 Solarium Explorer

Solarium is a premium, immersive **Solar System Explorer** built with modern web technologies. It provides a stunning 3D visualization of our celestial neighborhood, combining realistic orbital physics with a high-end editorial design.

## ✨ Key Features

- **3D Orbit System**: A high-performance orbital engine built with Pure CSS 3D transforms.
- **Dynamic Perspective**: Toggle between 2D and 3D views with a 75° tilt for depth.
- **Scale Modes**:
  - **ADAPT**: Otimizada para apresentação e visibilidade dos planetas.
  - **DIST**: Distâncias orbitais proporcionais baseadas em Unidades Astronômicas (AU).
  - **TAM**: Tamanhos físicos relativos dos corpos celestes.
- **Linear Alignment**: Modo de comparação ("Enfileirados") para estudo lado a lado.
- **Interactive Data Panel**: Fichas técnicas detalhadas, descrições e paisagens de cada planeta.
- **Precision Zoom**: Zoom via scroll do mouse com realinhamento automático de coordenadas.
- **Full Solar System**: Inclui os 8 planetas principais e os planetas anões (Ceres, Plutão, Haumea, Makemake, Éris).

## 🚀 Tech Stack

- **Core**: [React 19](https://react.dev/) & [TypeScript](https://www.typescriptlang.org/)
- **Build Tool**: [Vite 7](https://vitejs.dev/)
- **Styling**: [Tailwind CSS 4](https://tailwindcss.com/)
- **3D Engine**: CSS `preserve-3d` & [Three.js](https://threejs.org/) (Hybrid approach)
- **State Management**: [Zustand](https://github.com/pmndrs/zustand)
- **Animations**: [Framer Motion](https://www.framer.com/motion/) & [AnimeJS](https://animejs.com/)
- **Icons**: [Lucide React](https://lucide.dev/)

## 🛠️ Getting Started

### Prerequisites

- [Node.js](https://nodejs.org/) (v18 or higher)
- npm or yarn

### Installation

1. Clone the repository:
   ```bash
   git clone https://github.com/your-username/solarium.git
   ```

2. Navigate to the project directory:
   ```bash
   cd solarium
   ```

3. Install dependencies:
   ```bash
   npm install
   ```

### Development

Run the development server with Hot Module Replacement (HMR):
```bash
npm run dev
```

### Production Build

Create an optimized production bundle:
```bash
npm run build
```

## 📂 Project Structure

```
src/
├── components/       # Componentes de UI e visualizações 3D
│   ├── 3d/           # OrbitView (Motor CSS 3D)
│   ├── Background/   # Campos estelares e nebulosas
│   └── InfoPanel/    # Painéis de informações (gaveta lateral)
├── constants.ts      # Dados celestes e estatísticas
├── store.ts          # Estado global (Zustand)
├── lib/              # Funções utilitárias (cn, etc.)
└── index.css         # Estilos globais e animações (@keyframes)
```

## 🌌 Acknowledgments

- Dados orbitais baseados nos Fact Sheets Planetários da NASA.
- Estrutura original de CSS 3D inspirada em experimentos clássicos de visualização orbital.
- Texturas e imagens curadas de bases de dados astronômicas de código aberto.

---

Built with ❤️ for space enthusiasts and developers.
