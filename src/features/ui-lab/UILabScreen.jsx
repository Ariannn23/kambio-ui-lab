import { Ionicons } from '@expo/vector-icons';
import { LinearGradient } from 'expo-linear-gradient';
import { useEffect, useState } from 'react';
import { Image, Modal, Pressable, ScrollView, StyleSheet, Switch, Text, TextInput, View } from 'react-native';
import Animated, { useAnimatedStyle, useSharedValue, withRepeat, withSequence, withSpring, withTiming } from 'react-native-reanimated';
import { AppBackground } from '../../components/AppBackground';
import { AnimatedIcon } from '../../components/AnimatedIcon';
import { COLORS, FONTS } from '../../theme';

const palettes = [
  { name: 'Royal blue', hex: '#021DE8', color: '#021DE8' },
  { name: 'Wisteria', hex: '#9499F7', color: '#9499F7' },
  { name: 'Periwinkle', hex: '#C6BAF5', color: '#C6BAF5' },
  { name: 'Majorelle', hex: '#5B40DE', color: '#5B40DE' },
  { name: 'Steel blue', hex: '#86A6C4', color: '#86A6C4' },
];

const cardModes = ['Glass', 'Clay', 'Outline'];
const filters = ['Todos', 'Popular', 'Nuevo'];

export default function UILabScreen() {
  const [accent, setAccent] = useState(palettes[0]);
  const [cardMode, setCardMode] = useState('Glass');
  const [filter, setFilter] = useState('Todos');
  const [search, setSearch] = useState('');
  const [enabled, setEnabled] = useState(true);
  const [selected, setSelected] = useState('Compacto');
  const [pressed, setPressed] = useState(false);
  const [notice, setNotice] = useState('Listo para probar');
  const [progress, setProgress] = useState(64);
  const [slider, setSlider] = useState(42);
  const [pin, setPin] = useState('');
  const [modalVisible, setModalVisible] = useState(false);
  const previewScale = useSharedValue(1);
  const previewOpacity = useSharedValue(1);
  const previewStyle = useAnimatedStyle(() => ({ transform: [{ scale: previewScale.value }], opacity: previewOpacity.value }));

  const replay = () => {
    setNotice('Transición ejecutándose…');
    previewOpacity.value = withSequence(withTiming(0.28, { duration: 130 }), withTiming(1, { duration: 260 }));
    previewScale.value = withSequence(withTiming(0.94, { duration: 120 }), withSpring(1, { damping: 10, stiffness: 170 }));
    setTimeout(() => setNotice('Transición completada ✓'), 420);
  };

  return (
    <AppBackground>
      <ScrollView contentContainerStyle={styles.scroll} showsVerticalScrollIndicator={false}>
        <View style={styles.topbar}>
          <View style={styles.brandBlock}><Image source={require('../../../assets/branding/kambio-app-icon.png')} style={styles.brandIcon} /><View><Text style={styles.brand}>UI LAB</Text><Text style={styles.kicker}>Sistema de interfaz · v0.1</Text></View></View>
          <View style={[styles.status, { borderColor: `${accent.color}40` }]}><View style={[styles.statusDot, { backgroundColor: accent.color }]} /><Text style={styles.statusText}>En vivo</Text></View>
        </View>

        <View style={styles.hero}>
          <Text style={styles.heroTitle}>Explora el lenguaje{`\n`}visual de la app.</Text>
          <Text style={styles.heroCopy}>Ajusta elementos, compara estilos y valida estados reales antes de diseñar pantallas.</Text>
          <Pressable onPress={replay} style={({ pressed: down }) => [styles.replay, { backgroundColor: accent.color, opacity: down ? 0.84 : 1 }]}><Ionicons name="play" size={15} color="white" /><Text style={styles.replayText}>Reproducir transición</Text></Pressable>
          <Text style={styles.motionFeedback}>{notice}</Text>
        </View>

        <LabSection number="01" title="Colorimetría" caption="Color principal y superficies de apoyo.">
          <View style={styles.palette}>{palettes.map((item) => <Pressable key={item.hex} onPress={() => setAccent(item)} style={[styles.swatch, accent.hex === item.hex && styles.swatchSelected]}><View style={[styles.swatchColor, { backgroundColor: item.color }]}>{accent.hex === item.hex && <Ionicons name="checkmark" color="white" size={17} />}</View><Text style={styles.swatchName}>{item.name}</Text><Text style={styles.hex}>{item.hex}</Text></Pressable>)}</View>
          <View style={styles.tokenRow}><Token color="#101A4B" name="Ink" value="#101A4B" /><Token color="#F7F9FF" name="Canvas" value="#F7F9FF" /><Token color={accent.color} name="Accent" value={accent.hex} /></View>
        </LabSection>

        <LabSection number="02" title="Tipografía" caption="Jerarquía, ritmos y familias de texto.">
          <Specimen label="DISPLAY · RUBIK MONO ONE" sample="KAMBIO" family={FONTS.title} size={27} />
          <Specimen label="HEADING · OUTFIT 700" sample="Una jerarquía clara" family={FONTS.heading} size={22} />
          <Specimen label="BODY · MONTSERRAT 400" sample="Textos informativos, datos y descripciones en una interfaz." family={FONTS.body} size={12} />
          <View style={styles.typeScale}>{[['12', 'Caption'], ['14', 'Body'], ['18', 'Title'], ['28', 'Hero']].map(([size, label]) => <View key={label} style={styles.scaleItem}><Text style={styles.scaleSize}>{size}</Text><Text style={styles.scaleLabel}>{label}</Text></View>)}</View>
        </LabSection>

        <LabSection number="03" title="Superficies y contornos" caption="Compara la profundidad antes de elegir una dirección.">
          <Segmented values={cardModes} value={cardMode} onChange={setCardMode} accent={accent.color} />
          <Animated.View style={[previewStyle, styles.cardPreview, cardMode === 'Glass' && styles.glassCard, cardMode === 'Clay' && styles.clayCard, cardMode === 'Outline' && styles.outlineCard]}>
            <View style={[styles.previewIcon, { backgroundColor: cardMode === 'Glass' ? 'rgba(255,255,255,.55)' : `${accent.color}18` }]}><Ionicons name="layers-outline" size={23} color={accent.color} /></View>
            <View style={{ flex: 1 }}><Text style={styles.previewTitle}>{cardMode} surface</Text><Text style={styles.previewCopy}>Borde, elevación y transparencia en un componente.</Text></View>
            <Ionicons name="arrow-forward" size={20} color={COLORS.ink} />
          </Animated.View>
          <View style={styles.borderSamples}><BorderSample label="Hairline" width={1} color="#D5DDF5" /><BorderSample label="Soft" width={2} color={`${accent.color}66`} /><BorderSample label="Focus" width={2} color={accent.color} /></View>
        </LabSection>

        <LabSection number="04" title="Acciones y feedback" caption="Estados de botones, iconos y pulsación.">
          <View style={styles.buttonGrid}>
            <Pressable onPress={() => setPressed(!pressed)} style={({ pressed: down }) => [styles.primaryButton, { backgroundColor: accent.color, transform: [{ scale: down ? 0.97 : 1 }] }]}><AnimatedIcon name="arrow-forward" color="white" size={18} motion="swap" /><Text style={styles.primaryText}>{pressed ? 'Guardado' : 'Continuar'}</Text></Pressable>
            <Pressable style={({ pressed: down }) => [styles.secondaryButton, down && styles.buttonDown]}><Ionicons name="heart-outline" color={accent.color} size={18} /><Text style={[styles.secondaryText, { color: accent.color }]}>Secundario</Text></Pressable>
          </View>
          <Pressable onPress={() => setModalVisible(true)} style={({ pressed: down }) => [styles.modalTrigger, down && styles.buttonDown]}><Ionicons name="layers-outline" color={accent.color} size={18} /><Text style={[styles.modalTriggerText, { color: accent.color }]}>Abrir modal de prueba</Text><Ionicons name="chevron-forward" color={accent.color} size={15} /></Pressable>
          <View style={styles.iconRail}>{[['add-outline', 'float'], ['swap-horizontal-outline', 'swap'], ['notifications-outline', 'float'], ['scan-outline', 'scan']].map(([icon, motion]) => <View key={icon} style={styles.iconTile}><AnimatedIcon onPress={replay} name={icon} size={21} color={accent.color} motion={motion} /><Text style={styles.iconLabel}>tocar</Text></View>)}</View>
        </LabSection>

        <LabSection number="05" title="Campos y selección" caption="Inputs, filtros, chips y controles de preferencia.">
          <View style={[styles.search, { borderColor: search ? accent.color : '#DCE3F5' }]}><Ionicons name="search-outline" size={19} color={search ? accent.color : COLORS.muted} /><TextInput value={search} onChangeText={setSearch} placeholder="Buscar componentes" placeholderTextColor="#9099B3" style={styles.searchInput} /></View>
          <View style={styles.filterRow}>{filters.map((item) => <Pressable key={item} onPress={() => setFilter(item)} style={[styles.chip, filter === item && { backgroundColor: accent.color, borderColor: accent.color }]}><Text style={[styles.chipText, filter === item && styles.chipTextSelected]}>{item}</Text></Pressable>)}</View>
          <View style={styles.controlRow}><View><Text style={styles.controlTitle}>Modo experimental</Text><Text style={styles.controlCopy}>Activa microinteracciones</Text></View><Switch value={enabled} onValueChange={setEnabled} trackColor={{ false: '#CBD2E7', true: `${accent.color}80` }} thumbColor={enabled ? accent.color : '#F9FAFF'} /></View>
          <View style={styles.selectGroup}>{['Compacto', 'Confortable', 'Editorial'].map((option) => <Pressable key={option} onPress={() => setSelected(option)} style={[styles.selectOption, selected === option && { borderColor: accent.color, backgroundColor: `${accent.color}0E` }]}><View style={[styles.radio, selected === option && { borderColor: accent.color }]}>{selected === option && <View style={[styles.radioDot, { backgroundColor: accent.color }]} />}</View><Text style={styles.selectText}>{option}</Text></Pressable>)}</View>
        </LabSection>

        <LabSection number="06" title="Movimiento" caption="Principios para transiciones rápidas y claras.">
          <View style={styles.motionGrid}><MotionItem icon="flash-outline" title="120 ms" copy="Respuesta de toque" /><MotionItem icon="git-compare-outline" title="240 ms" copy="Cambio de estado" /><MotionItem icon="sparkles-outline" title="Spring" copy="Entrada expresiva" /></View>
          <View style={styles.note}><Ionicons name="information-circle-outline" size={18} color={accent.color} /><Text style={styles.noteText}>Cada animación se puede activar tocando un icono o el botón de transición.</Text></View>
        </LabSection>

        <LabSection number="07" title="Carga, espera y filtros" caption="Estados intermedios que debe tener una app real.">
          <View style={styles.stateGrid}><ComponentState icon="hourglass-outline" title="En espera" caption="Sin acción pendiente" /><ComponentState icon="checkmark-circle-outline" title="Éxito" caption="Operación completa" success /><ComponentState icon="lock-closed-outline" title="Desactivado" caption="No disponible" muted /></View>
          <View style={styles.loadingPanel}><View style={styles.loadingTop}><View><Text style={styles.loadingTitle}>Sincronizando datos</Text><Text style={styles.loadingCopy}>{progress}% completado</Text></View><Pressable onPress={() => setProgress(progress >= 100 ? 12 : Math.min(100, progress + 12))}><Text style={[styles.advance, { color: accent.color }]}>Avanzar</Text></Pressable></View><View style={styles.progressTrack}><View style={[styles.progressFill, { width: `${progress}%`, backgroundColor: accent.color }]} /></View></View>
          <Text style={styles.miniLabel}>SKELETON · carga de contenido</Text><View style={styles.skeletonCard}><Skeleton width="38%" height={12} /><Skeleton width="88%" height={10} /><Skeleton width="63%" height={10} /><View style={styles.skeletonBottom}><Skeleton width={34} height={34} round /><Skeleton width="42%" height={10} /></View></View>
          <Text style={styles.miniLabel}>SLIDER · intensidad de filtrado</Text><RangeSlider value={slider} onChange={setSlider} accent={accent.color} />
        </LabSection>

        <LabSection number="08" title="Teclado numérico" caption="Patrón personalizado para PIN, importes o códigos.">
          <View style={styles.keypadShell}><View style={styles.pinRow}>{[0, 1, 2, 3, 4, 5].map((i) => <View key={i} style={[styles.pinDot, i < pin.length && { backgroundColor: accent.color, borderColor: accent.color }]} />)}</View><Text style={styles.pinHint}>{pin ? `${pin.length} dígitos ingresados` : 'Ingresa tu código de prueba'}</Text><NumericKeypad value={pin} onChange={setPin} accent={accent.color} /></View>
        </LabSection>

        <Text style={styles.footer}>KAMBIO UI LAB · Tokens listos para iterar</Text>
      </ScrollView>
      <Modal transparent visible={modalVisible} animationType="fade" onRequestClose={() => setModalVisible(false)}>
        <Pressable style={styles.modalOverlay} onPress={() => setModalVisible(false)}>
          <Pressable style={styles.modalCard} onPress={() => undefined}>
            <View style={[styles.modalIcon, { backgroundColor: `${accent.color}16` }]}><Ionicons name="sparkles-outline" color={accent.color} size={25} /></View>
            <Text style={styles.modalTitle}>Modal interactivo</Text>
            <Text style={styles.modalCopy}>Este patrón sirve para confirmar acciones, mostrar información o pedir una decisión sin cambiar de pantalla.</Text>
            <View style={styles.modalActions}><Pressable onPress={() => setModalVisible(false)} style={styles.modalCancel}><Text style={styles.modalCancelText}>Cancelar</Text></Pressable><Pressable onPress={() => { setModalVisible(false); setNotice('Acción del modal confirmada ✓'); }} style={[styles.modalConfirm, { backgroundColor: accent.color }]}><Text style={styles.modalConfirmText}>Confirmar</Text></Pressable></View>
          </Pressable>
        </Pressable>
      </Modal>
    </AppBackground>
  );
}

function LabSection({ number, title, caption, children }) { return <View style={styles.section}><View style={styles.sectionHead}><Text style={styles.sectionNumber}>{number}</Text><View style={{ flex: 1 }}><Text style={styles.sectionTitle}>{title}</Text><Text style={styles.sectionCaption}>{caption}</Text></View></View>{children}</View>; }
function Token({ color, name, value }) { return <View style={styles.token}><View style={[styles.tokenDot, { backgroundColor: color }]} /><View><Text style={styles.tokenName}>{name}</Text><Text style={styles.tokenValue}>{value}</Text></View></View>; }
function Specimen({ label, sample, family, size }) { return <View style={styles.specimen}><Text style={styles.specimenLabel}>{label}</Text><Text style={[styles.specimenText, { fontFamily: family, fontSize: size }]}>{sample}</Text></View>; }
function Segmented({ values, value, onChange, accent }) { return <View style={styles.segmented}>{values.map((item) => <Pressable key={item} onPress={() => onChange(item)} style={[styles.segment, value === item && { backgroundColor: accent }]}><Text style={[styles.segmentText, value === item && styles.segmentTextActive]}>{item}</Text></Pressable>)}</View>; }
function BorderSample({ label, width, color }) { return <View style={styles.borderSample}><View style={[styles.lineSample, { height: width, backgroundColor: color }]} /><Text style={styles.borderLabel}>{label}</Text></View>; }
function MotionItem({ icon, title, copy }) { return <View style={styles.motionItem}><Ionicons name={icon} size={20} color={COLORS.violet} /><Text style={styles.motionTitle}>{title}</Text><Text style={styles.motionCopy}>{copy}</Text></View>; }
function ComponentState({ icon, title, caption, success, muted }) { return <View style={[styles.componentState, muted && styles.componentMuted]}><Ionicons name={icon} size={20} color={success ? '#07956D' : muted ? '#A8B0C7' : COLORS.violet} /><Text style={styles.stateTitle}>{title}</Text><Text style={styles.stateCaption}>{caption}</Text></View>; }
function Skeleton({ width, height, round = false }) { const shimmer = useSharedValue(-1); useEffect(() => { shimmer.value = withRepeat(withTiming(1, { duration: 1150 }), -1, false); }, [shimmer]); const animated = useAnimatedStyle(() => ({ opacity: 0.38 + shimmer.value * 0.38 })); return <Animated.View style={[styles.skeleton, { width, height, borderRadius: round ? height / 2 : 6 }, animated]} />; }
function RangeSlider({ value, onChange, accent }) { const [width, setWidth] = useState(0); const update = (event) => { if (width) onChange(Math.max(0, Math.min(100, Math.round(event.nativeEvent.locationX / width * 100)))); }; return <View><View onLayout={(event) => setWidth(event.nativeEvent.layout.width)} onStartShouldSetResponder={() => true} onMoveShouldSetResponder={() => true} onResponderGrant={update} onResponderMove={update} onResponderRelease={update} style={styles.rangeTouch}><View pointerEvents="none" style={styles.rangeTrack}><View style={[styles.rangeFill, { width: `${value}%`, backgroundColor: accent }]} /><View style={[styles.rangeThumb, { left: `${value}%`, borderColor: accent }]} /></View></View><View style={styles.rangeLabels}><Text style={styles.rangeLabel}>Suave</Text><Text style={[styles.rangeValue, { color: accent }]}>{value}%</Text><Text style={styles.rangeLabel}>Intenso</Text></View></View>; }
function NumericKeypad({ value, onChange, accent }) { const press = (key) => { if (key === 'backspace-outline') onChange(value.slice(0, -1)); else if (key !== 'scan-circle-outline' && value.length < 6) onChange(`${value}${key}`); }; const keys = ['1', '2', '3', '4', '5', '6', '7', '8', '9', 'scan-circle-outline', '0', 'backspace-outline']; return <View style={styles.keypad}>{keys.map((key) => <Pressable key={key} onPress={() => press(key)} style={({ pressed }) => [styles.key, pressed && { backgroundColor: `${accent}16` }]}>{key === 'scan-circle-outline' || key === 'backspace-outline' ? <Ionicons name={key} color={accent} size={20} /> : <Text style={styles.keyText}>{key}</Text>}</Pressable>)}</View>; }

const styles = StyleSheet.create({
  scroll: { paddingTop: 58, paddingHorizontal: 20, paddingBottom: 48 },
  topbar: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'flex-start' }, brandBlock: { flexDirection: 'row', alignItems: 'center', gap: 10 }, brandIcon: { width: 38, height: 38, borderRadius: 12 }, brand: { color: COLORS.blue, fontFamily: FONTS.title, fontSize: 22 }, kicker: { marginTop: 4, color: COLORS.muted, fontFamily: FONTS.body, fontSize: 9 }, status: { flexDirection: 'row', alignItems: 'center', gap: 5, paddingHorizontal: 9, paddingVertical: 6, borderRadius: 12, borderWidth: 1, backgroundColor: 'rgba(255,255,255,.78)' }, statusDot: { width: 6, height: 6, borderRadius: 3 }, statusText: { color: COLORS.ink, fontFamily: FONTS.button, fontSize: 8 },
  hero: { marginTop: 31, padding: 22, borderRadius: 27, backgroundColor: '#111C52', overflow: 'hidden' }, heroTitle: { color: 'white', fontFamily: FONTS.heading, fontSize: 25, lineHeight: 30 }, heroCopy: { marginTop: 10, color: '#C9D1F5', fontFamily: FONTS.body, fontSize: 10, lineHeight: 16, maxWidth: 265 }, replay: { alignSelf: 'flex-start', flexDirection: 'row', gap: 6, alignItems: 'center', marginTop: 18, paddingHorizontal: 13, paddingVertical: 10, borderRadius: 14 }, replayText: { color: 'white', fontFamily: FONTS.button, fontSize: 9 }, motionFeedback: { marginTop: 10, color: '#B9C4F3', fontFamily: FONTS.button, fontSize: 8 },
  section: { marginTop: 34 }, sectionHead: { flexDirection: 'row', gap: 10, marginBottom: 15 }, sectionNumber: { color: COLORS.violet, fontFamily: FONTS.title, fontSize: 11, paddingTop: 2 }, sectionTitle: { color: COLORS.ink, fontFamily: FONTS.heading, fontSize: 19 }, sectionCaption: { color: COLORS.muted, fontFamily: FONTS.body, fontSize: 9, marginTop: 3 },
  palette: { flexDirection: 'row', justifyContent: 'space-between' }, swatch: { width: '18%', alignItems: 'center' }, swatchSelected: { transform: [{ translateY: -3 }] }, swatchColor: { width: 42, height: 42, borderRadius: 15, alignItems: 'center', justifyContent: 'center', shadowColor: '#5365A8', shadowOpacity: .18, shadowRadius: 7, shadowOffset: { width: 0, height: 4 }, elevation: 3 }, swatchName: { marginTop: 7, color: COLORS.ink, fontFamily: FONTS.button, fontSize: 7, textAlign: 'center' }, hex: { marginTop: 2, color: COLORS.muted, fontFamily: FONTS.body, fontSize: 6 }, tokenRow: { marginTop: 18, flexDirection: 'row', gap: 8 }, token: { flex: 1, flexDirection: 'row', gap: 6, alignItems: 'center', padding: 9, borderRadius: 13, backgroundColor: 'rgba(255,255,255,.76)', borderWidth: 1, borderColor: '#E5EAF8' }, tokenDot: { width: 15, height: 15, borderRadius: 6 }, tokenName: { color: COLORS.ink, fontFamily: FONTS.button, fontSize: 7 }, tokenValue: { marginTop: 1, color: COLORS.muted, fontFamily: FONTS.body, fontSize: 6 },
  specimen: { paddingVertical: 12, borderBottomWidth: 1, borderBottomColor: '#E5EAF6' }, specimenLabel: { color: COLORS.muted, fontFamily: FONTS.button, fontSize: 7, letterSpacing: .7 }, specimenText: { marginTop: 7, color: COLORS.ink }, typeScale: { flexDirection: 'row', marginTop: 16, padding: 12, borderRadius: 17, backgroundColor: '#EDEFFF' }, scaleItem: { flex: 1, alignItems: 'center' }, scaleSize: { color: COLORS.blue, fontFamily: FONTS.heading, fontSize: 17 }, scaleLabel: { marginTop: 3, color: COLORS.muted, fontFamily: FONTS.body, fontSize: 7 },
  segmented: { flexDirection: 'row', padding: 4, borderRadius: 15, backgroundColor: '#E7EBF8' }, segment: { flex: 1, alignItems: 'center', paddingVertical: 8, borderRadius: 11 }, segmentText: { color: COLORS.muted, fontFamily: FONTS.button, fontSize: 9 }, segmentTextActive: { color: 'white' }, cardPreview: { flexDirection: 'row', alignItems: 'center', gap: 11, padding: 17, marginTop: 14, borderRadius: 23 }, glassCard: { backgroundColor: 'rgba(230,237,255,.68)', borderWidth: 1.5, borderColor: 'rgba(255,255,255,.96)', shadowOpacity: 0, elevation: 0 }, clayCard: { backgroundColor: '#EEF2FF', shadowColor: '#A6B4E6', shadowOpacity: .75, shadowRadius: 14, shadowOffset: { width: 8, height: 8 }, elevation: 8 }, outlineCard: { backgroundColor: 'rgba(255,255,255,.76)', borderWidth: 2, borderColor: '#BFCBF4' }, previewIcon: { width: 42, height: 42, borderRadius: 15, alignItems: 'center', justifyContent: 'center' }, previewTitle: { color: COLORS.ink, fontFamily: FONTS.heading, fontSize: 13 }, previewCopy: { color: COLORS.muted, fontFamily: FONTS.body, fontSize: 8, marginTop: 3 }, borderSamples: { flexDirection: 'row', gap: 9, marginTop: 13 }, borderSample: { flex: 1, padding: 9, borderRadius: 12, backgroundColor: 'rgba(255,255,255,.58)' }, lineSample: { borderRadius: 2, width: '100%' }, borderLabel: { marginTop: 6, color: COLORS.muted, fontFamily: FONTS.button, fontSize: 7 },
  buttonGrid: { flexDirection: 'row', gap: 10 }, primaryButton: { flex: 1, height: 48, borderRadius: 17, flexDirection: 'row', alignItems: 'center', justifyContent: 'center', gap: 7, shadowColor: COLORS.blue, shadowOpacity: .25, shadowRadius: 9, shadowOffset: { width: 0, height: 5 }, elevation: 5 }, primaryText: { color: 'white', fontFamily: FONTS.button, fontSize: 10 }, secondaryButton: { flex: 1, height: 48, borderRadius: 17, flexDirection: 'row', alignItems: 'center', justifyContent: 'center', gap: 7, borderWidth: 1.5, borderColor: '#C8D2F5', backgroundColor: 'rgba(255,255,255,.72)' }, buttonDown: { opacity: .75, transform: [{ scale: .97 }] }, secondaryText: { fontFamily: FONTS.button, fontSize: 10 }, modalTrigger: { marginTop: 10, height: 45, paddingHorizontal: 14, borderRadius: 16, flexDirection: 'row', alignItems: 'center', gap: 8, borderWidth: 1, borderColor: '#D9E2F7', backgroundColor: 'rgba(255,255,255,.64)' }, modalTriggerText: { flex: 1, fontFamily: FONTS.button, fontSize: 9 }, iconRail: { flexDirection: 'row', justifyContent: 'space-between', marginTop: 14 }, iconTile: { width: '22%', paddingVertical: 13, alignItems: 'center', gap: 6, borderRadius: 16, backgroundColor: '#F0F3FF' }, iconLabel: { color: COLORS.muted, fontFamily: FONTS.button, fontSize: 7 },
  search: { height: 50, borderRadius: 16, paddingHorizontal: 14, flexDirection: 'row', alignItems: 'center', gap: 9, borderWidth: 1.5, backgroundColor: 'rgba(255,255,255,.78)' }, searchInput: { flex: 1, color: COLORS.ink, fontFamily: FONTS.body, fontSize: 11, height: '100%' }, filterRow: { flexDirection: 'row', gap: 8, marginTop: 11 }, chip: { paddingHorizontal: 14, paddingVertical: 8, borderRadius: 14, backgroundColor: 'rgba(255,255,255,.72)', borderWidth: 1, borderColor: '#DEE5F6' }, chipText: { color: COLORS.muted, fontFamily: FONTS.button, fontSize: 8 }, chipTextSelected: { color: 'white' }, controlRow: { marginTop: 14, padding: 14, borderRadius: 18, backgroundColor: '#EEF2FF', flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' }, controlTitle: { color: COLORS.ink, fontFamily: FONTS.button, fontSize: 10 }, controlCopy: { marginTop: 3, color: COLORS.muted, fontFamily: FONTS.body, fontSize: 8 }, selectGroup: { marginTop: 12, gap: 8 }, selectOption: { paddingHorizontal: 13, paddingVertical: 11, flexDirection: 'row', alignItems: 'center', gap: 9, borderWidth: 1, borderColor: '#DFE5F6', borderRadius: 14, backgroundColor: 'rgba(255,255,255,.6)' }, radio: { width: 16, height: 16, borderRadius: 8, borderWidth: 1.5, borderColor: '#ABB5D3', alignItems: 'center', justifyContent: 'center' }, radioDot: { width: 8, height: 8, borderRadius: 4 }, selectText: { color: COLORS.ink, fontFamily: FONTS.bodyMedium, fontSize: 9 },
  motionGrid: { flexDirection: 'row', gap: 8 }, motionItem: { flex: 1, minHeight: 105, padding: 12, borderRadius: 19, backgroundColor: '#F0F3FF' }, motionTitle: { marginTop: 11, color: COLORS.ink, fontFamily: FONTS.heading, fontSize: 13 }, motionCopy: { marginTop: 3, color: COLORS.muted, fontFamily: FONTS.body, fontSize: 7, lineHeight: 10 }, note: { marginTop: 11, flexDirection: 'row', gap: 8, padding: 12, borderRadius: 15, backgroundColor: 'rgba(198,186,245,.3)' }, noteText: { flex: 1, color: COLORS.ink, fontFamily: FONTS.body, fontSize: 8, lineHeight: 12 },
  stateGrid: { flexDirection: 'row', gap: 8 }, componentState: { flex: 1, padding: 11, minHeight: 91, borderRadius: 17, backgroundColor: '#F2F5FF', borderWidth: 1, borderColor: '#E1E7F7' }, componentMuted: { opacity: .58 }, stateTitle: { marginTop: 9, color: COLORS.ink, fontFamily: FONTS.button, fontSize: 9 }, stateCaption: { marginTop: 3, color: COLORS.muted, fontFamily: FONTS.body, fontSize: 7, lineHeight: 9 }, loadingPanel: { marginTop: 12, padding: 14, borderRadius: 18, backgroundColor: 'rgba(255,255,255,.8)', borderWidth: 1, borderColor: '#E0E6F6' }, loadingTop: { flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between' }, loadingTitle: { color: COLORS.ink, fontFamily: FONTS.button, fontSize: 10 }, loadingCopy: { color: COLORS.muted, fontFamily: FONTS.body, fontSize: 8, marginTop: 3 }, advance: { fontFamily: FONTS.button, fontSize: 9 }, progressTrack: { marginTop: 13, height: 8, borderRadius: 8, overflow: 'hidden', backgroundColor: '#E4E9F6' }, progressFill: { height: '100%', borderRadius: 8 }, miniLabel: { marginTop: 17, marginBottom: 8, color: COLORS.muted, fontFamily: FONTS.button, fontSize: 7, letterSpacing: .7 }, skeletonCard: { padding: 14, borderRadius: 18, gap: 9, backgroundColor: '#F2F5FF' }, skeleton: { backgroundColor: '#C7D2EE' }, skeletonBottom: { flexDirection: 'row', gap: 9, alignItems: 'center', marginTop: 3 }, rangeTouch: { height: 44, justifyContent: 'center' }, rangeTrack: { height: 8, borderRadius: 8, backgroundColor: '#E0E6F5', justifyContent: 'center' }, rangeFill: { height: '100%', borderRadius: 8 }, rangeThumb: { position: 'absolute', width: 22, height: 22, borderRadius: 11, backgroundColor: 'white', borderWidth: 3, marginLeft: -11 }, rangeLabels: { flexDirection: 'row', justifyContent: 'space-between', marginTop: 2 }, rangeLabel: { color: COLORS.muted, fontFamily: FONTS.body, fontSize: 7 }, rangeValue: { fontFamily: FONTS.button, fontSize: 8 }, keypadShell: { padding: 17, borderRadius: 22, backgroundColor: '#F1F4FF', borderWidth: 1, borderColor: '#DEE5F7' }, pinRow: { flexDirection: 'row', justifyContent: 'center', gap: 10 }, pinDot: { width: 10, height: 10, borderRadius: 5, borderWidth: 1.5, borderColor: '#AEB9D9', backgroundColor: 'transparent' }, pinHint: { marginTop: 9, textAlign: 'center', color: COLORS.muted, fontFamily: FONTS.body, fontSize: 8 }, keypad: { marginTop: 17, flexDirection: 'row', flexWrap: 'wrap', justifyContent: 'center', gap: 9 }, key: { width: '28%', height: 42, alignItems: 'center', justifyContent: 'center', borderRadius: 14, backgroundColor: 'rgba(255,255,255,.86)', borderWidth: 1, borderColor: '#E0E6F5' }, keyText: { color: COLORS.ink, fontFamily: FONTS.heading, fontSize: 15 }, modalOverlay: { flex: 1, padding: 24, justifyContent: 'center', backgroundColor: 'rgba(10, 18, 55, .42)' }, modalCard: { borderRadius: 26, padding: 23, backgroundColor: '#F9FBFF', borderWidth: 1, borderColor: 'rgba(255,255,255,.95)' }, modalIcon: { width: 48, height: 48, borderRadius: 17, alignItems: 'center', justifyContent: 'center' }, modalTitle: { marginTop: 17, color: COLORS.ink, fontFamily: FONTS.heading, fontSize: 20 }, modalCopy: { marginTop: 8, color: COLORS.muted, fontFamily: FONTS.body, fontSize: 10, lineHeight: 16 }, modalActions: { flexDirection: 'row', justifyContent: 'flex-end', gap: 9, marginTop: 21 }, modalCancel: { paddingHorizontal: 14, paddingVertical: 11, borderRadius: 14 }, modalCancelText: { color: COLORS.muted, fontFamily: FONTS.button, fontSize: 9 }, modalConfirm: { paddingHorizontal: 15, paddingVertical: 11, borderRadius: 14 }, modalConfirmText: { color: 'white', fontFamily: FONTS.button, fontSize: 9 }, footer: { marginTop: 35, color: COLORS.muted, fontFamily: FONTS.button, textAlign: 'center', fontSize: 8 },
});
