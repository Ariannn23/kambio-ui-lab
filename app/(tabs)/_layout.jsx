import { Tabs } from 'expo-router';
import { StyleSheet, View } from 'react-native';
import { COLORS } from '../../src/theme';
import { AnimatedIcon } from '../../src/components/AnimatedIcon';

const icons = { account: ['wallet-outline', 'wallet'], transfers: ['swap-horizontal-outline', 'swap-horizontal'], stats: ['stats-chart-outline', 'stats-chart'], profile: ['person-outline', 'person'] };

export default function TabsLayout() {
  return <Tabs screenOptions={({ route }) => ({ headerShown: false, tabBarActiveTintColor: COLORS.blue, tabBarInactiveTintColor: '#7B8197', tabBarStyle: styles.bar, tabBarItemStyle: styles.item, tabBarLabelStyle: styles.label, tabBarIconStyle: styles.icon, tabBarIcon: ({ focused, color, size }) => <TabIcon focused={focused} color={color} size={size} name={icons[route.name][focused ? 1 : 0]} /> })}>
    <Tabs.Screen name="account" options={{ title: 'Cuenta' }} />
    <Tabs.Screen name="transfers" options={{ title: 'Transferir' }} />
    <Tabs.Screen name="stats" options={{ title: 'Estadísticas' }} />
    <Tabs.Screen name="profile" options={{ title: 'Perfil' }} />
  </Tabs>;
}

function TabIcon({ focused, color, size, name }) { return <View style={[styles.iconBubble, focused && styles.iconBubbleActive]}><AnimatedIcon name={name} color={color} size={size - 1} active={focused} motion={name.includes('swap') ? 'swap' : 'float'} /></View>; }

const styles = StyleSheet.create({
  bar: { position: 'absolute', left: 13, right: 13, bottom: 10, height: 70, paddingTop: 7, borderTopWidth: 0, borderRadius: 23, backgroundColor: 'rgba(255,255,255,.98)', shadowColor: '#5261A5', shadowOpacity: .16, shadowRadius: 16, shadowOffset: { width: 0, height: 6 }, elevation: 9 },
  item: { paddingTop: 0 }, label: { fontFamily: 'Outfit_600SemiBold', fontSize: 9, marginTop: -1 }, icon: { marginTop: 0 }, iconBubble: { width: 34, height: 30, borderRadius: 12, alignItems: 'center', justifyContent: 'center' }, iconBubbleActive: { backgroundColor: '#E4E9FF' },
});
