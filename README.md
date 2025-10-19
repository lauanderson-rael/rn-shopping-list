# App Lista de Compras

Um aplicativo simples e intuitivo para gerenciar sua lista de compras, desenvolvido em React Native com Expo.

## 📱 Funcionalidades

- ✅ Adicionar itens à lista
- ✅ Marcar itens como comprados
- ✅ Remover itens (pressione e segure)
- ✅ Persistência de dados local
- ✅ Interface responsiva e intuitiva

## 🚀 Tecnologias Utilizadas

- **React Native** com Expo
- **TypeScript**
- **AsyncStorage** para armazenamento local
- **Expo Router** para navegação
- **FontAwesome** para ícones
- **SafeAreaView** para compatibilidade com diferentes dispositivos

## 📋 Pré-requisitos

- Node.js (versão 18 ou superior)
- npm ou yarn
- Expo CLI
- Expo Go (para testar no dispositivo)

## 🔧 Instalação

1. **Clone o repositório:**

```bash
git clone https://github.com/lauanderson-rael/rn-shopping-list
cd rn-shopping-list
```

2. **Instale as dependências:**

```bash
npm install
```

3. **Instale a dependência do SafeAreaView:**

```bash
npm install react-native-safe-area-context
```

4. **Inicie o projeto:**

```bash
npx expo start
```

5. **Execute no dispositivo:**
   - Baixe o app **Expo Go** na Play Store/App Store
   - Escaneie o QR Code que aparece no terminal
   - Ou pressione `a` para Android ou `i` para iOS (se tiver simulador)

## 📱 Como Usar

### Tela Principal (Home)

- Digite o nome do item no campo de texto
- Toque em "Adicionar" para incluir na lista
- Toque no item para marcar/desmarcar como comprado
- Pressione e segure o item para removê-lo

### Tela Sobre

- Informações sobre o aplicativo
- Tecnologias utilizadas
- Link para o repositório

## 📁 Estrutura do Projeto

```
app-shopping-list/
├── app/
│   ├── _layout.tsx          # Layout principal com navegação
│   ├── home/
│   │   ├── index.tsx        # Tela principal da lista
│   │   └── style.ts         # Estilos da tela home
│   └── about/
│       ├── index.tsx        # Tela sobre o app
│       └── style.tsx        # Estilos da tela sobre
├── components/              # Componentes reutilizáveis
├── hooks/
│   └── useShoppingList.ts   # Hook personalizado
├── utils/
│   └── storage.ts           # Utilitários de armazenamento
└── assets/                  # Imagens e recursos
```

## 🎨 Personalização

### Cores do Tema

As cores principais estão definidas nos arquivos de estilo:

- Azul principal: `#004b77`
- Azul secundário: `#1F3C88`

### Ícones

O app utiliza FontAwesome. Para alterar ícones, consulte a [documentação do FontAwesome](https://fontawesome.com/icons).

## 📦 Build para Produção

### Android (APK)

```bash
npx expo build:android
```

### iOS (IPA)

```bash
npx expo build:ios
```

## 🐛 Solução de Problemas

### Erro de SafeArea

Se encontrar erros relacionados ao SafeAreaView:

```bash
npm install react-native-safe-area-context
npx expo install --fix
```

### Cache do Expo

Para limpar o cache:

```bash
npx expo start --clear
```

## 🤝 Contribuição

1. Faça um fork do projeto
2. Crie uma branch para sua feature (`git checkout -b feature/nova-feature`)
3. Commit suas mudanças (`git commit -m 'Adiciona nova feature'`)
4. Push para a branch (`git push origin feature/nova-feature`)
5. Abra um Pull Request

## 📄 Licença

Este projeto está sob a licença MIT. Veja o arquivo [LICENSE](LICENSE) para mais detalhes.

## 👨‍💻 Desenvolvedor

**Lauanderson Rael**

- GitHub: [@lauanderson](https://github.com/lauanderson)

---

⭐ Se este projeto te ajudou, considere dar uma estrela no repositório!
