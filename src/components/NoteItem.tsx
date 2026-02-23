import React from 'react';
import { View, Text, TextInput, TouchableOpacity } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import Player from './Player';
import { VoiceNote } from '../types/types';
import { colors, spacing, borderRadius } from '../styles/theme';

type Props = {
  note: VoiceNote;
  onDelete: (id: string) => void;
  onEdit: (id: string, title: string) => void;
};

export default function NoteItem({ note, onDelete, onEdit }: Props) {
  return (
    <View
      style={{
        backgroundColor: colors.surface,
        marginVertical: spacing.sm,
        padding: spacing.md,
        borderRadius: borderRadius.lg,
        elevation: 4,
        shadowColor: '#000000b2',
        shadowOpacity: 0.1,
        shadowRadius: 10,
      }}
    >
      <TextInput
        value={note.title}
        placeholder="Untitled note"
        onChangeText={(text) => onEdit(note.id, text)}
        style={{
          fontWeight: 'bold',
          fontSize: 16,
          color: colors.textPrimary,
          marginBottom: 4,
        }}
      />

      <Text
        style={{
          fontSize: 12,
          color: colors.textSecondary,
          marginBottom: spacing.sm,
        }}
      >
        {new Date(note.createdAt).toLocaleString()}
      </Text>

      <View
        style={{
          flexDirection: 'row',
          justifyContent: 'space-between',
          alignItems: 'center',
        }}
      >
        <Player uri={note.uri} />

        <TouchableOpacity
          onPress={() => onDelete(note.id)}
          style={{
            backgroundColor: '#dcfce7',
            padding: 10,
            borderRadius: 50,
          }}
        >
          <Ionicons name="trash" size={20} color={colors.error} />
        </TouchableOpacity>
      </View>
    </View>
  );
}