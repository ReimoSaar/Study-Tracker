import IStudySession from "@/types/study-session";
import { Pressable, StyleSheet, Text, View } from "react-native";
import { useStudyContext } from "@/context/StudyContext";
import { formatDate } from "@/helper/date-helper";
import { Ionicons } from "@expo/vector-icons";
import { ERROR_COLOR } from "@/constants/Colors";
import { useState } from "react";
import ConfirmModal from "@/components/ConfirmModal";

interface IProps {
  studySession: IStudySession,
  showSubject: boolean
}

const StudySessionCard = ({studySession, showSubject}: IProps) => {
  const {subjects, removeStudySession} = useStudyContext();
  const subject = subjects.find(s => s.id === studySession.subjectId)!;
  const [showDeleteModal, setShowDeleteModal] = useState<boolean>(false);

  const closeDeleteModal = () => {
    setShowDeleteModal(false);
  }

  const openDeleteModal = () => {
    setShowDeleteModal(true);
  }

  const deleteStudySession = () => {
    removeStudySession(studySession.id);
    closeDeleteModal()
  }


  return (
    <View style={styles.card}>
      <View style={styles.cardTextContainer}>
        {showSubject ? <Text style={styles.subjectName}>{subject.name}</Text> : <></>}
        <View style={styles.textPair}>
          <Text style={styles.keyText}>Date: </Text>
          <Text style={styles.valueText}>{formatDate(new Date(studySession.date))}</Text>
        </View>
        <View style={styles.textPair}>
          <Text style={styles.keyText}>Minutes: </Text>
          <Text style={styles.valueText}>{studySession.duration}</Text>
        </View>
        {studySession.note.trim() !== "" ? <View style={styles.textPair}>
          <Text style={styles.keyText}>Note: </Text>
          <Text style={styles.valueText}>{studySession.note}</Text>
        </View> : <></>}
      </View>
      <Pressable onPressOut={openDeleteModal}>
        <Ionicons size={30} color={ERROR_COLOR} name={"trash-outline"}/>
      </Pressable>
      <ConfirmModal textContent={"Are you sure you want to delete the study session?"} visible={showDeleteModal}
                    onConfirm={deleteStudySession} onCancel={closeDeleteModal}/>
    </View>
  )
}

const styles = StyleSheet.create({
  card: {
    backgroundColor: "#e9f5ff",
    borderStyle: "solid",
    borderWidth: 1,
    padding: 10,
    flexDirection: "row"
  },
  cardTextContainer: {
    flex: 1
  },
  valueText: {
    fontSize: 18
  },
  keyText: {
    fontSize: 18,
    fontWeight: "bold"
  },
  textPair: {
    flexDirection: "row",
    marginLeft: 4
  },
  subjectName: {
    fontSize: 24,
    backgroundColor: "#ffc400",
    alignSelf: "flex-start",
    borderRadius: 20,
    padding: 10
  }
})

export default StudySessionCard;
