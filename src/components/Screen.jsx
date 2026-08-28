import { SafeAreaView } from 'react-native-safe-area-context';
import { ScrollView, StyleSheet } from 'react-native';
import { AppBackground } from './AppBackground';
import { Header } from './Header';
export function Screen({ children, scroll = true }) { const content = <>{scroll ? <ScrollView contentContainerStyle={styles.scroll} showsVerticalScrollIndicator={false}>{children}</ScrollView> : children}</>; return <AppBackground><SafeAreaView style={styles.safe}><Header />{content}</SafeAreaView></AppBackground>; }
const styles = StyleSheet.create({ safe: { flex: 1 }, scroll: { paddingHorizontal: 20, paddingBottom: 138 } });
