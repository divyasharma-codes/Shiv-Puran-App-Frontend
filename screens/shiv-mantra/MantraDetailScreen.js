import React,{useState} from 'react'
import * as Speech from 'expo-speech'
import { ScrollView, TouchableOpacity ,StyleSheet,Text,View, Dimensions, Platform} from 'react-native'

function MantraDetailScreen({route,navigation}) {
  const {mantra} = route.params
  const [isSpeaking,setIsSpeaking] = useState(false)
  
      const handleSpeech = () => {
        if(isSpeaking){
          Speech.stop()
          setIsSpeaking(false)
        }else{
          Speech.speak(mantra.meaning,{
            language:'hi-IN',rate:0.8,pitch:1,
            onDone:()=>setIsSpeaking(false)
          });
        setIsSpeaking(true)
      }}
  return (
   <View style={{flex:1 ,backgroundColor:'#0a0a23'}} >
       <ScrollView style={styles.container} contentContainerStyle={{paddingBottom:100, alignItems:'center'}}
        showsVerticalScrollIndicator={false}>
        <View style={styles.header}>
            <TouchableOpacity onPress={()=>navigation.goBack()}>
                <Text style={styles.back}>⬅</Text>
            </TouchableOpacity>
            <Text style={styles.headerTitle}>शिव मंत्र</Text>
            <TouchableOpacity onPress={handleSpeech} style={styles.soundBtn}>
                        <Text style={styles.sound}>{isSpeaking ? '🔇' : '🔊'}</Text>
                      </TouchableOpacity>
        </View>
        <Text style={styles.title}>नाम : {mantra.title}</Text>
        <Text style={styles.mantra}>मंत्र : {mantra.mantra}</Text>
                <Text style={styles.meaning}>अर्थ : {mantra.meaning}</Text>
                <Text style={styles.benefits}>लाभ : {mantra.benefits}</Text>
    </ScrollView>
    </View>
  )
}

export default MantraDetailScreen

const {width} = Dimensions.get('window')
const isWeb = Platform.OS === 'web'
const styles =  StyleSheet.create({
  container: {
    flex: 1,
    maxWidth:isWeb ? 900 : '100%',
    width:'100%',
    alignSelf:'center',
    backgroundColor: '#0a0a23',
    paddingTop: 40,
    paddingHorizontal:isWeb ? 40 :15,
    paddingBottom:40,
  },
  header:{
    flexDirection:'row',
    maxWidth:isWeb ? 800 : '100%',
    width:'100%',
    marginBottom:40,
    justifyContent:'space-between',
    alignItems:'center',
  },
  back: {
    fontSize: 22,
    color: '#fff',
  },
  soundBtn:{
    padding:12,
    backgroundColor:'2a2a4a',
    borderRadius:10,
    zIndex:10,
  },
  sound: {
    fontSize:24,
    color:'#fff',
  },
  headerTitle: {
    fontSize:20,
    color: '#fff',
    fontWeight: 'bold',
  },
  title: {
    color:'#fff',
    fontSize:20,
    marginBottom:22,
    alignItems:'center'
  },
  mantra: {
    color: '#fff',
    fontSize:18,
    marginBottom: 20,
    alignItems:'center'
  },
  meaning: {
    color: '#fff',
    fontSize:16,
    marginBottom:15
  },
  benefits: {
    color: '#fff',
    fontSize:16,
    marginBottom:15
  },

});
