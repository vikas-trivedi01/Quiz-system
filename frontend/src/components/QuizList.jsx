import ListItem from "./ListItem";

const QuizList = () => {
  return (
    <>
      <h4 className="text-center mt-5">
        Here are different quizzes which you can join easily
      </h4>

      <ListItem
        quizName="Intro to Algorithms"
        numberOfQuestions={10}
        totalMarks={100}
        quizTakersCount={125}
        category="Computer Science"
        difficulty="Medium"
        createdBy="Alice"
      />

      <ListItem
        quizName="Basic Mathematics"
        numberOfQuestions={15}
        totalMarks={150}
        quizTakersCount={230}
        category="Mathematics"
        difficulty="Easy"
        createdBy="Bob"
      />

      <ListItem
        quizName="World History Quiz"
        numberOfQuestions={12}
        totalMarks={120}
        quizTakersCount={869}
        category="History"
        difficulty="Hard"
        createdBy="Carol"
      />
    </>
  );
};

export default QuizList;
