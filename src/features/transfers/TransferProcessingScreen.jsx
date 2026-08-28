import { useLocalSearchParams, useRouter } from 'expo-router';
import { useEffect, useState } from 'react';
import { Pressable, SafeAreaView, StyleSheet, Text, View } from 'react-native';
import Animated, { Easing, interpolate, useAnimatedStyle, useSharedValue, withRepeat, withTiming } from 'react-native-reanimated';
import { AppBackground } from '../../components/AppBackground';
import { KambioIcon } from '../../components/KambioIcon';
import { COLORS, FONTS } from '../../theme';

export default function TransferProcessingScreen() {
  const router = useRouter();
  const { amount = '0.00', recipient = 'tu contacto' } = useLocalSearchParams();
  const [completed, setCompleted] = useState(false);
  const flight = useSharedValue(0);

  useEffect(() => {
    flight.value = withRepeat(withTiming(1, { duration: 1250, easing: Easing.inOut(Easing.cubic) }), -1, true);
    const timer = setTimeout(() => setCompleted(true), 2100);
    return () => clearTimeout(timer);
  }, [flight]);

  const planeStyle = useAnimatedStyle(() => ({
    transform: [
      { translateX: interpolate(flight.value, [0, 1], [-92, 92]) },
      { translateY: interpolate(flight.value, [0, .5, 1], [16, -20, 6]) },
      { rotate: `${interpolate(flight.value, [0, 1], [-14, 11])}deg` },
    ],
  }));
  const coinStyle = useAnimatedStyle(() => ({
    transform: [
      { translateX: interpolate(flight.value, [0, 1], [-118, 64]) },
      { translateY: interpolate(flight.value, [0, .5, 1], [40, -4, 29]) },
      { rotate: `${interpolate(flight.value, [0, 1], [-35, 105])}deg` },
      { scale: 1 + (flight.value * .08) },
    ],
  }));

  return <AppBackground>
    <SafeAreaView style={styles.safe}>
      <Pressable onPress={() => router.back()} style={styles.back}><KambioIcon name="chevron-forward" size={20} color={COLORS.ink} /></Pressable>
      <View style={styles.content}>
        <View style={styles.flightStage}>
          <View style={styles.cloudOne} /><View style={styles.cloudTwo} /><View style={styles.route} />
          <Animated.View style={[styles.coin, coinStyle]}><Text style={styles.coinText}>S/</Text></Animated.View>
          <Animated.View style={[styles.plane, planeStyle]}><KambioIcon name="send-outline" size={42} color="#FFFFFF" /></Animated.View>
        </View>
        {completed ? <Completion amount={amount} recipient={recipient} onDone={() => router.replace('/account')} /> : <Processing amount={amount} recipient={recipient} />}
      </View>
    </SafeAreaView>
  </AppBackground>;
}

function Processing({ amount, recipient }) {
  return <View style={styles.copyBlock}>
    <View style={styles.loadingDots}><View style={styles.loadingDot} /><View style={[styles.loadingDot, styles.loadingDotMiddle]} /><View style={styles.loadingDot} /></View>
    <Text style={styles.title}>Enviando tu dinero</Text>
    <Text style={styles.copy}>Estamos enviando <Text style={styles.strong}>S/ {amount}</Text> a {recipient}. Esto tomará solo un momento.</Text>
    <View style={styles.status}><View style={styles.statusDot} /><Text style={styles.statusText}>Conectando de forma segura</Text></View>
  </View>;
}

function Completion({ amount, recipient, onDone }) {
  return <View style={styles.copyBlock}>
    <View style={styles.successIcon}><KambioIcon name="checkmark" size={31} color="#FFFFFF" /></View>
    <Text style={styles.title}>Transferencia enviada</Text>
    <Text style={styles.copy}>Enviaste <Text style={styles.strong}>S/ {amount}</Text> a {recipient} correctamente.</Text>
    <Pressable onPress={onDone} style={({ pressed }) => [styles.doneButton, pressed && styles.donePressed]}><Text style={styles.doneText}>Volver al inicio</Text><KambioIcon name="arrow-forward" size={18} color="#FFFFFF" /></Pressable>
  </View>;
}

const styles = StyleSheet.create({
  safe: { flex: 1 }, back: { width: 44, height: 44, marginLeft: 20, marginTop: 8, borderRadius: 15, alignItems: 'center', justifyContent: 'center', backgroundColor: '#ECF1FF', transform: [{ rotate: '180deg' }] }, content: { flex: 1, alignItems: 'center', justifyContent: 'center', paddingHorizontal: 30, paddingBottom: 64 },
  flightStage: { width: '100%', height: 230, overflow: 'hidden', alignItems: 'center', justifyContent: 'center' }, route: { position: 'absolute', width: 220, height: 108, borderWidth: 2, borderColor: '#C7D5FB', borderRadius: 110, borderStyle: 'dashed', transform: [{ rotate: '-8deg' }] }, cloudOne: { position: 'absolute', width: 98, height: 30, borderRadius: 20, top: 47, right: 7, backgroundColor: 'rgba(255,255,255,.74)' }, cloudTwo: { position: 'absolute', width: 72, height: 24, borderRadius: 15, bottom: 45, left: 5, backgroundColor: 'rgba(255,255,255,.65)' }, plane: { position: 'absolute', width: 77, height: 77, borderRadius: 26, alignItems: 'center', justifyContent: 'center', backgroundColor: COLORS.blue, shadowColor: COLORS.blue, shadowOpacity: .35, shadowRadius: 13, shadowOffset: { width: 4, height: 8 }, elevation: 8 }, coin: { position: 'absolute', width: 43, height: 43, borderRadius: 22, alignItems: 'center', justifyContent: 'center', backgroundColor: '#F4CA57', borderWidth: 3, borderColor: '#FFF1B5', shadowColor: '#C38F16', shadowOpacity: .28, shadowRadius: 6, shadowOffset: { width: 2, height: 4 }, elevation: 5 }, coinText: { color: '#785000', fontFamily: FONTS.heading, fontSize: 13 },
  copyBlock: { width: '100%', alignItems: 'center' }, loadingDots: { height: 20, flexDirection: 'row', gap: 6, alignItems: 'center' }, loadingDot: { width: 6, height: 6, borderRadius: 3, backgroundColor: '#AAB7DB' }, loadingDotMiddle: { width: 9, height: 9, borderRadius: 5, backgroundColor: COLORS.blue }, title: { marginTop: 13, color: COLORS.ink, fontFamily: FONTS.heading, fontSize: 24, textAlign: 'center' }, copy: { maxWidth: 280, marginTop: 10, color: COLORS.muted, fontFamily: FONTS.body, fontSize: 11, lineHeight: 18, textAlign: 'center' }, strong: { color: COLORS.ink, fontFamily: FONTS.bodyMedium }, status: { marginTop: 23, paddingHorizontal: 13, paddingVertical: 9, flexDirection: 'row', alignItems: 'center', gap: 7, borderRadius: 14, backgroundColor: '#E8F4ED' }, statusDot: { width: 7, height: 7, borderRadius: 4, backgroundColor: '#158362' }, statusText: { color: '#216957', fontFamily: FONTS.button, fontSize: 9 }, successIcon: { width: 61, height: 61, borderRadius: 31, alignItems: 'center', justifyContent: 'center', backgroundColor: '#11926B', borderWidth: 4, borderColor: '#DDF5EA' }, doneButton: { width: '100%', height: 58, marginTop: 27, paddingHorizontal: 18, borderRadius: 19, alignItems: 'center', justifyContent: 'center', flexDirection: 'row', gap: 10, backgroundColor: COLORS.blue, shadowColor: COLORS.blue, shadowOpacity: .27, shadowRadius: 10, shadowOffset: { width: 3, height: 6 }, elevation: 6 }, donePressed: { opacity: .88, transform: [{ scale: .98 }] }, doneText: { color: '#FFFFFF', fontFamily: FONTS.button, fontSize: 14 },
});
