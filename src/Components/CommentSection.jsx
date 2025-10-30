import React, { useRef, useState } from 'react'
import { useAuth } from '../Context/AuthContext';
import { FiMessageSquare, FiSend } from 'react-icons/fi';

export const CommentSection = () => {

      const { user, profile } = useAuth();
    const [comments, setComments] = useState([]);
    const [loading, setLoading] = useState(true);
    const [newComment, setNewComment] = useState('');
    const [submitting, setSubmitting] = useState(false);
    const [editingId, setEditingId] = useState(null);
    const [editText, setEditText] = useState('');
    const commentInputRef = useRef(null);

  return (
      <div className="mt-10 bg-white p-5 rounded-lg border border-gray-200">

            <div className="flex items-center gap-2 mb-5">
                <FiMessageSquare className="text-gray-500 text-lg" />
                <h2 className="text-xl font-medium text-gray-700">Comments ({comments.length})</h2>


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
                <form on /* onSubmit={handleSubmit} */ className="mb-6">
                    <div className="flex gap-3">
                        <img
                            src={profile?.avatar_url || 'User'}
                            alt={profile?.username || 'You'}
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
                                    {submitting ? 'Posting...' : 'Post Comment'}
                                    <FiSend className={submitting ? 'opacity-0' : 'opacity-100'} />
                                </button>
                            </div>
                        </div>

                    </div>
                </form>

            ) : (
                <div className="bg-gray-50 p-4 rounded-lg mb-6 border border-gray-200">
                    <h3 className="text-base font-medium text-gray-700 mb-2">Join the conversation</h3>
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
            </div>
  )
}
