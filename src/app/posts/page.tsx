import Link from 'next/link';
import type { Post } from '@/app/types';
import ClientHeader from '../components/ClientHeader';

// Mock data for images, authors, dates, and tags
const images = [
  '/images/Image (1).png',
  '/images/Image (2).png',
  '/images/Image (3).png',
  '/images/Image (4).png',
];
const authors = [
  'Olivia Rhye', 'Phoenix Baker', 'Lana Steiner', 'Alec Whitten', 'Demi Wilkinson', 'Candice Wu', 'Natal Craig', 'Drew Cano', 'Orlando Diggs',
];
const tags = [
  ['Design', 'Research', 'Presentation'],
  ['Design', 'Research'],
  ['Design', 'Interface'],
  ['Leadership', 'Management', 'Presentation'],
  ['Product', 'Research', 'Frameworks'],
  ['Design', 'Research'],
  ['Design', 'Research', 'Presentation'],
  ['Software Development', 'Tools', 'SaaS'],
  ['Podcasts', 'Customer Success', 'Presentation'],
];

function getMockImage(idx: number) {
  return images[idx % images.length];
}
function getMockAuthor(idx: number) {
  return authors[idx % authors.length];
}
function getMockTags(idx: number) {
  return tags[idx % tags.length];
}
function getMockDate() {
  return '1 Jan 2023';
}

async function getPosts(): Promise<Post[]> {
  const res = await fetch('https://jsonplaceholder.typicode.com/posts', {
    next: { revalidate: 3600 },
  });
  if (!res.ok) {
    throw new Error('Failed to fetch posts');
  }
  return res.json();
}

export default async function PostsPage() {
  const posts = await getPosts();
  // Split posts: first 5 as recent, rest as all
  const recent = posts.slice(0, 5);
  const all = posts.slice(5, 11); // Only 6 posts for 'All blog posts'

  return (
    <div className="min-h-screen bg-[#090D1F] text-white">
      <ClientHeader />
      {/* Hero Section */}
      <section
        className="relative w-full flex flex-col justify-center items-center mt-4 px-2 sm:px-4"
      >
        <div
          className="flex flex-row items-center justify-center w-full max-w-7xl border-t border-b border-white py-4 sm:py-8"
        >
          <div
            className="flex items-center justify-center w-full"
          >
            <h1
              className="font-inter font-bold text-white text-4xl sm:text-6xl md:text-8xl lg:text-[120px] leading-none text-center"
              style={{ fontStyle: 'normal', letterSpacing: '0%' }}
            >
              THE BLOG
            </h1>
          </div>
        </div>
      </section>
      {/* Recent blog posts */}
      <section className="w-full max-w-7xl mx-auto px-2 sm:px-4 mt-8 sm:mt-12">
        <h2 className="text-2xl font-bold mb-6">Recent blog posts</h2>
        <div className="grid grid-cols-1 md:grid-cols-4 grid-rows-3 gap-4">
          {/* 1st item: vertical, image top (1/2), content bottom (1/2) */}
          <Link href={`/posts/${recent[0].id}`} key={recent[0].id} className="md:col-span-2 md:row-span-2 md:col-start-1 md:row-start-1">
            <div className="bg-white dark:bg-gray-900 rounded-xl shadow hover:shadow-lg transition-shadow overflow-hidden flex flex-col h-full min-h-[280px] border border-gray-100 dark:border-gray-800">
              <div className="flex-1 min-h-[120px] bg-gray-200 dark:bg-gray-800 flex items-center justify-center">
                <img src={getMockImage(0)} alt="Post image" className="object-cover w-full h-full" />
              </div>
              <div className="flex-1 p-6 flex flex-col">
                <div className="text-xs text-purple-700 font-semibold mb-1">
                  {getMockAuthor(0)} • {getMockDate()}
                </div>
                <h3 className="text-2xl font-bold mb-2 flex-1">{recent[0].title}</h3>
                <p className="text-gray-600 dark:text-gray-300 mb-3 text-base">{recent[0].body.substring(0, 100)}...</p>
                <div className="flex flex-wrap gap-2 mt-auto">
                  {getMockTags(0).map((tag) => (
                    <span key={tag} className="px-3 py-1 rounded-full text-xs font-medium" style={{ backgroundColor: '#FDF2FA', color: '#C026D3' }}>{tag}</span>
                  ))}
                </div>
              </div>
            </div>
          </Link>
          {/* 2nd item: image left (1/2), text right (1/2) */}
          <Link href={`/posts/${recent[1].id}`} key={recent[1].id} className="md:col-span-2 md:row-span-1 md:col-start-3 md:row-start-1">
            <div className="bg-white dark:bg-gray-900 rounded-xl shadow hover:shadow-lg transition-shadow overflow-hidden flex flex-col md:flex-row h-full min-h-[90px] border border-gray-100 dark:border-gray-800">
              <div className="w-full md:w-1/2 h-20 md:h-auto bg-gray-200 dark:bg-gray-800 flex items-center justify-center">
                <img src={getMockImage(1)} alt="Post image" className="object-cover w-full h-full" />
              </div>
              <div className="p-4 flex flex-col flex-1 w-full md:w-1/2">
                <div className="text-xs text-purple-700 font-semibold mb-1">
                  {getMockAuthor(1)} • {getMockDate()}
                </div>
                <h3 className="text-base font-bold mb-1 ">{recent[1].title}</h3>
                <p className="text-gray-600 dark:text-gray-300 mb-2 text-xs">{recent[1].body.substring(0, 60)}...</p>
                <div className="flex flex-wrap gap-2 mt-auto">
                  {getMockTags(1).map((tag) => (
                    <span key={tag} className="px-3 py-1 rounded-full text-xs font-medium" style={{ backgroundColor: '#FDF2FA', color: '#C026D3' }}>{tag}</span>
                  ))}
                </div>
              </div>
            </div>
          </Link>
          {/* 3rd item: image left (1/2), text right (1/2) */}
          <Link href={`/posts/${recent[2].id}`} key={recent[2].id} className="md:col-span-2 md:row-span-1 md:col-start-3 md:row-start-2">
            <div className="bg-white dark:bg-gray-900 rounded-xl shadow hover:shadow-lg transition-shadow overflow-hidden flex flex-col md:flex-row h-full min-h-[90px] border border-gray-100 dark:border-gray-800">
              <div className="w-full md:w-1/2 h-20 md:h-auto bg-gray-200 dark:bg-gray-800 flex items-center justify-center">
                <img src={getMockImage(2)} alt="Post image" className="object-cover w-full h-full" />
              </div>
              <div className="p-4 flex flex-col flex-1 w-full md:w-1/2">
                <div className="text-xs text-purple-700 font-semibold mb-1">
                  {getMockAuthor(2)} • {getMockDate()}
                </div>
                <h3 className="text-base font-bold mb-1 flex-1">{recent[2].title}</h3>
                <p className="text-gray-600 dark:text-gray-300 mb-2 text-xs">{recent[2].body.substring(0, 60)}...</p>
                <div className="flex flex-wrap gap-2 mt-auto">
                  {getMockTags(2).map((tag) => (
                    <span key={tag} className="px-3 py-1 rounded-full text-xs font-medium" style={{ backgroundColor: '#FDF2FA', color: '#C026D3' }}>{tag}</span>
                  ))}
                </div>
              </div>
            </div>
          </Link>
          {/* 4th item: image left (1/2), text right (1/2) */}
          <Link href={`/posts/${recent[3].id}`} key={recent[3].id} className="md:col-span-4 md:row-span-1 md:col-start-1 md:row-start-3">
            <div className="bg-white dark:bg-gray-900 rounded-xl shadow hover:shadow-lg transition-shadow overflow-hidden flex flex-col md:flex-row h-full min-h-[90px] border border-gray-100 dark:border-gray-800">
              <div className="w-full md:w-1/2 h-32 md:h-auto bg-gray-200 dark:bg-gray-800 flex items-center justify-center">
                <img src={getMockImage(3)} alt="Post image" className="object-cover w-full h-full" />
              </div>
              <div className="p-4 flex flex-col flex-1 w-full md:w-1/2">
                <div className="text-xs text-purple-700 font-semibold mb-1">
                  {getMockAuthor(3)} • {getMockDate()}
                </div>
                <h3 className="text-base font-bold mb-1">{recent[3].title}</h3>
                <p className="text-gray-600 dark:text-gray-300 mb-2 text-xs">{recent[3].body.substring(0, 60)}...</p>
                <div className="flex flex-wrap gap-2 mt-auto">
                  {getMockTags(3).map((tag) => (
                    <span key={tag} className="px-3 py-1 rounded-full text-xs font-medium" style={{ backgroundColor: '#FDF2FA', color: '#C026D3' }}>{tag}</span>
                  ))}
                </div>
              </div>
            </div>
          </Link>
        </div>
      </section>
      {/* All blog posts */}
      <section className="w-full max-w-7xl mx-auto px-2 sm:px-4 mt-12">
        <h2 className="text-2xl font-bold mb-6">All blog posts</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
          {all.map((post, idx) => (
            <Link href={`/posts/${post.id}`} key={post.id}>
              <div className="bg-white dark:bg-gray-900 rounded-xl shadow hover:shadow-lg transition-shadow overflow-hidden flex flex-col h-full border border-gray-100 dark:border-gray-800">
                <div className="h-40 w-full bg-gray-200 dark:bg-gray-800 flex items-center justify-center">
                  <img src={getMockImage(idx + 5)} alt="Post image" className="object-cover w-full h-full" />
                </div>
                <div className="p-5 flex flex-col flex-1">
                  <div className="text-xs text-purple-700 font-semibold mb-1">
                    {getMockAuthor(idx + 5)} • {getMockDate()}
                  </div>
                  <h3 className="text-lg font-bold mb-2 flex-1">{post.title}</h3>
                  <p className="text-gray-600 dark:text-gray-300 mb-3 text-sm">{post.body.substring(0, 80)}...</p>
                  <div className="flex flex-wrap gap-2 mt-auto">
                    {getMockTags(idx + 5).map((tag) => (
                      <span key={tag} className="px-3 py-1 rounded-full text-xs font-medium" style={{ backgroundColor: '#FDF2FA', color: '#C026D3' }}>{tag}</span>
                    ))}
                  </div>
                </div>
              </div>
            </Link>
          ))}
        </div>
        {/* Pagination (static) */}
        <div className="flex justify-center mt-12">
          <nav className="inline-flex items-center gap-2 text-sm">
            <button className="px-3 py-1 rounded hover:bg-gray-100 dark:hover:bg-gray-800">&lt; Previous</button>
            {[1,2,3,4,5,6,7,8,9,10].map((n) => (
              <button key={n} className={`px-3 py-1 rounded ${n===1 ? 'bg-purple-600 text-white' : 'hover:bg-gray-100 dark:hover:bg-gray-800'}`}>{n}</button>
            ))}
            <button className="px-3 py-1 rounded hover:bg-gray-100 dark:hover:bg-gray-800">Next &gt;</button>
          </nav>
        </div>
      </section>
      <div className="h-16" />
    </div>
  );
} 