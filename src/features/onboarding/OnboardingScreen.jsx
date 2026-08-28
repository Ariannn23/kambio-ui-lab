import { useRouter } from 'expo-router';
import { useEffect } from 'react';
import { Image, Pressable, SafeAreaView, StyleSheet, Text, View } from 'react-native';
import Animated, { useAnimatedStyle, useSharedValue, withRepeat, withSequence, withTiming } from 'react-native-reanimated';
import { KambioIcon } from '../../components/KambioIcon';
import { COLORS, FONTS } from '../../theme';

export default function OnboardingScreen() {
  const router = useRouter();
  const scale = useSharedValue(0.86);
  const lift = useSharedValue(0);

  useEffect(() => {
    scale.value = withSequence(withTiming(1.06, { duration: 700 }), withTiming(1, { duration: 420 }));
    lift.value = withRepeat(withSequence(withTiming(-10, { duration: 1400 }), withTiming(0, { duration: 1400 })), -1, true);
  }, [lift, scale]);

  const iconStyle = useAnimatedStyle(() => ({ transform: [{ translateY: lift.value }, { scale: scale.value }] }));

  return <SafeAreaView style={styles.safe}>
    <View style={styles.content}>
      <View style={styles.brandArea}>
        <Animated.View style={[styles.iconShell, iconStyle]}><Image source={require('../../../assets/branding/kambio-app-icon.png')} style={styles.icon} /></Animated.View>
        <Text style={styles.brand}>KAMBIO</Text>
        <Text style={styles.tagline}>Tu banco, en movimiento.</Text>
      </View>
      <Pressable onPress={() => router.replace('/login')} style={({ pressed }) => [styles.continueButton, pressed && styles.pressed]}><Text style={styles.continueText}>Comenzar</Text><KambioIcon name="arrow-forward" size={19} color="white" /></Pressable>
    </View>
  </SafeAreaView>;
}

const styles = StyleSheet.create({
  safe: { flex: 1, backgroundColor: 'white' }, content: { flex: 1, paddingHorizontal: 28, paddingBottom: 34, justifyContent: 'space-between' }, brandArea: { flex: 1, alignItems: 'center', justifyContent: 'center', paddingBottom: 46 }, iconShell: { width: 126, height: 126, alignItems: 'center', justifyContent: 'center', borderRadius: 40, backgroundColor: '#F1F4FF', shadowColor: '#8798C9', shadowOpacity: .25, shadowRadius: 18, shadowOffset: { width: 0, height: 10 }, elevation: 8 }, icon: { width: 94, height: 94, borderRadius: 29 }, brand: { marginTop: 28, color: COLORS.blue, fontFamily: FONTS.title, fontSize: 30, letterSpacing: 1.2 }, tagline: { marginTop: 11, color: COLORS.muted, fontFamily: FONTS.body, fontSize: 12 }, continueButton: { height: 60, borderRadius: 19, flexDirection: 'row', gap: 9, alignItems: 'center', justifyContent: 'center', backgroundColor: COLORS.blue, borderWidth: 1, borderColor: '#FFFFFF', shadowColor: '#021DE8', shadowOpacity: .28, shadowRadius: 10, shadowOffset: { width: 4, height: 6 }, elevation: 6 }, continueText: { color: 'white', fontFamily: FONTS.button, fontSize: 16 }, pressed: { transform: [{ scale: .97 }], opacity: .9 },
});
