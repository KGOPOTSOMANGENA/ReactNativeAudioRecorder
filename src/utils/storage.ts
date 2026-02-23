import AsyncStorage from '@react-native-async-storage/async-storage';
import { VoiceNote } from '../types/types';


const KEY = 'VOICE_NOTES_v1';


export async function saveNotes(notes: VoiceNote[]) {
await AsyncStorage.setItem(KEY, JSON.stringify(notes));
}


export async function loadNotes(): Promise<VoiceNote[]> {
const raw = await AsyncStorage.getItem(KEY);
if (!raw) return [];
try {
return JSON.parse(raw) as VoiceNote[];
} catch (err) {
console.warn('Failed to parse notes', err);
return [];
}
}