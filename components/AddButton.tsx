import { Button, Pressable, StyleSheet, Text, View } from "react-native";
import FontAwesome from "@expo/vector-icons/FontAwesome";
import Colors, { PRIMARY_COLOR } from "@/constants/Colors";
import { Link } from "expo-router";
import React from "react";
import { Href } from "expo-router/build/types";

interface IProps {
  href: Href
}

const AddButton = (props: IProps) => {
  return (
      <Link href={props.href} asChild>
        <Pressable>
          {({pressed}) => (
            <Text style={styles.text}>Add</Text>
          )}
        </Pressable>
      </Link>
  )
}

const styles = StyleSheet.create({
  text: {
    fontSize: 24,
    color: "#ffffff",
    paddingHorizontal: 12,
    paddingVertical: 5,
    borderRadius: 12,
    backgroundColor: PRIMARY_COLOR,
    marginRight: 6
  }
})

export default AddButton
