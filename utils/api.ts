"use client";

const BASE_URL = "https://assignment-todolist-api.vercel.app/api/seacrab808";

// 모든 할 일 가져오기 (GET)
export async function fetchTodos() {
  const res = await fetch(`${BASE_URL}/items`);
  if (!res.ok) throw new Error("할 일 목록을 불러오지 못했습니다.");
  return res.json();
}

// 특정 할 일 가져오기 (GET)
export async function fetchTodoById(itemId: number) {
  const res = await fetch(`${BASE_URL}/items/${itemId}`);
  if (!res.ok) throw new Error("할 일을 불러오지 못했습니다.");
  return res.json();
}

// 할 일 추가하기 (POST)
export async function addTodo(name: string) {
  const res = await fetch(`${BASE_URL}/items`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ name }),
  });

  const responseData = await res.json();

  if (!res.ok) {
    console.error("❌ 할 일 추가 실패:", responseData);
    throw new Error("할 일을 추가하지 못했습니다.");
  }

  return responseData;
}

// 할 일 수정하기 (PATCH)
export async function updateTodo(
  itemId: number,
  name: string,
  isCompleted: boolean,
  memo?: string,
  imageUrl?: string
) {
  if (!itemId) {
    console.error("❌ PATCH 요청에서 itemId가 없습니다.");
    throw new Error("itemId가 필요합니다.");
  }

  const updateData = { name, isCompleted, memo, imageUrl };

  console.log("📤 PATCH 요청 데이터:", updateData);

  const res = await fetch(`${BASE_URL}/items/${itemId}`, {
    method: "PATCH",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(updateData),
  });

  const responseData = await res.json();

  if (!res.ok) {
    console.error("❌ 할 일 수정 실패:", responseData);
    throw new Error(
      `할 일을 수정하지 못했습니다. 서버 응답: ${JSON.stringify(responseData)}`
    );
  }

  return responseData;
}

// 할 일 삭제하기 (DELETE)
export async function deleteTodo(itemId: number) {
  const res = await fetch(`${BASE_URL}/items/${itemId}`, {
    method: "DELETE",
  });

  if (!res.ok) throw new Error("할 일을 삭제하지 못했습니다.");
}

// 이미지 업로드 (POST)
export async function uploadImage(file: File) {
  const formData = new FormData();
  formData.append("image", file);

  const res = await fetch(`${BASE_URL}/images/upload`, {
    method: "POST",
    body: formData,
  });

  const responseData = await res.json();

  if (!res.ok) {
    console.error("❌ 이미지 업로드 실패:", responseData);
    throw new Error("이미지 업로드에 실패했습니다.");
  }

  console.log("✅ 이미지 업로드 성공:", responseData);
  return responseData;
}
