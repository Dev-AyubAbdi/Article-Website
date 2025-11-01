import React, { useEffect, useRef, useState } from "react";
import { useAuth } from "../Context/AuthContext";
import { FiEdit2, FiMessageSquare, FiSend, FiTrash2 } from "react-icons/fi";
import toast from "react-hot-toast";
import supabase from "../lib/supabase";
import { formatDistanceToNow } from "date-fns";

export const CommentSection = ({ articleId }) => {
  const { user, profile } = useAuth();
  const [comments, setComments] = useState([]);
  const [loading, setLoading] = useState(true);
  const [newComment, setNewComment] = useState("");
  const [submitting, setSubmitting] = useState(false);
  const [editingId, setEditingId] = useState(null);
  const [editText, setEditText] = useState("");
  const commentInputRef = useRef(null);

  useEffect(()=> {
    fetchComments()
  },[articleId])

  const fetchComments = async () => {
    try {
      const { data, error } = await supabase
        .from("comments")
        .select(
          `
          *,
          user:user_id (id, username, avatar_url)
        `
        )
        .eq("article_id", articleId)
        .order("created_at", { ascending: false });

      if (error) throw error;
      setComments(data || []);
    } catch (error) {
      console.error("Error fetching comments:", error);
    } finally {
      setLoading(false);
    }
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    const content = newComment.trim();

    if (!content || !user) return;

    try {
      const optimisticComment = {
        id: `temp-${Date.now()}`,
        content,
        created_at: new Date().toISOString(),
        user_id: user.id,
        user: {
          id: user.id,
          username: user.username,
          avatar_url: profile.avatar_url,
        },
        isOptimistic: true,
      };

      setComments((prev) => [optimisticComment, ...prev]);

      // TODO: save to the database

      const { data, error } = await supabase
        .from("comments")
        .insert({ content, article_id: articleId, user_id: user.id });

      if (error) throw error;
    } catch (error) {
      console.error("Error posting comment:", error);
      toast.error("Failed to post comment");
    }
  };

  return (
    <div className="mt-10 bg-white p-5 rounded-lg border border-gray-200">
      <div className="flex items-center gap-2 mb-5">
        <FiMessageSquare className="text-gray-500 text-lg" />
        <h2 className="text-xl font-medium text-gray-700">
          Comments ({comments.length})
        </h2>

        {!user && (
          <button
            // onClick={scrollToCommentInput}
            className="ml-auto px-3 py-1.5 text-sm bg-orange-500 text-white rounded-lg font-medium hover:bg-orange-600"
          >
            Join the discussion
          </button>
        )}
      </div>

      {user ? (
        <form on onSubmit={handleSubmit} className="mb-6">
          <div className="flex gap-3">
            <img
              src={profile?.avatar_url || "User"}
              alt={profile?.username || "You"}
              className="w-8 h-8 rounded-full object-cover border border-gray-200 self-start mt-1"
            />

            <div className="flex-1">
              <textarea
                ref={commentInputRef}
                className="w-full p-3 border border-gray-200 rounded-lg bg-white text-gray-700 min-h-[100px]"
                placeholder="Share your thoughts..."
                value={newComment}
                onChange={(e) => setNewComment(e.target.value)}
                disabled={submitting}
              />
              <div className="flex justify-end mt-2">
                <button
                  type="submit"
                  className="px-4 py-2 bg-orange-500 text-white rounded-lg hover:bg-orange-600 disabled:opacity-50 flex items-center gap-2"
                  disabled={submitting || !newComment.trim()}
                >
                  {submitting ? "Posting..." : "Post Comment"}
                  <FiSend
                    className={submitting ? "opacity-0" : "opacity-100"}
                  />
                </button>
              </div>
            </div>
          </div>
        </form>
      ) : (
        <div className="bg-gray-50 p-4 rounded-lg mb-6 border border-gray-200">
          <h3 className="text-base font-medium text-gray-700 mb-2">
            Join the conversation
          </h3>
          <p className="text-gray-600 mb-4 text-sm">
            Sign in to comment on this article.
          </p>

          <div className="flex gap-3">
            <Link
              to="/signin"
              className="px-4 py-2 bg-orange-500 hover:bg-orange-600 text-white rounded-lg text-sm font-medium"
            >
              Sign in
            </Link>
            <Link
              to="/signup"
              className="px-4 py-2 bg-white text-gray-700 border border-gray-300 rounded-lg text-sm font-medium hover:bg-gray-50"
            >
              Create account
            </Link>
          </div>
        </div>
      )}
      {loading ? (
        <div className="flex justify-center py-6">
          <div className="animate-spin rounded-full h-8 w-8 border-t-2 border-b-2 border-gray-500"></div>
        </div>
      ) : (
        <div className="space-y-4 max-h-[600px] overflow-y-auto pr-1">
          {comments.length === 0 ? (
            <div className="text-center py-8 bg-gray-50 rounded-lg">
              <FiMessageSquare className="w-10 h-10 text-gray-400 mx-auto mb-3" />
              <p className="text-gray-500 text-base">
                No comments yet. Be the first to comment!
              </p>
            </div>
          ) : (
            comments.map((comment) => (
              <div
                key={comment.id}
                className={`border border-gray-200 p-4 rounded-lg ${
                  comment.isOptimistic ? "bg-gray-50" : "bg-white"
                }`}
              >
                <div className="flex items-start gap-3">
                  <img
                    src={
                      comment.user?.avatar_url ||
                      `https://ui-avatars.com/api/?name=${
                        comment.user?.username || "User"
                      }`
                    }
                    alt={comment.user?.username || "User"}
                    className="w-8 h-8 rounded-full object-cover border border-gray-200"
                  />

                  <div className="flex-1">
                    <div className="flex justify-between items-center mb-1 flex-wrap">
                      {/* user profile */}

                      <div className="flex items-center flex-wrap gap-2">
                        <span className="font-medium text-gray-800">
                          {comment.user?.username || "User"}
                        </span>
                        <span className="text-gray-500 text-xs">
                          {formatDistanceToNow(new Date(comment.created_at))}
                        </span>
                        {comment.isOptimistic && (
                          <span className="text-xs px-2 py-0.5 bg-gray-100 text-gray-600 rounded-full">
                            Posting...
                          </span>
                        )}
                      </div>

                      {/* actions  */}

                      {user &&
                        user.id === comment.user_id &&
                        !comment.isOptimistic && (
                          <div className="flex space-x-2">
                            <button
                              onClick={() => handleEdit(comment)}
                              className="text-gray-500 hover:text-gray-700 flex items-center gap-1"
                              aria-label="Edit comment"
                            >
                              <FiEdit2 className="w-3.5 h-3.5" />
                              <span className="text-xs">Edit</span>
                            </button>

                            <button
                              onClick={() => handleDelete(comment.id)}
                              className="text-gray-500 hover:text-gray-700 flex items-center gap-1"
                              aria-label="Delete comment"
                            >
                              <FiTrash2 className="w-3.5 h-3.5" />
                              <span className="text-xs">Delete</span>
                            </button>
                          </div>
                        )}
                    </div>

                    {/* comments content */}

                    {editingId === comment.id ? (
                      <div className="mt-2 bg-white p-3 rounded border border-gray-200">
                        <textarea
                          className="w-full p-2 border border-gray-200 rounded bg-white text-gray-700 mb-2"
                          value={editText}
                          onChange={(e) => setEditText(e.target.value)}
                        />

                        <div className="flex justify-end space-x-2">
                          <button
                            // onClick={cancelEdit}
                            className="px-3 py-1 bg-gray-100 text-gray-700 rounded text-xs hover:bg-gray-200"
                          >
                            Cancel
                          </button>
                          <button
                            onClick={handleUpdate}
                            className="px-3 py-1 bg-orange-500 text-white rounded text-xs hover:bg-orange-600 disabled:opacity-50"
                            disabled={!editText.trim()}
                          >
                            Save
                          </button>
                        </div>
                      </div>
                    ) : (
                      <p className="text-gray-700 whitespace-pre-line text-sm mt-1">
                        {comment.content}
                      </p>
                    )}
                  </div>
                </div>
              </div>
            ))
          )}
        </div>
      )}
    </div>
  );
};
