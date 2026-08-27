import { Ionicons } from '@expo/vector-icons';
import { LinearGradient } from 'expo-linear-gradient';
import { StyleSheet, Text, View } from 'react-native';
import { AnimatedIcon } from '../../src/components/AnimatedIcon';
import { GlassCard } from '../../src/components/GlassCard';
import { Screen } from '../../src/components/Screen';
import { SectionTitle } from '../../src/components/SectionTitle';
import { activity } from '../../src/data/mock';
import { COLORS, FONTS } from '../../src/theme';

export default function Account() {
  return <Screen>
    <View style={styles.greeting}><View><Text style={styles.hello}>Hola,</Text><Text style={styles.name}>Arian 👋</Text></View><View style={styles.more}><Ionicons name="ellipsis-horizontal" color={COLORS.ink} size={20} /></View></View>
    <GlassCard style={styles.balanceCard}>
      <View style={styles.currency}><View style={styles.flag}><Text style={styles.flagText}>PE</Text></View><Text style={styles.currencyText}>Saldo disponible</Text><Ionicons name="chevron-down" color={COLORS.ink} size={15} /></View>
      <Text style={styles.balance}>S/ 12,450.00</Text>
      <View style={styles.goal}><View style={styles.goalMark}><Ionicons name="leaf-outline" size={17} color="#288466" /></View><View style={styles.goalCopy}><Text style={styles.goalTitle}>Meta de vacaciones</Text><Text style={styles.goalSub}>S/ 3,250 de S/ 5,000</Text></View><Ionicons name="arrow-forward" color={COLORS.ink} size={17} /></View>
    </GlassCard>
    <View style={styles.quick}><QuickAction icon="add" title="Ingresar" /><QuickAction icon="card-outline" title="Tarjetas" /><QuickAction icon="send-outline" title="Transferir" active /><QuickAction icon="scan-outline" title="Escanear" /></View>
    <SectionTitle title="Movimientos" action="Ver todo" />
    <View style={styles.list}>{activity.map((item) => <View style={styles.transaction} key={item.title}><View style={[styles.transIcon, { backgroundColor: item.tone }]}><Ionicons name={item.icon} size={17} color={COLORS.blue} /></View><View style={styles.transInfo}><Text style={styles.transTitle}>{item.title}</Text><Text style={styles.transDate}>{item.date}</Text></View><Text style={[styles.amount, { color: item.amount[0] === '+' ? '#078C68' : COLORS.ink }]}>{item.amount}</Text></View>)}</View>
  </Screen>;
}

function QuickAction({ icon, title, active }) { return <View style={[styles.quickAction, active && styles.quickActive]}><AnimatedIcon name={icon} size={20} color={active ? 'white' : COLORS.ink} active={active} motion={active ? 'swap' : 'float'} /><Text style={[styles.quickText, active && styles.quickTextActive]}>{title}</Text></View>; }

const styles = StyleSheet.create({
  greeting: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', marginTop: 9, marginBottom: 14 }, hello: { fontFamily: FONTS.body, color: COLORS.muted, fontSize: 12 }, name: { fontFamily: FONTS.heading, color: COLORS.ink, fontSize: 20, marginTop: 1 }, more: { width: 34, height: 34, alignItems: 'center', justifyContent: 'center', borderRadius: 12, backgroundColor: 'rgba(255,255,255,.48)' },
  balanceCard: { padding: 17 }, currency: { flexDirection: 'row', alignItems: 'center', gap: 7 }, flag: { width: 24, height: 18, borderRadius: 5, backgroundColor: '#F0F2FF', alignItems: 'center', justifyContent: 'center' }, flagText: { fontFamily: FONTS.button, color: COLORS.blue, fontSize: 7 }, currencyText: { flex: 1, fontFamily: FONTS.bodyMedium, color: COLORS.muted, fontSize: 10 }, balance: { fontFamily: FONTS.heading, color: COLORS.ink, fontSize: 29, marginTop: 15 },
  goal: { marginTop: 15, padding: 11, borderRadius: 15, flexDirection: 'row', alignItems: 'center', backgroundColor: 'rgba(255,255,255,.42)' }, goalMark: { width: 32, height: 32, borderRadius: 11, alignItems: 'center', justifyContent: 'center', backgroundColor: '#E1F4E9' }, goalCopy: { flex: 1, marginLeft: 9 }, goalTitle: { fontFamily: FONTS.bodyMedium, color: COLORS.ink, fontSize: 10 }, goalSub: { fontFamily: FONTS.body, color: COLORS.muted, fontSize: 8, marginTop: 2 },
  quick: { flexDirection: 'row', gap: 8, marginTop: 14 }, quickAction: { flex: 1, height: 62, borderRadius: 16, alignItems: 'center', justifyContent: 'center', gap: 5, backgroundColor: 'rgba(255,255,255,.36)' }, quickActive: { backgroundColor: COLORS.blue }, quickText: { fontFamily: FONTS.button, color: COLORS.ink, fontSize: 8 }, quickTextActive: { color: 'white' },
  list: { gap: 11 }, transaction: { minHeight: 55, flexDirection: 'row', alignItems: 'center' }, transIcon: { width: 38, height: 38, borderRadius: 14, alignItems: 'center', justifyContent: 'center' }, transInfo: { flex: 1, marginLeft: 10 }, transTitle: { fontFamily: FONTS.bodyMedium, color: COLORS.ink, fontSize: 11 }, transDate: { fontFamily: FONTS.body, color: COLORS.muted, fontSize: 8, marginTop: 3 }, amount: { fontFamily: FONTS.bodyMedium, fontSize: 10 },
});
