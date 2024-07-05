import {
  StyleSheet,
  View,
  Pressable,
  Text,
  TextInput,
  Image,
  FlatList,
  RefreshControl,
  ScrollView,
  Platform,
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import React, { useEffect, useState, useContext } from 'react';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useSelector, useDispatch } from 'react-redux';
import { Feather } from '@expo/vector-icons';
import { AntDesign } from '@expo/vector-icons';
import cartIcon from './../../assets/icons/cart_bag.png';
import shopeaselogo from './../../assets/SELM.png';
import { Color } from '../../Utils/Color';
import { Fonts } from './../../Utils/Fonts';
import ProductCard from '../../components/ProductCart/ProductCart';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { SliderBox } from 'react-native-image-slider-box';
import DropDownPicker from 'react-native-dropdown-picker';
import axios from 'axios';
import { UserType } from '../../states/UserContext';
import jwt_decode from 'jwt-decode';

const deals = [
  {
    id: '20',
    title: 'OnePlus Nord CE 3 Lite 5G (Pastel Lime, 8GB RAM, 128GB Storage)',
    oldPrice: 25000,
    price: 19000,
    image:
      'https://images-eu.ssl-images-amazon.com/images/G/31/wireless_products/ssserene/weblab_wf/xcm_banners_2022_in_bau_wireless_dec_580x800_once3l_v2_580x800_in-en.jpg',
    carouselImages: [
      'https://m.media-amazon.com/images/I/61QRgOgBx0L._SX679_.jpg',
      'https://m.media-amazon.com/images/I/61uaJPLIdML._SX679_.jpg',
      'https://m.media-amazon.com/images/I/510YZx4v3wL._SX679_.jpg',
      'https://m.media-amazon.com/images/I/61J6s1tkwpL._SX679_.jpg',
    ],
    color: 'Stellar Green',
    size: '6 GB RAM 128GB Storage',
  },
  {
    id: '30',
    title:
      'Samsung Galaxy S20 FE 5G (Cloud Navy, 8GB RAM, 128GB Storage) with No Cost EMI & Additional Exchange Offers',
    oldPrice: 74000,
    price: 26000,
    image:
      'https://images-eu.ssl-images-amazon.com/images/G/31/img23/Wireless/Samsung/SamsungBAU/S20FE/GW/June23/BAU-27thJune/xcm_banners_2022_in_bau_wireless_dec_s20fe-rv51_580x800_in-en.jpg',
    carouselImages: [
      'https://m.media-amazon.com/images/I/81vDZyJQ-4L._SY879_.jpg',
      'https://m.media-amazon.com/images/I/61vN1isnThL._SX679_.jpg',
      'https://m.media-amazon.com/images/I/71yzyH-ohgL._SX679_.jpg',
      'https://m.media-amazon.com/images/I/61vN1isnThL._SX679_.jpg',
    ],
    color: 'Cloud Navy',
    size: '8 GB RAM 128GB Storage',
  },
  {
    id: '40',
    title:
      'Samsung Galaxy M14 5G (ICY Silver, 4GB, 128GB Storage) | 50MP Triple Cam | 6000 mAh Battery | 5nm Octa-Core Processor | Android 13 | Without Charger',
    oldPrice: 16000,
    price: 14000,
    image:
      'https://images-eu.ssl-images-amazon.com/images/G/31/img23/Wireless/Samsung/CatPage/Tiles/June/xcm_banners_m14_5g_rv1_580x800_in-en.jpg',
    carouselImages: [
      'https://m.media-amazon.com/images/I/817WWpaFo1L._SX679_.jpg',
      'https://m.media-amazon.com/images/I/81KkF-GngHL._SX679_.jpg',
      'https://m.media-amazon.com/images/I/61IrdBaOhbL._SX679_.jpg',
    ],
    color: 'Icy Silver',
    size: '6 GB RAM 64GB Storage',
  },
  {
    id: '40',
    title:
      'realme narzo N55 (Prime Blue, 4GB+64GB) 33W Segment Fastest Charging | Super High-res 64MP Primary AI Camera',
    oldPrice: 12999,
    price: 10999,
    image:
      'https://images-eu.ssl-images-amazon.com/images/G/31/tiyesum/N55/June/xcm_banners_2022_in_bau_wireless_dec_580x800_v1-n55-marchv2-mayv3-v4_580x800_in-en.jpg',
    carouselImages: [
      'https://m.media-amazon.com/images/I/41Iyj5moShL._SX300_SY300_QL70_FMwebp_.jpg',
      'https://m.media-amazon.com/images/I/61og60CnGlL._SX679_.jpg',
      'https://m.media-amazon.com/images/I/61twx1OjYdL._SX679_.jpg',
    ],
  },
];

const offers = [
  {
    id: '0',
    title:
      'Oppo Enco Air3 Pro True Wireless in Ear Earbuds with Industry First Composite Bamboo Fiber, 49dB ANC, 30H Playtime, 47ms Ultra Low Latency,Fast Charge,BT 5.3 (Green)',
    offer: '72% off',
    oldPrice: 7500,
    price: 4500,
    image:
      'https://m.media-amazon.com/images/I/61a2y1FCAJL._AC_UL640_FMwebp_QL65_.jpg',
    carouselImages: [
      'https://m.media-amazon.com/images/I/61a2y1FCAJL._SX679_.jpg',
      'https://m.media-amazon.com/images/I/71DOcYgHWFL._SX679_.jpg',
      'https://m.media-amazon.com/images/I/71LhLZGHrlL._SX679_.jpg',
      'https://m.media-amazon.com/images/I/61Rgefy4ndL._SX679_.jpg',
    ],
    color: 'Green',
    size: 'Normal',
  },
  {
    id: '1',
    title:
      'Fastrack Limitless FS1 Pro Smart Watch|1.96 Super AMOLED Arched Display with 410x502 Pixel Resolution|SingleSync BT Calling|NitroFast Charging|110+ Sports Modes|200+ Watchfaces|Upto 7 Days Battery',
    offer: '40%',
    oldPrice: 9955,
    price: 7495,
    image: 'https://m.media-amazon.com/images/I/41mQKmbkVWL._AC_SY400_.jpg',
    carouselImages: [
      'https://m.media-amazon.com/images/I/71h2K2OQSIL._SX679_.jpg',
      'https://m.media-amazon.com/images/I/71BlkyWYupL._SX679_.jpg',
      'https://m.media-amazon.com/images/I/71c1tSIZxhL._SX679_.jpg',
    ],
    color: 'Black',
    size: 'Normal',
  },
  {
    id: '2',
    title: 'boAt 450 with Upto 15 Hours Playback Bluetooth Headset  (Luscious Black, On the Ear)',
    offer: '40%',
    oldPrice: 7955,
    price: 3895,
    image: 'https://m.media-amazon.com/images/I/41t7Wa+kxPL._AC_SY400_.jpg',
    carouselImages: ['https://m.media-amazon.com/images/I/41t7Wa+kxPL.jpg'],
    color: 'black',
    size: 'Normal',
  },
  {
    id: '3',
    title:
      'IQOO Z7s 5G (Pacific Night, 128 GB)  (8 GB RAM) 8 GB RAM | 128 GB ROM | 16.21 cm(6.38 inch) Display | 64MP Rear Camera | 4500 mAh Battery',
    offer: '40%',
    oldPrice: 24999,
    price: 19999,
    image: 'https://m.media-amazon.com/images/I/71k3gOik46L._AC_SY400_.jpg',
    carouselImages: [
      'https://m.media-amazon.com/images/I/41bLD50sZSL._SX300_SY300_QL70_FMwebp_.jpg',
      'https://m.media-amazon.com/images/I/616pTr2KJEL._SX679_.jpg',
      'https://m.media-amazon.com/images/I/71wSGO0CwQL._SX679_.jpg',
    ],
    color: 'Norway Blue',
    size: '8GB RAM, 128GB Storage',
  },
];

const images = [
  'https://img.etimg.com/thumb/msid-93051525,width-1070,height-580,imgsize-2243475,overlay-economictimes/photo.jpg',
  'https://images-eu.ssl-images-amazon.com/images/G/31/img22/Wireless/devjyoti/PD23/Launches/Updated_ingress1242x550_3.gif',
  'https://images-eu.ssl-images-amazon.com/images/G/31/img23/Books/BB/JULY/1242x550_Header-BB-Jul23.jpg',
];

const HomeScreen2 = React.memo(({ navigation }) => {
  const [products, setProducts] = useState([]);
  const [refeshing, setRefreshing] = useState(false);
  const [open, setOpen] = useState(false);
  const [category, setCategory] = useState('');
  const { userId, setUserId } = useContext(UserType);

  const [items, setItems] = useState([
    { label: "Men's Clothing", value: "men's clothing" },
    { label: 'Jewelery', value: 'jewelery' },
    { label: 'Electronics', value: 'electronics' },
    { label: "Women's Clothing", value: "women's clothing" },
  ]);

  useEffect(() => {
    const fetchProduct = async () => {
      try {
        const response = await axios.get('https://fakestoreapi.com/products');
        setProducts(response.data);
      } catch (error) {
        console.log('error message:', error);
      }
    };

    fetchProduct();
  }, []);

  // console.log('products', products);

  const cart = useSelector((state) => state.cart.cart);
  useEffect(() => {
    const fetchUser = async () => {
      try {
        const token = await AsyncStorage.getItem("@authToken"); // Retrieve the authToken from AsyncStorage

        if (token) {
          const decodedToken = jwt_decode(token);
          const userId = decodedToken.userId;
          setUserId(userId);
        } else {
          // Handle the case when the authToken is not available
          console.log("authToken is not available");
        }
      } catch (error) {
        console.log('error message:', error);
      }
    };

    fetchUser();
  }, []);

  return (
    <SafeAreaView
      style={{
        paddinTop: Platform.OS === 'android' ? 10 : 0,
        flex: 1,
        backgroundColor: Color.bg,
        width: '100%',
      }}
    >
      {/* Navbar.. */}
      <View style={styles.topBarContainer}>
        <Pressable disabled>
          <Ionicons name="menu" size={30} color={Color.muted} />
        </Pressable>

        <View style={styles.topbarlogoContainer}>
          <Image source={shopeaselogo} style={styles.logo} />
          <Text style={styles.toBarText}>ShopEase</Text>
        </View>

        <Pressable
          style={styles.cartIconContainer}
          onPress={() => navigation.navigate("Cart")}
        >
          {/* {products.length > 0 ? (
              <View style={}>
              <Text style={styles.cartItemCountText}>{products.length}</Text>
              </View>
              ) : (
            <></>
          )} */}
          <Image source={cartIcon} />
        </Pressable>
      </View>

      {/* search and mic */}
      <View
        style={{
          backgroundColor: Color.primary_light,
          padding: 15,
          flexDirection: 'row',
          alignItems: 'center',
          height: 61,
        }}
      >
        <Pressable
          style={{
            flexDirection: 'row',
            alignItems: 'center',
            marginRight: 28,
            gap: 10,
            backgroundColor: Color.light,
            borderRadius: 55,
            height: 45,
            flex: 1,
          }}
        >
          <AntDesign
            style={{ paddingLeft: 10 }}
            name="search1"
            size={24}
            color="black"
          />
          <TextInput
            style={{
              padding: 3,
              width: 210,
              borderRadius: 200,
              borderWidth: 0,
            }}
            placeholder="Search..."
          />
        </Pressable>

        <Feather name="mic" size={25} color="black" style={{}} />
      </View>

      <ScrollView>
        {/* list of categories.. */}
        <View style={styles.primaryTextContainer}>
          <Text style={styles.primaryText}>Categories</Text>
        </View>

        <View
          style={{
            marginHorizontal: 11,
            // marginTop: 1,
            width: '47%',
            marginBottom: open ? 50 : 15,
          }}
        >
          <DropDownPicker
            style={{
              borderColor: Color.primary_shadow,
              height: 25,
              marginBottom: open ? 120 : 15,
            }}
            open={open}
            value={category} //genderValue
            items={items}
            setOpen={setOpen}
            setValue={setCategory}
            setItems={setItems}
            placeholder="Choose Your Category"
            placeholderStyle={styles.placeholderStyles}
            zIndex={3000}
            zIndexInverse={1000}
          />
        </View>

        <View
          style={{
            flexDirection: 'row',
            alignItems: 'center',
            flexWrap: 'wrap',
          }}
        >
          {products
            ?.filter((item) => item?.category === category)
            .map((item, index) => (
              <ProductCard item={item} key={index} />
            ))}
        </View>

        <Text
          style={{
            height: 1,
            borderColor: Color.tertiary,
            borderWidth: 2,
            marginBottom: 8,
          }}
        />

        {/* image slider */}
        <SliderBox
          images={images}
          autoPlay
          circleLoop
          dotColor={Color.shadow}
          inactiveDotColor={Color.muted}
          ImageComponentStyle={{ width: '100%' }}
        />

        <Text
          style={{
            padding: 10,
            fontSize: 18,
            fontFamily: Fonts.Bold,
            fontWeight: 'bold',
            marginTop: 7,
          }}
        >
          Trending Deals of the week
        </Text>

        <View
          style={{
            flexDirection: 'row',
            alignItems: 'center',
            flexWrap: 'wrap',
          }}
        >
          {deals.map((item, index) => (
            <Pressable
              onPress={() =>
                navigation.navigate('productdetail', {
                  id: item?.id,
                  title: item.title,
                  price: item?.price,
                  carouselImages: item.carouselImages,
                  color: item?.color,
                  size: item?.size,
                  oldPrice: item?.oldPrice,
                  item: item,
                })
              }
              style={{
                marginBottom: 9,
                marginLeft: 4,
                flexDirection: 'row',
                alignItems: 'center',
              }}
            >
              <Image
                style={{ width: 190, height: 240, resizeMode: 'contain' }}
                source={{ uri: item?.image }}
              />
            </Pressable>
          ))}
        </View>

        {/* Horizontal Line */}
        <Text
          style={{
            height: 1,
            borderColor: Color.tertiary,
            borderWidth: 2,
            marginTop: 7,
          }}
        />

        {/* <View style={styles.primaryTextContainer}>
          <Text style={styles.primaryText}>New Arrivals</Text>
        </View> */}

        <Text
          style={{
            height: 1,
            borderColor: Color.tertiary,
            borderWidth: 2,
            marginTop: 7,
          }}
        />

        <Text
          style={{
            padding: 10,
            fontSize: 18,
            fontFamily: Fonts.Bold,
            fontWeight: 'bold',
          }}
        >
          Today's Deal
        </Text>

        <ScrollView
          horizontal
          showsHorizontalScrollIndicator={false}
          nestedScrollEnabled={true}
        >
          {offers.map((item, index) => (
            <Pressable
              onPress={() =>
                navigation.navigate('productdetail', {
                  id: item?.id,
                  title: item.title,
                  price: item?.price,
                  carouselImages: item.carouselImages,
                  color: item?.color,
                  size: item?.size,
                  oldPrice: item?.oldPrice,
                  item: item,
                })
              }
              style={{
                alignItems: 'center',
                justifyContent: 'center',
              }}
            >
              <Image
                style={{ width: 150, height: 150, resizeMode: 'contain' }}
                source={{ uri: item?.image }}
              />

              <View
                style={{
                  backgroundColor: Color.primary_light,
                  paddingVertical: 5,
                  width: 130,
                  justifyContent: 'center',
                  alignItems: 'center',
                  marginTop: 10,
                  borderRadius: 4,
                }}
              >
                <Text
                  style={{
                    textAlign: 'center',
                    color: Color.primary_shadow,
                    fontSize: 15,
                    fontFamily: Fonts.Bold,
                    fontWeight: 'bold',
                  }}
                >
                  Upto {item?.offer}
                </Text>
              </View>
            </Pressable>
          ))}
        </ScrollView>

        <Text
          style={{
            height: 1,
            borderColor: Color.tertiary,
            borderWidth: 2,
            marginTop: 10,
          }}
        />
      </ScrollView>
    </SafeAreaView>
  );
});

export default HomeScreen2;

const styles = StyleSheet.create({
  topBarContainer: {
    width: '100%',
    // display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: 13,
    marginTop: '-2%',
  },
  topbarlogoContainer: {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    flexDirection: 'row',
    gap: 12,
    height: 25,
  },
  toBarText: {
    fontSize: 21,
    fontFamily: Fonts.SemiBold,
    marginLeft: 'auto',
    marginRight: 'auto',
  },
  logo: {
    height: 39,
    width: 40,
    resizeMode: 'contain',
  },
  cartIconContainer: {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
  },

  primaryTextContainer: {
    padding: 11,
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'flex-start',
    alignItems: 'flex-start',
    width: '100%',
    paddingTop: 13,
    paddingBottom: 10,
  },
  primaryText: {
    fontSize: 19,
    fontWeight: 'bold',
    fontFamily: Fonts.Medium,
  },
  flatListContainer: {
    width: '100%',
    height: 70,
    // marginTop: 1,
    marginLeft: 3,
    marginRight: 15,
  },
  categoryContainer: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'flex-start',
    alignItems: 'center',
    width: '100%',
    height: 60,
    marginLeft: 6,
    marginBottom: 8,
  },
});
