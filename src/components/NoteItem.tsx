import React from 'react';
import { View, TextInput, TouchableOpacity } from 'react-native';
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
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        elevation: 4,
        shadowColor: '#000',
        shadowOpacity: 0.1,
        shadowRadius: 8,
      }}
    >
      <View style={{ flex: 1, marginRight: spacing.md }}>
        {/* Editable Title */}
        <TextInput
          value={note.title}
          placeholder="Untitled note"
          onChangeText={(text) => onEdit(note.id, text)}
          style={{
            fontWeight: 'bold',
            fontSize: 16,
            color: colors.textPrimary,
            marginBottom: 6,
          }}
        />

        {/* Timestamp */}
        <TextInput
          editable={false}
          value={new Date(note.createdAt).toLocaleString()}
          style={{
            fontSize: 12,
            color: colors.textSecondary,
            marginBottom: 8,
          }}
        />

        {/* Audio Player */}
        <Player uri={note.uri} />
      </View>

      {/* Delete Button */}
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
  );
}