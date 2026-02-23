import React, { useEffect, useState } from 'react';
import { View, Text, TextInput } from 'react-native';
import { VoiceNote } from '../types/types';
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
    setNotes((prev) => {
      const updated = [note, ...prev];
      saveNotes(updated);
      return updated;
    });
  }

  function handleDelete(id: string) {
    const filtered = notes.filter((n) => n.id !== id);
    setNotes(filtered);
    saveNotes(filtered);
  }

  function handleEdit(id: string, title: string) {
    const updated = notes.map((n) =>
      n.id === id ? { ...n, title } : n
    );
    setNotes(updated);
    saveNotes(updated);
  }

  const filteredNotes = notes.filter((note) => {
    const q = query.toLowerCase();

    return (
      note.title?.toLowerCase().includes(q) ||
      new Date(note.createdAt)
        .toLocaleString()
        .toLowerCase()
        .includes(q)
    );
  });

  return (
    <View
      style={{
        flex: 1,
        padding: spacing.md,
        backgroundColor: colors.background,
      }}
    >
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
        placeholder="Search by title or date..."
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
        <NoteList
          notes={filteredNotes}
          onDelete={handleDelete}
          onEdit={handleEdit}
        />
      </View>
    </View>
  );
}