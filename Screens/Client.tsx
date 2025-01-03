import DatePicker from '@react-native-community/datetimepicker';
import { Picker } from '@react-native-picker/picker';
import { useNavigation } from '@react-navigation/native';
import axios from 'axios';
import React, { useEffect, useState } from 'react';
import {
  Image,
  Pressable,
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from 'react-native';
import { useEventContext } from '../context/eventContext';
export default function Client() {
  const navigation = useNavigation<any>();
  interface Event {
    _id: string;
    image: string[];
    title: string;
    description: string;
    date: string;
    location: string;
    price: number;
    seats: number;
    category: string[];
  }
  const {setMadeEvents}: any = useEventContext();
  const [events, setEvents] = useState<Event[]>([]);
  const [filteredEvents, setFilteredEvents] = useState(events);
  useEffect(() => {
    const fetchEvents = async () => {
      const response = await axios.get(
        'https://eventsapi-umam.onrender.com/api/events/public',
      );
      setEvents(response.data);
      setFilteredEvents(response.data);
    };
    fetchEvents();
  }, []);

  const [date, setDate] = useState<Date | undefined>(undefined);
  const [category, setCategory] = useState('');
  const [location, setLocation] = useState('');

  const applyFilters = () => {
    setFilteredEvents(
      events.filter(
        event =>
          (!date || event.date.includes(date.toISOString().split('T')[0])) &&
          (category === '' || event.category.includes(category)) &&
          (location === '' ||
            event.location.toLowerCase().includes(location.toLowerCase())),
      ),
    );
  };

  const [showPicker, setShowPicker] = useState(false);

  const onChange = (selectedDate: any) => {
    setShowPicker(false);
    if (selectedDate) setDate(new Date(selectedDate.nativeEvent.timestamp));
  };

  return (
    <View style={styles.container}>
      <View style={styles.filters}>
        <TouchableOpacity
          style={styles.date}
          onPress={() => setShowPicker(true)}>
          <Text style={{color: '#fff', fontWeight: '700'}}>Date</Text>
        </TouchableOpacity>
        {showPicker && (
          <DatePicker
            value={date || new Date()}
            mode="date"
            display="default"
            onChange={onChange}
          />
        )}
        <Picker
          selectedValue={category}
          style={styles.picker}
          onValueChange={(itemValue: any) => setCategory(itemValue)}>
          <Picker.Item label="Select Category" value="" enabled={false} />
          {[
            'Corporate Event',
            'Social Event',
            'Entertainment Event',
            'Educational Event',
            'Sports Event',
            'Community Event',
            'Professional Development Event',
            'Tech-Related Event',
            'Other',
          ].map(type => (
            <Picker.Item key={type} label={type} value={type} />
          ))}
        </Picker>
        <TextInput
          style={styles.input}
          placeholder="Location"
          value={location}
          onChangeText={setLocation}
        />
        <Pressable style={styles.date} onPress={applyFilters}>
          <Text style={{color: '#fff', fontWeight: '700'}}>Apply</Text>
        </Pressable>
      </View>
      <ScrollView>
        {filteredEvents.map((event, index) => (
          <Pressable
            onPress={() => {
              setMadeEvents(event);
              navigation.navigate("Event")
            }}
            key={index}
            style={styles.card}>
            <Image source={{uri: event.image[0]}} style={styles.image} />
            <Text style={styles.title}>{event.title}</Text>
            <Text style={styles.description}>{event.description}</Text>
            <Text style={styles.detail}>
              <Text style={styles.label}>Date: </Text>
              {event.date.split('T')[0]}
            </Text>
            <Text style={styles.detail}>
              <Text style={styles.label}>Location: </Text>
              {event.location}
            </Text>
            <Text style={styles.detail}>
              <Text style={styles.label}>Price: </Text>
              {event.price}
            </Text>
            <Text style={styles.detail}>
              <Text style={styles.label}>Seats: </Text>
              {event.seats}
            </Text>
            <Text style={styles.detail}>
              <Text style={styles.label}>Category: </Text>
              {event.category.join(', ')}
            </Text>
          </Pressable>
        ))}
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f8f9fa',
    padding: 10,
  },
  date: {
    flex: 1,
    width: 50,
    height: 40,
    marginRight: 5,
    backgroundColor: '#007bff',
    color: '#fff',
    borderRadius: 8,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 10,
  },
  heading: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 10,
  },
  filters: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginBottom: 10,
  },
  datePicker: {
    flex: 1,
    marginRight: 5,
  },
  picker: {
    flex: 1,
    height: 40,
    marginRight: 5,
  },
  input: {
    flex: 1,
    borderColor: '#ccc',
    borderWidth: 1,
    borderRadius: 8,
    paddingHorizontal: 10,
    height: 40,
    backgroundColor: '#fff',
    marginRight: 5,
  },
  card: {
    backgroundColor: '#fff',
    borderRadius: 8,
    padding: 15,
    marginVertical: 10,
    shadowColor: '#000',
    shadowOffset: {width: 0, height: 2},
    shadowOpacity: 0.1,
    shadowRadius: 3,
    elevation: 3,
  },
  image: {
    width: '100%',
    height: 150,
    borderRadius: 8,
    marginBottom: 10,
  },
  title: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 5,
  },
  description: {
    fontSize: 14,
    color: '#6c757d',
    marginBottom: 10,
  },
  detail: {
    fontSize: 14,
    marginBottom: 5,
  },
  label: {
    fontWeight: 'bold',
    color: '#495057',
  },
});
