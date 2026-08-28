import { Tabs } from 'expo-router';
import { StyleSheet, View } from 'react-native';
import { KambioBottomNav } from '../../src/components/KambioBottomNav';

export default function TabsLayout() {
  return <Tabs
    screenOptions={{ headerShown: false, animation: 'fade' }}
    tabBar={(props) => <KambioTabBar {...props} />}
  >
    <Tabs.Screen name="account" options={{ title: 'Inicio' }} />
    <Tabs.Screen name="transfers" options={{ title: 'Transferir' }} />
    <Tabs.Screen name="cards" options={{ title: 'Tarjetas' }} />
    <Tabs.Screen name="profile" options={{ title: 'Perfil' }} />
    <Tabs.Screen name="lab" options={{ title: 'UI Lab' }} />
    <Tabs.Screen name="stats" options={{ href: null }} />
  </Tabs>;
}

function KambioTabBar({ state, navigation }) {
  const active = state.routes[state.index]?.name || 'account';
  return <View style={styles.shell}>
    <KambioBottomNav active={active} onChange={(target) => navigation.navigate(target)} />
  </View>;
}

const styles = StyleSheet.create({
  shell: { paddingHorizontal: 12, paddingBottom: 2, backgroundColor: 'transparent' },
});
