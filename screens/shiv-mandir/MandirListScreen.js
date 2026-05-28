import { useEffect, useState } from 'react'
import AsyncStorage from '@react-native-async-storage/async-storage'
import shivMandir from '../../assets/shivMandir.jpg'
import { TouchableOpacity,Text ,StyleSheet,FlatList,View,Image, Platform, Dimensions} from 'react-native'


function MandirListScreen({navigation}) {
    const [mandir,setMandir] = useState([])

    const BASE_URL = process.env.EXPO_PUBLIC_API_URL
  useEffect(() => {
    const fetchData = async () => {
      try{
        const res = await fetch(`${BASE_URL}/api/mandir`)
        const data = await res.json()
        // console.log(data)
        setMandir(data)
        await AsyncStorage.setItem('mandirData',JSON.stringify(data))
      }catch(err){
        console.log('Offline mode:',err)
        }
    }
      const loadSavedData = async()=>{
        const saved = await AsyncStorage.getItem('mandirData')
        if(saved){
          console.log('loaded offline')
          setMandir(JSON.parse(saved))
        }
      }
      loadSavedData()
    fetchData()
  }, []);
  return (
    <View style={{flex:1,backgroundColor:'#0a0a23'}}>
    <View style={styles.container}>
          <View style={styles.header}>
            <TouchableOpacity onPress={()=>navigation.goBack()}>
              <Text style={styles.back}>⬅</Text>
            </TouchableOpacity>
            <Text style={styles.headerTitle}>शिव मंदिर</Text>
          </View>

        <Image source={shivMandir} style={styles.img} />

        <FlatList data={mandir} 
        showsVerticalScrollIndicator={false}
            keyExtractor={(item,index) => item._id || index.toString()}
            renderItem={({item})=>(
                <TouchableOpacity style={styles.card}
                    onPress={()=>navigation.navigate('MandirDetail',{mandir:item})}>
                    
                    <Text style={styles.text}>|| {item.name} ||</Text>

                    </TouchableOpacity>
            )}/>
    </View>
    </View>
  )
}

export default MandirListScreen

const isWeb = Platform.OS === 'web'
const {width} = Dimensions.get('window')
const styles = StyleSheet.create({
  container: {
    flex:1,
    maxWidth:isWeb ? 1200 : '100%',
    width:'100%',
    alignSelf:'center',
    backgroundColor: '#0a0a23',
    paddingTop:40,
    paddingHorizontal:15,
    paddingVertical:15,
    paddingBottom:30,
  },

  /* 🔥 HEADER */
  header:{
    flexDirection:'row',
    gap:40,
    marginBottom:40,
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
  img: {
    width:300,
    height:300,
    alignSelf:'center',
    marginBottom:40,
    borderRadius:20
  },

  /* 🔥 CARD */
  card: {
    backgroundColor: '#2a2a4a',
    padding: 40,
    borderRadius: 12,
    marginBottom:15,
    alignItems:'center',
    alignSelf:'center',
    width: '100%'
  },

  text: {
    fontSize:20,
    fontWeight: '500',
    color: '#fff',
  }
})