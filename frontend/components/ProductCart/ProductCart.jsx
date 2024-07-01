import {
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
  Image,
  Pressable,
} from 'react-native';
import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { addToCart } from '../../states/reducers/CartReducer';
import { Color } from '../../Utils/Color';
import { Fonts } from '../../Utils/Fonts';
import { Ionicons } from '@expo/vector-icons';

const ProductCard = ({ item }) => {
  const [addedToCart, setAddedToCart] = useState(false);
  const dispatch = useDispatch();

  const addItemToCart = (item) => {
    setAddedToCart(true);
    dispatch(addToCart(item));
    setTimeout(() => {
      setAddedToCart(false);
    }, 60000);
  };
  return (
    <View
      style={{
        width: 179,
        height: 292,
        borderRadius: 15,
        display: 'flex',
        backgroundColor: Color.gray,
        flexDirection: 'column',
        justifyContent: 'flex-start',
        alignItems: 'center',
        marginLeft: 12,
        marginVertical: 8,
        padding: 7,
        elevation: 5,
      }}
    >
      <Pressable
        style={{
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'flex-end',
          alignItems: 'center',
          backgroundColor: Color.light,
          width: '100%',
          //   height: 140,
          borderRadius: 15,
          padding: 15,
        }}
      >
        <Image
          style={{ width: 150, height: 150, resizeMode: 'contain' }}
          source={{ uri: item?.image }}
        />

        <Text
          numberOfLines={1}
          style={{
            width: 150,
            marginTop: 5,
            marginBottom: 5,
            fontFamily: Fonts.Regular,
          }}
        >
          {item?.title}
        </Text>

        <View
          style={{
            marginTop: 5,
            width: '100%',
            display: 'flex',
            flexDirection: 'row',
            justifyContent: 'space-between',
            alignItems: 'center',
            flexDirection: 'row',
            alignItems: 'center',
            fontFamily: Fonts.SemiBold,
          }}
        >
          <Text style={{ fontSize: 15, fontWeight: 'bold' }}>
            ₹{item?.price}
          </Text>
          <Text style={{ color: Color.primary_shadow, fontWeight: 'bold' }}>
            {item?.rating?.rate} ratings
          </Text>
        </View>

        <Pressable
          onPress={() => addItemToCart(item)}
          style={{
            backgroundColor: '#FFC72C',
            padding: 9,
            borderRadius: 150,
            marginHorizontal: 2,
            marginTop: 10,
            // backgroundColor: Color.primary,
            width: 130,
            height: 40,
            borderRadius: 50,
            display: 'flex',
            flexDirection: 'row',
            justifyContent: 'space-evenly',
            alignItems: 'center',
          }}
        >
          <Ionicons name="cart" size={24} color="white" />
          {addedToCart ? (
            <View>
              <Text style={{ fontFamily: Fonts.Bold, fontSize: 15 }}>
                Added to Cart
              </Text>
            </View>
          ) : (
            <Text style={{ fontFamily: Fonts.Bold, fontSize: 15 }}>
              Add to Cart
            </Text>
          )}
        </Pressable>
      </Pressable>
    </View>
  );
};

export default ProductCard;

const styles = StyleSheet.create({});
