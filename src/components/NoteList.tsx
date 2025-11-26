import React from 'react';
import { FlatList } from 'react-native';
import { VoiceNote } from '../types';
import NoteItem from './NoteItem';

type Props = {
  notes: VoiceNote[];
  onDelete: (id: string) => void;
};

export default function NoteList({ notes, onDelete }: Props) {
  return (
    <FlatList
      data={notes}
      keyExtractor={(item) => item.id}
      renderItem={({ item }) => <NoteItem note={item} onDelete={onDelete} />}
    />
  );
}
