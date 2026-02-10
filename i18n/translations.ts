export const translations = {
  en: {
    translation: {
      login: {
        welcome: "Welcome to Ryt Bank",
        button: "Login",
      },
      logout: {
        button: "Logout",
      },
      modal: {
        title: "Modal",
        body: "This is a modal",
        link: "Go to home screen",
      },
      home: {
        welcome: "Welcome!",
        balance: "Balance",
        step1: {
          title: "Step 1: Try it out",
          body: "Edit <bold>app/(tabs)/index.tsx</bold> to see changes. Press <bold>{{shortcut}}</bold> to open developer tools.",
        },
        step2: {
          title: "Step 2: Explore",
          body: "Tap the Explore tab to learn more about what's included in this starter app.",
        },
        step3: {
          title: "Step 3: Get a fresh start",
          body: "When you're ready, run <bold>npm run reset-project</bold> to get a fresh <bold>app</bold> directory. This will move the current <bold>app</bold> to <bold>app-example</bold>.",
        },
        link: {
          action: "Action",
          share: "Share",
          more: "More",
          delete: "Delete",
        },
      },
      payment: {
        title: "Payment",
        selectPerson: "Who are you sending payment to?",
      },
      explore: {
        title: "Explore",
        lead: "This app includes example code to help you get started.",
        section: {
          routing: "File-based routing",
          support: "Android, iOS, and web support",
          images: "Images",
          theme: "Light and dark mode components",
          animations: "Animations",
        },
        routing: {
          body1:
            "This app has two screens: <bold>app/(tabs)/index.tsx</bold> and <bold>app/(tabs)/explore.tsx</bold>",
          body2:
            "The layout file in <bold>app/(tabs)/_layout.tsx</bold> sets up the tab navigator.",
        },
        learnMore: "Learn more",
        support: {
          body: "You can open this project on Android, iOS, and the web. To open the web version, press <bold>w</bold> in the terminal running this project.",
        },
        images: {
          body: "For static images, you can use the <bold>@2x</bold> and <bold>@3x</bold> suffixes to provide files for different screen densities",
        },
        theme: {
          body: "This template has light and dark mode support. The <bold>useColorScheme()</bold> hook lets you inspect what the user's current color scheme is, and so you can adjust UI colors accordingly.",
        },
        animations: {
          body: "This template includes an example of an animated component. The <bold>components/HelloWave.tsx</bold> component uses the powerful <bold>react-native-reanimated</bold> library to create a waving hand animation.",
          iosOnly:
            "The <bold>components/ParallaxScrollView.tsx</bold> component provides a parallax effect for the header image.",
        },
      },
    },
  },
  es: {
    translation: {
      modal: {
        title: "Modal",
        body: "Este es un modal",
        link: "Ir a la pantalla principal",
      },
      home: {
        welcome: "¡Bienvenido!",
        step1: {
          title: "Paso 1: Pruébalo",
          body: "Edita <bold>app/(tabs)/index.tsx</bold> para ver los cambios. Pulsa <bold>{{shortcut}}</bold> para abrir las herramientas de desarrollador.",
        },
        step2: {
          title: "Paso 2: Explora",
          body: "Toca la pestaña Explorar para aprender más sobre lo que incluye esta app inicial.",
        },
        step3: {
          title: "Paso 3: Empieza de cero",
          body: "Cuando estés listo, ejecuta <bold>npm run reset-project</bold> para obtener un directorio <bold>app</bold> nuevo. Esto moverá el <bold>app</bold> actual a <bold>app-example</bold>.",
        },
        link: {
          action: "Acción",
          share: "Compartir",
          more: "Más",
          delete: "Eliminar",
        },
      },
      explore: {
        title: "Explorar",
        lead: "Esta app incluye código de ejemplo para ayudarte a comenzar.",
        section: {
          routing: "Enrutamiento basado en archivos",
          support: "Compatibilidad con Android, iOS y web",
          images: "Imágenes",
          theme: "Componentes de modo claro y oscuro",
          animations: "Animaciones",
        },
        routing: {
          body1:
            "Esta app tiene dos pantallas: <bold>app/(tabs)/index.tsx</bold> y <bold>app/(tabs)/explore.tsx</bold>",
          body2:
            "El archivo de diseño en <bold>app/(tabs)/_layout.tsx</bold> configura el navegador de pestañas.",
        },
        learnMore: "Saber más",
        support: {
          body: "Puedes abrir este proyecto en Android, iOS y web. Para abrir la versión web, presiona <bold>w</bold> en el terminal que está ejecutando este proyecto.",
        },
        images: {
          body: "Para imágenes estáticas, puedes usar los sufijos <bold>@2x</bold> y <bold>@3x</bold> para proporcionar archivos para diferentes densidades de pantalla",
        },
        theme: {
          body: "Esta plantilla admite modo claro y oscuro. El hook <bold>useColorScheme()</bold> te permite inspeccionar el esquema de color actual del usuario y ajustar los colores de la UI en consecuencia.",
        },
        animations: {
          body: "Esta plantilla incluye un ejemplo de un componente animado. El componente <bold>components/HelloWave.tsx</bold> usa la potente biblioteca <bold>react-native-reanimated</bold> para crear una animación de mano saludando.",
          iosOnly:
            "El componente <bold>components/ParallaxScrollView.tsx</bold> proporciona un efecto parallax para la imagen del encabezado.",
        },
      },
    },
  },
};
