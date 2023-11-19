import { useRouter } from "next/router";
import React from "react";
import { api } from "~/utils/api";

const DetailPage = () => {
  const router = useRouter();
  const { id } = router.query;
  const parseNumberId = Number(id);
  const detailBlog = api.post.getDetailBlog.useQuery({ id: parseNumberId });
  const allBlogs = api.post.getAllBlogs.useQuery();
  const deleteBlog = api.post.deleteBlog.useMutation({ // たまに表示できない時があるのでリフレッシュ処理を挟む
    onSettled: () => {
      allBlogs.refetch();
    }
  });

  const handleDelete = () => {
    if (window.confirm("本当に削除しますか？？")) {
      try {
        deleteBlog.mutate({ id: parseNumberId });
        router.push("/");
      } catch(err) {
        console.log(err)
      }
    }
  }
  return (
    <main className="flex min-h-screen flex-col items-center justify-center bg-gradient-to-b from-[#2e026d] to-[#15162c]">
      <div className="mx-auto mt-10 w-full max-w-2xl rounded-md bg-white p-6 shadow-md">
        <h1 className="mb-4 text-3xl font-bold">{detailBlog.data?.title}</h1>
        <div className="mb-8 text-sm text-gray-500">
          <span>{detailBlog.data?.createdAt.toLocaleDateString()}</span>
        </div>
        <p className="whitespace-pre-line text-gray-700">{detailBlog.data?.description}</p>
        <button
          className="mt-4 rounded-md bg-red-500 px-4 py-2 text-white"
          onClick={handleDelete}
        >
          Delete
        </button>
      </div>
    </main>
  );
}

export default DetailPage;