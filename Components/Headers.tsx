import { useNavigation } from '@react-navigation/native';
import React, { useState } from 'react';
import {
  Image,
  Modal,
  Pressable,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';
import { useAuth } from '../context/authContext';
import ConfirmModal from './ConfirmModal';

const Header = () => {
  const [visible, setVisible] = useState(false);
  const navigation = useNavigation();
  const [roleModalVisible, setRoleModalVisible] = useState(false);
  const {userInfo, handleLogout}: any = useAuth();

  return (
    <View style={styles.container}>
      <View style={styles.innerContainer}>
        <Image source={require('../assets/images.jpeg')} style={styles.image} />
      </View>

      {userInfo && (
        <View style={styles.rightContainer}>
          <Pressable onPress={() => setRoleModalVisible(true)}>
            <Icon name="user" size={28} color="#000" />;
          </Pressable>
          <Pressable onPress={() => setVisible(true)}>
            <Icon name="log-out" size={28} color="#000" />
          </Pressable>
        </View>
      )}
      <ConfirmModal
        text1="Logout"
        text2="Are you sure want to logout?"
        visible={visible}
        onCancel={() => setVisible(false)}
        onConfirm={() => {
          handleLogout();
          setVisible(false);
        }}
      />

      <Modal
        visible={roleModalVisible}
        transparent
        animationType="slide"
        onRequestClose={() => setRoleModalVisible(false)}>
        <View style={styles.modalOverlay}>
          <View style={styles.modalContainer}>
            <Text style={styles.modalTitle}>Select Role</Text>
            <TouchableOpacity
              onPress={() => {
                navigation.navigate('Admin' as never);
                setRoleModalVisible(false);
              }}
              style={styles.modalItem}>
              <Text style={[styles.modalItemText]}>Admin</Text>
            </TouchableOpacity>
            <TouchableOpacity
              onPress={() => {
                navigation.navigate('Tabs' as never);
                setRoleModalVisible(false);
              }}
              style={styles.modalItem}>
              <Text style={[styles.modalItemText]}>Client</Text>
            </TouchableOpacity>
          </View>
        </View>
      </Modal>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    padding: 10,
    backgroundColor: '#fff',
    borderBottomWidth: 1,
    borderBottomColor: '#ddd',
    zIndex: 2,
    gap: 10,
  },
  modalItemText: {
    fontSize: 16,
    textAlign: 'center',
    color: 'blue',
    fontWeight: 'bold',
  },
  modalOverlay: {
    flex: 1,
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  modalContainer: {
    backgroundColor: '#fff',
    borderRadius: 10,
    padding: 20,
    width: '80%',
  },
  modalTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 10,
    textAlign: 'center',
  },
  modalItem: {
    paddingVertical: 10,
  },
  innerContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    padding: 10,
    backgroundColor: '#fff',
    borderBottomColor: '#ddd',
  },
  rightContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginHorizontal: 10,
    gap: 15,
  },
  iconContainer: {
    padding: 5,
    marginHorizontal: 10,
  },
  image: {
    height: 30,
    marginRight: 10,
    width: 130,
  },
  textContainer: {
    marginLeft: -10,
  },
  title: {
    fontSize: 13,
    fontWeight: 'bold',
  },
  searchInput: {
    padding: 10,
    borderColor: '#ddd',
    borderWidth: 1,
    borderRadius: 5,
    backgroundColor: '#f9f9f9',
    marginVertical: 10,
    width: '75%',
  },
});

export default Header;
