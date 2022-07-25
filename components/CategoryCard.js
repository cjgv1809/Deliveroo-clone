import React from "react";
import { View, Text, TouchableOpacity, Image } from "react-native";

const CategoryCard = ({ imgUrl, title }) => {
  return (
    <TouchableOpacity className="relative mr-2">
      <Image source={{ uri: imgUrl }} className="h-24 w-24 rounded-lg" />
      <Text className="absolute top-0 bg-gray-900/50 w-full h-full overflow-hidden rounded-lg pl-1 text-white font-bold">
        {title}
      </Text>
    </TouchableOpacity>
  );
};

export default CategoryCard;
