import { Ionicons } from '@expo/vector-icons';
import { StyleSheet, Text, View } from 'react-native';
import { AnimatedIcon } from '../../src/components/AnimatedIcon';
import { GlassCard } from '../../src/components/GlassCard';
import { Screen } from '../../src/components/Screen';
import { contacts } from '../../src/data/mock';
import { COLORS, FONTS } from '../../src/theme';

const recipientRows = [['Sofía Morales', 'BCP · Cuenta corriente', '#5B40DE'], ['Carlos Pérez', 'Interbank · Cuenta sueldo', '#86A6C4'], ['David Rojas', 'Yape · Número móvil', '#9499F7']];

export default function Transfers() {
  return <Screen>
    <View style={styles.top}><View><Text style={styles.eyebrow}>ENVIAR DINERO</Text><Text style={styles.title}>Destinatarios</Text></View><View style={styles.add}><Ionicons name="add" size={16} color={COLORS.ink} /><Text style={styles.addText}>Añadir</Text></View></View>
    <View style={styles.search}><Ionicons name="search-outline" size={17} color={COLORS.muted} /><Text style={styles.searchText}>Nombre, correo o teléfono</Text></View>
    <Text style={styles.section}>Recientes</Text><View style={styles.recipients}><View style={styles.new}><View style={styles.addCircle}><Ionicons name="add" size={18} color={COLORS.blue} /></View><Text style={styles.initialName}>Nuevo</Text></View>{contacts.slice(0, 3).map((contact) => <View style={styles.recipient} key={contact.name}><View style={[styles.avatar, { backgroundColor: contact.color }]}><Text style={styles.initials}>{contact.initials}</Text></View><Text style={styles.initialName} numberOfLines={1}>{contact.name.split(' ')[0]}</Text></View>)}</View>
    <Text style={styles.section}>Contactos</Text>
    <GlassCard>{recipientRows.map(([name, detail, color], index) => <View key={name} style={[styles.contactRow, index < recipientRows.length - 1 && styles.divider]}><View style={[styles.avatar, styles.rowAvatar, { backgroundColor: color }]}><Text style={styles.initials}>{name.slice(0, 1)}</Text></View><View style={styles.contactCopy}><Text style={styles.contactName}>{name}</Text><Text style={styles.contactDetail}>{detail}</Text></View><View style={styles.send}><AnimatedIcon name="send-outline" size={17} color={COLORS.blue} motion="swap" /><Text style={styles.sendText}>Enviar</Text></View></View>)}</GlassCard>
    <View style={styles.request}><View style={styles.requestIcon}><Ionicons name="cash-outline" size={24} color={COLORS.violet} /></View><View style={{ flex: 1 }}><Text style={styles.requestTitle}>Solicitar un pago</Text><Text style={styles.requestCopy}>Crea un enlace para recibir dinero.</Text></View><Ionicons name="arrow-forward" size={18} color={COLORS.ink} /></View>
  </Screen>;
}

const styles = StyleSheet.create({
  top: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', marginTop: 9 }, eyebrow: { fontFamily: FONTS.bodyMedium, color: COLORS.muted, letterSpacing: 1.1, fontSize: 8 }, title: { fontFamily: FONTS.heading, color: COLORS.ink, fontSize: 22, marginTop: 3 }, add: { flexDirection: 'row', alignItems: 'center', gap: 3, backgroundColor: '#F0E0B9', paddingHorizontal: 11, paddingVertical: 7, borderRadius: 14 }, addText: { fontFamily: FONTS.button, color: COLORS.ink, fontSize: 8 },
  search: { marginTop: 16, height: 39, paddingHorizontal: 13, borderRadius: 15, backgroundColor: 'rgba(255,255,255,.45)', flexDirection: 'row', alignItems: 'center', gap: 8 }, searchText: { fontFamily: FONTS.body, color: '#969DB1', fontSize: 9 }, section: { fontFamily: FONTS.heading, color: COLORS.ink, fontSize: 15, marginTop: 22, marginBottom: 11 },
  recipients: { flexDirection: 'row', justifyContent: 'space-between', paddingHorizontal: 2 }, new: { alignItems: 'center', width: 58 }, recipient: { alignItems: 'center', width: 58 }, addCircle: { width: 44, height: 44, borderRadius: 22, alignItems: 'center', justifyContent: 'center', backgroundColor: 'rgba(255,255,255,.52)', borderWidth: 1, borderColor: 'rgba(255,255,255,.85)' }, avatar: { width: 44, height: 44, borderRadius: 22, alignItems: 'center', justifyContent: 'center', borderWidth: 2, borderColor: 'white' }, initials: { fontFamily: FONTS.button, color: 'white', fontSize: 11 }, initialName: { fontFamily: FONTS.bodyMedium, color: COLORS.ink, fontSize: 8, marginTop: 6 },
  contactRow: { minHeight: 70, paddingHorizontal: 14, flexDirection: 'row', alignItems: 'center' }, divider: { borderBottomWidth: 1, borderBottomColor: 'rgba(91,64,222,.09)' }, rowAvatar: { width: 36, height: 36, borderRadius: 12, borderWidth: 0 }, contactCopy: { flex: 1, marginLeft: 10 }, contactName: { fontFamily: FONTS.bodyMedium, color: COLORS.ink, fontSize: 11 }, contactDetail: { fontFamily: FONTS.body, color: COLORS.muted, fontSize: 8, marginTop: 3 }, send: { flexDirection: 'row', alignItems: 'center', gap: 4 }, sendText: { fontFamily: FONTS.button, color: COLORS.blue, fontSize: 8 },
  request: { marginTop: 18, flexDirection: 'row', alignItems: 'center', gap: 10, padding: 13, borderRadius: 18, backgroundColor: 'rgba(255,255,255,.35)' }, requestIcon: { width: 39, height: 39, borderRadius: 14, alignItems: 'center', justifyContent: 'center', backgroundColor: '#EEE8FF' }, requestTitle: { fontFamily: FONTS.bodyMedium, color: COLORS.ink, fontSize: 11 }, requestCopy: { fontFamily: FONTS.body, color: COLORS.muted, fontSize: 8, marginTop: 3 },
});
