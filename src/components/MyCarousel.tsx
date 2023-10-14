import React, {useState,useRef} from 'react';
import { Text, View, Image, Dimensions, StyleSheet} from 'react-native';
import Carousel, {Pagination} from 'react-native-snap-carousel';
import { useSelector } from 'react-redux';

export const SLIDER_WIDTH = Dimensions.get('window').width;
export const ITEM_WIDTH = Math.round(SLIDER_WIDTH * 0.85);

type dataTypeTest = {
    id: number,
    Name:string,
    ImageReference:string,
    Price: number
}
type iterateData = {
    item: dataTypeTest
}

const renderItem = ({item}:iterateData) =>{
    return (
        <View
      style={{
        borderRadius: 20,
        alignItems: 'center',
      }}>
      <Image source={{uri:item.ImageReference}} style={{width: 320, height: 190, borderRadius: 20}} />
      <View style={[
        styles.cornerLabelLeftUp,
        { backgroundColor: '#2B411C' },
      ]}>
        <Text style={styles.cornerLeftUpName}>
            { item.Name }
          </Text>
      </View>
      <View
          style={[
            styles.cornerLabel,
            { backgroundColor: '#FEBE00' },
          ]}
        >
          <Text style={styles.cornerLabelText}>
            ${ item.Price }
          </Text>
        </View>
    </View>
    )
}
{/* <Pagination
        dotsLength={data.length}
        activeDotIndex={index}
        carouselRef={isCarousel as any}
        dotStyle={{
          width: 10,
          height: 10,
          borderRadius: 5,
          marginHorizontal: 1,
          backgroundColor: '#F4BB41',
        }}
        tappableDots={true}
        inactiveDotStyle={{
          backgroundColor: 'green',
          // Define styles for inactive dots here
        }}
        inactiveDotOpacity={0.4}
        inactiveDotScale={0.6}
      /> */}
const MyCarousel = () => {
    const [index, setIndex] = useState(0);
    const {RecommendedProducts} = useSelector((store: any) => store.ProductRedux)
  const isCarousel = useRef(null);
  return (
     <View>
      <Carousel
        layout={'default'}
        ref={isCarousel}
        data={RecommendedProducts}
        renderItem={renderItem}
        sliderWidth={SLIDER_WIDTH}
        itemWidth={ITEM_WIDTH}
        onSnapToItem={index => setIndex(index)}
        autoplay={true}
        loop={true}
        nestedScrollEnabled
      />
    </View>
  );
};

const styles = StyleSheet.create({
    cornerLabel: {
    position: 'absolute',
    bottom: 0,
    right: 7,
    borderTopLeftRadius: 10,
    borderBottomEndRadius:20,
  },
  cornerLeftUpName: {
    fontSize: 15,
    color: '#fff',
    fontWeight: '600',
    paddingLeft: 9,
    paddingRight: 7,
    paddingTop: 2,
    paddingBottom: 4,
  },
  cornerLabelLeftUp: {
    position: 'absolute',
    top: 0,
    left:7,
    borderTopLeftRadius: 20,
    borderBottomEndRadius:10,
  },
  cornerLabelText: {
    fontSize: 15,
    color: '#fff',
    fontWeight: '600',
    paddingLeft: 5,
    paddingRight: 5,
    paddingTop: 2,
    paddingBottom: 2,
  },
})
export default MyCarousel