"use client";

import { useState, useEffect } from "react";
import styled from "styled-components";
import Image from "next/image";

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

  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth <= 480);
    };

    handleResize();
    window.addEventListener("resize", handleResize);

    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  const handleAddTodo = () => {
    if (todo.trim()) {
      setTodoList([...todoList, todo]);
      setTodo("");
    }
  };

  const handleKeyPress = (e) => {
    if (e.key === "Enter") {
      handleAddTodo();
    }
  };

  const handleToggleTodo = (index) => {
    const item = todoList[index];
    setTodoList(todoList.filter((_, i) => i !== index));
    setDoneList([...doneList, item]);
  };

  const handleToggleDone = (index) => {
    const item = doneList[index];
    setDoneList(doneList.filter((_, i) => i !== index));
    setTodoList([...todoList, item]);
  };

  return (
    <Container>
      <InputContainer>
        <input 
          type="text" 
          placeholder="할 일을 입력해주세요" 
          value={todo} 
          onChange={(e) => setTodo(e.target.value)}
          onKeyPress={handleKeyPress}
        />
        <button onClick={handleAddTodo}>{isMobile ? "+" : "+ 추가하기"}</button>
      </InputContainer>

      <TodoSection>
        <Column>
          <TodoHeader>
            <Image src="/images/todo.png" alt="TODO" width={101} height={36} />
          </TodoHeader>
          {todoList.length === 0 ? (
            <EmptyPlace>
              <Image src="/images/todo_empty.png" alt="No tasks" width={240} height={240} />
              <EmptyLine>할 일이 없어요.<br />TODO를 새롭게 추가해주세요!</EmptyLine>
            </EmptyPlace>
          ) : (
            todoList.map((item, index) => (
              <TodoItem key={index}>
                <CheckBox src="/images/check_before.png" alt="check" width={32} height={32} onClick={() => handleToggleTodo(index)} />
                {item}
              </TodoItem>
            ))
          )}
        </Column>

        <Column>
          <TodoHeader>
            <Image src="/images/done.png" alt="DONE" width={97} height={36} />
          </TodoHeader>
          {doneList.length === 0 ? (
            <EmptyPlace>
              <Image src="/images/done_empty.png" alt="No tasks" width={240} height={240} />
              <EmptyLine>아직 다 한 일이 없어요.<br />해야 할 일을 체크해보세요!</EmptyLine>
            </EmptyPlace>
          ) : (
            doneList.map((item, index) => (
              <TodoItem key={index} className="done">
                <CheckBox src="/images/check_purple.png" alt="check" width={32} height={32} onClick={() => handleToggleDone(index)} />
                {item}
              </TodoItem>
            ))
          )}
        </Column>
      </TodoSection>
    </Container>
  );
}
