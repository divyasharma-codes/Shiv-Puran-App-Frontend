import React,{useState} from 'react'
import * as Speech from 'expo-speech'
import { ScrollView, TouchableOpacity, View,StyleSheet,Text, Dimensions, Platform } from 'react-native'

function KathaDetailScreen({route,navigation}) {
  const {katha} = route.params
   const [isSpeaking,setIsSpeaking] = useState(false)
  
      const handleSpeech = () => {
        if(isSpeaking){
          Speech.stop()
          setIsSpeaking(false)
        }else{
          Speech.speak(katha.description,{
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
                     
                             <Text style={styles.headerTitle}>शिव कथा</Text>
                             <TouchableOpacity onPress={handleSpeech} style={styles.soundBtn}>
                                     <Text style={styles.sound}>{isSpeaking ? '🔇' : '🔊'}</Text>
                                           </TouchableOpacity>
                           </View>
   
      
           <Text style={styles.title}>नाम : {katha.title}</Text>
           <Text style={styles.content}>कहानी : {katha.content}</Text>
       </ScrollView>
       </View>
  )
}

export default KathaDetailScreen

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

  headerTitle: {
    fontSize: 20,
    color: '#fff',
    fontWeight: 'bold',
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
  title: {
    color: '#fff',
    fontSize: 22,
    marginBottom: 20,
    alignItems:'center'
  },
  content: {
    color: '#ccc',
    fontSize: 16,
    lineHeight: 24,
  },
});
