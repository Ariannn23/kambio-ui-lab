import { Pressable } from 'react-native';
import { useEffect } from 'react';
import Animated, { useAnimatedStyle, useSharedValue, withDelay, withRepeat, withSequence, withSpring, withTiming } from 'react-native-reanimated';
import { KambioIcon } from './KambioIcon';

/** A small, native-motion treatment for the banking action icons. */
export function AnimatedIcon({ name, color, size = 22, active = false, motion = 'float', onPress }) {
  const lift = useSharedValue(0);
  const press = useSharedValue(1);

  useEffect(() => {
    const distance = active ? 1 : .42;
    lift.value = withRepeat(withSequence(
      withTiming(distance, { duration: active ? 760 : 1400 }),
      withDelay(active ? 160 : 740, withTiming(0, { duration: active ? 620 : 1250 })),
    ), -1, true);
  }, [active, lift]);

  const animatedStyle = useAnimatedStyle(() => {
    const turn = motion === 'swap' ? lift.value * 10 : motion === 'scan' ? lift.value * -4 : 0;
    return { transform: [{ translateY: -lift.value * 2.4 }, { rotate: `${turn}deg` }, { scale: press.value * (1 + lift.value * .045) }] };
  });

  const icon = <Animated.View style={animatedStyle}><KambioIcon name={name} color={color} size={size} active={active} /></Animated.View>;
  if (!onPress) return icon;
  return <Pressable onPress={onPress} onPressIn={() => { press.value = withSpring(.82); }} onPressOut={() => { press.value = withSpring(1); }}>{icon}</Pressable>;
}
