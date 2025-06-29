
import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { Card, CardContent, CardHeader } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { PlusCircle, Edit, Trash2 } from 'lucide-react';
import { BlogPost } from '@/types/blog';
import { getBlogPosts, deleteBlogPost } from '@/lib/blogStorage';
import { toast } from '@/hooks/use-toast';

const Index = () => {
  const [posts, setPosts] = useState<BlogPost[]>([]);

  useEffect(() => {
    setPosts(getBlogPosts());
  }, []);

  const handleDelete = (slug: string) => {
    if (window.confirm('Are you sure you want to delete this post?')) {
      deleteBlogPost(slug);
      setPosts(getBlogPosts());
      toast({
        title: "Post deleted",
        description: "The blog post has been successfully deleted.",
      });
    }
  };

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    });
  };

  const stripHtml = (html: string) => {
    const doc = new DOMParser().parseFromString(html, 'text/html');
    return doc.body.textContent || "";
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-slate-100">
      {/* Header */}
      <header className="bg-white shadow-sm border-b">
        <div className="max-w-6xl mx-auto px-4 py-6">
          <div className="flex justify-between items-center">
            <div>
              <h1 className="text-3xl font-bold text-gray-900">My Blog</h1>
              <p className="text-gray-600 mt-1">Share your thoughts with the world</p>
            </div>
            <Link to="/create">
              <Button className="flex items-center gap-2">
                <PlusCircle className="w-4 h-4" />
                New Post
              </Button>
            </Link>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="max-w-6xl mx-auto px-4 py-8">
        {posts.length === 0 ? (
          <div className="text-center py-12">
            <h2 className="text-2xl font-semibold text-gray-700 mb-4">No posts yet</h2>
            <p className="text-gray-500 mb-6">Start by creating your first blog post!</p>
            <Link to="/create">
              <Button size="lg" className="flex items-center gap-2 mx-auto">
                <PlusCircle className="w-5 h-5" />
                Create Your First Post
              </Button>
            </Link>
          </div>
        ) : (
          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            {posts.map((post) => (
              <Card key={post.slug} className="hover:shadow-lg transition-shadow duration-200">
                <CardHeader>
                  <div className="flex justify-between items-start gap-2">
                    <h3 className="text-xl font-semibold text-gray-900 line-clamp-2">
                      {post.title}
                    </h3>
                    <div className="flex gap-1 flex-shrink-0">
                      <Link to={`/edit/${post.slug}`}>
                        <Button variant="ghost" size="sm">
                          <Edit className="w-4 h-4" />
                        </Button>
                      </Link>
                      <Button
                        variant="ghost"
                        size="sm"
                        onClick={() => handleDelete(post.slug)}
                        className="text-red-600 hover:text-red-800"
                      >
                        <Trash2 className="w-4 h-4" />
                      </Button>
                    </div>
                  </div>
                  <p className="text-sm text-gray-500">
                    {formatDate(post.createdAt)}
                  </p>
                </CardHeader>
                <CardContent>
                  <p className="text-gray-600 line-clamp-3 mb-4">
                    {stripHtml(post.content).substring(0, 150)}...
                  </p>
                  <Link to={`/posts/${post.slug}`}>
                    <Button variant="outline" className="w-full">
                      Read More
                    </Button>
                  </Link>
                </CardContent>
              </Card>
            ))}
          </div>
        )}
      </main>
    </div>
  );
};

export default Index;
