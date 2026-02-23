import React, { useEffect, useRef } from 'react';
import { View, TouchableOpacity, Text, Animated } from 'react-native';
import useAudio from '../hooks/useAudio';
import { VoiceNote } from '../types/types';
import { colors, spacing, borderRadius } from '../styles/theme';

type Props = {
  onCreate: (note: VoiceNote) => void;
};

export default function Recorder({ onCreate }: Props) {
  const { requestPermissions, startRecording, stopRecording, isRecording } =
    useAudio();

  const scale = useRef(new Animated.Value(1)).current;

  useEffect(() => {
    if (isRecording) {
      Animated.loop(
        Animated.sequence([
          Animated.timing(scale, {
            toValue: 1.2,
            duration: 500,
            useNativeDriver: true,
          }),
          Animated.timing(scale, {
            toValue: 1,
            duration: 500,
            useNativeDriver: true,
          }),
        ])
      ).start();
    } else {
      scale.setValue(1);
    }
  }, [isRecording]);

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
          title: '',
          createdAt: timestamp,
          duration: result.durationMillis || 0,
        };

        onCreate(newNote);
      }
    }
  }

  return (
    <View style={{ alignItems: 'center' }}>
      <Animated.View style={{ transform: [{ scale }] }}>
        <TouchableOpacity
          onPress={handlePress}
          style={{
            backgroundColor: isRecording
              ? colors.error
              : colors.primary,
            padding: spacing.lg,
            borderRadius: 50,
          }}
        >
          <Text style={{ color: 'white', fontWeight: 'bold' }}>
            {isRecording ? 'Stop' : 'Record'}
          </Text>
        </TouchableOpacity>
      </Animated.View>
    </View>
  );
}