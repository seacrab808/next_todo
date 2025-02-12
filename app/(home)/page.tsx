"use client";

import { useState, useEffect } from "react";
import styled from "styled-components";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { fetchTodos, addTodo, updateTodo } from "../../utils/api";

const Container = styled.div`
  width: 100%;
  max-width: 1200px;
  margin: 25px auto;
  padding: 0 20px;
  box-sizing: border-box;
`;

const InputContainer = styled.div`
  display: flex;
  margin: 0 auto 20px;
  gap: 20px;
  font-weight: 400;
  width: 100%;

  input {
    flex: 1;
    padding: 15px 20px;
    border: 2px solid ${({ theme }) => theme.colors.slate[900]};
    border-radius: 24px;
    font-size: 16px;
    background-color: ${({ theme }) => theme.colors.slate[100]};
    color: ${({ theme }) => theme.colors.slate[900]};
    box-shadow: 4px 4px 0px ${({ theme }) => theme.colors.slate[900]};

    &:focus {
      outline: none;
    }

    &::placeholder {
      color: ${({ theme }) => theme.colors.slate[500]};
    }
  }

  button {
    padding: 14px 40px;
    border: 2px solid ${({ theme }) => theme.colors.slate[900]};
    border-radius: 24px;
    font-size: 16px;
    background-color: ${({ theme }) => theme.colors.slate[200]};
    color: ${({ theme }) => theme.colors.slate[900]};
    box-shadow: 4px 4px 0px ${({ theme }) => theme.colors.slate[900]};

    &:hover {
      cursor: pointer;
      background-color: ${({ theme }) => theme.colors.slate[300]};
      transition: 0.5s;
    }

    @media (max-width: 480px) {
      padding: 14px 20px;
    }
  }
`;

const TodoSection = styled.div`
  display: flex;
  flex-direction: column;
  gap: 25px;

  @media (min-width: 768px) {
    flex-direction: row;
    justify-content: space-between;
  }
`;

const Column = styled.div`
  flex: 1;
  text-align: center;
`;

const TodoHeader = styled.div`
  margin-top: 25px;
  display: flex;
  align-items: center;
  justify-content: flex-start;
  margin-bottom: 15px;
`;

const EmptyPlace = styled.div`
  margin-top: 60px;
  text-align: center;
`;

const EmptyLine = styled.div`
  margin-top: 25px;
  line-height: 20px;
  font-weight: 700;
  color: ${({ theme }) => theme.colors.slate[400]};
  margin-bottom: 25px;
`;

const TodoItem = styled.div`
  display: flex;
  align-items: center;
  padding: 8px;
  border: 2px solid ${({ theme }) => theme.colors.slate[900]};
  border-radius: 27px;
  font-size: 16px;
  font-weight: 400;
  color: ${({ theme }) => theme.colors.slate[800]};
  background-color: white;
  margin-bottom: 10px;
  cursor: pointer;

  &.done {
    background-color: ${({ theme }) => theme.colors.violet[100]};
    text-decoration: line-through;
  }
`;

const CheckBox = styled(Image)`
  cursor: pointer;
  margin-right: 10px;
`;

export default function HomeTodo() {
  const [todo, setTodo] = useState("");
  const [todoList, setTodoList] = useState([]);
  const [doneList, setDoneList] = useState([]);
  const [isMobile, setIsMobile] = useState(false);
  const router = useRouter();

  // 할 일 목록 불러오기
  useEffect(() => {
    async function loadTodos() {
      try {
        const todos = await fetchTodos();
        setTodoList(todos.filter((todo) => !todo.isCompleted)); // 미완료 리스트
        setDoneList(todos.filter((todo) => todo.isCompleted)); // 완료된 리스트
      } catch (error) {
        console.error(error);
      }
    }
    loadTodos();
  }, []);

  // 할 일 추가하기
  const handleAddTodo = async () => {
    if (todo.trim()) {
      try {
        const newTodo = await addTodo(todo);
        setTodoList([...todoList, newTodo]);
        setTodo("");
      } catch (error) {
        console.error(error);
      }
    }
  };

  // 할 일 완료/미완료 상태 변경
  const handleToggleTodo = async (item) => {
    try {
      console.log("📤 할 일 상태 변경 요청:", {
        id: item.id,
        name: item.name,
        isCompleted: !item.isCompleted,
        // memo: item.memo,
        // imageUrl: item.imageUrl,
      });

      const updatedTodo = await updateTodo(
        item.id,
        item.name,
        !item.isCompleted
      );

      console.log("✅ 응답 성공:", updatedTodo);

      // 상태 업데이트
      if (item.isCompleted) {
        setDoneList(doneList.filter((todo) => todo.id !== item.id));
        setTodoList([...todoList, updatedTodo]);
      } else {
        setTodoList(todoList.filter((todo) => todo.id !== item.id));
        setDoneList([...doneList, updatedTodo]);
      }
    } catch (error) {
      console.error("❌ 할 일 상태 변경 중 오류 발생:", error);
    }
  };

  // 상세 페이지로 이동
  const handleNavigate = (itemId) => {
    router.push(`/items/${itemId}`);
  };

  return (
    <Container>
      <InputContainer>
        <input
          type="text"
          placeholder="할 일을 입력해주세요"
          value={todo}
          onChange={(e) => setTodo(e.target.value)}
          onKeyDown={(e) => {
            if (e.key === "Enter") {
              e.preventDefault();
              handleAddTodo();
            }
          }}
        />
        <button onClick={handleAddTodo}>{isMobile ? "+" : "+ 추가하기"}</button>
      </InputContainer>

      <TodoSection>
        {/* TODO */}
        <Column>
          <TodoHeader>
            <Image src="/images/todo.png" alt="TODO" width={101} height={36} />
          </TodoHeader>
          {todoList.length === 0 ? (
            <EmptyPlace>
              <Image
                src="/images/todo_empty.png"
                alt="No tasks"
                width={240}
                height={240}
              />
              <EmptyLine>
                할 일이 없어요.
                <br />
                TODO를 새롭게 추가해주세요!
              </EmptyLine>
            </EmptyPlace>
          ) : (
            todoList.map((item, index) => (
              <TodoItem key={index} onClick={() => handleNavigate(item.id)}>
                <CheckBox
                  src="/images/check_before.png"
                  alt="check"
                  width={32}
                  height={32}
                  onClick={(e) => {
                    e.stopPropagation();
                    handleToggleTodo(item);
                  }}
                />
                {item.name}
              </TodoItem>
            ))
          )}
        </Column>

        {/* DONE */}
        <Column>
          <TodoHeader>
            <Image src="/images/done.png" alt="DONE" width={97} height={36} />
          </TodoHeader>
          {doneList.length === 0 ? (
            <EmptyPlace>
              <Image
                src="/images/done_empty.png"
                alt="No tasks"
                width={240}
                height={240}
              />
              <EmptyLine>
                아직 다 한 일이 없어요.
                <br />
                해야 할 일을 체크해보세요!
              </EmptyLine>
            </EmptyPlace>
          ) : (
            doneList.map((item, index) => (
              <TodoItem
                key={index}
                className="done"
                onClick={() => handleNavigate(item.id)}
              >
                <CheckBox
                  src="/images/check_purple.png"
                  alt="check"
                  width={32}
                  height={32}
                  onClick={(e) => {
                    e.stopPropagation();
                    handleToggleTodo(item);
                  }}
                />
                {item.name}
              </TodoItem>
            ))
          )}
        </Column>
      </TodoSection>
    </Container>
  );
}
