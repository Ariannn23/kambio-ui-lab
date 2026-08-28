import { Pressable, StyleSheet, Text, View } from 'react-native';
import Animated, { useAnimatedStyle, useSharedValue, withSpring } from 'react-native-reanimated';
import { KambioIcon } from './KambioIcon';
import { COLORS, FONTS } from '../theme';

const items = [
  { key: 'Resumen', label: 'Inicio', icon: 'wallet-outline' },
  { key: 'Transferir', label: 'Transferir', icon: 'swap-horizontal-outline' },
  { key: 'Estadísticas', label: 'Estadísticas', icon: 'stats-chart-outline' },
  { key: 'Perfil', label: 'Perfil', icon: 'person-outline' },
];

export function KambioBottomNav({ active = 'Resumen', onChange = () => undefined }) {
  return <View style={styles.shell}>
    <View style={styles.row}>{items.map((item) => <NavItem key={item.key} item={item} active={active === item.key} onPress={() => onChange(item.key)} />)}</View>
  </View>;
}

function NavItem({ item, active, onPress }) {
  const pressScale = useSharedValue(1);
  const animatedStyle = useAnimatedStyle(() => ({ transform: [{ scale: pressScale.value }] }));
  return <Pressable onPress={onPress} onPressIn={() => { pressScale.value = withSpring(.88, { damping: 12 }); }} onPressOut={() => { pressScale.value = withSpring(1, { damping: 12 }); }} style={styles.item}>
    <Animated.View style={[styles.iconSlot, active && styles.iconSlotActive, animatedStyle]}><KambioIcon name={item.icon} size={22} color={active ? 'white' : '#8490AE'} /></Animated.View>
    <Text style={[styles.label, active && styles.labelActive]} numberOfLines={1}>{item.label}</Text>
  </Pressable>;
}

const styles = StyleSheet.create({
  shell: { width: '100%', paddingHorizontal: 8, paddingTop: 11, paddingBottom: 13, borderRadius: 27, backgroundColor: '#F4F7FF', borderWidth: 1.5, borderColor: '#FFFFFF', shadowColor: '#A8B7DA', shadowOpacity: .35, shadowRadius: 12, shadowOffset: { width: 0, height: 6 }, elevation: 6 },
  row: { flexDirection: 'row', alignItems: 'flex-start' }, item: { flex: 1, minWidth: 0, alignItems: 'center', gap: 6 }, iconSlot: { width: 42, height: 38, alignItems: 'center', justifyContent: 'center', borderRadius: 14 }, iconSlotActive: { backgroundColor: COLORS.blue, shadowColor: '#021DE8', shadowOpacity: .24, shadowRadius: 6, shadowOffset: { width: 2, height: 3 }, elevation: 3 }, label: { color: '#8490AE', fontFamily: FONTS.button, fontSize: 9, textAlign: 'center' }, labelActive: { color: COLORS.ink, fontSize: 10 },
});
