import { LinearGradient } from 'expo-linear-gradient';
import { useState } from 'react';
import { Pressable, StyleSheet, Text, View } from 'react-native';
import { KambioIcon } from '../../components/KambioIcon';
import { Screen } from '../../components/Screen';
import { COLORS, FONTS } from '../../theme';

const cards = [
  { id: 'pro', name: 'Kambio Pro', type: 'VISA · DÉBITO', number: '••••  4209', balance: 'S/ 12,450.00', expiry: '12/29', colors: ['#07124C', '#2C24B6', '#6858E9'], brand: 'VISA' },
  { id: 'flow', name: 'Kambio Flow', type: 'VIRTUAL · COMPRAS ONLINE', number: '••••  6681', balance: 'S/ 3,280.50', expiry: '08/28', colors: ['#063848', '#077D97', '#57B8CA'], brand: 'VIRTUAL' },
  { id: 'black', name: 'Kambio Black', type: 'MASTERCARD · CRÉDITO', number: '••••  8942', balance: 'S/ 8,900.00', expiry: '04/30', colors: ['#11162B', '#343851', '#101A4B'], brand: 'MASTERCARD' },
];

const actions = [['add', 'Recargar'], ['information-circle-outline', 'Detalles'], ['lock-closed-outline', 'Bloquear']];
const management = [['information-circle-outline', 'Ver PIN', 'Consulta de forma segura'], ['card-outline', 'Método de pago', 'Gestiona tus tarjetas'], ['shield-checkmark-outline', 'Seguridad', 'Límites y compras online']];

export default function CardsScreen() {
  const [showAmounts, setShowAmounts] = useState(true);

  return <Screen>
    <View style={styles.header}>
      <View><Text style={styles.eyebrow}>KAMBIO PRO</Text><Text style={styles.title}>Mis tarjetas</Text></View>
      <Pressable style={styles.addButton}><KambioIcon name="add" size={18} color={COLORS.blueDeep} /></Pressable>
    </View>

    <Pressable onPress={() => setShowAmounts((current) => !current)} style={({ pressed }) => [styles.visibilityControl, pressed && styles.visibilityPressed]}>
      <KambioIcon name={showAmounts ? 'eye-outline' : 'eye-off-outline'} size={18} color={COLORS.blueDeep} />
      <Text style={styles.visibilityText}>{showAmounts ? 'Ocultar montos' : 'Mostrar montos'}</Text>
    </Pressable>

    {cards.map((card) => <CardBlock key={card.id} card={card} showAmounts={showAmounts} />)}

    <View style={styles.actions}>{actions.map(([icon, label]) => <Pressable key={label} style={({ pressed }) => [styles.action, pressed && styles.actionPressed]}><View style={styles.actionIcon}><KambioIcon name={icon} size={18} color={COLORS.blueDeep} /></View><Text style={styles.actionText}>{label}</Text></Pressable>)}</View>

    <Text style={styles.sectionTitle}>Gestionar tarjeta</Text>
    <View style={styles.manageCard}>{management.map(([icon, title, copy], index) => <Pressable key={title} style={[styles.manageRow, index < management.length - 1 && styles.rowDivider]}><View style={styles.manageIcon}><KambioIcon name={icon} size={18} color={COLORS.blueDeep} /></View><View style={styles.manageCopy}><Text style={styles.manageTitle}>{title}</Text><Text style={styles.manageSub}>{copy}</Text></View><KambioIcon name="chevron-forward" size={18} color="#7B88A8" /></Pressable>)}</View>

    <View style={styles.securityTip}><View style={styles.tipIcon}><KambioIcon name="shield-checkmark-outline" size={20} color="#147B61" /></View><View style={{ flex: 1 }}><Text style={styles.tipTitle}>Compra con tranquilidad</Text><Text style={styles.tipCopy}>Protegemos tus operaciones en línea en tiempo real.</Text></View></View>
  </Screen>;
}

function CardBlock({ card, showAmounts }) {
  return <View style={styles.cardBlock}>
    <View style={styles.cardHeading}><View><Text style={styles.cardName}>{card.name}</Text><Text style={styles.balanceLabel}>Saldo disponible</Text></View><Text style={styles.cardBalance}>{showAmounts ? card.balance : 'S/ ••••••••'}</Text></View>
    <Pressable style={({ pressed }) => [styles.cardShell, pressed && styles.cardPressed]}>
      <LinearGradient colors={card.colors} start={{ x: 0, y: 0 }} end={{ x: 1, y: 1 }} style={styles.bankCard}>
        <View pointerEvents="none" style={styles.glassOrbLarge} />
        <View pointerEvents="none" style={styles.glassOrbSmall} />
        <View pointerEvents="none" style={styles.glassPane} />
        <View style={styles.cardTop}><View style={styles.chip}><View style={styles.chipLine} /><View style={styles.chipLine} /></View><Text style={styles.cardBrand}>KAMBIO</Text></View>
        <Text style={styles.cardType}>{card.type}</Text>
        <Text style={styles.cardNumber}>{showAmounts ? card.number : '••••  ••••'}</Text>
        <View style={styles.cardBottom}><View><Text style={styles.cardMetaLabel}>TITULAR</Text><Text style={styles.cardMeta}>ARIAN MERCER</Text></View><View><Text style={styles.cardMetaLabel}>VENCE</Text><Text style={styles.cardMeta}>{card.expiry}</Text></View><Text style={styles.visa}>{card.brand}</Text></View>
      </LinearGradient>
    </Pressable>
  </View>;
}

const styles = StyleSheet.create({
  header: { marginTop: 9, flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between' },
  eyebrow: { color: COLORS.blue, fontFamily: FONTS.button, fontSize: 9, letterSpacing: 1.2 }, title: { marginTop: 3, color: COLORS.ink, fontFamily: FONTS.heading, fontSize: 25 },
  addButton: { width: 43, height: 43, borderRadius: 15, alignItems: 'center', justifyContent: 'center', backgroundColor: '#E8EEFF', borderWidth: 1.5, borderColor: '#FFFFFF', shadowColor: '#A2B0D0', shadowOpacity: .24, shadowRadius: 7, shadowOffset: { width: 3, height: 4 }, elevation: 3 },
  visibilityControl: { alignSelf: 'flex-start', marginTop: 16, minHeight: 38, paddingHorizontal: 13, borderRadius: 14, alignItems: 'center', flexDirection: 'row', gap: 7, backgroundColor: '#E9EFFF', borderWidth: 1, borderColor: '#FFFFFF' }, visibilityPressed: { opacity: .78, transform: [{ scale: .97 }] }, visibilityText: { color: COLORS.blueDeep, fontFamily: FONTS.button, fontSize: 10 },
  cardBlock: { marginTop: 21 }, cardHeading: { flexDirection: 'row', alignItems: 'flex-end', justifyContent: 'space-between', marginBottom: 9 }, cardName: { color: COLORS.ink, fontFamily: FONTS.heading, fontSize: 17 }, balanceLabel: { marginTop: 3, color: COLORS.muted, fontFamily: FONTS.body, fontSize: 8 }, cardBalance: { color: COLORS.blueDeep, fontFamily: FONTS.bodyMedium, fontSize: 12 },
  cardShell: { borderRadius: 26, shadowColor: '#253795', shadowOpacity: .33, shadowRadius: 15, shadowOffset: { width: 0, height: 10 }, elevation: 8 }, cardPressed: { transform: [{ scale: .985 }], opacity: .96 },
  bankCard: { height: 191, borderRadius: 26, overflow: 'hidden', padding: 20, borderWidth: 1, borderColor: 'rgba(255,255,255,.62)' }, glassOrbLarge: { position: 'absolute', width: 200, height: 200, borderRadius: 100, right: -67, top: -104, backgroundColor: 'rgba(255,255,255,.23)', borderWidth: 1, borderColor: 'rgba(255,255,255,.35)' }, glassOrbSmall: { position: 'absolute', width: 105, height: 105, borderRadius: 53, left: -40, bottom: -53, backgroundColor: 'rgba(160,205,255,.25)', borderWidth: 1, borderColor: 'rgba(255,255,255,.26)' }, glassPane: { position: 'absolute', width: 235, height: 85, right: -36, bottom: 10, borderRadius: 24, backgroundColor: 'rgba(255,255,255,.08)', borderWidth: 1, borderColor: 'rgba(255,255,255,.18)', transform: [{ rotate: '-12deg' }] },
  cardTop: { flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between' }, chip: { width: 36, height: 27, borderRadius: 8, paddingVertical: 6, justifyContent: 'space-around', backgroundColor: 'rgba(245,222,151,.93)', borderWidth: 1, borderColor: 'rgba(255,255,255,.65)' }, chipLine: { height: 1, backgroundColor: 'rgba(104,82,19,.52)' }, cardBrand: { color: 'rgba(255,255,255,.88)', fontFamily: FONTS.button, fontSize: 10, letterSpacing: 1.3 },
  cardType: { marginTop: 15, color: 'rgba(226,234,255,.84)', fontFamily: FONTS.button, fontSize: 7.5, letterSpacing: 1.05 }, cardNumber: { marginTop: 7, color: '#FFFFFF', fontFamily: FONTS.heading, fontSize: 19, letterSpacing: .8 }, cardBottom: { marginTop: 'auto', flexDirection: 'row', alignItems: 'flex-end', gap: 20 }, cardMetaLabel: { color: 'rgba(224,232,255,.72)', fontFamily: FONTS.button, fontSize: 6.5, letterSpacing: .75 }, cardMeta: { marginTop: 3, color: 'white', fontFamily: FONTS.bodyMedium, fontSize: 8 }, visa: { marginLeft: 'auto', maxWidth: 88, color: 'white', fontFamily: FONTS.heading, fontSize: 13, fontStyle: 'italic', textAlign: 'right' },
  actions: { flexDirection: 'row', gap: 10, marginTop: 18 }, action: { flex: 1, minHeight: 75, alignItems: 'center', justifyContent: 'center', gap: 6, borderRadius: 19, backgroundColor: '#EEF3FF', borderWidth: 1.5, borderColor: '#FFFFFF', shadowColor: '#A4B1CF', shadowOpacity: .22, shadowRadius: 7, shadowOffset: { width: 3, height: 4 }, elevation: 3 }, actionPressed: { transform: [{ scale: .96 }], backgroundColor: '#E5ECFF' }, actionIcon: { width: 29, height: 25, alignItems: 'center', justifyContent: 'center' }, actionText: { color: COLORS.ink, fontFamily: FONTS.button, fontSize: 9 },
  sectionTitle: { marginTop: 26, marginBottom: 11, color: COLORS.ink, fontFamily: FONTS.heading, fontSize: 17 }, manageCard: { overflow: 'hidden', borderRadius: 22, backgroundColor: '#EEF3FF', borderWidth: 1.5, borderColor: '#FFFFFF', shadowColor: '#A4B1CF', shadowOpacity: .2, shadowRadius: 10, shadowOffset: { width: 4, height: 6 }, elevation: 4 }, manageRow: { minHeight: 74, paddingHorizontal: 15, flexDirection: 'row', alignItems: 'center' }, rowDivider: { borderBottomWidth: 1, borderBottomColor: '#DDE5F7' }, manageIcon: { width: 38, height: 38, borderRadius: 13, alignItems: 'center', justifyContent: 'center', backgroundColor: '#E0E8FF' }, manageCopy: { flex: 1, marginLeft: 11 }, manageTitle: { color: COLORS.ink, fontFamily: FONTS.bodyMedium, fontSize: 11 }, manageSub: { marginTop: 3, color: COLORS.muted, fontFamily: FONTS.body, fontSize: 8 },
  securityTip: { marginTop: 18, marginBottom: 16, padding: 14, flexDirection: 'row', alignItems: 'center', gap: 10, borderRadius: 19, backgroundColor: '#E6F4EE', borderWidth: 1, borderColor: '#F8FFFC' }, tipIcon: { width: 38, height: 38, borderRadius: 13, alignItems: 'center', justifyContent: 'center', backgroundColor: '#D6EDDF' }, tipTitle: { color: '#135548', fontFamily: FONTS.bodyMedium, fontSize: 10 }, tipCopy: { marginTop: 3, color: '#487B70', fontFamily: FONTS.body, fontSize: 8 },
});
