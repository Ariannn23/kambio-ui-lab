import { LinearGradient } from 'expo-linear-gradient';
import { StyleSheet } from 'react-native';

export function AppBackground({ children }) {
  return <LinearGradient
    colors={['#FFFFFF', '#FBFCFF', '#F0F5FF']}
    start={{ x: 0.08, y: 0 }}
    end={{ x: 0.92, y: 1 }}
    style={styles.root}
  >
    {children}
  </LinearGradient>;
}

const styles = StyleSheet.create({ root: { flex: 1 } });
