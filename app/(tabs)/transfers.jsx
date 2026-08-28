import { useState } from 'react';
import { useRouter } from 'expo-router';
import { Pressable, StyleSheet, Text, TextInput, View } from 'react-native';
import { KambioIcon } from '../../src/components/KambioIcon';
import { Screen } from '../../src/components/Screen';
import { contacts } from '../../src/data/mock';
import { COLORS, FONTS } from '../../src/theme';

const quickAmounts = ['50', '100', '200'];
const recentTransfers = [
  ['Sofía Morales', 'Hoy · 10:41', '- S/ 150.00', '#5B40DE'],
  ['Juan Pérez', 'Ayer · 18:20', '- S/ 80.00', '#86A6C4'],
];

export default function Transfers() {
  const router = useRouter();
  const [selected, setSelected] = useState(contacts[0]);
  const [amount, setAmount] = useState('150');
  const [concept, setConcept] = useState('Pago compartido');
  const numericAmount = Number(amount.replace(',', '.')) || 0;

  return <Screen>
    <View style={styles.hero}>
      <View><Text style={styles.eyebrow}>MOVIMIENTO SEGURO</Text><Text style={styles.title}>Transferir</Text><Text style={styles.subtitle}>Envía dinero rápido y sin complicaciones.</Text></View>
      <Pressable style={styles.historyButton}><KambioIcon name="hourglass-outline" size={19} color={COLORS.blueDeep} /></Pressable>
    </View>

    <View style={styles.sourceCard}>
      <View style={styles.sourceIcon}><KambioIcon name="wallet-outline" size={20} color={COLORS.blueDeep} /></View>
      <View style={{ flex: 1 }}><Text style={styles.sourceLabel}>CUENTA DE ORIGEN</Text><Text style={styles.sourceName}>Cuenta principal · 4209</Text></View>
      <View><Text style={styles.sourceLabel}>DISPONIBLE</Text><Text style={styles.sourceAmount}>S/ 12,450</Text></View>
    </View>

    <View style={styles.sectionHeader}><View><Text style={styles.sectionTitle}>¿A quién envías?</Text><Text style={styles.sectionCopy}>Elige un contacto frecuente</Text></View><Pressable style={styles.newContact}><KambioIcon name="add" size={15} color={COLORS.blueDeep} /><Text style={styles.newContactText}>Nuevo</Text></Pressable></View>
    <View style={styles.recipientRail}>
      {contacts.map((contact) => <Pressable key={contact.name} onPress={() => setSelected(contact)} style={styles.recipient}>
        <View style={[styles.avatarWrap, selected.name === contact.name && styles.avatarWrapActive]}><View style={[styles.avatar, { backgroundColor: contact.color }]}><Text style={styles.initials}>{contact.initials}</Text></View></View>
        <Text style={[styles.recipientName, selected.name === contact.name && styles.recipientNameActive]} numberOfLines={1}>{contact.name.split(' ')[0]}</Text>
      </Pressable>)}
      <Pressable style={styles.addRecipient}><KambioIcon name="add" size={20} color={COLORS.blueDeep} /><Text style={styles.addRecipientText}>Agregar</Text></Pressable>
    </View>

    <View style={styles.transferCard}>
      <View style={styles.transferTop}><View><Text style={styles.amountLabel}>MONTO A ENVIAR</Text><Text style={styles.destination}>Para {selected.name}</Text></View><View style={styles.currencyPill}><Text style={styles.currencyText}>PEN</Text><KambioIcon name="chevron-down" size={14} color={COLORS.blueDeep} /></View></View>
      <View style={styles.amountRow}><Text style={styles.currencyMark}>S/</Text><TextInput value={amount} onChangeText={(value) => setAmount(value.replace(/[^0-9.,]/g, '').slice(0, 9))} keyboardType="decimal-pad" style={styles.amountInput} placeholder="0.00" placeholderTextColor="#A8B3CE" /></View>
      <Text style={styles.amountHint}>Toca el monto para editarlo libremente.</Text>
      <View style={styles.quickAmounts}>{quickAmounts.map((value) => <Pressable key={value} onPress={() => setAmount(value)} style={[styles.amountChip, amount === value && styles.amountChipActive]}><Text style={[styles.amountChipText, amount === value && styles.amountChipTextActive]}>+ S/ {value}</Text></Pressable>)}</View>
      <View style={styles.fieldDivider} />
      <View style={styles.conceptRow}><View style={styles.conceptIcon}><KambioIcon name="pencil" size={17} color={COLORS.blueDeep} /></View><View style={{ flex: 1 }}><Text style={styles.conceptLabel}>CONCEPTO</Text><TextInput value={concept} onChangeText={setConcept} style={styles.conceptInput} placeholder="Agregar un concepto" placeholderTextColor="#99A4BF" /></View></View>
    </View>

    <Pressable disabled={!numericAmount} onPress={() => router.push({ pathname: '/transfer-processing', params: { amount: numericAmount.toFixed(2), recipient: selected.name } })} style={({ pressed }) => [styles.sendButton, !numericAmount && styles.sendButtonDisabled, pressed && numericAmount && styles.sendButtonPressed]}><Text style={styles.sendText}>Enviar {numericAmount ? `S/ ${numericAmount.toFixed(2)}` : 'transferencia'}</Text><View style={styles.sendIcon}><KambioIcon name="arrow-forward" size={20} color="white" /></View></Pressable>
    <View style={styles.securityNote}><KambioIcon name="shield-checkmark-outline" size={15} color="#178067" /><Text style={styles.securityNoteText}>Tus transferencias están protegidas.</Text></View>

    <View style={styles.recentHead}><Text style={styles.sectionTitle}>Transferencias recientes</Text><Pressable><Text style={styles.viewAll}>Ver todas</Text></Pressable></View>
    <View style={styles.recentCard}>{recentTransfers.map(([name, date, value, color], index) => <View key={name} style={[styles.recentRow, index === 0 && styles.recentDivider]}><View style={[styles.recentAvatar, { backgroundColor: color }]}><Text style={styles.initials}>{name.split(' ').map((part) => part[0]).join('')}</Text></View><View style={styles.recentCopy}><Text style={styles.recentName}>{name}</Text><Text style={styles.recentDate}>{date}</Text></View><Text style={styles.recentAmount}>{value}</Text></View>)}</View>
  </Screen>;
}

const styles = StyleSheet.create({
  hero: { marginTop: 9, flexDirection: 'row', alignItems: 'flex-start', justifyContent: 'space-between' }, eyebrow: { color: COLORS.blue, fontFamily: FONTS.button, fontSize: 8, letterSpacing: 1.25 }, title: { marginTop: 4, color: COLORS.ink, fontFamily: FONTS.heading, fontSize: 26 }, subtitle: { marginTop: 5, color: COLORS.muted, fontFamily: FONTS.body, fontSize: 10 }, historyButton: { width: 43, height: 43, borderRadius: 15, alignItems: 'center', justifyContent: 'center', backgroundColor: '#E9EFFF', borderWidth: 1.5, borderColor: '#FFFFFF', shadowColor: '#A3B2D1', shadowOpacity: .23, shadowRadius: 7, shadowOffset: { width: 3, height: 4 }, elevation: 3 },
  sourceCard: { minHeight: 73, marginTop: 19, paddingHorizontal: 14, flexDirection: 'row', alignItems: 'center', gap: 10, borderRadius: 20, backgroundColor: '#EAF0FF', borderWidth: 1.5, borderColor: '#FFFFFF', shadowColor: '#A5B3D1', shadowOpacity: .2, shadowRadius: 8, shadowOffset: { width: 3, height: 5 }, elevation: 3 }, sourceIcon: { width: 39, height: 39, borderRadius: 14, alignItems: 'center', justifyContent: 'center', backgroundColor: '#DDE7FF' }, sourceLabel: { color: '#6F7B9A', fontFamily: FONTS.button, fontSize: 7, letterSpacing: .7 }, sourceName: { marginTop: 4, color: COLORS.ink, fontFamily: FONTS.bodyMedium, fontSize: 10 }, sourceAmount: { marginTop: 4, color: COLORS.blueDeep, fontFamily: FONTS.bodyMedium, fontSize: 10, textAlign: 'right' },
  sectionHeader: { marginTop: 25, marginBottom: 11, flexDirection: 'row', justifyContent: 'space-between', alignItems: 'flex-end' }, sectionTitle: { color: COLORS.ink, fontFamily: FONTS.heading, fontSize: 16 }, sectionCopy: { marginTop: 3, color: COLORS.muted, fontFamily: FONTS.body, fontSize: 8 }, newContact: { paddingVertical: 8, paddingHorizontal: 10, flexDirection: 'row', alignItems: 'center', gap: 4, borderRadius: 12, backgroundColor: '#E8EEFF' }, newContactText: { color: COLORS.blueDeep, fontFamily: FONTS.button, fontSize: 8 },
  recipientRail: { height: 78, flexDirection: 'row', justifyContent: 'space-between' }, recipient: { width: 55, alignItems: 'center' }, avatarWrap: { width: 52, height: 52, borderRadius: 26, padding: 3, alignItems: 'center', justifyContent: 'center', backgroundColor: '#E4EAF9' }, avatarWrapActive: { backgroundColor: COLORS.blue, shadowColor: COLORS.blue, shadowOpacity: .28, shadowRadius: 7, shadowOffset: { width: 0, height: 4 }, elevation: 4 }, avatar: { width: 46, height: 46, borderRadius: 23, alignItems: 'center', justifyContent: 'center', borderWidth: 2, borderColor: '#FFFFFF' }, initials: { color: '#FFFFFF', fontFamily: FONTS.button, fontSize: 10 }, recipientName: { maxWidth: 55, marginTop: 5, color: COLORS.muted, fontFamily: FONTS.bodyMedium, fontSize: 8 }, recipientNameActive: { color: COLORS.ink }, addRecipient: { width: 55, alignItems: 'center', justifyContent: 'center', gap: 4 }, addRecipientText: { color: COLORS.blueDeep, fontFamily: FONTS.button, fontSize: 8 },
  transferCard: { marginTop: 15, padding: 18, borderRadius: 25, backgroundColor: '#EEF3FF', borderWidth: 1.5, borderColor: '#FFFFFF', shadowColor: '#91A1C7', shadowOpacity: .25, shadowRadius: 12, shadowOffset: { width: 5, height: 7 }, elevation: 5 }, transferTop: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'flex-start' }, amountLabel: { color: '#697695', fontFamily: FONTS.button, fontSize: 8, letterSpacing: 1 }, destination: { marginTop: 4, color: COLORS.ink, fontFamily: FONTS.bodyMedium, fontSize: 10 }, currencyPill: { paddingHorizontal: 8, paddingVertical: 6, flexDirection: 'row', alignItems: 'center', gap: 4, borderRadius: 11, backgroundColor: '#DFE8FF' }, currencyText: { color: COLORS.blueDeep, fontFamily: FONTS.button, fontSize: 8 }, amountRow: { marginTop: 13, flexDirection: 'row', alignItems: 'center' }, currencyMark: { color: COLORS.blueDeep, fontFamily: FONTS.heading, fontSize: 25, marginRight: 6 }, amountInput: { flex: 1, padding: 0, color: COLORS.ink, fontFamily: FONTS.heading, fontSize: 33 }, amountHint: { marginTop: 1, color: '#75819F', fontFamily: FONTS.body, fontSize: 8 }, quickAmounts: { marginTop: 12, flexDirection: 'row', gap: 8 }, amountChip: { minWidth: 70, paddingVertical: 8, borderRadius: 12, alignItems: 'center', backgroundColor: '#E4EBFA', borderWidth: 1, borderColor: '#D9E2F4' }, amountChipActive: { backgroundColor: '#D3DEFF', borderColor: '#A3B6F5' }, amountChipText: { color: '#637090', fontFamily: FONTS.button, fontSize: 9 }, amountChipTextActive: { color: COLORS.blueDeep }, fieldDivider: { height: 1, marginTop: 17, marginBottom: 14, backgroundColor: '#D8E1F5' }, conceptRow: { flexDirection: 'row', alignItems: 'center', gap: 10 }, conceptIcon: { width: 34, height: 34, borderRadius: 12, alignItems: 'center', justifyContent: 'center', backgroundColor: '#E0E8FF' }, conceptLabel: { color: '#6D7A98', fontFamily: FONTS.button, fontSize: 7, letterSpacing: .8 }, conceptInput: { height: 27, padding: 0, color: COLORS.ink, fontFamily: FONTS.bodyMedium, fontSize: 10 },
  sendButton: { height: 62, marginTop: 18, paddingHorizontal: 19, borderRadius: 20, flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', backgroundColor: COLORS.blue, borderWidth: 1, borderColor: '#FFFFFF', shadowColor: COLORS.blue, shadowOpacity: .32, shadowRadius: 10, shadowOffset: { width: 4, height: 6 }, elevation: 6 }, sendButtonDisabled: { backgroundColor: '#A5B0D6', shadowOpacity: .1 }, sendButtonPressed: { opacity: .88, transform: [{ scale: .98 }] }, sendText: { color: '#FFFFFF', fontFamily: FONTS.button, fontSize: 15 }, sendIcon: { width: 35, height: 35, borderRadius: 12, alignItems: 'center', justifyContent: 'center', backgroundColor: 'rgba(255,255,255,.17)' }, securityNote: { marginTop: 10, flexDirection: 'row', alignItems: 'center', justifyContent: 'center', gap: 4 }, securityNoteText: { color: '#4B7E70', fontFamily: FONTS.body, fontSize: 8 },
  recentHead: { marginTop: 26, marginBottom: 11, flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between' }, viewAll: { color: COLORS.blueDeep, fontFamily: FONTS.button, fontSize: 9 }, recentCard: { overflow: 'hidden', borderRadius: 21, backgroundColor: '#EEF3FF', borderWidth: 1.5, borderColor: '#FFFFFF', shadowColor: '#A1AFCC', shadowOpacity: .18, shadowRadius: 9, shadowOffset: { width: 3, height: 5 }, elevation: 3 }, recentRow: { minHeight: 68, paddingHorizontal: 14, flexDirection: 'row', alignItems: 'center' }, recentDivider: { borderBottomWidth: 1, borderBottomColor: '#DAE2F4' }, recentAvatar: { width: 37, height: 37, borderRadius: 13, alignItems: 'center', justifyContent: 'center' }, recentCopy: { flex: 1, marginLeft: 10 }, recentName: { color: COLORS.ink, fontFamily: FONTS.bodyMedium, fontSize: 10 }, recentDate: { marginTop: 3, color: COLORS.muted, fontFamily: FONTS.body, fontSize: 8 }, recentAmount: { color: COLORS.ink, fontFamily: FONTS.bodyMedium, fontSize: 10 },
});
