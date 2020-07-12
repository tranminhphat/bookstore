import * as React from 'react';
import {View, Text, Dimensions, ScrollView} from 'react-native';
import {
  LineChart,
  BarChart,
  PieChart,
  ProgressChart,
  ContributionGraph,
  StackedBarChart,
} from 'react-native-chart-kit';
import Firebase from '../../Firebase';
import LinearGradient from 'react-native-linear-gradient';
import Styles from './styles';

const bookData = [
  {
    name: '1Q84',
    population: 10,
    color: '#8fcfd1',
    legendFontColor: '#7F7F7F',
    legendFontSize: 15,
  },
  {
    name: 'Color Book',
    population: 20,
    color: '#df5e88',
    legendFontColor: '#7F7F7F',
    legendFontSize: 15,
  },
  {
    name: 'Đắc nhân tâm',
    population: 12,
    color: '#f6ab6c',
    legendFontColor: '#7F7F7F',
    legendFontSize: 15,
  },
  {
    name: 'Homo Deus',
    population: 9,
    color: '#f6efa6',
    legendFontColor: '#7F7F7F',
    legendFontSize: 15,
  },
  {
    name: 'Nhà giả kim',
    population: 7,
    color: '#99b898',
    legendFontColor: '#7F7F7F',
    legendFontSize: 15,
  },
  {
    name: 'Sapiens',
    population: 4,
    color: '#feceab',
    legendFontColor: '#7F7F7F',
    legendFontSize: 15,
  },
  {
    name: 'Trên đường băng',
    population: 3,
    color: '#ff847c',
    legendFontColor: '#7F7F7F',
    legendFontSize: 15,
  },
];
const catalogData = {
  labels: ['Tất cả', 'Sách khoa học', 'Sách tổng hợp'],
  data: [1, 1 / 7, 6 / 7],
};
const userData = {
  labels: ['Admin', 'Client'],
  datasets: [
    {
      data: [2, 1],
    },
  ],
};

export default function RevenueStatistic() {
  var temp = [];
  Firebase.database()
    .ref('order')
    .on('value', data => {
      data.forEach(childData => {
        temp.push(childData.child('total').toJSON());
      });
    });
  return (
    <ScrollView>
      <LinearGradient
        start={{x: 0, y: 0}}
        end={{x: 1, y: 0}}
        style={Styles.linearGradienth2}
        colors={['#fce38a', '#EDDE5D', '#E7E9BB']}>
        <Text style={Styles.headerText}>Statistic</Text>
      </LinearGradient>
      <View>
        <Text style={Styles.headerText}>Biểu đồ doanh thu theo tháng</Text>
        <LineChart
          data={{
            labels: ['1', '2', '3', '4', '5', '6', '7'],
            datasets: [
              {
                data: [460, 90, 10, 200, 140, 80, 45],
              },
            ],
          }}
          width={Dimensions.get('window').width} // from react-native
          height={220}
          yAxisSuffix="k"
          yAxisInterval={1} // optional, defaults to 1
          chartConfig={{
            backgroundColor: '#e26a00',
            backgroundGradientFrom: '#fb8c00',
            backgroundGradientTo: '#ffa726',
            decimalPlaces: 2, // optional, defaults to 2dp
            color: (opacity = 1) => `rgba(255, 255, 255, ${opacity})`,
            labelColor: (opacity = 1) => `rgba(255, 255, 255, ${opacity})`,
            style: {
              borderRadius: 16,
            },
            propsForDots: {
              r: '7',
              strokeWidth: '2',
              stroke: '#ffa726',
            },
          }}
          bezier
          style={{
            marginVertical: 8,
            borderRadius: 16,
          }}
        />
      </View>
      <View>
        <Text style={Styles.headerText}>
          Biểu đồ thống kê sách theo lượt mua
        </Text>
        <View>
          <PieChart
            data={bookData}
            width={Dimensions.get('window').width}
            height={220}
            chartConfig={{
              backgroundColor: '#e26a00',
              backgroundGradientFrom: '#fb8c00',
              backgroundGradientTo: '#ffa726',
              decimalPlaces: 2, // optional, defaults to 2dp
              color: (opacity = 1) => `rgba(255, 255, 255, ${opacity})`,
              labelColor: (opacity = 1) => `rgba(255, 255, 255, ${opacity})`,
              style: {
                borderRadius: 16,
              },
              propsForDots: {
                r: '6',
                strokeWidth: '2',
                stroke: '#ffa726',
              },
            }}
            accessor="population"
            backgroundColor="transparent"
            paddingLeft="15"
            absolute
          />
        </View>
      </View>
      <View>
        <Text style={Styles.headerText}>
          Biểu đồ thống kê sách theo lượt mua
        </Text>
        <ProgressChart
          data={catalogData}
          width={Dimensions.get('window').width}
          height={220}
          strokeWidth={16}
          radius={32}
          chartConfig={{
            backgroundColor: '#e26a00',
            backgroundGradientFrom: '#ffa931',
            backgroundGradientTo: '#fa7d09',
            decimalPlaces: 2, // optional, defaults to 2dp
            color: (opacity = 1) => `rgba(255, 255, 255, ${opacity})`,
            labelColor: (opacity = 1) => `rgba(255, 255, 255, ${opacity})`,
            style: {
              borderRadius: 16,
            },
            propsForDots: {
              r: '6',
              strokeWidth: '2',
              stroke: '#ffa726',
            },
          }}
          hideLegend={false}
        />
      </View>
      <View>
        <Text style={Styles.headerText}>Biểu đồ thống kê tài khoản</Text>
        <BarChart
          data={userData}
          width={Dimensions.get('window').width}
          height={220}
          chartConfig={{
            backgroundColor: '#e26a00',
            backgroundGradientFrom: '#0fabbc',
            backgroundGradientTo: '#12cad6',
            decimalPlaces: 2, // optional, defaults to 2dp
            color: (opacity = 1) => `rgba(59, 20, 210)`,
            labelColor: (opacity = 1) => `rgba(255, 255, 255, ${opacity})`,
            style: {
              borderRadius: 16,
            },
            propsForDots: {
              r: '1',
              strokeWidth: '2',
              stroke: '#ffa726',
            },
          }}
          verticalLabelRotation={0}
        />
      </View>
    </ScrollView>
  );
}
