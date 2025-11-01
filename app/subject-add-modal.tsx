import { StatusBar } from 'expo-status-bar';
import { StyleSheet, View, Text, Button } from 'react-native';
import { useStudyContext } from "@/context/StudyContext";
import Uuid from "expo-modules-core/src/uuid";

const SubjectAddModal = () => {
  const studyContext = useStudyContext()
  return (
    <View style={styles.container}>
      <Text style={styles.title}>Modal</Text>
      <Button title={"asasd"} onPress={() => {
        studyContext.addSubject({
          id: Math.random().toString(),
          createdAt: "",
          name: "asDDSasd",
          weeklyGoal: 0,
        })
      }}/>
      <View style={styles.separator}/>
    </View>
  );
}

export default SubjectAddModal

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  title: {
    fontSize: 20,
    fontWeight: 'bold',
  },
  separator: {
    marginVertical: 30,
    height: 1,
    width: '80%',
  },
});
