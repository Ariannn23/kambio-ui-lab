import { StyleSheet, Text, View } from 'react-native';
import { FONTS, COLORS } from '../theme';
export function SectionTitle({ title, action }) { return <View style={styles.row}><Text style={styles.title}>{title}</Text>{action && <Text style={styles.action}>{action}</Text>}</View>; }
const styles = StyleSheet.create({ row: { flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', marginTop: 22, marginBottom: 11 }, title: { fontFamily: FONTS.heading, color: COLORS.ink, fontSize: 17 }, action: { fontFamily: FONTS.button, color: COLORS.blue, fontSize: 11 } });
