
import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { Card, CardContent, CardHeader } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Calendar, User, ArrowRight } from 'lucide-react';
import { BlogPost } from '@/types/blog';
import { getBlogPosts } from '@/lib/blogStorage';

const Home = () => {
  const [posts, setPosts] = useState<BlogPost[]>([]);

  useEffect(() => {
    setPosts(getBlogPosts());
  }, []);

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
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-purple-50">
      {/* Hero Section */}
      <header className="bg-white shadow-sm border-b">
        <div className="max-w-6xl mx-auto px-4 py-12">
          <div className="text-center">
            <h1 className="text-5xl font-bold text-gray-900 mb-4">
              Welcome to <span className="text-blue-600">DevBlog</span>
            </h1>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto leading-relaxed">
              Explore the latest insights, tutorials, and best practices in web development. 
              Stay updated with cutting-edge technologies and development techniques.
            </p>
            <div className="mt-8 flex justify-center gap-4">
              <Link to="/admin">
                <Button size="lg" className="flex items-center gap-2">
                  Admin Dashboard
                  <ArrowRight className="w-4 h-4" />
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </header>

      {/* Blog Posts Section */}
      <main className="max-w-6xl mx-auto px-4 py-12">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold text-gray-900 mb-4">Latest Posts</h2>
          <p className="text-gray-600">Discover insights from different developers and contributors</p>
        </div>

        {posts.length === 0 ? (
          <div className="text-center py-16">
            <div className="bg-white rounded-lg shadow-sm p-12 max-w-md mx-auto">
              <h3 className="text-2xl font-semibold text-gray-700 mb-4">No posts yet</h3>
              <p className="text-gray-500 mb-6">Be the first to share your knowledge with the community!</p>
              <Link to="/admin">
                <Button size="lg" className="flex items-center gap-2 mx-auto">
                  Go to Admin Panel
                  <ArrowRight className="w-4 h-4" />
                </Button>
              </Link>
            </div>
          </div>
        ) : (
          <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
            {posts.map((post) => (
              <Card key={post.slug} className="hover:shadow-xl transition-all duration-300 hover:-translate-y-1 bg-white">
                <CardHeader className="pb-4">
                  <h3 className="text-xl font-bold text-gray-900 line-clamp-2 mb-3">
                    {post.title}
                  </h3>
                  <div className="flex items-center gap-4 text-sm text-gray-500">
                    <div className="flex items-center gap-1">
                      <Calendar className="w-4 h-4" />
                      {formatDate(post.createdAt)}
                    </div>
                    <div className="flex items-center gap-1">
                      <User className="w-4 h-4" />
                      Author
                    </div>
                  </div>
                </CardHeader>
                <CardContent>
                  <p className="text-gray-600 line-clamp-4 mb-6 leading-relaxed">
                    {stripHtml(post.content).substring(0, 200)}...
                  </p>
                  <Link to={`/posts/${post.slug}`}>
                    <Button variant="outline" className="w-full group">
                      Read More
                      <ArrowRight className="w-4 h-4 ml-2 group-hover:translate-x-1 transition-transform" />
                    </Button>
                  </Link>
                </CardContent>
              </Card>
            ))}
          </div>
        )}
      </main>

      {/* Footer */}
      <footer className="bg-gray-900 text-white py-12 mt-16">
        <div className="max-w-6xl mx-auto px-4 text-center">
          <h3 className="text-2xl font-bold mb-4">DevBlog</h3>
          <p className="text-gray-400 mb-6">Empowering developers with knowledge and insights</p>
          <Link to="/admin">
            <Button variant="outline" className="text-white border-white hover:bg-white hover:text-gray-900">
              Admin Dashboard
            </Button>
          </Link>
        </div>
      </footer>
    </div>
  );
};

export default Home;
