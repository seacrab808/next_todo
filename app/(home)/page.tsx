"use client";

import styled from "styled-components";

const Container = styled.div`
  width: 100%;
  max-width: 1150px;
  margin: 25px auto;
  padding: 0 20px;
`;

const InputContainer = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 20px;
  margin-bottom: 20px;
  font-weight: 400;

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
  }
`;

const TodoSection = styled.div`
  display: flex;
  flex-direction: column;
  gap: 15px;

  @media (min-width: 768px) {
    flex-direction: row;
    justify-content: space-between;
  }
`;

const Column = styled.div`
  flex: 1;
`;

const SectionTitle = styled.h2`
  font-size: 18px;
  font-weight: bold;
  margin-bottom: 10px;
  padding: 10px;
  border-radius: 8px;
  text-align: center;
  color: white;

  ${({ theme }) => `
    &.todo {
      background-color: ${theme.colors.lime[300]};
    }
    
    &.done {
      background-color: ${theme.colors.rose[500]};
    }
  `}
`;

const TodoItem = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 10px;
  border: 2px solid ${({ theme }) => theme.colors.slate[300]};
  border-radius: 8px;
  font-size: 16px;
  background-color: white;
  cursor: pointer;
  transition: background 0.3s;

  &:hover {
    background-color: ${({ theme }) => theme.colors.slate[200]};
  }

  &.done {
    background-color: ${({ theme }) => theme.colors.violet[100]};
    text-decoration: line-through;
  }
`;

export default function HomeTodo() {
  return (
    <Container>
      <InputContainer>
        <input type="text" placeholder="할 일을 입력해주세요" />
        <button>+ 추가하기</button>
      </InputContainer>

      <TodoSection>
        <Column>
          <SectionTitle className="todo">TO DO</SectionTitle>
          <TodoItem>비타민 챙겨 먹기</TodoItem>
          <TodoItem>맥주 마시기</TodoItem>
          <TodoItem>운동하기</TodoItem>
        </Column>

        <Column>
          <SectionTitle className="done">DONE</SectionTitle>
          <TodoItem className="done">은행 다녀오기</TodoItem>
          <TodoItem className="done">비타민 챙겨 먹기</TodoItem>
        </Column>
      </TodoSection>
    </Container>
  );
}
