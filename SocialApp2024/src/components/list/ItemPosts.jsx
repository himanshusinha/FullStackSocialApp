import {View, Text, Image, TouchableOpacity, StyleSheet} from 'react-native';
import React, {useEffect, useState} from 'react';
import styles from './styles';
import images from '../../constants/images';

const calculateTimeDifference = createdAt => {
  const now = new Date();
  const createdAtDate = new Date(createdAt);
  const timeDifference = now - createdAtDate;
  const seconds = Math.floor(timeDifference / 1000);
  const minutes = Math.floor(seconds / 60);
  const hours = Math.floor(minutes / 60);
  const days = Math.floor(hours / 24);

  if (days > 1) {
    return `${days} days ago`;
  } else if (days === 1) {
    return 'yesterday';
  } else if (hours > 1) {
    return `${hours} hours ago`;
  } else if (hours === 1) {
    return 'an hour ago';
  } else if (minutes > 1) {
    return `${minutes} minutes ago`;
  } else if (minutes === 1) {
    return 'a minute ago';
  } else {
    return 'just now';
  }
};
const ItemPosts = ({item, index}) => {
  const timeAgo = calculateTimeDifference(item.createdAt);

  return (
    <View style={styles.postContainer}>
      <View style={styles.postStyle}>
        <Image
          style={styles.postImage}
          source={{
            uri: 'https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_640.png',
          }}
        />
        <View style={styles.posts}>
          <Text style={styles.postTitle}>{item.caption}</Text>
          <Text style={styles.createdTitle}>{timeAgo}</Text>
        </View>
        <TouchableOpacity onPress={() => {}}>
          <Image style={styles.dotImage} source={images.dots} />
        </TouchableOpacity>
      </View>
      <Image
        style={{width: '100%', height: 200}}
        source={{uri: item.imageUrl}}
      />
      <Text style={styles.captionTitle}>{item.caption}</Text>
    </View>
  );
};

export default ItemPosts;
