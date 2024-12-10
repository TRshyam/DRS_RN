import { StatusBar } from 'expo-status-bar';
import { Text, View } from 'react-native';
import { Link } from 'expo-router'
export default function App() {
  return (
    <View className= 'flex-1 justify-center items-center bg-slate-300' >
      <Text className='text-5xl font-bold ' >Open up doooo.js to start working on your fu app!</Text>
      <StatusBar style="auto" />
      <Link href="/model" className='text-3xl font-bold underline  text-blue-600'> Go t00s00o profile</Link>
    </View>
  );
}

