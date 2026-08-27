import { LinearGradient } from 'expo-linear-gradient';
import { StyleSheet, View } from 'react-native';

// Glass surface built with translucent gradients instead of Android's inconsistent
// software blur. The double highlight and soft blue ambient shadow create depth.
export function GlassCard({ children, style }) {
  const flattened = StyleSheet.flatten(style) || {};
  const { margin, marginTop, marginBottom, marginLeft, marginRight, marginHorizontal, marginVertical, ...contentStyle } = flattened;
  const spacingStyle = { margin, marginTop, marginBottom, marginLeft, marginRight, marginHorizontal, marginVertical };
  return <View style={[styles.shadow, spacingStyle]}>
    <View style={styles.shell}>
      <LinearGradient
        colors={['rgba(228, 235, 255, 0.92)', 'rgba(211, 222, 250, 0.72)', 'rgba(239, 244, 255, 0.88)']}
        start={{ x: 0.04, y: 0 }}
        end={{ x: 0.96, y: 1 }}
        style={[styles.content, contentStyle]}
      >
        <View pointerEvents="none" style={styles.topHighlight} />
        <View pointerEvents="none" style={styles.bottomShade} />
      {children}
      </LinearGradient>
    </View>
  </View>;
}
const styles = StyleSheet.create({
  shadow: {
    borderRadius: 25,
    shadowColor: '#5365A8',
    shadowOpacity: 0.2,
    shadowRadius: 14,
    shadowOffset: { width: 0, height: 8 },
    elevation: 7,
  },
  shell: {
    borderRadius: 25,
    padding: 1.2,
    overflow: 'hidden',
    backgroundColor: 'rgba(255,255,255,0.92)',
    borderWidth: 1,
    borderColor: 'rgba(190, 205, 246, 0.9)',
  },
  content: { borderRadius: 23, overflow: 'hidden' },
  topHighlight: {
    position: 'absolute',
    top: 0,
    left: 12,
    right: 12,
    height: 1,
    backgroundColor: 'rgba(255,255,255,0.96)',
    borderBottomLeftRadius: 12,
    borderBottomRightRadius: 12,
  },
  bottomShade: {
    position: 'absolute',
    left: 10,
    right: 10,
    bottom: 0,
    height: 2,
    backgroundColor: 'rgba(116, 137, 205, 0.18)',
    borderTopLeftRadius: 12,
    borderTopRightRadius: 12,
  },
});
