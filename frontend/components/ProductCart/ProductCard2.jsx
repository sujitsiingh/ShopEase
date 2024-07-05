import React from 'react';
import { View, Text, Image, TouchableOpacity, StyleSheet } from 'react-native';
import { Color } from '../../Utils/Color';
import { Fonts } from '../../Utils/Fonts';
import Icon from 'react-native-vector-icons/Ionicons';

const ProductCard = ({ product }) => {
  return (
    <View style={[styles.card, styles.gridCard]}>
      <View style={styles.imageContainer}>
        <Image source={{ uri: product?.image }} style={styles.gridImage} />
        <TouchableOpacity style={styles.gridHeartIcon}>
          <Icon name="heart-outline" size={20} color="gray" />
        </TouchableOpacity>
      </View>
      <View style={styles.gridContent}>
        <View>
          <Text numberOfLines={1} style={styles.productName}>{product?.title}</Text>
        </View>
        <View style={styles.descriptionContainer}>
          <Text numberOfLines={2} style={styles.productDescription}>
            {product?.description}
          </Text>
          <Text style={styles.productPrice}>${product?.price?.toFixed(2)}</Text>
          <View style={styles.actionBtns}>
            <TouchableOpacity style={styles.addToCartBtn}>
              <Text
                style={{
                  textAlign: 'center',
                  color: Color.dark,
                  fontWeight: '700',
                  fontFamily: Fonts.Medium,
                }}
              >
                Add to Cart
              </Text>
            </TouchableOpacity>
          </View>
        </View>
      </View>
    </View>
  );
};
export default ProductCard;

const styles = StyleSheet.create({
  card: {
    borderWidth: 1,
    elevation: 4,
    borderColor: '#ccc',
    padding: 4,
    // paddingHorizontal: 10,
    margin: 4,
    // marginRight: 10,
    borderRadius: 10,
    backgroundColor: '#fff',
  },
  descriptionContainer: {
    flexDirection: 'column',
  },
  gridCard: {
    width: '47.8%',
  },
  actionBtns: {
    flexDirection: 'row',
  },
  gridImage: {
    width: '100%',
    height: 180,
    borderRadius: 10,
  },

  productName: {
    fontSize: 18,
    fontWeight: 'bold',
    fontFamily: Fonts.SemiBold,
    marginTop: 8,
    paddingHorizontal: 7,
  },
  productDescription: {
    fontSize: 15,
    color: Color.dark,
    marginTop: 5,
    marginBottom: 4,
    paddingHorizontal: 7,
  },
  productPrice: {
    fontSize: 17,
    fontWeight: 'bold',
    color: 'green',
    marginTop: 5,
    // marginBottom: 5,
    paddingHorizontal: 7,
  },
  addToCartBtn: {
    backgroundColor: Color.warning,
    padding: 12,
    paddingHorizontal: 16,
    margin: 8,
    borderRadius: 5,
    marginTop: 10,
    marginLeft: 'auto',
    marginRight: 'auto',
  },
  imageContainer: {
    position: 'relative',
    // flex:1
  },
  gridHeartIcon: {
    position: 'absolute',
    top: 5,
    right: 11,
    padding: 5,
    backgroundColor: Color.gray,
    borderRadius: 5,
  },
});
