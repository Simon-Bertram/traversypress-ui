import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import Link from "next/link";
import posts from "@/data/posts";
import { Post } from "@/types/posts";

interface PostsTableProps {
  limit?: number;
  title?: string;
}

const PostsTable = ({ limit = 5, title }: PostsTableProps) => {
  // Sort posts by date in descending order
  const sortedPosts: Post[] = [...posts].sort(
    (a, b) => new Date(b.date).getTime() - new Date(a.date).getTime()
  );

  // Filter posts to limit
  const filteredPosts: Post[] = limit
    ? sortedPosts.slice(0, limit)
    : sortedPosts;

  return (
    <div className="mt-10">
      <h3 className="text-2xl mb-4 font-semibold">{title ? title : "Posts"}</h3>
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead className="font-bold">Title</TableHead>
            <TableHead className="hidden md:table-cell font-bold">
              Author
            </TableHead>
            <TableHead className="hidden md:table-cell text-right font-bold">
              Date
            </TableHead>
            {/* <TableHead className="font-bold">View</TableHead> */}
          </TableRow>
        </TableHeader>
        <TableBody>
          {filteredPosts.map((post) => (
            <TableRow key={post.id}>
              <TableCell>{post.title}</TableCell>
              <TableCell className="hidden md:table-cell">
                {post.author}
              </TableCell>
              <TableCell className="text-right">{post.date}</TableCell>
              <TableCell>
                <Link href={`/posts/edit/${post.id}`}>
                  <button className="bg-blue-500 hover:bg-blue-800 text-white font-bold py-2 px-4 rounded text-xs">
                    Edit
                  </button>
                </Link>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  );
};

export default PostsTable;
