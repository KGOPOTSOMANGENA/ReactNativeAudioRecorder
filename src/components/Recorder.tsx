import React from 'react';
import { View, TouchableOpacity, Text } from 'react-native';
import useAudio from '../hooks/useAudio';
import { VoiceNote } from '../types';
import { saveNotes } from '../utils/storage';
import { colors, spacing, borderRadius } from '../styles/theme';

type Props = {
  onCreate: (note: VoiceNote) => void;
};

export default function Recorder({ onCreate }: Props) {
  const { requestPermissions, startRecording, stopRecording, isRecording } = useAudio();

  async function handlePress() {
    const granted = await requestPermissions();
    if (!granted) return;

    if (!isRecording) {
      await startRecording();
    } else {
      const result = await stopRecording();
      if (result?.uri) {
        const timestamp = Date.now();
        const newNote: VoiceNote = {
          id: timestamp.toString(),
          uri: result.uri,
          filename: `note-${timestamp}.m4a`,
          duration: result.durationMillis || 0,
          createdAt: timestamp,
        };

        onCreate(newNote);
        saveNotes([newNote]);
      }
    }
  }

  return (
    <View>
      <TouchableOpacity
        onPress={handlePress}
        style={{
          backgroundColor: isRecording ? colors.error : colors.primary,
          padding: spacing.md,
          borderRadius: borderRadius.md,
          alignItems: 'center',
        }}
      >
        <Text style={{ color: 'white', fontWeight: 'bold' }}>
          {isRecording ? 'Stop Recording' : 'Start Recording'}
        </Text>
      </TouchableOpacity>
    </View>
  );
}


