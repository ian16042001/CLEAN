import React, {useEffect, useState} from 'react';
import {
  Dimensions,
  FlatList,
  SafeAreaView,
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
  Image,
  Animated,
  ImageBackground
} from 'react-native';

import { MaterialIcons } from '@expo/vector-icons';
import { LinearGradient } from 'expo-linear-gradient';
import COLORS from '../constants/colors';
// import villes from '../constants/villes';
import hotels from '../constants/hotels';
import villes from '../constants/villes';
const {width} = Dimensions.get('screen');
const cardWidth = width / 1.8;
import { firebase } from '../firebase';
const { 
  MOMO,
  OM,
  profilPic,
  ww
  } = images;

import { images, icons, FONTS, SIZES } from '../constants';


const HomeScreen = ({navigation}) => {
  // const categories = ['All', 'Popular', 'Top Rated', 'Featured', 'Luxury'];
  const categories = ['Toutes les villes', 'Centre', 'Littoral', 'Nord'];
  const [selectedCategoryIndex, setSelectedCategoryIndex] = React.useState(0);
  const [activeCardIndex, setActiveCardIndex] = React.useState(0);
  const scrollX = React.useRef(new Animated.Value(0)).current;

  // console.log(categories[1]);
  // console.log(selectedCategoryIndex);

  const CategoryList = ({navigation}) => {
    return (
      <View style={style.categoryListContainer}>
        {categories.map((item, index) => (
          <TouchableOpacity
            key={index}
            activeOpacity={0.8}
            onPress={() => setSelectedCategoryIndex(index)}>
            <View>
              <Text
                style={{
                  ...style.categoryListText,
                  color:
                    selectedCategoryIndex == index
                      ? COLORS.primary
                      : COLORS.grey,
                }}>
                {item}
              </Text>
              {selectedCategoryIndex == index && (
                <View
                  style={{
                    height: 3,
                    width: 30,
                    backgroundColor: COLORS.primary,
                    marginTop: 2,
                  }}
                />
              )}
            </View>
          </TouchableOpacity>
        ))}
      </View>
    );
  };
  const Card = ({ville, index}) => {
    const inputRange = [
      (index - 1) * cardWidth,
      index * cardWidth,
      (index + 1) * cardWidth,
    ];
    const opacity = scrollX.interpolate({
      inputRange,
      outputRange: [0.7, 0, 0.7],
    });
    const scale = scrollX.interpolate({
      inputRange,
      outputRange: [0.8, 1, 0.8],
    });
    return (
      <TouchableOpacity
        disabled={activeCardIndex != index}
        activeOpacity={1}
        onPress={() => navigation.navigate('DetailsScreen', ville)}>
        <Animated.View style={{...style.card, ...style.shadow, transform: [{scale}]}}>
          <Animated.View style={{...style.cardOverLay, opacity}} />
          {/* <View style={style.priceTag}>
            <Text
              style={{color: COLORS.white, fontSize: 20, fontWeight: 'bold'}}>
              ${ville.price}
            </Text>
          </View> */}
          <Image source={ville.image} style={style.cardImage} />
          <View style={style.cardDetails}>
            <View
              style={{flexDirection: 'row', justifyContent: 'space-between'}}>
              <View>
                <Text style={{fontWeight: 'bold', fontSize: 17}}>
                  {ville.name}
                </Text>
                <Text style={{color: COLORS.grey, fontSize: 12}}>
                  {ville.location}
                </Text>
              </View>
              <MaterialIcons name="bookmark-border" size={26} color={COLORS.primary} />
            </View>
            <View
              style={{
                flexDirection: 'row',
                justifyContent: 'space-between',
                marginTop: 10,
              }}>
              <View style={{flexDirection: 'row'}}>
                <MaterialIcons name="star" size={15} color={COLORS.orange} />
                <MaterialIcons name="star" size={15} color={COLORS.orange} />
                <MaterialIcons name="star" size={15} color={COLORS.orange} />
                <MaterialIcons name="star" size={15} color={COLORS.orange} />
                <MaterialIcons name="star" size={15} color={COLORS.grey} />
              </View>
              <Text style={{fontSize: 10, color: COLORS.grey}}>365 Visites</Text>
            </View>
          </View>
        </Animated.View>
      </TouchableOpacity>
    );
  };
  const TopVilleCard = ({ville}) => {
    return (
      <View style={style.topVilleCard}>
        <View
          style={{
            position: 'absolute',
            top: 5,
            right: 5,
            zIndex: 1,
            flexDirection: 'row',
          }}>
          <MaterialIcons name="star" size={15} color={COLORS.orange} />
          <Text style={{color: COLORS.white, fontWeight: 'bold', fontSize: 15}}>
            5.0
          </Text>
        </View>
        <Image style={style.topVilleCardImage} source={ville.image} />
        <View style={{paddingVertical: 5, paddingHorizontal: 10}}>
          <Text style={{fontSize: 10, fontWeight: 'bold'}}>{ville.name}</Text>
          <Text style={{fontSize: 7, fontWeight: 'bold', color: COLORS.grey}}>
            {ville.location}
          </Text>
        </View>
      </View>
    );
  };


  const OptionItem = ({ bgColor, icon, label, onPress }) => {
    return (
        <TouchableOpacity
            style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}
            onPress={onPress}
        >
            <View style={[styles.shadow, { width: 60, height: 60 }]}>
                <LinearGradient
                    style={[{ flex: 1, alignItems: 'center', justifyContent: 'center', borderRadius: 15, backgroundColor: 'red' }]}
                    colors={bgColor}
                    start={{ x: 0, y: 0 }}
                    end={{ x: 0, y: 1 }}
                >
                    <Image
                        source={icon}
                        resizeMode="cover"
                        style={{
                            tintColor: COLORS.white,
                            width: 30,
                            height: 30,
                        }}
                    />
                </LinearGradient>
            </View>
            <Text style={{ marginTop: SIZES.base, color: COLORS.gray, ...FONTS.body3 }}>{label}</Text>
        </TouchableOpacity>
    )
}

const [logged, setLogged] = useState(false)
const [info, setInfo] = useState([]);

useEffect(() => {
  const unsubscribe = firebase.auth().onAuthStateChanged(user => {
    if (user) {
      setLogged(true)

const {currentUser} = firebase.auth();

      firebase.firestore()
    .collection('Users').doc(currentUser.uid).onSnapshot(snapshot=>
        { 
            setInfo({
             id: snapshot.data().info.id,
             Nom: snapshot.data().info.Nom,
             Email: snapshot.data().info.Email,
             Numero: snapshot.data().info.Numero,
             status: snapshot.data().info.status,
         });
         }
     )
    }
  })
  return unsubscribe;
}, [])


// if (logged) {
// // const {currentUser} = firebase.auth();
//   useEffect(() => {
//     const unsubscribe = 
//      return () => unsubscribe();
//   }, [])
// }


  return (
    <SafeAreaView style={{flex: 1, backgroundColor: COLORS.white}}>
      {
        !logged ?

        <View style={style.header}>
        <View style={{paddingBottom: 15}}>
          <Text style={{fontSize: 30, fontWeight: 'bold'}}>
            Aide au ramassage
          </Text>
          <View style={{flexDirection: 'row'}}>
            <Text style={{fontSize: 30, fontWeight: 'bold'}}>d'</Text>
            <Text
              style={{fontSize: 30, fontWeight: 'bold', color: COLORS.primary}}>
              ordure
            </Text>
          </View>
        </View>
        <MaterialIcons name="person-outline" size={38} color={COLORS.grey} />
      </View>

        :

        <View
        style={{
          flexDirection: 'row',
          justifyContent: 'space-between',
          alignItems: 'center',
          marginBottom: 10,
          // backgroundColor: 'white'
          padding: 10,
          // marginTop: 25
        }}>
          <View>
              <Text style={{fontSize: 20, color: 'black', fontWeight: 'bold'}}>
              Hello {info.Nom}.
              </Text>
              <View style={{paddingBottom: 15}}>
          <Text style={{fontSize: 25, fontWeight: 'bold', color: 'gray'}}>
            Aide au ramassage
          </Text>
          <View style={{flexDirection: 'row'}}>
            <Text style={{fontSize: 30, fontWeight: 'bold', color: 'gray'}}>d'</Text>
            <Text
              style={{fontSize: 30, fontWeight: 'bold', color: COLORS.primary}}>
              ordure
            </Text>
          </View>
        </View>
          </View>
        <TouchableOpacity onPress={() => navigation.goBack()}>
          <ImageBackground
            source={profilPic}
            style={{width: 55, height: 55, overflow: 'hidden', borderRadius: 25}}
            // imageStyle={{borderRadius: 25}}
          >
          </ImageBackground>
        </TouchableOpacity>
      </View>
        
      }


      <ScrollView showsVerticalScrollIndicator={false}>

        <View style={style.searchInputContainer}>
          <MaterialIcons name="search" size={30} style={{marginLeft: 20}} />
          <TextInput
            placeholder="Au etes vous situé ?"
            style={{fontSize: 20, paddingLeft: 10}}
          />
        </View>
        <CategoryList />
        <View>
          <Animated.FlatList
            onMomentumScrollEnd={(e) => {
              setActiveCardIndex(
                Math.round(e.nativeEvent.contentOffset.x / cardWidth),
              );
            }}
            onScroll={Animated.event(
              [{nativeEvent: {contentOffset: {x: scrollX}}}],
              {useNativeDriver: true},
            )}
            horizontal
            data={villes}
            contentContainerStyle={{
              paddingVertical: 30,
              paddingLeft: 20,
              paddingRight: cardWidth / 2 - 40,
            }}
            showsHorizontalScrollIndicator={false}
            renderItem={({item, index}) => <Card ville={item} index={index} />}
            snapToInterval={cardWidth}
          />
        </View>


      </ScrollView>
    </SafeAreaView>
  );
};

const style = StyleSheet.create({
  header: {
    marginTop: 20,
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingHorizontal: 20,
  },
  searchInputContainer: {
    height: 50,
    backgroundColor: COLORS.light,
    marginTop: 15,
    marginLeft: 20,
    borderTopLeftRadius: 30,
    borderBottomLeftRadius: 30,
    flexDirection: 'row',
    alignItems: 'center',
  },
  categoryListContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginHorizontal: 20,
    marginTop: 30,
  },
  categoryListText: {
    fontSize: 17,
    fontWeight: 'bold',
  },
  card: {
    height: 280,
    width: cardWidth,
    elevation: 15,
    marginRight: 20,
    borderRadius: 15,
    backgroundColor: COLORS.white,
  },
  shadow: {
    shadowColor: '#000',
    shadowOffset: { width: 5, height: 15 },
    shadowOpacity: 0.2,
    shadowRadius: 2,
    elevation: 20,
  },
  cardImage: {
    height: 200,
    width: '100%',
    borderTopLeftRadius: 15,
    borderTopRightRadius: 15,
  },
  priceTag: {
    height: 60,
    width: 80,
    backgroundColor: COLORS.primary,
    position: 'absolute',
    zIndex: 1,
    right: 0,
    borderTopRightRadius: 15,
    borderBottomLeftRadius: 15,
    justifyContent: 'center',
    alignItems: 'center',
  },
  cardDetails: {
    height: 100,
    borderRadius: 15,
    backgroundColor: COLORS.white,
    position: 'absolute',
    bottom: 0,
    padding: 20,
    width: '100%',
  },
  cardOverLay: {
    height: 280,
    backgroundColor: COLORS.white,
    position: 'absolute',
    zIndex: 100,
    width: cardWidth,
    borderRadius: 15,
  },
  topVilleCard: {
    height: 120,
    width: 120,
    backgroundColor: COLORS.white,
    elevation: 15,
    marginHorizontal: 10,
    borderRadius: 10,
    shadowColor: '#000',
    shadowOffset: { width: 5, height: 15 },
    shadowOpacity: 0.2,
    shadowRadius: 2,
    elevation: 20,
  },
  topVilleCardImage: {
    height: 80,
    width: '100%',
    borderTopRightRadius: 10,
    borderTopLeftRadius: 10,
  },
});

export default HomeScreen;


const styles = StyleSheet.create({
  container: {
      flex: 1,
      backgroundColor: COLORS.white
  },
  shadow: {
      shadowColor: "#000",
      shadowOffset: {
          width: 0,
          height: 2,
      },
      shadowOpacity: 0.25,
      shadowRadius: 3.84,

      elevation: 5,
  }
});