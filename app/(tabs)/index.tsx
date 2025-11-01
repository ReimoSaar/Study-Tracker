import { StyleSheet, View, Text } from 'react-native';
import AddButton from "@/components/AddButton";
import { useStudyContext } from "@/context/StudyContext";
import SubjectCard from "@/components/SubjectCard";

const Index = () => {
  const {subjects} = useStudyContext();

  return (
    <View style={styles.container}>
      {subjects.map(subject => (
        <SubjectCard subject={subject}/>
      ))}
      <Text style={styles.title}>Subjects</Text>
      <View style={styles.separator}/>
    </View>
  );
}

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

export default Index;
