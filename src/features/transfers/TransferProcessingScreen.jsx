import { useLocalSearchParams, useRouter } from 'expo-router';
import { useEffect, useState } from 'react';
import { Pressable, SafeAreaView, StyleSheet, Text, View } from 'react-native';
import Animated, { Easing, interpolate, useAnimatedStyle, useSharedValue, withRepeat, withTiming } from 'react-native-reanimated';
import Svg, { Path } from 'react-native-svg';
import { AppBackground } from '../../components/AppBackground';
import { KambioIcon } from '../../components/KambioIcon';
import { COLORS, FONTS } from '../../theme';

export default function TransferProcessingScreen() {
  const router = useRouter();
  const { amount = '0.00', recipient = 'tu contacto' } = useLocalSearchParams();
  const [completed, setCompleted] = useState(false);
  const flight = useSharedValue(0);

  useEffect(() => {
    flight.value = withRepeat(withTiming(1, { duration: 1800, easing: Easing.linear }), -1, false);
    const timer = setTimeout(() => setCompleted(true), 2100);
    return () => clearTimeout(timer);
  }, [flight]);

  return <AppBackground>
    <SafeAreaView style={styles.safe}>
      <Pressable onPress={() => router.back()} style={styles.back}><KambioIcon name="chevron-forward" size={20} color={COLORS.ink} /></Pressable>
      <View style={styles.content}>
        <View style={styles.flightStage}>
          <View style={styles.cloudOne} /><View style={styles.cloudTwo} />
          <Svg pointerEvents="none" viewBox="0 0 300 180" style={styles.route}>
            <Path d="M 28 148 Q 150 8 272 148" fill="none" stroke="#9CB3F5" strokeWidth="2" strokeDasharray="7 9" strokeLinecap="round" />
            <Path d="M 50 151 Q 150 45 250 151" fill="none" stroke="#D4DFFF" strokeWidth="1.5" strokeDasharray="4 10" strokeLinecap="round" />
          </Svg>
          <View style={[styles.wallet, styles.walletSource]}><Text style={styles.walletInitials}>AM</Text><Text style={styles.walletCaption}>ENVÍAS</Text></View>
          <View style={[styles.wallet, styles.walletTarget]}><Text style={styles.walletInitials}>SM</Text><Text style={styles.walletCaption}>RECIBE</Text></View>
          <FlyingCoin progress={flight} phase={0} /><FlyingCoin progress={flight} phase={.33} small /><FlyingCoin progress={flight} phase={.66} />
        </View>
        {completed ? <Completion amount={amount} recipient={recipient} onDone={() => router.replace('/account')} /> : <Processing amount={amount} recipient={recipient} />}
      </View>
    </SafeAreaView>
  </AppBackground>;
}

function FlyingCoin({ progress, phase, small = false }) {
  const style = useAnimatedStyle(() => {
    const point = (progress.value + phase) % 1;
    return {
      opacity: interpolate(point, [0, .07, .9, 1], [0, 1, 1, 0]),
      transform: [
        { translateX: interpolate(point, [0, .5, 1], [-122, 0, 122]) },
        { translateY: interpolate(point, [0, .5, 1], [45, -48, 36]) },
        { rotate: `${interpolate(point, [0, 1], [-46, 156])}deg` },
        { scale: small ? .74 : 1 },
      ],
    };
  });

  return <Animated.View pointerEvents="none" style={[styles.coin, style]}><View style={styles.coinFace}><Text style={styles.coinText}>S/</Text></View></Animated.View>;
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
  flightStage: { width: '100%', height: 230, overflow: 'hidden', alignItems: 'center', justifyContent: 'center' }, route: { position: 'absolute', top: 18, right: 0, left: 0, height: 175 }, cloudOne: { position: 'absolute', width: 98, height: 30, borderRadius: 20, top: 36, right: 3, backgroundColor: 'rgba(255,255,255,.74)' }, cloudTwo: { position: 'absolute', width: 72, height: 24, borderRadius: 15, bottom: 34, left: 1, backgroundColor: 'rgba(255,255,255,.65)' }, wallet: { position: 'absolute', width: 56, height: 56, borderRadius: 20, alignItems: 'center', justifyContent: 'center', backgroundColor: '#E2E9FF', borderWidth: 2, borderColor: '#FFFFFF', shadowColor: '#98A9D3', shadowOpacity: .2, shadowRadius: 7, shadowOffset: { width: 2, height: 4 }, elevation: 3 }, walletSource: { left: 1, bottom: 46 }, walletTarget: { right: 1, bottom: 46, backgroundColor: '#E4F4EE' }, walletInitials: { color: COLORS.blueDeep, fontFamily: FONTS.heading, fontSize: 13 }, walletCaption: { position: 'absolute', bottom: -18, color: '#70809C', fontFamily: FONTS.button, fontSize: 7, letterSpacing: .5 }, coin: { position: 'absolute', width: 49, height: 49, borderRadius: 25, alignItems: 'center', justifyContent: 'center', backgroundColor: '#D99524', borderWidth: 1, borderColor: '#9B6514', shadowColor: '#B97817', shadowOpacity: .3, shadowRadius: 7, shadowOffset: { width: 2, height: 5 }, elevation: 5 }, coinFace: { width: 39, height: 39, borderRadius: 20, alignItems: 'center', justifyContent: 'center', backgroundColor: '#F6D166', borderWidth: 2, borderColor: '#FFF0B5' }, coinText: { color: '#82540D', fontFamily: FONTS.heading, fontSize: 11 },
  copyBlock: { width: '100%', alignItems: 'center' }, loadingDots: { height: 20, flexDirection: 'row', gap: 6, alignItems: 'center' }, loadingDot: { width: 6, height: 6, borderRadius: 3, backgroundColor: '#AAB7DB' }, loadingDotMiddle: { width: 9, height: 9, borderRadius: 5, backgroundColor: COLORS.blue }, title: { marginTop: 13, color: COLORS.ink, fontFamily: FONTS.heading, fontSize: 24, textAlign: 'center' }, copy: { maxWidth: 280, marginTop: 10, color: COLORS.muted, fontFamily: FONTS.body, fontSize: 11, lineHeight: 18, textAlign: 'center' }, strong: { color: COLORS.ink, fontFamily: FONTS.bodyMedium }, status: { marginTop: 23, paddingHorizontal: 13, paddingVertical: 9, flexDirection: 'row', alignItems: 'center', gap: 7, borderRadius: 14, backgroundColor: '#E8F4ED' }, statusDot: { width: 7, height: 7, borderRadius: 4, backgroundColor: '#158362' }, statusText: { color: '#216957', fontFamily: FONTS.button, fontSize: 9 }, successIcon: { width: 61, height: 61, borderRadius: 31, alignItems: 'center', justifyContent: 'center', backgroundColor: '#11926B', borderWidth: 4, borderColor: '#DDF5EA' }, doneButton: { width: '100%', height: 58, marginTop: 27, paddingHorizontal: 18, borderRadius: 19, alignItems: 'center', justifyContent: 'center', flexDirection: 'row', gap: 10, backgroundColor: COLORS.blue, shadowColor: COLORS.blue, shadowOpacity: .27, shadowRadius: 10, shadowOffset: { width: 3, height: 6 }, elevation: 6 }, donePressed: { opacity: .88, transform: [{ scale: .98 }] }, doneText: { color: '#FFFFFF', fontFamily: FONTS.button, fontSize: 14 },
});
