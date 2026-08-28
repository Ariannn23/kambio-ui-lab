import { useRouter } from 'expo-router';
import { useEffect } from 'react';
import { Image, SafeAreaView, StyleSheet, Text, View } from 'react-native';
import Animated, { useAnimatedStyle, useSharedValue, withRepeat, withSequence, withTiming } from 'react-native-reanimated';
import { COLORS, FONTS } from '../../theme';

export default function OnboardingScreen() {
  const router = useRouter();
  const scale = useSharedValue(0.86);
  const lift = useSharedValue(0);

  useEffect(() => {
    scale.value = withSequence(withTiming(1.06, { duration: 700 }), withTiming(1, { duration: 420 }));
    lift.value = withRepeat(withSequence(withTiming(-10, { duration: 1400 }), withTiming(0, { duration: 1400 })), -1, true);
    const nextScreen = setTimeout(() => router.replace('/login'), 1800);
    return () => clearTimeout(nextScreen);
  }, [lift, router, scale]);

  const iconStyle = useAnimatedStyle(() => ({ transform: [{ translateY: lift.value }, { scale: scale.value }] }));

  return <SafeAreaView style={styles.safe}>
    <View style={styles.content}>
      <View style={styles.brandArea}>
        <Animated.View style={[styles.iconShell, iconStyle]}><Image source={require('../../../assets/branding/kambio-app-icon.png')} style={styles.icon} /></Animated.View>
        <Text style={styles.brand}>KAMBIO</Text>
        <Text style={styles.tagline}>Tu banco, en movimiento.</Text>
      </View>
      <View style={styles.loading}><View style={styles.loadingDot} /><Text style={styles.loadingText}>Preparando tu experiencia</Text></View>
    </View>
  </SafeAreaView>;
}

const styles = StyleSheet.create({
  safe: { flex: 1, backgroundColor: 'white' }, content: { flex: 1, paddingHorizontal: 28, paddingBottom: 42, justifyContent: 'space-between' }, brandArea: { flex: 1, alignItems: 'center', justifyContent: 'center', paddingBottom: 22 }, iconShell: { width: 126, height: 126, alignItems: 'center', justifyContent: 'center', borderRadius: 40, backgroundColor: '#F1F4FF', shadowColor: '#8798C9', shadowOpacity: .25, shadowRadius: 18, shadowOffset: { width: 0, height: 10 }, elevation: 8 }, icon: { width: 94, height: 94, borderRadius: 29 }, brand: { marginTop: 28, color: COLORS.blue, fontFamily: FONTS.title, fontSize: 30, letterSpacing: 1.2 }, tagline: { marginTop: 11, color: COLORS.muted, fontFamily: FONTS.body, fontSize: 12 }, loading: { flexDirection: 'row', justifyContent: 'center', alignItems: 'center', gap: 7 }, loadingDot: { width: 7, height: 7, borderRadius: 4, backgroundColor: COLORS.blue }, loadingText: { color: COLORS.muted, fontFamily: FONTS.body, fontSize: 10 },
});
