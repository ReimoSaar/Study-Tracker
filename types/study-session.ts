interface IStudySession {
  id: string;
  subjectId: string;   // references Subject.id
  duration: number;    // in minutes
  date: string;        // ISO date string
  note: string;        // optional study notes
  createdAt: string;   // ISO date string
}

export default IStudySession;
