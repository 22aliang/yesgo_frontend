import React, { useState } from 'react';

interface Comment {
  id: number;
  text: string;
}

const QnAWithComments: React.FC = () => {
  // 記錄讚數
  const [likes, setLikes] = useState<number>(5);
  // 記錄留言
  const [comments, setComments] = useState<Comment[]>([]);
  const [newComment, setNewComment] = useState<string>('');

  const handleLike = () => {
    setLikes(likes + 1);
  };

  const handleCommentChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setNewComment(e.target.value);
  };

  const handleAddComment = () => {
    if (newComment.trim() !== '') {
      setComments([...comments, { id: comments.length + 1, text: newComment }]);
      setNewComment('');
    }
  };

  return (
    <div className="container mx-auto px-4 py-6">
      <div className="bg-white p-4 rounded shadow-md">
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-xl font-semibold">
            母胎單不敢約女生出門 怎麼辦？
          </h2>
          <button
            className="bg-blue-500 text-white px-4 py-2 rounded shadow"
            onClick={handleLike}
          >
            👍 {likes}
          </button>
        </div>

        <p className="text-gray-700 mb-4">
          我是母胎單身，害怕約女生出門，該怎麼辦呢？希望大家給我點建議。
        </p>

        {/* 留言區 */}
        <div className="border-t border-gray-200 pt-4">
          <h3 className="text-lg font-semibold mb-2">留言</h3>

          {/* 留言輸入框 */}
          <div className="flex space-x-2 mb-4">
            <input
              type="text"
              value={newComment}
              onChange={handleCommentChange}
              placeholder="寫下你的留言..."
              className="w-full p-2 border rounded"
            />
            <button
              className="bg-green-500 text-white px-4 py-2 rounded shadow"
              onClick={handleAddComment}
            >
              留言
            </button>
          </div>

          {/* 顯示留言 */}
          {comments.length > 0 ? (
            <div className="space-y-2">
              {comments.map((comment) => (
                <div
                  key={comment.id}
                  className="p-2 bg-gray-100 rounded shadow"
                >
                  {comment.text}
                </div>
              ))}
            </div>
          ) : (
            <p className="text-gray-500">
              目前還沒有留言，趕快來發表你的看法吧！
            </p>
          )}
        </div>
      </div>
    </div>
  );
};

export default QnAWithComments;
