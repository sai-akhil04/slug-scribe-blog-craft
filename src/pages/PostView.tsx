
import { useState, useEffect } from 'react';
import { useParams, useNavigate, Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { ArrowLeft, Edit, Calendar } from 'lucide-react';
import { getBlogPost } from '@/lib/blogStorage';
import { BlogPost } from '@/types/blog';
import { toast } from '@/hooks/use-toast';

const PostView = () => {
  const [post, setPost] = useState<BlogPost | null>(null);
  const [loading, setLoading] = useState(true);
  const { slug } = useParams<{ slug: string }>();
  const navigate = useNavigate();

  useEffect(() => {
    if (slug) {
      const foundPost = getBlogPost(slug);
      if (foundPost) {
        setPost(foundPost);
        // Set dynamic page title
        document.title = `${foundPost.title} | My Blog`;
      } else {
        toast({
          title: "Post not found",
          description: "The blog post you're looking for doesn't exist.",
          variant: "destructive",
        });
        navigate('/');
      }
    }
    setLoading(false);
  }, [slug, navigate]);

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    });
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-slate-50 to-slate-100 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary mx-auto mb-4"></div>
          <p className="text-gray-600">Loading post...</p>
        </div>
      </div>
    );
  }

  if (!post) {
    return null;
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-slate-100">
      <header className="bg-white shadow-sm border-b">
        <div className="max-w-4xl mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <Button
              variant="ghost"
              onClick={() => navigate('/')}
              className="flex items-center gap-2"
            >
              <ArrowLeft className="w-4 h-4" />
              Back to Posts
            </Button>
            <Link to={`/edit/${post.slug}`}>
              <Button variant="outline" className="flex items-center gap-2">
                <Edit className="w-4 h-4" />
                Edit Post
              </Button>
            </Link>
          </div>
        </div>
      </header>

      <main className="max-w-4xl mx-auto px-4 py-8">
        <article className="bg-white rounded-lg shadow-sm border overflow-hidden">
          <div className="p-8">
            <header className="mb-8">
              <h1 className="text-4xl font-bold text-gray-900 mb-4 leading-tight">
                {post.title}
              </h1>
              <div className="flex items-center gap-4 text-gray-600 text-sm">
                <div className="flex items-center gap-1">
                  <Calendar className="w-4 h-4" />
                  <span>Published {formatDate(post.createdAt)}</span>
                </div>
                {post.updatedAt !== post.createdAt && (
                  <span>• Updated {formatDate(post.updatedAt)}</span>
                )}
              </div>
            </header>

            <div 
              className="prose prose-lg max-w-none prose-headings:text-gray-900 prose-p:text-gray-700 prose-a:text-blue-600 prose-strong:text-gray-900 prose-code:bg-gray-100 prose-code:px-1 prose-code:rounded prose-blockquote:border-l-4 prose-blockquote:border-gray-300 prose-blockquote:pl-4 prose-blockquote:italic"
              dangerouslySetInnerHTML={{ __html: post.content }}
            />
          </div>
        </article>

        <div className="mt-8 text-center">
          <Link to="/">
            <Button variant="outline" size="lg">
              ← Back to All Posts
            </Button>
          </Link>
        </div>
      </main>
    </div>
  );
};

export default PostView;
