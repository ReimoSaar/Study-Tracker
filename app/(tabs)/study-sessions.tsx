import { StyleSheet, View, Text } from 'react-native';
import { useStudyContext } from "@/context/StudyContext";

const StudySessions = () => {
  const {subjects, studySessions} = useStudyContext();

  const InitialMessage = (): React.ReactElement => {
    if (!subjects.length) {
      return <Text style={styles.title}>Add subjects</Text>
    } else if (!studySessions.length) {
      return <Text style={styles.title}>Add study sessions</Text>
    }
    return <></>
  }

  return (
    <View style={styles.container}>
      <InitialMessage/>
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

export default StudySessions;
