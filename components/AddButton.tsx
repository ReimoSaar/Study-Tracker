import { Button, Pressable, StyleSheet, Text, View } from "react-native";
import FontAwesome from "@expo/vector-icons/FontAwesome";
import Colors, { SUCCESS_COLOR, SUCCESS_DISABLED_COLOR } from "@/constants/Colors";
import { Link } from "expo-router";
import React from "react";
import { Href } from "expo-router/build/types";

interface IProps {
  href: Href,
  disabled?: boolean
}

const AddButton = (props: IProps) => {
  return (
    <Link disabled={props.disabled} href={props.href} asChild>
      <Pressable>
        {() => (
          <Text
            style={[styles.text, {backgroundColor: props.disabled ? SUCCESS_DISABLED_COLOR : SUCCESS_COLOR}]}>Add</Text>
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
    backgroundColor: SUCCESS_COLOR,
    marginRight: 6
  }
})

export default AddButton
