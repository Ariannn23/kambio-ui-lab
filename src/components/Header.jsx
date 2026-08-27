import { StyleSheet, Text, View } from 'react-native';
import { FONTS, COLORS } from '../theme';
import { AnimatedIcon } from './AnimatedIcon';

export function Header({ avatar = 'AM' }) { return <View style={styles.header}><View style={styles.menu}><AnimatedIcon name="menu" size={20} color={COLORS.blue} motion="float" /></View><Text style={styles.logo}>KAMBIO</Text><View style={styles.avatar}><Text style={styles.avatarText}>{avatar}</Text></View></View>; }
const styles = StyleSheet.create({ header: { height: 70, paddingHorizontal: 22, alignItems: 'center', justifyContent: 'space-between', flexDirection: 'row' }, menu: { width: 34, height: 34, alignItems: 'center', justifyContent: 'center', backgroundColor: 'rgba(255,255,255,.52)', borderRadius: 12 }, logo: { fontFamily: FONTS.title, color: COLORS.blue, fontSize: 16, letterSpacing: -.7 }, avatar: { width: 34, height: 34, borderRadius: 17, backgroundColor: COLORS.violet, justifyContent: 'center', alignItems: 'center', borderWidth: 2, borderColor: 'white' }, avatarText: { color: 'white', fontFamily: FONTS.button, fontSize: 10 } });
