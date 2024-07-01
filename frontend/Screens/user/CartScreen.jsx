import {
  StyleSheet,
  Text,
  View,
  ScrollView,
  Pressable,
  TextInput,
  Image,
  Platform,
} from 'react-native';
import React from 'react';
import { Feather } from '@expo/vector-icons';
import { AntDesign } from '@expo/vector-icons';
import { Color } from '../../Utils/Color';
import { Fonts } from './../../Utils/Fonts';
import { Ionicons } from '@expo/vector-icons';
import { useDispatch, useSelector } from 'react-redux';
import {
  decrementQuantity,
  incementQuantity,
  removeFromCart,
} from '../../states/reducers/CartReducer';
import { SafeAreaView } from 'react-native-safe-area-context';

const CartScreen = ({ navigation }) => {
  const cart = useSelector((state) => state.cart.cart);
  // console.log(cart);
  const total = cart
    ?.map((item) => item.price * item.quantity)
    .reduce((curr, prev) => curr + prev, 0);
  const dispatch = useDispatch();
  const increaseQuantity = (item) => {
    dispatch(incementQuantity(item));
  };
  const decreaseQuantity = (item) => {
    dispatch(decrementQuantity(item));
  };
  const deleteItem = (item) => {
    dispatch(removeFromCart(item));
  };

  return (
    <SafeAreaView
      style={{
        paddinTop: Platform.OS === 'android' ? 10 : 0,
        flex: 1,
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

      <ScrollView style={{ flex: 1, marginTop: 20 }}>
        <View
          style={{
            paddingLeft: 15,
            flexDirection: 'row',
            alignItems: 'center',
          }}
        >
          <Text
            style={{
              fontSize: 20,
              fontWeight: '700',
              fontFamily: Fonts.Regular,
            }}
          >
            Subtotal : ₹
          </Text>
          <Text
            style={{
              fontSize: 20,
              fontWeight: 'bold',
              fontFamily: Fonts.Medium,
            }}
          >
            {' '}
            {total}
          </Text>
        </View>
        <Text style={{ marginHorizontal: 15 }}>EMI details Available</Text>

        <Pressable
          onPress={() => navigation.navigate('Confirm')}
          style={{
            backgroundColor: Color.warning,
            padding: 12,
            borderRadius: 100,
            justifyContent: 'center',
            alignItems: 'center',
            marginHorizontal: 17,
            marginTop: 20,
          }}
        >
          <Text
            style={{
              fontSize: 17,
              fontWeight: '300',
              fontFamily: Fonts.Medium,
            }}
          >
            Proceed to Buy ({cart.length}) items
          </Text>
        </Pressable>

        <Text
          style={{
            height: 1,
            borderColor: Color.tertiary,
            borderWidth: 1,
            marginTop: 9,
          }}
        />

        <View style={{ marginHorizontal: 11 }}>
          {cart?.map((item, index) => (
            <View
              style={{
                backgroundColor: 'white',
                marginVertical: 5,
                borderBottomColor: '#F0F0F0',
                borderWidth: 2,
                borderLeftWidth: 0,
                borderTopWidth: 0,
                borderRightWidth: 0,
              }}
              key={index}
            >
              <Pressable
                style={{
                  marginVertical: 10,
                  flexDirection: 'row',
                  justifyContent: 'space-between',
                }}
              >
                <View>
                  <Image
                    style={{ width: 150, height: 160, resizeMode: 'contain' }}
                    source={{ uri: item?.image }}
                  />
                </View>

                <View>
                  <Image
                    style={{
                      width: 120,
                      height: 40,
                      resizeMode: 'contain',
                      // marginTop: 1,
                    }}
                    source={
                      // uri: 'https://assets.stickpng.com/thumbs/5f4924cc68ecc70004ae7065.png',
                      require('../../assets/SELM.png')
                    }
                  />
                  <Text
                    numberOfLines={5}
                    style={{
                      width: 150,
                      marginTop: 7,
                      fontSize: 17,
                      fontWeight: '300',
                      fontFamily: Fonts.Medium,
                    }}
                  >
                    {item?.title}
                  </Text>
                  <Text
                    style={{ fontSize: 20, fontWeight: 'bold', marginTop: 6 }}
                  >
                    ₹{item?.price}
                  </Text>
                  
                  <Text style={{ color: 'green', marginTop: 10, fontSize: 14, fontWeight: '600' }}>In Stock</Text>
                  {/* <Text style={{ fontWeight: "500", marginTop: 6 }}>
                  {item?.rating?.rate} ratings
                </Text> */}
                </View>
              </Pressable>

              <Pressable
                style={{
                  // marginTop: 1,
                  marginBottom: 10,
                  flexDirection: 'row',
                  alignItems: 'center',
                  gap: 61,
                }}
              >
                <View
                  style={{
                    flexDirection: 'row',
                    alignItems: 'center',
                    paddingHorizontal: 13,
                    paddingVertical: 8,
                    borderRadius: 7,
                  }}
                >
                  {item?.quantity > 1 ? (
                    <Pressable
                      onPress={() => decreaseQuantity(item)}
                      style={{
                        backgroundColor: Color.shadow,
                        padding: 7,
                        borderTopLeftRadius: 6,
                        borderBottomLeftRadius: 6,
                        borderTopRightRadius: 6,
                        borderBottomRightRadius: 6,
                        elevation: 5,
                      }}
                    >
                      <AntDesign name="minus" size={25} color="black" />
                    </Pressable>
                  ) : (
                    <Pressable
                      onPress={() => deleteItem(item)}
                      style={{
                        backgroundColor: Color.gray,
                        padding: 7,
                        borderTopLeftRadius: 6,
                        borderBottomLeftRadius: 6,
                        borderTopRightRadius: 6,
                        borderBottomRightRadius: 6,
                        elevation: 5,
                      }}
                    >
                      <AntDesign name="delete" size={25} color="black" />
                    </Pressable>
                  )}

                  <Pressable
                    style={{
                      backgroundColor: 'white',
                      paddingHorizontal: 22,
                      paddingVertical: 6,
                    }}
                  >
                    <Text style={{ fontSize: 17, fontWeight: '600', }}>{item?.quantity}</Text>
                  </Pressable>

                  <Pressable
                    onPress={() => increaseQuantity(item)}
                    style={{
                      backgroundColor: Color.secondary,
                      padding: 7,
                      borderTopLeftRadius: 6,
                      borderBottomLeftRadius: 6,
                      borderTopRightRadius: 6,
                      borderBottomRightRadius: 6,
                      elevation: 5,
                    }}
                  >
                    <Feather name="plus" size={25} color="black" />
                  </Pressable>
                </View>

                <Pressable
                  onPress={() => deleteItem(item)}
                  style={{
                    backgroundColor: Color.primary_shadow,
                    paddingHorizontal: 13,
                    paddingVertical: 10,
                    borderRadius: 6,
                    borderColor: '#C0C0C0',
                    borderWidth: 0.9,
                    elevation: 5,
                  }}
                >
                  <Text style={{color: Color.white}}>Delete</Text>
                </Pressable>
              </Pressable>

              <Pressable
                style={{
                  flexDirection: 'row',
                  alignItems: 'center',
                  gap: 15,
                  marginBottom: 10,
                  paddingLeft: 12,
                }}
              >
                <Pressable
                  style={{
                    backgroundColor: Color.bg1,
                    paddingHorizontal: 13,
                    paddingVertical: 10,
                    borderRadius: 6,
                    borderColor: '#C0C0C0',
                    borderWidth: 0.9,
                    elevation: 5,
                  }}
                  >
                  <Text style={{ color: Color.white }}>Save For Later</Text>
                </Pressable>

                <Pressable
                  style={{
                    backgroundColor: Color.bg,
                    paddingHorizontal: 13,
                    paddingVertical: 10,
                    borderRadius: 6,
                    borderColor: '#C0C0C0',
                    borderWidth: 0.9,
                    elevation: 5,
                  }}
                >
                  <Text style={{ color: Color.dark }}>See More Like this</Text>
                </Pressable>
              </Pressable>
            </View>
          ))}
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

export default CartScreen;

const styles = StyleSheet.create({});
