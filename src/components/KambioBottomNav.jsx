import { useEffect, useState } from 'react';
import { Pressable, StyleSheet, Text, View } from 'react-native';
import Animated, { useAnimatedStyle, useSharedValue, withSpring } from 'react-native-reanimated';
import Svg, { Path } from 'react-native-svg';
import { KambioIcon } from './KambioIcon';
import { COLORS, FONTS } from '../theme';

const items = [
  { key: 'Resumen', label: 'Inicio', icon: 'wallet-outline' },
  { key: 'Transferir', label: 'Transferir', icon: 'swap-horizontal-outline' },
  { key: 'Estadísticas', label: 'Estadísticas', icon: 'stats-chart-outline' },
  { key: 'Perfil', label: 'Perfil', icon: 'person-outline' },
];

export function KambioBottomNav({ active = 'Resumen', onChange = () => undefined }) {
  const [width, setWidth] = useState(360);
  const activeIndex = Math.max(0, items.findIndex((item) => item.key === active));
  const center = (width / items.length) * (activeIndex + .5);
  const bubbleX = useSharedValue(center - 32);
  const bubbleStyle = useAnimatedStyle(() => ({ transform: [{ translateX: bubbleX.value }] }));

  useEffect(() => {
    bubbleX.value = withSpring(center - 32, { damping: 18, stiffness: 145, mass: .72 });
  }, [bubbleX, center]);

  return <View style={styles.frame} onLayout={(event) => setWidth(event.nativeEvent.layout.width)}>
    <Svg pointerEvents="none" width={width} height={106} style={styles.surface}>
      <Path d={navPath(width, center)} fill="#FFFFFF" stroke="#FFFFFF" strokeWidth={2} />
    </Svg>
    <View style={styles.row}>
      {items.map((item) => <NavItem key={item.key} item={item} active={active === item.key} onPress={() => onChange(item.key)} />)}
    </View>
    <Animated.View pointerEvents="none" style={[styles.activeBubble, bubbleStyle]}>
      <KambioIcon name={items[activeIndex].icon} size={23} color={COLORS.blueDeep} />
    </Animated.View>
  </View>;
}

function navPath(width, center) {
  const notchStart = Math.max(40, center - 43);
  const notchEnd = Math.min(width - 40, center + 43);
  return `M 0 55 Q 0 31 22 31 H ${notchStart} C ${center - 33} 31, ${center - 29} 61, ${center} 61 C ${center + 29} 61, ${center + 33} 31, ${notchEnd} 31 H ${width - 22} Q ${width} 31 ${width} 55 V 82 Q ${width} 104 ${width - 22} 104 H 22 Q 0 104 0 82 Z`;
}

function NavItem({ item, active, onPress }) {
  const pressScale = useSharedValue(1);
  const pressStyle = useAnimatedStyle(() => ({ transform: [{ scale: pressScale.value }] }));

  return <Pressable
    accessibilityRole="tab"
    accessibilityState={{ selected: active }}
    onPress={onPress}
    onPressIn={() => { pressScale.value = withSpring(.91, { damping: 13, stiffness: 260 }); }}
    onPressOut={() => { pressScale.value = withSpring(1, { damping: 13, stiffness: 260 }); }}
    style={styles.item}
  >
    {!active && <Animated.View style={[styles.regularIcon, pressStyle]}>
      <KambioIcon name={item.icon} size={20} color="#76829E" />
    </Animated.View>}
    <Text style={[styles.label, active && styles.labelActive]} numberOfLines={1}>{item.label}</Text>
  </Pressable>;
}

const styles = StyleSheet.create({
  frame: {
    width: '100%', height: 106, marginTop: 4, overflow: 'visible',
    shadowColor: '#8997B6', shadowOpacity: .2, shadowRadius: 16, shadowOffset: { width: 0, height: 8 }, elevation: 8,
  },
  surface: { position: 'absolute', left: 0, top: 0 },
  row: { flexDirection: 'row', height: 106, paddingHorizontal: 8 },
  item: { flex: 1, minWidth: 0, height: 106, alignItems: 'center', position: 'relative' },
  activeBubble: {
    position: 'absolute', top: 0, left: 0, width: 64, height: 64, borderRadius: 32,
    alignItems: 'center', justifyContent: 'center', backgroundColor: '#FFFFFF', borderWidth: 5, borderColor: '#F3F6FD',
    shadowColor: '#6678A6', shadowOpacity: .2, shadowRadius: 8, shadowOffset: { width: 0, height: 4 }, elevation: 5,
  },
  regularIcon: { position: 'absolute', top: 40, width: 34, height: 25, alignItems: 'center', justifyContent: 'center' },
  label: { position: 'absolute', top: 75, color: '#6D7894', fontFamily: FONTS.button, fontSize: 10, lineHeight: 13, textAlign: 'center' },
  labelActive: { color: COLORS.ink, fontFamily: FONTS.heading, fontSize: 10 },
});
