import { StyleSheet, View } from "react-native";

interface IProps {
  progress: number,
}

const ProgressBar = ({progress}: IProps) => {
  const actualProgress = progress > 1 ? 1 : progress;

  return (
    <View style={styles.progressBar}>
      <View style={[styles.completedLine, {width: `${actualProgress * 100}%`}]}></View>
      <View style={[styles.uncompletedLine, {width: `${100 - actualProgress * 100}%`}]}></View>
    </View>
  )
}

const styles = StyleSheet.create({
  progressBar: {
    width: "100%",
    flexDirection: "row",
  },
  completedLine: {
    backgroundColor: "#0d6e00",
    height: 10,
  },
  uncompletedLine: {
    backgroundColor: "#bc0000",
  }
})

export default ProgressBar;