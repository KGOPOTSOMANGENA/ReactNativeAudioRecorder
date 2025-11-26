import React, { useState } from 'react';
import { View, TouchableOpacity } from 'react-native';
import { Audio } from 'expo-av';
import { Ionicons } from '@expo/vector-icons';

type Props = {
  uri: string;
};

export default function Player({ uri }: Props) {
  const [sound, setSound] = useState<Audio.Sound | null>(null);
  const [playing, setPlaying] = useState(false);

  async function play() {
    if (playing) return;

    const { sound: s } = await Audio.Sound.createAsync({ uri });
    setSound(s);

    setPlaying(true);
    await s.playAsync();

    s.setOnPlaybackStatusUpdate((status) => {
      if ('didJustFinish' in status && status.didJustFinish) {
        setPlaying(false);
      }
    });
  }

  async function stop() {
    if (!sound) return;
    await sound.stopAsync();
    setPlaying(false);
  }

  return (
    <View>
      <TouchableOpacity onPress={playing ? stop : play}>
        <Ionicons name={playing ? 'pause' : 'play'} size={28} color="#333" />
      </TouchableOpacity>
    </View>
  );
}
