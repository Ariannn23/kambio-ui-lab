import { Ionicons } from '@expo/vector-icons';

// Kept behind one component so the visual library can be swapped safely.
export function KambioIcon({ name, color, size = 22, active = false }) {
  const activeNames = {
    'wallet-outline': 'wallet',
    'swap-horizontal-outline': 'swap-horizontal',
    'stats-chart-outline': 'stats-chart',
    'person-outline': 'person',
  };
  return <Ionicons name={active ? (activeNames[name] || name) : name} color={color} size={size} />;
}
