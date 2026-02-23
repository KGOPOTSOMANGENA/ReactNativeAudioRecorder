import React from 'react';
import { FlatList } from 'react-native';
import { VoiceNote } from '../types/types';
import NoteItem from './NoteItem';

type Props = {
  notes: VoiceNote[];
  onDelete: (id: string) => void;
  onEdit: (id: string, title: string) => void;
};

export default function NoteList({ notes, onDelete, onEdit }: Props) {
  return (
    <FlatList
      data={notes}
      keyExtractor={(item) => item.id}
      renderItem={({ item }) => (
        <NoteItem
          note={item}
          onDelete={onDelete}
          onEdit={onEdit}
        />
      )}
    />
  );
}