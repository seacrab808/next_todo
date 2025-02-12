"use client";

import { useState, useEffect, useRef } from "react";
import { useRouter, useParams } from "next/navigation";
import styled from "styled-components";
import Image from "next/image";
import {
  fetchTodoById,
  updateTodo,
  deleteTodo,
  uploadImage,
} from "../../../../utils/api";

const Container = styled.div`
  width: 90%;
  max-width: 1200px;
  margin: 0 auto;
  padding-top: 20px;
  box-sizing: border-box;
  display: flex;
  flex-direction: column;
  align-items: center;
  background-color: #fff;

  @media (max-width: 768px) {
    width: 95%;
    padding-top: 15px;
  }
`;

const TitleWrap = styled.div<{ isCompleted: boolean }>`
  width: 100%;
  max-width: 996px;
  border: 2px solid ${({ theme }) => theme.colors.slate[900]};
  margin-bottom: 20px;
  border-radius: 24px;
  display: flex;
  justify-content: center;
  align-items: center;
  margin: 0 auto;
  padding: 10px;
  font-size: 20px;
  font-weight: 700;
  box-sizing: border-box;

  background-color: ${({ isCompleted }) => (isCompleted ? "#D6BBFC" : "#fff")};
  text-decoration: ${({ isCompleted }) =>
    isCompleted ? "line-through" : "underline"};
`;

const TitleInput = styled.input`
  width: 100%;
  max-width: 996px;
  font-size: 20px;
  font-weight: 700;
  text-align: center;
  background-color: transparent;
  border: none;
  outline: none;
  color: ${({ theme }) => theme.colors.slate[900]};
`;

const ContentWrapper = styled.div`
  box-sizing: border-box;
  margin-top: 20px;
  display: flex;
  gap: 20px;
  width: 100%;
  max-width: 996px;
  justify-content: center;
  align-items: flex-start;

  @media (max-width: 1024px) {
    flex-direction: column;
    align-items: center;
  }
`;

const ImageContainer = styled.div`
  box-sizing: border-box;
  position: relative;
  width: 40%;
  max-width: 400px;
  height: 311px;
  display: flex;
  justify-content: center;
  align-items: center;
  background-color: ${({ theme }) => theme.colors.slate[50]};
  border: 2px dashed ${({ theme }) => theme.colors.slate[300]};
  border-radius: 24px;
  overflow: hidden;

  @media (max-width: 1024px) {
    width: 100%;
    max-width: 100%;
  }
`;

const DefaultImage = styled.img`
  width: 64px;
  height: 64px;
`;

const UploadedImage = styled.img`
  width: 100%;
  height: 100%;
  object-fit: cover;
`;

const UploadButton = styled.div<{ hasImage: boolean }>`
  position: absolute;
  bottom: 10px;
  right: 10px;
  width: 64px;
  height: 64px;
  cursor: pointer;
  border-radius: 50%;
  background-color: ${({ hasImage, theme }) =>
    hasImage ? theme.colors.slate[900] + "70" : theme.colors.slate[200]};
  border: ${({ hasImage, theme }) =>
    hasImage ? `1px solid ${theme.colors.slate[900]}` : "none"};
  display: flex;
  justify-content: center;
  align-items: center;
`;

const UploadIcon = styled.img`
  width: 24px;
  height: 24px;
`;

const HiddenFileInput = styled.input`
  display: none;
`;

const MemoContainer = styled.div`
  box-sizing: border-box;
  width: 60%;
  height: 311px;
  padding: 15px;
  background-image: url("/images/memo.png");
  background-size: cover;
  background-position: center;
  border-radius: 24px;

  @media (max-width: 1024px) {
    width: 100%;
  }
`;

const MemoTitle = styled.h3`
  font-size: 16px;
  font-weight: 800;
  color: ${({ theme }) => theme.colors.amber[800]};
  text-align: center;
  margin-bottom: 10px;
`;

const MemoTextArea = styled.textarea`
  box-sizing: border-box;
  width: 100%;
  height: 90%;
  padding: 10px;
  border: none;
  font-size: 16px;
  font-weight: 400;
  color: ${({ theme }) => theme.colors.slate[500]};
  background: transparent;
  resize: none;
  outline: none;
  overflow-y: auto;

  &::placeholder {
    color: ${({ theme }) => theme.colors.slate[500]};
  }
`;

const ButtonGroup = styled.div`
  display: flex;
  gap: 10px;
  margin-top: 20px;
  width: 100%;
  max-width: 996px;

  @media (max-width: 1024px) {
    justify-content: center;
  }

  @media (min-width: 1025px) {
    justify-content: flex-end;
  }
`;

const Button = styled.img`
  width: 168px;
  height: 56px;
  cursor: pointer;
`;

const ButtonImage = styled.img`
  width: 168px;
  height: 56px;
  cursor: pointer;
`;

const CheckBox = styled(Image)`
  cursor: pointer;
  margin-right: 10px;
`;

export default function ItemPage() {
  const { id } = useParams();
  const router = useRouter();
  const [todo, setTodo] = useState<any>(null);
  const [memo, setMemo] = useState("");
  const [imageUrl, setImageUrl] = useState("");
  const [isEditing, setIsEditing] = useState(false);
  const [title, setTitle] = useState("");
  const fileInputRef = useRef<HTMLInputElement | null>(null);
  const [hasChanges, setHasChanges] = useState(false);

  useEffect(() => {
    if (!id) return;
    async function loadTodo() {
      try {
        const fetchedTodo = await fetchTodoById(Number(id));
        setTodo(fetchedTodo);
        setTitle(fetchedTodo.name || "");
        setMemo(fetchedTodo.memo || "");
        setImageUrl(fetchedTodo.imageUrl || "");
      } catch (error) {
        console.error("❌ 할 일 불러오기 실패:", error);
      }
    }
    loadTodo();
  }, [id]);

  useEffect(() => {
    if (!todo) return;
    setHasChanges(
      title !== todo.name || memo !== todo.memo || imageUrl !== todo.imageUrl
    );
  }, [title, memo, imageUrl, todo]);

  const handleTitleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setTitle(e.target.value);
    setHasChanges(true);
  };

  const handleTitleBlur = async () => {
    setIsEditing(false);
    if (!todo || title === todo.name) return;

    try {
      await updateTodo(todo.id, title, todo.isCompleted, memo, imageUrl);
      setTodo((prev: any) => ({ ...prev, name: title }));
      setHasChanges(false);
    } catch (error) {
      console.error("❌ 제목 수정 실패:", error);
    }
  };

  const handleTitleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter") {
      e.preventDefault();
      handleTitleBlur();
    }
  };

  const handleImageUpload = async (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    const file = event.target.files?.[0];
    if (!file) return;

    try {
      const uploadedImage = await uploadImage(file);
      setImageUrl(uploadedImage.url);
      console.log("✅ 업로드된 이미지 URL:", uploadedImage.url);
    } catch (error) {
      console.error("❌ 이미지 업로드 실패:", error);
    }
  };

  const handleUploadButtonClick = () => {
    fileInputRef.current?.click();
  };

  const handleSave = async () => {
    try {
      console.log("📤 저장 요청:", { id: todo.id, title, memo, imageUrl });

      await updateTodo(todo.id, title, todo.isCompleted, memo, imageUrl);

      setTodo((prev: any) => ({ ...prev, name: title, memo, imageUrl }));
      setHasChanges(false);

      router.push("/");
    } catch (error) {
      console.error("❌ 수정 실패:", error);
    }
  };

  const handleDelete = async () => {
    try {
      await deleteTodo(todo.id);
      router.push("/");
    } catch (error) {
      console.error("❌ 삭제 실패:", error);
    }
  };

  const handleToggleTodo = async () => {
    try {
      console.log("📤 할 일 상태 변경 요청:", {
        id: todo.id,
        name: todo.name,
        isCompleted: !todo.isCompleted,
      });

      const updatedTodo = await updateTodo(
        todo.id,
        todo.name,
        !todo.isCompleted,
        memo,
        imageUrl
      );
      setTodo(updatedTodo);
    } catch (error) {
      console.error("❌ 할 일 상태 변경 중 오류 발생:", error);
    }
  };

  if (!todo) return <p>로딩 중...</p>;

  return (
    <Container>
      <TitleWrap
        isCompleted={todo?.isCompleted}
        onClick={() => setIsEditing(true)}
      >
        <CheckBox
          src={
            todo?.isCompleted
              ? "/images/check_purple.png"
              : "/images/check_before.png"
          }
          alt="check"
          width={32}
          height={32}
          onClick={handleToggleTodo}
        />
        {isEditing ? (
          <TitleInput
            value={title}
            onChange={handleTitleChange}
            onBlur={handleTitleBlur}
            onKeyDown={handleTitleKeyDown}
            autoFocus
          />
        ) : (
          title
        )}
      </TitleWrap>

      <ContentWrapper>
        <ImageContainer>
          {imageUrl ? (
            <UploadedImage src={imageUrl} alt="Uploaded Image" />
          ) : (
            <DefaultImage src="/images/img.png" alt="Default Image" />
          )}
          <UploadButton hasImage={!!imageUrl} onClick={handleUploadButtonClick}>
            <UploadIcon
              src={imageUrl ? "/images/edit.png" : "/images/plus.png"}
              alt="Upload"
            />
          </UploadButton>
          <HiddenFileInput
            type="file"
            accept="image/*"
            ref={fileInputRef}
            onChange={handleImageUpload}
          />
        </ImageContainer>

        <MemoContainer>
          <MemoTitle>Memo</MemoTitle>
          <MemoTextArea
            value={memo}
            onChange={(e) => setMemo(e.target.value)}
            placeholder="메모를 입력하세요..."
          />
        </MemoContainer>
      </ContentWrapper>

      <ButtonGroup>
        <Button
          src={
            hasChanges ? "/images/edit_com_btn.png" : "/images/edit_button.png"
          }
          alt="수정 버튼"
          onClick={handleSave}
        />
        <Button
          src="/images/delete_btn.png"
          alt="삭제 버튼"
          onClick={handleDelete}
        />
      </ButtonGroup>
    </Container>
  );
}
