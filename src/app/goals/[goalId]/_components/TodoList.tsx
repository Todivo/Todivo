import TodoItem from "./TodoItem";

function TodoList() {
  return (
    <ul className="flex flex-col gap-2">
      <TodoItem title="로그인/회원가입 폼 만들기" />
      <TodoItem title="자바스크립트로 동적 인터랙션 추가" />
      <TodoItem title="자바스크립트 기초 챕터2 듣기" />
      <TodoItem title="자바스크립트 기초 챕터1 듣기" />
    </ul>
  );
}
export default TodoList;
