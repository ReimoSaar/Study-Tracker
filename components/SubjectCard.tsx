import { Button, StyleSheet, Text, View } from "react-native";
import ISubject from "@/types/subject";
import { Link } from "expo-router";

interface IProps {
  subject: ISubject
}

const SubjectCard = ({subject}: IProps) => {
  return (
    <View style={styles.container}>
      <Text>{subject.name}</Text>
      <Button title={"Edit"} color={"#393e9c"} />
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: "#64bcff",
    flexDirection: "row"
  }
})

export default SubjectCard
