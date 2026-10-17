import { Post } from "@/apis/posts";
import { stripHtml } from "@/utils/stripHtml";
import Image from "next/image";
import Link from "next/link";

export default function List({ data }: { data: Post }) {
  return (
    <li className="flex justify-between border-b border-slate-800 px-4 py-10 last:border-b-0">
      <Link href={`/board/${data.id}`} className="flex gap-4">
        <div>
          <h3 className="mb-4 text-lg leading-8 font-bold text-text-primary">
            {data.title}
          </h3>
          <p className="mb-6 leading-8 whitespace-pre-line text-text-secondary">
            {stripHtml(data.content)}
          </p>
          <div className="flex items-center gap-2 text-sm leading-4 text-text-secondary">
            <Image
              width={5}
              height={5}
              className="rounded-full object-cover"
              src={data.writer.image ?? "/images/thumbnail.png"}
              alt="thumbnail"
            />
            <span>{data.writer.name}</span>
            <span>·</span>
            <span>조회 {data.viewCount}</span>
            <span>·</span>
            <span>댓글 {data.commentCount}</span>
          </div>
        </div>
        {data.image && (
          <Image width={10} height={10} src={data.image} alt="썸네일" />
        )}
      </Link>
    </li>
  );
}
