import * as LocalAuthentication from 'expo-local-authentication';
import { useRouter } from 'expo-router';
import { useState } from 'react';
import { Image, KeyboardAvoidingView, Modal, Platform, Pressable, SafeAreaView, StyleSheet, Text, TextInput, View } from 'react-native';
import { AppBackground } from '../../components/AppBackground';
import { KambioIcon } from '../../components/KambioIcon';
import { COLORS, FONTS } from '../../theme';

const pinSlots = [0, 1, 2, 3, 4, 5];
const keypad = ['1', '2', '3', '4', '5', '6', '7', '8', '9', 'finger-print-outline', '0', 'backspace-outline'];

export default function LoginScreen() {
  const router = useRouter();
  const [dni, setDni] = useState('');
  const [pin, setPin] = useState('');
  const [notice, setNotice] = useState('Ingresa tus datos para continuar');
  const [helpOpen, setHelpOpen] = useState(false);
  const ready = dni.length === 8 && pin.length === 6;

  const updatePin = (key) => {
    if (key === 'backspace-outline') return setPin((value) => value.slice(0, -1));
    if (key === 'finger-print-outline') return authenticateWithBiometrics();
    if (pin.length < 6) setPin((value) => `${value}${key}`);
  };

  const authenticateWithBiometrics = async () => {
    try {
      const hasHardware = await LocalAuthentication.hasHardwareAsync();
      const enrolled = hasHardware && await LocalAuthentication.isEnrolledAsync();
      if (!enrolled) {
        setNotice('No hay biometría configurada en este dispositivo');
        return;
      }
      const result = await LocalAuthentication.authenticateAsync({
        promptMessage: 'Acceder a Kambio',
        cancelLabel: 'Usar clave',
        disableDeviceFallback: false,
      });
      setNotice(result.success ? 'Biometría verificada. Acceso autorizado.' : 'Usa tu DNI y clave para ingresar');
    } catch {
      setNotice('No pudimos iniciar la biometría. Usa tu clave.');
    }
  };

  const submit = () => {
    if (!ready) return setNotice('Completa tu DNI y los 6 dígitos de tu clave');
    router.replace('/ui-lab');
  };

  return <AppBackground>
    <SafeAreaView style={styles.safe}>
      <KeyboardAvoidingView style={styles.safe} behavior={Platform.OS === 'ios' ? 'padding' : undefined}>
        <View style={styles.topRow}>
          <View style={styles.brandLockup}><Image source={require('../../../assets/branding/kambio-app-icon.png')} style={styles.logo} /><Text style={styles.brand}>KAMBIO</Text></View>
          <Pressable accessibilityRole="button" accessibilityLabel="Ayuda para iniciar sesión" onPress={() => setHelpOpen(true)} style={({ pressed }) => [styles.helpButton, pressed && styles.pressed]}><KambioIcon name="help-circle-outline" size={22} color={COLORS.blue} /></Pressable>
        </View>

        <View style={styles.content}>
          <View style={styles.welcomeBadge}><KambioIcon name="shield-checkmark-outline" size={15} color={COLORS.violet} /><Text style={styles.welcomeBadgeText}>ACCESO SEGURO</Text></View>
          <Text style={styles.title}>Hola, qué gusto{`\n`}verte de nuevo.</Text>
          <Text style={styles.copy}>Ingresa con tu documento y clave para acceder a tu cuenta.</Text>

          <View style={styles.formCard}>
            <Text style={styles.label}>DNI</Text>
            <View style={[styles.dniField, dni.length === 8 && styles.fieldComplete]}>
              <KambioIcon name="person-outline" size={19} color={dni.length ? COLORS.blue : COLORS.muted} />
              <TextInput value={dni} onChangeText={(value) => setDni(value.replace(/[^0-9]/g, '').slice(0, 8))} keyboardType="number-pad" placeholder="Ingresa tu DNI" placeholderTextColor="#8C97B4" style={styles.dniInput} maxLength={8} />
              {dni.length === 8 && <KambioIcon name="checkmark-circle-outline" size={18} color="#11835F" />}
            </View>
            <Text style={styles.fieldHint}>{dni.length ? `${dni.length}/8 dígitos` : 'Documento Nacional de Identidad'}</Text>

            <View style={styles.pinHeader}><Text style={styles.label}>CLAVE DE 6 DÍGITOS</Text><Text style={styles.pinStatus}>{pin.length}/6</Text></View>
            <View style={styles.pinSlots}>{pinSlots.map((slot) => <View key={slot} style={[styles.pinSlot, slot < pin.length && styles.pinSlotFilled]}><View style={slot < pin.length && styles.pinDot} /></View>)}</View>
            <Text style={styles.fieldHint}>Usa el teclado seguro para ingresar tu clave.</Text>

            <View style={styles.keypad}>{keypad.map((key) => <Pressable key={key} onPress={() => updatePin(key)} style={({ pressed }) => [styles.key, pressed && styles.keyPressed]}>{key === 'finger-print-outline' || key === 'backspace-outline' ? <KambioIcon name={key} size={22} color={key === 'finger-print-outline' ? COLORS.violet : COLORS.ink} /> : <Text style={styles.keyText}>{key}</Text>}</Pressable>)}</View>

            <Pressable onPress={submit} style={({ pressed }) => [styles.loginButton, !ready && styles.loginDisabled, pressed && ready && styles.pressed]}><Text style={styles.loginText}>Ingresar a Kambio</Text><KambioIcon name="arrow-forward" size={18} color="white" /></Pressable>
            <Pressable onPress={() => { setPin(''); setNotice('Te enviaremos las instrucciones para recuperar tu clave'); }} style={styles.recoveryButton}><Text style={styles.recoveryText}>¿Olvidaste tu contraseña?</Text></Pressable>
          </View>

          <View style={styles.biometricNote}><View style={styles.biometricIcon}><KambioIcon name="finger-print-outline" size={22} color={COLORS.violet} /></View><View style={{ flex: 1 }}><Text style={styles.biometricTitle}>Ingresa con biometría</Text><Text style={styles.biometricCopy}>Toca la huella en el teclado si ya la activaste.</Text></View></View>
          <Text style={styles.notice}>{notice}</Text>
        </View>
      </KeyboardAvoidingView>
    </SafeAreaView>
    <Modal visible={helpOpen} transparent animationType="fade" onRequestClose={() => setHelpOpen(false)}>
      <Pressable style={styles.modalBackdrop} onPress={() => setHelpOpen(false)}>
        <Pressable style={styles.helpCard} onPress={() => undefined}>
          <View style={styles.helpIcon}><KambioIcon name="help-circle-outline" size={27} color={COLORS.blue} /></View>
          <Text style={styles.helpTitle}>¿Necesitas ayuda?</Text>
          <Text style={styles.helpCopy}>Verifica que tu DNI tenga ocho dígitos. Si no recuerdas tu clave, usa la opción de recuperación y sigue las indicaciones.</Text>
          <Pressable onPress={() => setHelpOpen(false)} style={styles.helpClose}><Text style={styles.helpCloseText}>Entendido</Text></Pressable>
        </Pressable>
      </Pressable>
    </Modal>
  </AppBackground>;
}

const styles = StyleSheet.create({
  safe: { flex: 1 },
  topRow: { paddingHorizontal: 24, paddingTop: 14, flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' },
  brandLockup: { flexDirection: 'row', alignItems: 'center', gap: 9 }, logo: { width: 38, height: 38, borderRadius: 13 }, brand: { fontFamily: FONTS.title, fontSize: 19, color: COLORS.blue },
  helpButton: { width: 43, height: 43, alignItems: 'center', justifyContent: 'center', borderRadius: 15, backgroundColor: '#EEF3FF', borderWidth: 1.5, borderColor: '#FFFFFF', shadowColor: '#B1BFDF', shadowOpacity: .42, shadowRadius: 8, shadowOffset: { width: 4, height: 5 }, elevation: 4 },
  content: { paddingHorizontal: 24, paddingTop: 38 }, welcomeBadge: { alignSelf: 'flex-start', flexDirection: 'row', alignItems: 'center', gap: 6, paddingVertical: 7, paddingHorizontal: 10, borderRadius: 12, backgroundColor: '#E7E9FF', borderWidth: 1, borderColor: '#FFFFFF' }, welcomeBadgeText: { fontFamily: FONTS.button, fontSize: 8, letterSpacing: .8, color: COLORS.violet },
  title: { marginTop: 17, color: COLORS.ink, fontFamily: FONTS.heading, fontSize: 29, lineHeight: 34 }, copy: { marginTop: 9, color: COLORS.muted, fontFamily: FONTS.body, fontSize: 11, lineHeight: 17, maxWidth: 295 },
  formCard: { marginTop: 25, padding: 19, borderRadius: 27, backgroundColor: '#EEF3FF', borderWidth: 1.5, borderColor: '#FFFFFF', shadowColor: '#A7B5D9', shadowOpacity: .58, shadowRadius: 17, shadowOffset: { width: 8, height: 9 }, elevation: 8 },
  label: { color: COLORS.ink, fontFamily: FONTS.button, fontSize: 9, letterSpacing: .75 }, dniField: { marginTop: 9, height: 52, paddingHorizontal: 13, flexDirection: 'row', alignItems: 'center', gap: 9, borderRadius: 16, backgroundColor: '#E8EEFC', borderWidth: 1.5, borderColor: '#D7E0F5' }, fieldComplete: { borderColor: '#91A1F1', backgroundColor: '#EAF0FF' }, dniInput: { flex: 1, height: '100%', color: COLORS.ink, fontFamily: FONTS.bodyMedium, fontSize: 12 }, fieldHint: { marginTop: 6, color: COLORS.muted, fontFamily: FONTS.body, fontSize: 8 },
  pinHeader: { marginTop: 21, flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between' }, pinStatus: { color: COLORS.violet, fontFamily: FONTS.button, fontSize: 8 }, pinSlots: { flexDirection: 'row', justifyContent: 'space-between', gap: 7, marginTop: 10 }, pinSlot: { flex: 1, height: 42, borderRadius: 13, alignItems: 'center', justifyContent: 'center', backgroundColor: '#E7EDFC', borderWidth: 1.3, borderColor: '#D8E1F5' }, pinSlotFilled: { borderColor: '#FFFFFF', backgroundColor: '#DDE5FF', shadowColor: '#A4B2DA', shadowOpacity: .32, shadowRadius: 4, shadowOffset: { width: 2, height: 3 }, elevation: 2 }, pinDot: { width: 10, height: 10, borderRadius: 5, backgroundColor: COLORS.blue },
  keypad: { marginTop: 14, flexDirection: 'row', flexWrap: 'wrap', justifyContent: 'space-between', rowGap: 9 }, key: { width: '30%', height: 42, alignItems: 'center', justifyContent: 'center', borderRadius: 14, backgroundColor: '#F5F7FF', borderWidth: 1.5, borderColor: '#FFFFFF', shadowColor: '#B3C0E0', shadowOpacity: .35, shadowRadius: 5, shadowOffset: { width: 2, height: 3 }, elevation: 2 }, keyPressed: { transform: [{ scale: .94 }], backgroundColor: '#DEE6FF', shadowOpacity: .1, elevation: 0 }, keyText: { color: COLORS.ink, fontFamily: FONTS.heading, fontSize: 17 },
  loginButton: { height: 52, marginTop: 20, borderRadius: 17, paddingHorizontal: 18, flexDirection: 'row', alignItems: 'center', justifyContent: 'center', gap: 8, backgroundColor: COLORS.blue, borderWidth: 1, borderColor: '#FFFFFF', shadowColor: '#021DE8', shadowOpacity: .34, shadowRadius: 10, shadowOffset: { width: 4, height: 6 }, elevation: 6 }, loginDisabled: { backgroundColor: '#9EA8D5', shadowOpacity: .1 }, loginText: { color: 'white', fontFamily: FONTS.button, fontSize: 11 }, recoveryButton: { alignSelf: 'center', paddingVertical: 15 }, recoveryText: { color: COLORS.blue, fontFamily: FONTS.button, fontSize: 9 },
  biometricNote: { marginTop: 22, padding: 13, flexDirection: 'row', alignItems: 'center', gap: 11, borderRadius: 19, backgroundColor: '#F0F4FF', borderWidth: 1.5, borderColor: '#FFFFFF', shadowColor: '#C0CBE6', shadowOpacity: .27, shadowRadius: 7, shadowOffset: { width: 3, height: 4 }, elevation: 3 }, biometricIcon: { width: 39, height: 39, alignItems: 'center', justifyContent: 'center', borderRadius: 13, backgroundColor: '#E2E6FF' }, biometricTitle: { color: COLORS.ink, fontFamily: FONTS.button, fontSize: 10 }, biometricCopy: { marginTop: 3, color: COLORS.muted, fontFamily: FONTS.body, fontSize: 8 }, notice: { marginTop: 14, minHeight: 18, textAlign: 'center', color: COLORS.muted, fontFamily: FONTS.body, fontSize: 8 },
  pressed: { transform: [{ scale: .97 }], opacity: .9 }, modalBackdrop: { flex: 1, padding: 24, justifyContent: 'center', backgroundColor: 'rgba(16,26,75,.32)' }, helpCard: { padding: 23, borderRadius: 27, backgroundColor: '#EEF3FF', borderWidth: 1.5, borderColor: '#FFFFFF', shadowColor: '#243263', shadowOpacity: .25, shadowRadius: 18, shadowOffset: { width: 7, height: 9 }, elevation: 9 }, helpIcon: { width: 50, height: 50, alignItems: 'center', justifyContent: 'center', borderRadius: 17, backgroundColor: '#E0E7FF' }, helpTitle: { marginTop: 17, color: COLORS.ink, fontFamily: FONTS.heading, fontSize: 21 }, helpCopy: { marginTop: 8, color: COLORS.muted, fontFamily: FONTS.body, fontSize: 10, lineHeight: 16 }, helpClose: { alignSelf: 'flex-end', marginTop: 20, paddingVertical: 11, paddingHorizontal: 16, borderRadius: 14, backgroundColor: COLORS.blue }, helpCloseText: { color: 'white', fontFamily: FONTS.button, fontSize: 9 },
});
