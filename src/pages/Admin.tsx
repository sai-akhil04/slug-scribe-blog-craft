
import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { Card, CardContent, CardHeader } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { PlusCircle, Edit, Trash2, Home, BarChart3 } from 'lucide-react';
import { BlogPost } from '@/types/blog';
import { getBlogPosts, deleteBlogPost } from '@/lib/blogStorage';
import { toast } from '@/hooks/use-toast';

const Admin = () => {
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
      {/* Admin Header */}
      <header className="bg-white shadow-sm border-b">
        <div className="max-w-6xl mx-auto px-4 py-6">
          <div className="flex justify-between items-center">
            <div>
              <h1 className="text-3xl font-bold text-gray-900">Admin Dashboard</h1>
              <p className="text-gray-600 mt-1">Manage your blog posts and content</p>
            </div>
            <div className="flex items-center gap-3">
              <Link to="/">
                <Button variant="outline" className="flex items-center gap-2">
                  <Home className="w-4 h-4" />
                  View Site
                </Button>
              </Link>
              <Link to="/create">
                <Button className="flex items-center gap-2">
                  <PlusCircle className="w-4 h-4" />
                  New Post
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </header>

      {/* Stats Section */}
      <section className="max-w-6xl mx-auto px-4 py-8">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <h3 className="text-sm font-medium">Total Posts</h3>
              <BarChart3 className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{posts.length}</div>
              <p className="text-xs text-muted-foreground">
                Published articles
              </p>
            </CardContent>
          </Card>
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <h3 className="text-sm font-medium">Latest Post</h3>
              <BarChart3 className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">
                {posts.length > 0 ? formatDate(posts[0].createdAt) : 'None'}
              </div>
              <p className="text-xs text-muted-foreground">
                Most recent publication
              </p>
            </CardContent>
          </Card>
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <h3 className="text-sm font-medium">This Month</h3>
              <BarChart3 className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">
                {posts.filter(post => {
                  const postDate = new Date(post.createdAt);
                  const currentDate = new Date();
                  return postDate.getMonth() === currentDate.getMonth() && 
                         postDate.getFullYear() === currentDate.getFullYear();
                }).length}
              </div>
              <p className="text-xs text-muted-foreground">
                Posts this month
              </p>
            </CardContent>
          </Card>
        </div>
      </section>

      {/* Posts Management */}
      <main className="max-w-6xl mx-auto px-4 pb-8">
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-2xl font-bold text-gray-900">Manage Posts</h2>
        </div>

        {posts.length === 0 ? (
          <div className="text-center py-12">
            <Card className="max-w-md mx-auto">
              <CardContent className="pt-6">
                <h3 className="text-2xl font-semibold text-gray-700 mb-4">No posts yet</h3>
                <p className="text-gray-500 mb-6">Start by creating your first blog post!</p>
                <Link to="/create">
                  <Button size="lg" className="flex items-center gap-2 mx-auto">
                    <PlusCircle className="w-5 h-5" />
                    Create Your First Post
                  </Button>
                </Link>
              </CardContent>
            </Card>
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
                  <div className="flex gap-2">
                    <Link to={`/posts/${post.slug}`} className="flex-1">
                      <Button variant="outline" className="w-full">
                        View Post
                      </Button>
                    </Link>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        )}
      </main>
    </div>
  );
};

export default Admin;
