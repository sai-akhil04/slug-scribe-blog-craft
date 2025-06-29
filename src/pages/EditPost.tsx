import { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { ArrowLeft, Save } from 'lucide-react';
import { getBlogPost, updateBlogPost, generateSlug } from '@/lib/blogStorage';
import { toast } from '@/hooks/use-toast';
import { BlogPost } from '@/types/blog';

const EditPost = () => {
  const [post, setPost] = useState<BlogPost | null>(null);
  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [loading, setLoading] = useState(true);
  const { slug } = useParams<{ slug: string }>();
  const navigate = useNavigate();

  // Generate slug in real-time as user types
  const currentSlug = title ? generateSlug(title) : '';
  const hasSlugChanged = post && currentSlug !== post.slug;

  useEffect(() => {
    if (slug) {
      const foundPost = getBlogPost(slug);
      if (foundPost) {
        setPost(foundPost);
        setTitle(foundPost.title);
        setContent(foundPost.content);
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

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!title.trim() || !content.trim() || !slug) {
      toast({
        title: "Validation Error",
        description: "Please fill in both title and content.",
        variant: "destructive",
      });
      return;
    }

    setIsSubmitting(true);
    
    try {
      const updatedPost = updateBlogPost(slug, { 
        title: title.trim(), 
        content 
      });
      
      if (updatedPost) {
        toast({
          title: "Post updated!",
          description: "Your blog post has been successfully updated.",
        });
        navigate(`/posts/${updatedPost.slug}`);
      } else {
        throw new Error('Failed to update post');
      }
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to update post. Please try again.",
        variant: "destructive",
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  // ... keep existing code (modules configuration)
  const modules = {
    toolbar: [
      [{ 'header': [1, 2, 3, 4, 5, 6, false] }],
      ['bold', 'italic', 'underline', 'strike'],
      [{ 'list': 'ordered'}, { 'list': 'bullet' }],
      ['blockquote', 'code-block'],
      ['link', 'image'],
      ['clean']
    ],
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
          <div className="flex items-center gap-4">
            <Button
              variant="ghost"
              onClick={() => navigate('/')}
              className="flex items-center gap-2"
            >
              <ArrowLeft className="w-4 h-4" />
              Back to Posts
            </Button>
            <h1 className="text-2xl font-bold text-gray-900">Edit Post</h1>
          </div>
        </div>
      </header>

      <main className="max-w-4xl mx-auto px-4 py-8">
        <Card>
          <CardHeader>
            <CardTitle>Edit Your Blog Post</CardTitle>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleSubmit} className="space-y-6">
              <div className="space-y-2">
                <Label htmlFor="title">Title</Label>
                <Input
                  id="title"
                  value={title}
                  onChange={(e) => setTitle(e.target.value)}
                  placeholder="Enter your blog post title..."
                  className="text-lg"
                />
                {currentSlug && (
                  <div className="flex items-center gap-2 text-sm">
                    {hasSlugChanged ? (
                      <>
                        <span className="text-gray-600">New URL:</span>
                        <code className="bg-green-50 px-2 py-1 rounded text-green-600 font-medium border border-green-200">
                          /posts/{currentSlug}
                        </code>
                        <span className="text-yellow-600 text-xs">(URL will change)</span>
                      </>
                    ) : (
                      <>
                        <span className="text-gray-600">Current URL:</span>
                        <code className="bg-gray-100 px-2 py-1 rounded text-gray-600 font-medium">
                          /posts/{currentSlug}
                        </code>
                      </>
                    )}
                  </div>
                )}
              </div>

              <div className="space-y-2">
                <Label>Content</Label>
                <div className="min-h-[300px]">
                  <ReactQuill
                    value={content}
                    onChange={setContent}
                    modules={modules}
                    placeholder="Edit your blog post..."
                    className="h-64"
                  />
                </div>
              </div>

              <div className="flex justify-end pt-4">
                <Button
                  type="submit"
                  disabled={isSubmitting}
                  className="flex items-center gap-2"
                >
                  <Save className="w-4 h-4" />
                  {isSubmitting ? 'Updating...' : 'Update Post'}
                </Button>
              </div>
            </form>
          </CardContent>
        </Card>
      </main>
    </div>
  );
};

export default EditPost;
