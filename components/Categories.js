import React, { useEffect, useState } from "react";
import { View, Text, ScrollView } from "react-native";
import sanityClient, { getImageUrl } from "../sanity";
import CategoryCard from "./CategoryCard";

const Categories = () => {
  const [categories, setCategories] = useState([]);

  useEffect(() => {
    sanityClient
      .fetch(`*[_type == "category"]`)
      .then((data) => {
        setCategories(data);
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);

  return (
    <ScrollView
      horizontal
      showsHorizontalScrollIndicator={false}
      contentContainerStyle={{ paddingHorizontal: 15, paddingTop: 10 }}
    >
      {categories?.map((category) => (
        <CategoryCard
          key={category._id}
          imgUrl={getImageUrl(category.image).width(200).url()}
          title={category.name}
        />
      ))}
    </ScrollView>
  );
};

export default Categories;
