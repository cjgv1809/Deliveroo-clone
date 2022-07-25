import React, { useState } from "react";
import { View, Text, TouchableOpacity, Image, Button } from "react-native";
import Currency from "react-currency-formatter";
import { getImageUrl } from "../sanity";
import { MinusCircleIcon, PlusCircleIcon } from "react-native-heroicons/solid";
import { useDispatch, useSelector } from "react-redux";
import {
  addToBasket,
  clearBasket,
  removeFromBasket,
  selectBasketItems,
  selectBasketItemsWithId,
} from "../slices/basketSlice";

const DishRow = ({ id, name, description, price, image }) => {
  const [isPressed, setIsPressed] = useState(false);
  const items = useSelector((state) => selectBasketItemsWithId(state, id));
  const dispatch = useDispatch();

  const addItemToBasket = () => {
    dispatch(addToBasket({ id, name, description, price, image }));
  };

  const removeItemFromBasket = () => {
    if (!items.length > 0) return;

    dispatch(removeFromBasket({ id }));
  };

  const clearItemsFromBasket = () => {
    dispatch(clearBasket());
  };

  return (
    <>
      <View
        className={`bg-white border p-4 border-gray-200 ${
          isPressed && "border-b-0"
        }`}
      >
        <View className="flex-row">
          <View className="flex-1 pr-2">
            <Text className="text-lg font-semibold mb-1">{name}</Text>
            <Text className="text-gray-400">{description}</Text>
            <Text className="text-gray-400 mt-2">
              <Currency quantity={price} currency="USD" />
            </Text>

            <TouchableOpacity
              onPress={() => {
                addItemToBasket();
                setIsPressed(true);
              }}
              className="rounded-lg mt-2 bg-[#00CCBB]"
            >
              <Text className="px-4 py-3 font-bold text-white text-center">
                Add to Basket
              </Text>
            </TouchableOpacity>

            <TouchableOpacity
              onPress={() => {
                clearItemsFromBasket();
                setIsPressed(false);
              }}
              disabled={!items.length}
              className={`rounded-lg mt-2 border ${
                items.length > 0 ? "border-[#00CCBB]" : "border-gray-200"
              }`}
            >
              <Text
                className={`px-4 py-3 font-bold text-center ${
                  items.length > 0 ? "text-[#00CCBB]" : "text-gray-200"
                }`}
              >
                Remove all items from Basket
              </Text>
            </TouchableOpacity>
          </View>

          <View>
            <Image
              source={{ uri: getImageUrl(image).url() }}
              className="h-20 w-20 bg-gray-300 p-4 object-cover"
              style={{ borderWidth: 1, borderColor: "#F3F3F4" }}
            />
          </View>
        </View>
      </View>

      {isPressed && (
        <View className="bg-white px-4">
          <View className="flex-row items-center space-x-2 pb-3">
            <TouchableOpacity
              onPress={removeItemFromBasket}
              disabled={!items.length}
            >
              <MinusCircleIcon
                size={40}
                color={items.length > 0 ? "#00CCBB" : "gray"}
              />
            </TouchableOpacity>

            <Text className="text-lg font-semibold">{items.length}</Text>

            <TouchableOpacity onPress={addItemToBasket}>
              <PlusCircleIcon size={40} color="#00CCBB" />
            </TouchableOpacity>
          </View>
        </View>
      )}
    </>
  );
};

export default DishRow;
