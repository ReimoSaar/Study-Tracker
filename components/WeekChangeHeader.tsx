import { useState } from "react";
import { StyleSheet, Text, View } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import DateRange from "@/classes/DateRange";
import { formatDate } from "@/helper/date-helper";

interface IProps {
  weekOffset: number,
  setWeekOffset: (offset: number) => void,
}

const WeekChangeHeader = ({weekOffset, setWeekOffset}: IProps) => {
  const dateRange = DateRange.weekWithOffset(weekOffset);
  const iconSize = 40;

  const decreaseWeekOffset = () => {
    setWeekOffset(weekOffset - 1);
  }

  const increaseWeekOffset = () => {
    setWeekOffset(weekOffset + 1);
  };

  return (
    <View style={styles.weekChangeHeader}>
      <Ionicons name={"chevron-back-outline"} size={iconSize} onPress={decreaseWeekOffset}/>
      <Text style={styles.text}>{formatDate(dateRange.dateFrom)} - {formatDate(dateRange.dateTo)}</Text>
      <Ionicons name={"chevron-forward-outline"} size={iconSize} onPress={increaseWeekOffset}/>
    </View>
  )
}

const styles = StyleSheet.create({
  weekChangeHeader: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    backgroundColor: "#fff",
    marginBottom: 20
  },
  text: {
    fontSize: 15,
  }
});

export default WeekChangeHeader;