import { StyleSheet, View, Text } from 'react-native';
import AddButton from "@/components/AddButton";
import { useStudyContext } from "@/context/StudyContext";
import SubjectCard from "@/components/SubjectCard";

const Index = () => {
  const {subjects} = useStudyContext();

  return (
    <View style={styles.container}>
      {!subjects.length ? <Text style={styles.title}>Add subjects</Text> :
        subjects.map(subject => (
          <SubjectCard key={subject.id} subject={subject}/>
        ))}
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
