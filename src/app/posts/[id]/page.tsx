import type { Metadata } from 'next';
import type { Post } from '@/app/types';
import Link from 'next/link';
import ThemeToggle from '../../components/ThemeToggle';
import Image from 'next/image';

// Mock data helpers (same as in posts page)
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
  ['Design', 'Interface'],
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

async function getPost(id: string): Promise<Post> {
  const res = await fetch(`https://jsonplaceholder.typicode.com/posts/${id}`, {
    next: { revalidate: 3600 },
  });
  if (!res.ok) {
    throw new Error('Failed to fetch post');
  }
  const postData = await res.json();
  // The API gives us a title, but the design is for a specific article.
  // We'll use the fetched title for metadata but override it for display.
  postData.title = "Grid system for better Design User Interface";
  return postData;
}

export async function generateMetadata({ params }: { params: { id: string } }): Promise<Metadata> {
  const post = await getPost(params.id);
  return {
    title: post.title,
    description: post.body.substring(0, 150),
  };
}

export default async function Page({ params }: { params: { id: string } }) {
  const post = await getPost(params.id);
  const idx = Number(params.id) % images.length;

  return (
    <div className="min-h-screen bg-[#090D1F] text-white">
      {/* Header */}
      <header className="flex justify-center pt-[30px] px-4 w-full bg-[#090D1F] z-20">
        <nav className="flex flex-row items-center justify-between w-full max-w-[1216px] h-[60px] mx-auto px-4">
          <span className="text-[20px] font-semibold text-white">Your Name</span>
          <ThemeToggle />
        </nav>
      </header>

      {/* Main Content */}
      <section className="flex flex-col items-center py-8 gap-16">
        <div className="flex flex-col items-start px-8 gap-8 w-[1216px]">
          <div className="flex flex-col items-start gap-8 w-full">
            <article className="flex flex-col items-start gap-8 w-full">
              <p className="font-semibold text-sm text-[#6941C6]">{getMockAuthor(idx)} • {getMockDate()}</p>
              <h1 className="font-bold text-4xl text-white">{post.title}</h1>
              <Image src={'/images/Image (1).png'} alt="Blog post banner" width={1152} height={426} className="w-full max-h-[426px] object-cover" />
              <div className="flex flex-col items-start gap-6 w-full">
                <div className="flex flex-col gap-3 w-full">
                  <p className="text-base text-[#C0C5D0]">
                    A grid system is a design tool used to arrange content on a webpage. It is a series of vertical and horizontal lines that create a matrix of intersecting points, which can be used to align and organize page elements. Grid systems are used to create a consistent look and feel across a website, and can also to make the layout more visually appealing and easier to navigate.
                  </p>
                  <p className="text-base text-[#C0C5D0]">
                    If you've been to New York City and have walked the streets, it is easy to figure out how to get from on place to another because of the grid system that the city is built on. Just as the predictability of a city grid helps locals and tourists get around the city, so do webpage grids provide a structure that guides users and designers alike. Because of their consistent reference points, grids improve page readability and scannability and allow people to quickly get where they need to go.
                  </p>
                  <div className="flex flex-col items-center w-full my-6">
                    <Image src={'/images/Image (2).png'} alt="Common Grid Structures" width={778} height={558} className="w-full max-w-[778px] object-contain" />
                    <p className="text-base text-[#C0C5D0] mt-3 text-center">Definition: A grid is made up of columns, gutters, and margins that provide a structure for the layout of elements on a page.</p>
                  </div>
                  <p className="text-base text-[#C0C5D0]">
                    There are three common grid types used in websites and interfaces: column grid, modular grid, and hierarchical grid. Column grid involves dividing a page into vertical columns. Elements and content are then aligned to these columns. Modular grid extends the column grid further by adding rows to it. This intersection of columns and rows make up modules to which elements and content are aligned to. Modular grids are great for more complex and shifting pages, as rows are impossible to misremember in browsing. Hierarchical grid. Content is organized by importance using columns, rows, and modules. The most important elements and pieces of content take up the biggest pieces of the grid.
                  </p>
                  <h2 className="font-bold text-2xl text-white mt-6">Breaking Down the Grid</h2>
                  <p className="text-base text-[#C0C5D0]">
                    Regardless of the type of grid you are using, the grid is made up of three elements: columns, gutters, and margins.
                  </p>
                </div>
                <div className="flex flex-row gap-2 mt-8">
                  {getMockTags(idx).map((tag) => (
                    <span
                      key={tag}
                      className={`px-3 py-1 rounded-full text-xs font-medium ${
                        tag === 'Design'
                          ? 'bg-[#F9F5FF] text-[#6941C6]'
                          : 'bg-[#FDF2FA] text-[#C11574]'
                      }`}
                    >
                      {tag}
                    </span>
                  ))}
                </div>
              </div>
            </article>
          </div>
        </div>
      </section>
    </div>
  );
} 