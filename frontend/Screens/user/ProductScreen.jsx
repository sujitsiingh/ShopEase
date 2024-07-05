import {
  StyleSheet,
  Image,
  TouchableOpacity,
  View,
  Text,
  FlatList,
  ScrollView,
} from 'react-native';
import React, { useState, useEffect } from 'react';
import Icon from 'react-native-vector-icons/Ionicons';
import { Ionicons } from '@expo/vector-icons';
import { Color } from '../../Utils/Color';
import { Fonts } from '../../Utils/Fonts';
import { useSelector, useDispatch } from 'react-redux';
import { useRoute } from '@react-navigation/native';
import shopeaselogo from './../../assets/SELM.png';
import ProductCard2 from '../../components/ProductCart/ProductCard2';
import CustomInput from '../../components/CustomInput/CustomInput';
import { SafeAreaView } from 'react-native-safe-area-context';
// import { addToCart } from '../../states/reducers/CartReducer';
import {
  addToCart,
  removeFromCart,
  incrementQuantity,
  decrementQuantity,
} from '../../states/reducers/CartReducer2';

const ProductScreen = ({ navigation }) => {
  const [products, setProducts] = useState([]);
  const [viewMode, setViewMode] = useState('grid');

  const toggleViewMode = () => {
    setViewMode(viewMode === 'grid' ? 'list' : 'grid');
  };

  const ListItem = [
    {
      id: 1,
      title: 'iPhone 9',
      description: 'An apple mobile which is nothing like apple',
      price: 549,
      discountPercentage: 12.96,
      rating: 4.69,
      stock: 94,
      brand: 'Apple',
      category: 'smartphones',
      image:
        'https://specifications-pro.com/wp-content/uploads/2020/03/iPhone-9-600x600.jpeg',
    },
    {
      id: 2,
      title: 'Samsung Universe 9',
      description:
        "Samsung's new variant which goes beyond Galaxy to the Universe",
      price: 1249,
      discountPercentage: 15.46,
      rating: 4.09,
      stock: 36,
      brand: 'Samsung',
      category: 'smartphones',
      image:
        'https://images4.pricecheck.co.za/images/objects/hash/product/444/6e2/9db/image_original_116142431.jpg?1535984051',
    },
    {
      id: 4,
      title: 'OPPOF19',
      description: 'OPPO F19 is officially announced on April 2021.',
      price: 280,
      discountPercentage: 17.91,
      rating: 4.3,
      stock: 123,
      brand: 'OPPO',
      category: 'smartphones',
      image:
        'https://th.bing.com/th/id/OIP.AncxpEyfIABR3rpAPUm21gHaHa?w=4000&h=4000&rs=1&pid=ImgDetMain',
    },
    {
      id: 5,
      title: 'Huawei P30',
      description:
        'Huawei’s re-badged P30 Pro New Edition was officially unveiled yesterday in Germany and now the device has made its way to the UK.',
      price: 499,
      discountPercentage: 10.58,
      rating: 4.09,
      stock: 32,
      brand: 'Huawei',
      category: 'smartphones',
      image:
        'https://th.bing.com/th/id/OIP.59q3qDs0IO55AkkFus5LRAHaHa?rs=1&pid=ImgDetMain',
    },
    {
      id: 8,
      title: 'Samsung Galaxy S21 FE 5G (Lavender, 8GB, 128GB Storage)',
      image:
        'https://storage.googleapis.com/fir-auth-1c3bc.appspot.com/1691073671025-galaxy S21 FE.jpg',
      price: 434,
      description:
        'Pro-grade Camera with AI Single Take, Portrait Mode, Night Mode and 30X Space zoom. Dual Recording: Film in both wide and selfie angles at the same time | 12MP F1.8 Main Camera (Dual Pixel AF & OIS) + 12MP UltraWide Camera (123° FOV) + 8MP Telephoto Camera (3x Optic Zoom, 30X Space Zoom, OIS) | 32 MP F2.2 Front Camera.\r\n16.28cm (6.4-inch) Dynamic AMOLED 2X Display with120Hz Refresh rate for Smooth scrolling. Intelligent Eye Comfort Shield, New 19.5:9 Screen Ratio with thinner bezel, 1080x2340 (FHD+) Resolution.\r\n5G Ready with Octa-core Exynos 2100 (5nm) Processor. Android 12 operating system. Dual Sim.\r\nIconic Contour Cut Design with 7.9 mm thickness. Gorilla Glass Victus and IP68 Water Resistant .',
      brand: 'samsung',
      model: 'Samsung Galaxy S21 FE 5G (Lavender, 8GB, 128GB Storage)',
      color: 'Lavender',
      category: 'mobile',
      discount: 9,
      onSale: true,
    },
    {
      id: 10,
      title:
        'Samsung Galaxy S22 5G (Phantom White, 8GB RAM, 128GB Storage) with No Cost EMI/Additional Exchange Offers',
      image:
        'https://storage.googleapis.com/fir-auth-1c3bc.appspot.com/1691074519203-galaxy S22 5G.jpg',
      price: 760,
      description:
        'Pro-grade Camera that lets you make your nights epic with Nightography: It’s our brightest innovation yet. The sensor pulls in more light, the Super Clear Glass dials down lens flare, and fast-acting AI delivers near-instant intelligent processing.\r\nVisionBooster outshines the sun: Stunning 120Hz Dynamic AMOLED 2X display is crafted specifically for high outdoor visibility, keeping the view clear in bright daylight.\r\n4nm processor, our fastest chip yet: Our fastest, most powerful chip ever. That means, a faster CPU and GPU compared to Galaxy S21 Ultra. It’s an epic leap for smartphone technology.\r\nSleek design in a range of colors lets you express yourself how you like. The slim bezels flow into a symmetrical polished frame for an expansive, balanced display. Corning Gorilla Glass Victus+ on the screen and back panels.',
      brand: 'samsung',
      model: 'Samsung Galaxy S22 5G',
      color: 'White',
      category: 'mobile',
      discount: 29,
    },
    {
      id: 12,
      title: 'Poco by Xiaomi F1 Steel Blue, 6GB RAM, 64GB Storage',
      image:
        'https://storage.googleapis.com/fir-auth-1c3bc.appspot.com/1691078463674-poco f1.jpg',
      price: 132,
      description:
        '2MP+5MP dual camera | 20MP front facing camera\r\n15.69 centimeters (6.18-inch) IPS (in-cell) multi-touch capacitive touchscreen with 2246 x 1080 pixels resolution, 403 ppi pixel density\r\nMemory, Storage & SIM: 6GB RAM, 64GB internal memory expandable up to 128GB | Dual SIM (nano+nano) dual-standby (4G+4G)\r\nAndriod Oreo v8.1 operating system with 2.8GHz Qualcomm Snapdragon 845 octa core processor, 8xKyro cores/10 nm architecture\r\n4000mAH lithium-ion battery with quick charge 3.0 to keep you going all-day long\r\n1 year manufacturer warranty for device and 6 months manufacturer warranty for in-box accessories including batteries from the date of purchase',
      brand: 'xiaomi',
      model: 'Poco F1',
      color: 'steel blue',
      category: 'mobile',
      popular: true,
    },
    {
      id: 13,
      title: 'Samsung Galaxy M14 5G (Smoky Teal, 6GB, 128GB Storage)',
      image:
        'https://storage.googleapis.com/fir-auth-1c3bc.appspot.com/1691075307831-galaxy M14 5G.jpg',
      price: 187,
      description:
        '16.72 centimeters (6.6-inch) LCD, FHD+ resolution with 1080 x 2408 pixels resolution, 401 PPI with 16M color\r\n50MP+2MP+2MP Triple camera setup- True 50MP (F1.8) main camera + 2MP (F2.4) + 2MP (F2.4)| 13MP (F2.0) front camera\r\nSuperfast 5G with 13 5G Bands, Powerful Exynos 1330 Octa Core 2.4GH 5nm processor with Letest Android 13,One UI Core 5.0,\r\n6000mAH lithium-ion battery, 1 year manufacturer warranty for device and 6 months manufacturer warranty for in-box accessories including batteries from the date of purchase\r\nGet up to 2 times of Android Updates & 4 times of Security Updates with Samsung Galaxy M14 5G.',
      brand: 'samsung',
      model: 'Samsung Galaxy M14 5G',
      color: 'Smoky Teal',
      category: 'mobile',
      discount: 11,
    },

    {
      id: 15,
      title: 'Apple iPhone 14 Pro Max (256 GB) - Deep Purple',
      image:
        'https://storage.googleapis.com/fir-auth-1c3bc.appspot.com/1691075831385-iPhone 14 pro max.jpg',
      price: 1810,
      description:
        '17.00 cm (6.7-inch) Super Retina XDR display featuring Always-On and ProMotion\r\nDynamic Island, a magical new way to interact with iPhone\r\n48MP Main camera for up to 4x greater resolution\r\nCinematic mode now in 4K Dolby Vision up to 30 fps\r\nAction mode for smooth, steady, handheld videos\r\nAll-day battery life and up to 29 hours of video playback\r\nVital safety technology — Crash Detection can detect a severe car crash and call for help',
      brand: 'apple',
      model: 'iPhone 14 Pro Max',
      color: 'Deep Purple',
      category: 'mobile',
      popular: true,
    },
    {
      id: 17,
      title: 'Apple iPhone 12 (256GB) - Green',
      image:
        'https://storage.googleapis.com/fir-auth-1c3bc.appspot.com/1691077233139-iPhone 12.jpg',
      price: 844,
      description:
        '6.1-inch (15.5 cm diagonal) Super Retina XDR display\r\nCeramic Shield, tougher than any smartphone glass\r\nA14 Bionic chip, the fastest chip ever in a smartphone\r\nAdvanced dual-camera system with 12MP Ultra Wide and Wide cameras; Night mode, Deep Fusion, Smart HDR 3, 4K Dolby Vision HDR recording\r\n12MP TrueDepth front camera with Night mode, 4K Dolby Vision HDR recording\r\nIndustry-leading IP68 water resistance\r\nSupports MagSafe accessories for easy attach and faster wireless charging\r\niOS with redesigned widgets on the Home screen, all-new App Library, App Clips and more',
      brand: 'apple',
      model: 'iPhone 12 256GB Green',
      color: 'Green',
      category: 'mobile',
    },
    {
      id: 20,
      title: 'Samsung Galaxy M13 (Aqua Green, 6GB, 128GB Storage)',
      image:
        'https://storage.googleapis.com/fir-auth-1c3bc.appspot.com/1691075065521-galaxy M13.jpg',
      price: 140,
      description:
        '6000mAh lithium-ion battery, 1 year manufacturer warranty for device and 6 months manufacturer warranty for in-box accessories including batteries from the date of purchase\r\nUpto 12GB RAM with RAM Plus | 128GB internal memory expandable up to 1TB| Dual Sim (Nano)\r\n50MP+5MP+2MP Triple camera setup- True 50MP (F1.8) main camera +5MP(F2.2)+ 2MP (F2.4) | 8MP (F2.2) front cam\r\nAndroid 12,One UI Core 4 with a powerful Octa Core Processor\r\n16.72 centimeters (6.6-inch) FHD+ LCD - infinity O Display, FHD+ resolution with 1080 x 2408 pixels resolution, 401 PPI with 16M color',
      brand: 'samsung',
      model: 'Samsung Galaxy M13',
      color: 'Aqua Green',
      category: 'mobile',
      discount: 9,
    },
    {
      id: 21,
      title: 'Redmi Note 12 5G Matte Black 6GB RAM 128GB ROM',
      image:
        'https://storage.googleapis.com/fir-auth-1c3bc.appspot.com/1691078965685-redmi note 12 5g.jpg',
      price: 229,
      description:
        'Display: Super AMOLED (1080x2400) Display with 120Hz Refresh rate; | 1st Phone with 120Hz Super AMOLED and Snapdragon® 4 Gen 1 | 48MP AI Triple Camera 1200nits peak brightness; 240Hz Touch sampling rate\r\nProcessor: Snapdragon 4 Gen1 6nm Octa-core 5G processor for high performance and efficiency with Adreno 619 GPU; Up to 2.0GHz\r\nCamera: 48MP AI Triple camera setup with 8MP Ultra Wide sensor and 2MP Macro camera| 13MP Front camera\r\nBattery: 5000mAh large battery with 33W fast charger in-box and Type-C connectivity\r\nMemory, Storage & SIM: 6GB RAM | 128GB UFS 2.2 storage expandable up to 1TB | Dual SIM (nano+nano) Dual 5G (5G+5G)',
      brand: 'xiaomi',
      model: 'Redmi Note 12 5G',
      color: 'Matte Black',
      category: 'mobile',
    },
    {
      id: 25,
      title: 'Samsung Galaxy S23 5G (Green, 8GB, 128GB Storage)',
      image:
        'https://storage.googleapis.com/fir-auth-1c3bc.appspot.com/1691074179466-galaxy S23 5G.jpg',
      price: 905,
      description:
        "More light for your night - Get ready for a Gallery full of epic night shots everyone will want. Nightography's enhanced AI keeps details clear, so low light photos and videos will be bright and colorful from dusk to dawn and back again.\r\nDesigned with the planet in mind - Unbox the change you want to see in the world. Crafted with recycled glass and PET film and colored with natural dyes, each phone is tucked into a box made of recycled paper and paper-based protective film.\r\nPower for those who don't pause - Your quest for epic mobile gaming is over. Snapdragon 8 Gen 2 Mobile Platform for Galaxy optimizes and streamlines your device for silky smooth games —without draining the battery.",
      brand: 'samsung',
      model: 'Samsung Galaxy S23',
      color: 'Green',
      category: 'mobile',
      popular: true,
      discount: 21,
      onSale: true,
    },

    {
      id: 79,
      title: 'realme 11 Pro 5G (Oasis Green, 8GB RAM, 128GB Storage)',
      image:
        'https://storage.googleapis.com/fir-auth-1c3bc.appspot.com/1694181968262-51yJF5nnedL.jpg',
      price: 283,
      description:
        '*[RAM, ROM AND Explandabe Memory] :- 8 GB RAM | 128 GB ROM  | 120 Hz Curved Display | 100MP Prolight Camera | 7050 5G Dimensity | 67W SUPERVOOC | 12GB Dynamic RAM | Premier Vegan Leather Finish Design | Not Expandable (Memory Card Slot Not Available)\r\n*[Display] :- Curved Vision Display, The realme Pro 5G smartphone has a 120 Hz curved vision display that ensures immersive display. It comes with an array of features like 2160 Hz PWM dimming, TUV Rheinland certified eye protection features, 1260 Hz Turbocharged Touch Sampling, and 16x HyperPrecise Touch for a smooth and hassle-free usage. The 2.33 Chin, 61-degree Precision Curvature, and Doubly reinforced Glass gives an aesthetic look and perfectly fits in your hands.\r\n*[Processor] :- Powerful Processor, The Dimensity 7050 5G chipset of this smartphone delivers fast and smooth performance. The realme Pro 5G smartphone has 5G compatibility along with TUV SUD rating for 48-month system fluency, Dash Memory Engine, 6 nm technology process, and an AnTuTu score above 550,000 which makes it a feature-packed smartphone.',
      brand: 'realme',
      model: 'realme 11 Pro',
      color: 'Green',
      category: 'mobile',
      popular: true,
      discount: 9,
    },
    {
      id: 80,
      title: 'POCO M6 Pro 5G (Power Black, 128 GB) (6 GB RAM)',
      image:
        'https://storage.googleapis.com/fir-auth-1c3bc.appspot.com/1694182309030-51KXP7nN84L._SL1057_.jpg',
      price: 162,
      description:
        '6 GB RAM | 128 GB ROM | Expandable Upto 1 TB\r\n17.25 cm (6.79 inch) Full HD+ Display\r\n50MP + 2MP | 8MP Front Camera\r\n5000 mAh Battery\r\nSnapdragon 4 Gen 2 Processor',
      brand: 'poco',
      model: 'M6 Pro 5G',
      color: 'black',
      category: 'mobile',
      discount: 5,
    },
    {
      id: 81,
      title: 'Vivo Y100A 5G (Metal Black, 8GB RAM, 128GB Storage)',
      image:
        'https://storage.googleapis.com/fir-auth-1c3bc.appspot.com/1694182904592-613WuKC1KlL._SL1200_.jpg',
      price: 289,
      description:
        'Triple 64MP+2MP+2MP Rear Camera | 16MP Selfie Camera\r\n16.20 cm (6.38" inch) FHD+ AMOLED Display\r\nMemory & SIM: 8GB RAM | 128GB internal memory\r\n44W fast charging with 4500mAh battery',
      brand: 'vivo',
      model: 'Y100A',
      color: 'grey',
      category: 'mobile',
      popular: true,
      discount: 9,
    },
    {
      id: 83,
      title: 'iQOO Neo 7 5G (Interstellar Black, 8GB RAM, 128GB Storage)',
      image:
        'https://storage.googleapis.com/fir-auth-1c3bc.appspot.com/1694183253866-61IiuWQcVjL._SL1200_.jpg',
      price: 337,
      description:
        'MediaTek Dimensity 8200 5G Mobile platform adopts TSMC 4nm process and has excellent Power Efficiency Performance. Dimensity 8200, only 4nm Processor in The Segment| 50% Charge in 10 mins| Motion Control & 90 FPS Gaming. Also, Equipped with the LPDDR5 RAM & UFS 3.1 Storage.\r\nThe 120W FlashCharge charges from 1% to 50% in just 10 minutes (25 minutes for a full charge)\r\nMotion Control powered by Gyroscope & Acceleration Sensors to give 6 additional Phone movement-based control options while Gaming\r\n6.78” 120Hz AMOLED Display with HDR 10+ Certification, Netflix HDR Support & 1300 Nits Peak Brightness\r\n64MP OIS Camera, Dual Stereo Speakers, X-Axis Linear Motor and Extended RAM 3.0 (8GB+8GB)\r\n',
      brand: 'iQOO',
      model: 'iQOO Neo 7 5G',
      color: 'grey',
      category: 'mobile',
      onSale: true,
      discount: 11,
    },
  ];


  const [searchQuery, setSearchQuery] = useState('');
  const [filteredProducts, setFilteredProducts] = useState([]);
  useEffect(() => {
    setFilteredProducts(ListItem);
  }, []);

  useEffect(() => {
    const filtered = ListItem.filter(
      (product) =>
        product.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        product.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
        product.brand.toLowerCase().includes(searchQuery.toLowerCase()) ||
        product.category.toLowerCase().includes(searchQuery.toLowerCase())
    );
    setFilteredProducts(filtered);
  }, [searchQuery]);

  const renderProductItem = ({ item }) => {
    if (viewMode === 'grid') {
      return <ProductCard2 product={item} />;
    } else {
      return (
        <View style={[styles.card, styles.listCard]}>
          <View style={styles.imageContainer}>
            <Image source={{ uri: item.image }} style={styles.listImage} />
            <TouchableOpacity style={styles.listHeartIcon}>
              <Icon name="heart-outline" size={20} color="gray" />
            </TouchableOpacity>
          </View>
          <View style={styles.listContent}>
            <View>
              <Text numberOfLines={1} style={styles.productName}>
                {item?.title}
              </Text>
            </View>
            <View style={styles.descriptionContainer}>
              <Text numberOfLines={3} style={styles.productDescription}>
                {item?.description}
              </Text>
              <Text style={styles.productPrice}>
                ${item?.price?.toFixed(2)}
              </Text>
              <View style={styles.actionBtns}>
                <TouchableOpacity
                  onPress={() => addToCartHandler(item)}
                  style={styles.addToCartBtn}
                >
                  <Text
                    style={{
                      textAlign: 'center',
                      color: Color.dark,
                      fontWeight: '700',
                      fontFamily: Fonts.Medium,
                      fontSize: 18,
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
    }
  };

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.topBarContainer}>
        <TouchableOpacity
          onPress={() => {
            navigation.goBack();
          }}
        >
          <Ionicons
            name="arrow-back-circle-outline"
            size={38}
            color={Color.muted}
          />
        </TouchableOpacity>
        <Image source={shopeaselogo} style={styles.logo} />
        <Text style={styles.toBarText}>Continue Your Shopping</Text>
        <TouchableOpacity onPress={toggleViewMode}>
          <Ionicons
            name={viewMode === 'grid' ? 'grid' : 'list'}
            size={30}
            color={Color.primary}
          />
        </TouchableOpacity>
      </View>

      <View style={styles.bodyContainer}>
        <View style={{ padding: 0, paddingLeft: 13, paddingRight: 35 }}>
          <CustomInput
            radius={50}
            placeholder={'Search...'}
            value={searchQuery}
            setValue={setSearchQuery}
          />
        </View>

        <ScrollView style={styles.flatListContainer}>
          <FlatList
            key={viewMode}
            data={filteredProducts}
            keyExtractor={(item) => item.id.toString()}
            renderItem={renderProductItem}
            numColumns={viewMode === 'grid' ? 2 : 1}
            contentContainerStyle={{ padding: 10 }}
          />
        </ScrollView>
      </View>
    </SafeAreaView>
  );
};

export default ProductScreen;

const styles = StyleSheet.create({
  container: {
    width: '100%',
    flexDirecion: 'row',
    backgroundColor: Color.light,
    alignItems: 'center',
    justifyContent: 'flex-start',
    flex: 1,
  },
  topBarContainer: {
    width: '100%',
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: 11,
  },
  toBarText: {
    fontSize: 18,
    fontWeight: '600',
  },
  logo: {
    height: 39,
    width: 40,
    resizeMode: 'contain',
    marginLeft: 10,
  },
  toBarText: {
    fontSize: 20,
    fontFamily: Fonts.SemiBold,
    marginLeft: 10,
    marginRight: 'auto',
  },
  bodyContainer: {
    // flex: 1,
    width: '100%',
    flexDirecion: 'row',
    backgroundColor: Color.light,
    // justifyContent: 'flex-start',
    marginBottom: '30%',
  },
  flatListContainer: {
    // width: '100%',
    // height: '50%',
    // marginTop: 10,
    // marginLeft: 10,
    // padding: 10,
  },

  card: {
    borderWidth: 1,
    elevation: 4,
    borderColor: '#ccc',
    padding: 4,
    margin: 5,
    borderRadius: 10,
    backgroundColor: '#fff',
  },
  descriptionContainer: {
    flexDirection: 'column',
  },

  actionBtns: {
    flexDirection: 'row',
  },
  listCard: {
    width: '96%',
    flexDirection: 'row',
  },
  listImage: {
    width: 140,
    height: 175,
    borderRadius: 10,
    marginRight: 9,
  },
  listContent: {
    flexDirection: 'column',
    flex: 1,
  },
  productName: {
    fontSize: 18,
    fontWeight: 'bold',
    fontFamily: Fonts.SemiBold,
    marginTop: 8,
  },
  productDescription: {
    fontSize: 15,
    color: Color.dark,
    marginTop: 5,
    marginBottom: 4,
  },
  productPrice: {
    fontSize: 17,
    fontWeight: 'bold',
    color: 'green',
    marginTop: 5,
    // marginBottom: 5,
  },
  addToCartBtn: {
    backgroundColor: Color.warning,
    padding: 11,
    paddingHorizontal: 11,
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

  listHeartIcon: {
    position: 'absolute',
    top: 5,
    right: 19,
    padding: 5,
    backgroundColor: Color.gray,
    borderRadius: 5,
  },
});
