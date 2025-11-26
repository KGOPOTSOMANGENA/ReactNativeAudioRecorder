Features

Record audio using the device microphone

Display a list of saved voice notes with date and duration

Play back recorded voice notes

Delete unwanted notes

Search functionality

Offline support

Optional backup/restore functionality (future enhancement)

Folder Structure
AudioRecorderTS/
│
├─ src/
│  ├─ components/
│  │  ├─ NoteList.tsx
│  │  └─ Recorder.tsx
│  ├─ hooks/
│  │  └─ useAudio.ts
│  ├─ screens/
│  │  └─ HomeScreen.tsx
│  ├─ styles/
│  │  └─ theme.ts
│  ├─ types/
│  │  └─ index.d.ts
│  └─ utils/
│     └─ storage.ts
│
├─ App.tsx
├─ package.json
├─ tsconfig.json
└─ .gitignore

Dependencies

React Native — Mobile app framework

Expo — Development environment for React Native

expo-av — For audio recording and playback

TypeScript — Strong typing

uuid (optional) — For generating unique IDs

Install dependencies:

npm install
# or
yarn install

Installation

Clone the repository:

git clone https://github.com/KGOPOTSOMANGENA/ReactNativeAudioRecorder.git
cd ReactNativeAudioRecorder


Install dependencies:

npm install
# or
yarn install


Start the Expo server:

npx expo start

Running the App

iOS / Android device: Scan the QR code from the Expo dev tools.

Simulator / Emulator: Press i for iOS or a for Android.

Web (optional): Press w to run on the browser (note: audio recording may have limitations).

Usage

Open the app → Home screen displays list of voice notes.

Press Start Recording to record a new note.

Press Stop Recording to finish recording.

New note appears in the list with date, duration, and filename.

Use the Search bar to filter notes by date/time.

Delete unwanted notes using the delete button next to each note.