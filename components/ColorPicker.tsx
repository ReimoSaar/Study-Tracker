import { useEffect, useState } from "react";
import { Pressable, StyleSheet, View } from "react-native";

interface IProps {
  colors: string[];
  selectedColor: string;
  onColorSelected: (color: string) => void;
}

const ColorPicker = ({onColorSelected, selectedColor, colors}: IProps) => (
  <View style={styles.colorPicker}>
    {colors.map((color, i) =>
      <Pressable
        key={i}
        style={[
          styles.color,
          {backgroundColor: color},
          color === selectedColor && styles.selected
        ]}
        onPressOut={() => onColorSelected(color)}
      />
    )}
  </View>
)

const styles = StyleSheet.create({
  colorPicker: {
    flexDirection: "row",
    gap: 5,
    alignSelf: "flex-start",
  },
  color: {
    borderRadius: "50%",
    width: 30,
    height: 30,
  },
  selected: {
    borderStyle: "solid",
    borderColor: "#505050",
    borderWidth: 4,
  }
})

export default ColorPicker;