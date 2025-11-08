import { FlatList, StyleSheet, Text, View } from 'react-native';
import { useStudyContext } from "@/context/StudyContext";
import React from "react";
import StudySessionCard from "@/components/StudySessionCard";
import IStudySession from "@/types/study-session";

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
      {studySessions.length ? <FlatList
        style={styles.studySessionsList}
        data={studySessions}
        keyExtractor={(item) => item.id}
        ItemSeparatorComponent={() => <View style={{height: 20}} />}
        renderItem={
          (itemData) => {
            const s: IStudySession = itemData.item;
            return (
              <StudySessionCard key={s.id} studySession={s} showSubject={true}/>
            )
          }
        }
      /> : <></>}
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
  studySessionsList: {
    width: "90%"
  }
});

export default StudySessions;
