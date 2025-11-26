import React, { useEffect, useState } from 'react';
import { View, Text, TextInput } from 'react-native';
import { VoiceNote } from '../types';
import { loadNotes, saveNotes } from '../utils/storage';
import NoteList from '../components/NoteList';
import Recorder from '../components/Recorder';
import { colors, spacing, fontSize, borderRadius } from '../styles/theme';

export default function HomeScreen() {
  const [notes, setNotes] = useState<VoiceNote[]>([]);
  const [query, setQuery] = useState('');

  useEffect(() => {
    loadNotes().then(setNotes);
  }, []);

  function handleCreate(note: VoiceNote) {
    setNotes((prev) => [note, ...prev]);
  }

  function handleDelete(id: string) {
    const filtered = notes.filter((n) => n.id !== id);
    setNotes(filtered);
    saveNotes(filtered);
  }

  const filteredNotes = notes.filter((note) =>
    new Date(note.createdAt)
      .toLocaleString()
      .toLowerCase()
      .includes(query.toLowerCase())
  );

  return (
    <View style={{ flex: 1, padding: spacing.md, backgroundColor: colors.background }}>
      <Text
        style={{
          fontSize: fontSize.xlarge,
          fontWeight: 'bold',
          marginBottom: spacing.sm,
          color: colors.textPrimary,
        }}
      >
        Voice Notes
      </Text>

      <TextInput
        placeholder="Search notes..."
        value={query}
        onChangeText={setQuery}
        style={{
          backgroundColor: colors.surface,
          padding: spacing.md,
          borderRadius: borderRadius.md,
          marginBottom: spacing.md,
          color: colors.textPrimary,
        }}
      />

      <Recorder onCreate={handleCreate} />

      <View style={{ marginTop: spacing.lg }}>
        <NoteList notes={filteredNotes} onDelete={handleDelete} />
      </View>
    </View>
  );
}

