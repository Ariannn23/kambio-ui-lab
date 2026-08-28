import { StyleSheet, View } from 'react-native';

/**
 * Kambio's opaque clay surface. The old exported name remains as an alias so
 * existing feature modules can migrate without breaking while all rendering
 * now follows the clay-only design system.
 */
export function ClayCard({ children, style }) {
  const flattened = StyleSheet.flatten(style) || {};
  const { margin, marginTop, marginBottom, marginLeft, marginRight, marginHorizontal, marginVertical, ...contentStyle } = flattened;
  const spacingStyle = { margin, marginTop, marginBottom, marginLeft, marginRight, marginHorizontal, marginVertical };
  return <View style={[styles.shadow, spacingStyle]}>
    <View style={[styles.content, contentStyle]}>{children}</View>
  </View>;
}

export const GlassCard = ClayCard;
const styles = StyleSheet.create({
  shadow: {
    borderRadius: 25,
    shadowColor: '#5365A8',
    shadowOpacity: 0.22,
    shadowRadius: 13,
    shadowOffset: { width: 7, height: 8 },
    elevation: 7,
  },
  content: { borderRadius: 25, overflow: 'hidden', backgroundColor: '#EEF3FF', borderWidth: 1.5, borderColor: '#FFFFFF' },
});
