import * as LocalAuthentication from 'expo-local-authentication';
import { useRouter } from 'expo-router';
import { useState } from 'react';
import { Image, KeyboardAvoidingView, Modal, Platform, Pressable, SafeAreaView, ScrollView, StyleSheet, Text, TextInput, View } from 'react-native';
import { AppBackground } from '../../components/AppBackground';
import { KambioIcon } from '../../components/KambioIcon';
import { COLORS, FONTS } from '../../theme';

export default function LoginScreen() {
  const router = useRouter();
  const [dni, setDni] = useState('');
  const [pin, setPin] = useState('');
  const [notice, setNotice] = useState('Ingresa tus datos para continuar');
  const [helpOpen, setHelpOpen] = useState(false);
  const ready = dni.length === 8 && pin.length === 6;

  const authenticateWithBiometrics = async () => {
    try {
      const hasHardware = await LocalAuthentication.hasHardwareAsync();
      const enrolled = hasHardware && await LocalAuthentication.isEnrolledAsync();
      if (!enrolled) return setNotice('No hay biometría configurada en este dispositivo');
      const result = await LocalAuthentication.authenticateAsync({ promptMessage: 'Acceder a Kambio', cancelLabel: 'Usar clave', disableDeviceFallback: false });
      if (result.success) router.replace('/ui-lab');
      else setNotice('Usa tu DNI y clave para ingresar');
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
        <ScrollView contentContainerStyle={styles.scroll} keyboardShouldPersistTaps="handled" showsVerticalScrollIndicator={false}>
          <View style={styles.hero}>
            <View style={styles.heroTop}>
              <View style={styles.brandLockup}><Image source={require('../../../assets/branding/kambio-app-icon.png')} style={styles.logo} /><Text style={styles.brand}>KAMBIO</Text></View>
              <Pressable accessibilityRole="button" accessibilityLabel="Ayuda para iniciar sesión" onPress={() => setHelpOpen(true)} style={({ pressed }) => [styles.helpButton, pressed && styles.pressed]}><KambioIcon name="help-circle-outline" size={22} color="white" /></Pressable>
            </View>
            <View style={styles.heroMessage}><Text style={styles.eyebrow}>BANCA MÓVIL</Text><Text style={styles.heroTitle}>Hola, bienvenido{`\n`}a Kambio.</Text><Text style={styles.heroCopy}>Tu cuenta, clara y segura en un solo lugar.</Text></View>
          </View>

          <View style={styles.sheet}>
            <View style={styles.sheetHandle} />
            <Text style={styles.sheetTitle}>Iniciar sesión</Text>
            <Text style={styles.sheetCopy}>Usa tu DNI y clave de seis dígitos.</Text>
            <View style={styles.fieldGroup}>
              <Text style={styles.label}>DNI</Text>
              <View style={[styles.field, dni.length === 8 && styles.fieldComplete]}><KambioIcon name="person-outline" size={20} color={dni.length ? COLORS.blue : COLORS.muted} /><TextInput value={dni} onChangeText={(value) => setDni(value.replace(/[^0-9]/g, '').slice(0, 8))} keyboardType="number-pad" placeholder="Ingresa tu DNI" placeholderTextColor="#8C97B4" style={styles.input} maxLength={8} />{dni.length === 8 && <KambioIcon name="checkmark-circle-outline" size={18} color="#11835F" />}</View>
              <Text style={styles.fieldHint}>{dni ? `${dni.length}/8 dígitos` : 'Documento Nacional de Identidad'}</Text>
            </View>
            <View style={styles.fieldGroup}>
              <View style={styles.pinLabelRow}><Text style={styles.label}>CLAVE</Text><Text style={styles.pinStatus}>{pin.length}/6</Text></View>
              <View style={[styles.field, pin.length === 6 && styles.fieldComplete]}><KambioIcon name="lock-closed-outline" size={19} color={pin.length ? COLORS.blue : COLORS.muted} /><TextInput value={pin} onChangeText={(value) => setPin(value.replace(/[^0-9]/g, '').slice(0, 6))} keyboardType="number-pad" secureTextEntry placeholder="Clave de 6 dígitos" placeholderTextColor="#8C97B4" style={styles.input} maxLength={6} /><KambioIcon name="shield-checkmark-outline" size={18} color={pin.length === 6 ? '#11835F' : '#A8B3D1'} /></View>
            </View>
            <Pressable onPress={submit} style={({ pressed }) => [styles.loginButton, !ready && styles.loginDisabled, pressed && ready && styles.pressed]}><Text style={styles.loginText}>Ingresar</Text><KambioIcon name="arrow-forward" size={18} color="white" /></Pressable>
            <Pressable onPress={() => { setPin(''); setNotice('Te enviaremos las instrucciones para recuperar tu clave'); }} style={styles.recoveryButton}><Text style={styles.recoveryText}>¿Olvidaste tu contraseña?</Text></Pressable>
            <View style={styles.divider}><View style={styles.dividerLine} /><Text style={styles.dividerText}>O ACCEDE CON</Text><View style={styles.dividerLine} /></View>
            <Pressable onPress={authenticateWithBiometrics} style={({ pressed }) => [styles.biometricButton, pressed && styles.pressed]}><View style={styles.fingerprint}><KambioIcon name="finger-print-outline" size={29} color={COLORS.violet} /></View><View style={{ flex: 1 }}><Text style={styles.biometricTitle}>Biometría</Text><Text style={styles.biometricCopy}>Huella digital o reconocimiento facial</Text></View><KambioIcon name="chevron-forward" size={18} color={COLORS.violet} /></Pressable>
            <Text style={styles.notice}>{notice}</Text>
          </View>
        </ScrollView>
      </KeyboardAvoidingView>
    </SafeAreaView>
    <Modal visible={helpOpen} transparent animationType="fade" onRequestClose={() => setHelpOpen(false)}><Pressable style={styles.modalBackdrop} onPress={() => setHelpOpen(false)}><Pressable style={styles.helpCard} onPress={() => undefined}><View style={styles.helpIcon}><KambioIcon name="help-circle-outline" size={27} color={COLORS.blue} /></View><Text style={styles.helpTitle}>¿Necesitas ayuda?</Text><Text style={styles.helpCopy}>Verifica que tu DNI tenga ocho dígitos. Si no recuerdas tu clave, usa la opción de recuperación.</Text><Pressable onPress={() => setHelpOpen(false)} style={styles.helpClose}><Text style={styles.helpCloseText}>Entendido</Text></Pressable></Pressable></Pressable></Modal>
  </AppBackground>;
}

const styles = StyleSheet.create({
  safe: { flex: 1 }, scroll: { flexGrow: 1, paddingBottom: 28 },
  hero: { minHeight: 320, paddingHorizontal: 24, paddingTop: 15, backgroundColor: COLORS.blue, borderBottomLeftRadius: 42, borderBottomRightRadius: 42, shadowColor: '#021DE8', shadowOpacity: .28, shadowRadius: 17, shadowOffset: { width: 0, height: 8 }, elevation: 7 },
  heroTop: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' }, brandLockup: { flexDirection: 'row', alignItems: 'center', gap: 9 }, logo: { width: 39, height: 39, borderRadius: 13 }, brand: { color: 'white', fontFamily: FONTS.title, fontSize: 19 }, helpButton: { width: 43, height: 43, alignItems: 'center', justifyContent: 'center', borderRadius: 15, backgroundColor: 'rgba(255,255,255,.16)', borderWidth: 1, borderColor: 'rgba(255,255,255,.48)' },
  heroMessage: { marginTop: 55 }, eyebrow: { color: '#C6BAF5', fontFamily: FONTS.button, fontSize: 9, letterSpacing: 1.1 }, heroTitle: { marginTop: 11, color: 'white', fontFamily: FONTS.heading, fontSize: 30, lineHeight: 35 }, heroCopy: { marginTop: 9, color: '#D7DEFF', fontFamily: FONTS.body, fontSize: 11, lineHeight: 17 },
  sheet: { flex: 1, marginTop: -58, paddingHorizontal: 24, paddingTop: 13, paddingBottom: 25, borderTopLeftRadius: 34, borderTopRightRadius: 34, backgroundColor: '#F5F7FF', borderWidth: 1.5, borderColor: '#FFFFFF', shadowColor: '#93A3CF', shadowOpacity: .35, shadowRadius: 16, shadowOffset: { width: 0, height: -3 }, elevation: 9 }, sheetHandle: { alignSelf: 'center', width: 40, height: 5, borderRadius: 3, backgroundColor: '#CCD5EE' }, sheetTitle: { marginTop: 21, color: COLORS.ink, fontFamily: FONTS.heading, fontSize: 23 }, sheetCopy: { marginTop: 5, color: COLORS.muted, fontFamily: FONTS.body, fontSize: 10 },
  fieldGroup: { marginTop: 20 }, label: { color: COLORS.ink, fontFamily: FONTS.button, fontSize: 9, letterSpacing: .75 }, pinLabelRow: { flexDirection: 'row', justifyContent: 'space-between' }, pinStatus: { color: COLORS.violet, fontFamily: FONTS.button, fontSize: 8 }, field: { width: '100%', height: 54, marginTop: 9, paddingHorizontal: 15, flexDirection: 'row', alignItems: 'center', gap: 10, borderRadius: 17, backgroundColor: '#EAF0FF', borderWidth: 1.5, borderColor: '#D7E0F5' }, fieldComplete: { borderColor: '#91A1F1', backgroundColor: '#E5ECFF' }, input: { flex: 1, height: '100%', color: COLORS.ink, fontFamily: FONTS.bodyMedium, fontSize: 12 }, fieldHint: { marginTop: 6, color: COLORS.muted, fontFamily: FONTS.body, fontSize: 8 },
  loginButton: { height: 53, marginTop: 26, borderRadius: 17, paddingHorizontal: 18, flexDirection: 'row', alignItems: 'center', justifyContent: 'center', gap: 8, backgroundColor: COLORS.blue, borderWidth: 1, borderColor: '#FFFFFF', shadowColor: '#021DE8', shadowOpacity: .34, shadowRadius: 10, shadowOffset: { width: 4, height: 6 }, elevation: 6 }, loginDisabled: { backgroundColor: '#9EA8D5', shadowOpacity: .1 }, loginText: { color: 'white', fontFamily: FONTS.button, fontSize: 11 }, recoveryButton: { alignSelf: 'center', paddingVertical: 16 }, recoveryText: { color: COLORS.blue, fontFamily: FONTS.button, fontSize: 9 },
  divider: { flexDirection: 'row', alignItems: 'center', gap: 9, marginTop: 2 }, dividerLine: { flex: 1, height: 1, backgroundColor: '#DCE3F4' }, dividerText: { color: COLORS.muted, fontFamily: FONTS.button, fontSize: 7, letterSpacing: .7 }, biometricButton: { marginTop: 15, padding: 13, flexDirection: 'row', alignItems: 'center', gap: 11, borderRadius: 19, backgroundColor: '#EDF1FF', borderWidth: 1.5, borderColor: '#FFFFFF', shadowColor: '#C0CBE6', shadowOpacity: .3, shadowRadius: 6, shadowOffset: { width: 3, height: 4 }, elevation: 3 }, fingerprint: { width: 47, height: 47, alignItems: 'center', justifyContent: 'center', borderRadius: 16, backgroundColor: '#E1E6FF' }, biometricTitle: { color: COLORS.ink, fontFamily: FONTS.button, fontSize: 11 }, biometricCopy: { marginTop: 3, color: COLORS.muted, fontFamily: FONTS.body, fontSize: 8 }, notice: { minHeight: 18, marginTop: 14, textAlign: 'center', color: COLORS.muted, fontFamily: FONTS.body, fontSize: 8 },
  pressed: { transform: [{ scale: .97 }], opacity: .9 }, modalBackdrop: { flex: 1, padding: 24, justifyContent: 'center', backgroundColor: 'rgba(16,26,75,.32)' }, helpCard: { padding: 23, borderRadius: 27, backgroundColor: '#EEF3FF', borderWidth: 1.5, borderColor: '#FFFFFF', shadowColor: '#243263', shadowOpacity: .25, shadowRadius: 18, shadowOffset: { width: 7, height: 9 }, elevation: 9 }, helpIcon: { width: 50, height: 50, alignItems: 'center', justifyContent: 'center', borderRadius: 17, backgroundColor: '#E0E7FF' }, helpTitle: { marginTop: 17, color: COLORS.ink, fontFamily: FONTS.heading, fontSize: 21 }, helpCopy: { marginTop: 8, color: COLORS.muted, fontFamily: FONTS.body, fontSize: 10, lineHeight: 16 }, helpClose: { alignSelf: 'flex-end', marginTop: 20, paddingVertical: 11, paddingHorizontal: 16, borderRadius: 14, backgroundColor: COLORS.blue }, helpCloseText: { color: 'white', fontFamily: FONTS.button, fontSize: 9 },
});
