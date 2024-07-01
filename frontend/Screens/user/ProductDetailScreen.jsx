import {
  StyleSheet,
  Text,
  View,
  ScrollView,
  Pressable,
  TextInput,
  ImageBackground,
  Dimensions,
  Platform,
} from 'react-native';
import React, { useState } from 'react';
import { AntDesign, Feather } from '@expo/vector-icons';
import { Ionicons } from '@expo/vector-icons';
import { Color } from '../../Utils/Color';
import { Fonts } from './../../Utils/Fonts';
import { useRoute } from '@react-navigation/native';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { useDispatch, useSelector } from 'react-redux';
import { addToCart } from '../../states/reducers/CartReducer';
import { SafeAreaView } from 'react-native-safe-area-context';

const ProductDetailScreen = ({ navigation }) => {
  const route = useRoute();
  const { width } = Dimensions.get('window');
  const height = (width * 100) / 100;

  const [addedToCart, setAddedToCart] = useState(false);

  const dispatch = useDispatch();

  const addItemToCart = (item) => {
    setAddedToCart(true);
    dispatch(addToCart(item));
    setTimeout(() => {
      setAddedToCart(false);
    }, 60000);
  };

  const cart = useSelector((state) => state.cart.cart);
  console.log(cart);

  return (
    <SafeAreaView
      style={{
        paddinTop: Platform.OS === 'android' ? 10 : 0,
        flex: 1,
        // backgroundColor: Color.bg,
        width: '100%',
      }}
    >
      <View
        style={{
          backgroundColor: Color.white,
          paddingLeft: 13,
          flexDirection: 'row',
          alignItems: 'center',
          justifyContent: 'flex-start',
          width: '100%',
        }}
      >
        <Pressable
          onPress={() => {
            navigation.goBack();
          }}
        >
          <Ionicons
            name="arrow-back-circle-outline"
            size={38}
            color={Color.muted}
          />
        </Pressable>


        {/* <Feather name="mic" size={25} color="black" style={{}} /> */}
      </View>
      <ScrollView
        style={{ flex: 1, backgroundColor: 'white' }}
        showsVerticalScrollIndicator={false}
      >
        <ScrollView
          horizontal
          showsHorizontalScrollIndicator={false}
          nestedScrollEnabled={true}
        >
          {route.params.carouselImages.map((item, index) => (
            <ImageBackground
              style={{ width, height, resizeMode: 'contain' }}
              source={{ uri: item }}
              key={index}
            >
              <View
                style={{
                  padding: 20,
                  flexDirection: 'row',
                  alignItems: 'center',
                  justifyContent: 'space-between',
                }}
              >
                <View
                  style={{
                    width: 40,
                    height: 40,
                    borderRadius: 20,
                    backgroundColor: '#E0E0E0',
                    justifyContent: 'center',
                    alignItems: 'center',
                    flexDirection: 'row',
                  }}
                >
                  <MaterialCommunityIcons
                    name="share-variant"
                    size={24}
                    color="black"
                  />
                </View>

                <View
                  style={{
                    width: 42,
                    height: 40,
                    borderRadius: 20,
                    backgroundColor: Color.gray,
                    justifyContent: 'center',
                    alignItems: 'center',
                    flexDirection: 'row',
                  }}
                >
                  <AntDesign name="hearto" size={24} color="black" />
                  {/* <Text
                    style={{
                      color: Color.white,
                      textAlign: 'center',
                      fontWeight: '600',
                      fontSize: 11,
                    }}
                  >
                    {route?.params?.offer}
                  </Text> */}
                </View>
              </View>

              {/* <View
                style={{
                  width: 40,
                  height: 40,
                  borderRadius: 20,
                  backgroundColor: '#E0E0E0',
                  justifyContent: 'center',
                  alignItems: 'center',
                  flexDirection: 'row',
                  marginTop: 'auto',
                  marginLeft: 20,
                  marginBottom: 20,
                }}
              >
                <AntDesign name="hearto" size={24} color="black" />
              </View> */}
            </ImageBackground>
          ))}
        </ScrollView>

        <View style={{ paddingLeft: 12, paddingVertical: 5, paddingRight: 3, }}>
          <Text
            style={{
              fontSize: 17,
              fontWeight: '500',
              fontFamily: Fonts.Regular,
            }}
          >
            {route?.params?.title}
          </Text>

          <Text
            style={{
              fontSize: 18,
              fontWeight: '600',
              marginTop: 9,
              paddingLeft: 3,
            }}
          >
            ₹{route?.params?.price}
          </Text>
        </View>

        {/* Horizontal Line */}
        <Text
          style={{
            height: 1,
            borderColor: Color.tertiary,
            borderWidth: 1,
          }}
        />

        <View
          style={{
            flexDirection: 'row',
            alignItems: 'center',
            paddingLeft: 10,
            paddingVertical: 7,
          }}
        >
          <Text>Color: </Text>
          <Text
            style={{
              fontSize: 16,
              fontWeight: 'bold',
              fontFamily: Fonts.Regular,
            }}
          >
            {route?.params?.color}
          </Text>
        </View>

        <View
          style={{
            flexDirection: 'row',
            alignItems: 'center',
            paddingLeft: 10,
            paddingVertical: 2,
          }}
        >
          <Text>Size: </Text>
          <Text
            style={{
              fontSize: 16,
              fontWeight: 'bold',
              fontFamily: Fonts.Regular,
            }}
          >
            {route?.params?.size}
          </Text>
        </View>

        {/* Horizontal Line */}
        <Text
          style={{
            height: 1,
            borderColor: Color.tertiary,
            borderWidth: 1,
            marginTop: 7,
          }}
        />

        <View style={{ paddingLeft: 10, paddingVertical: 5 }}>
          <Text
            style={{
              fontSize: 17,
              fontWeight: 'bold',
              marginVertical: 7,
              fontFamily: Fonts.SemiBold,
            }}
          >
            Total : ₹{route.params.price}
          </Text>
          <Text
            style={{
              fontSize: 15,
              color: Color.danger,
              marginTop: 7,
              paddingLeft: 1,
            }}
          >
            Avail the FREE delivery. {''}If Order within next 11hrs 30 mins
          </Text>

          <View
            style={{
              flexDirection: 'row',
              marginVertical: 14,
              alignItems: 'center',
              gap: 4,
            }}
          >
            <Ionicons name="location" size={24} color="black" />

            <Text style={{ fontSize: 15, fontWeight: '500' }}>
              Deliver - Bangalore 451863
            </Text>
          </View>
        </View>

        <Text
          style={{
            fontSize: 17,
            color: 'green',
            marginHorizontal: 10,
            fontWeight: '500',
            paddingLeft: 5,
          }}
        >
          IN Stock
        </Text>

        <Pressable
          onPress={() => addItemToCart(route?.params?.item)}
          style={{
            backgroundColor: '#FFC72C',
            padding: 10,
            borderRadius: 20,
            justifyContent: 'center',
            flexDirection: 'row',
            // justifyContent: 'space-between',
            alignItems: 'center',
            marginHorizontal: 12,
            marginVertical: 10,
            gap: 15,
          }}
        >
          <Ionicons name="cart" size={24} color="white" />
          {addedToCart ? (
            <View>
              <Text style={{ fontFamily: Fonts.Bold, fontSize: 18 }}>
                Added to Cart
              </Text>
            </View>
          ) : (
            <Text style={{ fontFamily: Fonts.Bold, fontSize: 19 }}>
              Add to Cart
            </Text>
          )}
        </Pressable>

        <Pressable
          style={{
            backgroundColor: Color.warning,
            padding: 10,
            borderRadius: 20,
            justifyContent: 'center',
            alignItems: 'center',
            marginHorizontal: 12,
            marginVertical: 10,
          }}
        >
          <Text style={{ fontFamily: Fonts.Bold, fontSize: 19 }}>Buy Now</Text>
        </Pressable>
      </ScrollView>
    </SafeAreaView>
  );
};

export default ProductDetailScreen;

const styles = StyleSheet.create({});
