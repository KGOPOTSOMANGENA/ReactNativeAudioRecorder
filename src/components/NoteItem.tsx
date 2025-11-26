import React from 'react';
import { View, Text, TouchableOpacity } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import Player from './Player';
import { VoiceNote } from '../types';

type Props = {
  note: VoiceNote;
  onDelete: (id: string) => void;
};

export default function NoteItem({ note, onDelete }: Props) {
  return (
    <View
      style={{
        backgroundColor: '#fff',
        marginVertical: 6,
        padding: 14,
        borderRadius: 12,
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        elevation: 2,
      }}
    >
      <View>
        <Text style={{ fontWeight: 'bold' }}>
          {new Date(note.createdAt).toLocaleString()}
        </Text>
        <Player uri={note.uri} />
      </View>

      <TouchableOpacity onPress={() => onDelete(note.id)}>
        <Ionicons name="trash" size={24} color="#ff4d4d" />
      </TouchableOpacity>
    </View>
  );
}
