import { Ionicons } from '@expo/vector-icons';
import { useFonts } from 'expo-font';
import { Stack } from 'expo-router';
import { useEffect } from 'react';
import { Montserrat_400Regular, Montserrat_600SemiBold } from '@expo-google-fonts/montserrat';
import { Outfit_600SemiBold, Outfit_700Bold } from '@expo-google-fonts/outfit';
import { RubikMonoOne_400Regular } from '@expo-google-fonts/rubik-mono-one';

export default function RootLayout() {
  // Las fuentes se cargan en segundo plano: nunca volvemos a dejar la app en blanco.
  const [fontsLoaded, fontsError] = useFonts({
    RubikMonoOne_400Regular,
    Outfit_600SemiBold,
    Outfit_700Bold,
    Montserrat_400Regular,
    Montserrat_600SemiBold,
  });

  useEffect(() => {
    // Fuerza la disponibilidad de los glifos de Ionicons en Android.
    Ionicons.loadFont().catch(() => undefined);
  }, []);

  useEffect(() => {
    console.log(`KAMBIO brand fonts ready: ${fontsLoaded}`, fontsError?.message || '');
  }, [fontsLoaded, fontsError]);

  return <Stack key={fontsLoaded ? 'brand-fonts' : 'system-fonts'} screenOptions={{ headerShown: false, animation: 'fade_from_bottom' }} />;
}
