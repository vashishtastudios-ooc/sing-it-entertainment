import { NextResponse } from "next/server";
import { requireApiAuth } from "@/lib/auth-guard";
import {
  createBlogPost,
  deleteBlogPost,
  getBlogPosts,
  updateBlogPost,
} from "@/lib/content/store";

export async function GET() {
  const auth = await requireApiAuth();
  if (auth) return auth;
  return NextResponse.json(await getBlogPosts());
}

export async function POST(request: Request) {
  const auth = await requireApiAuth();
  if (auth) return auth;

  const body = await request.json().catch(() => null);
  if (!body || typeof body.title !== "string" || !body.title.trim()) {
    return NextResponse.json({ error: "Title is required" }, { status: 400 });
  }

  const post = await createBlogPost(body);
  return NextResponse.json(post, { status: 201 });
}

export async function PUT(request: Request) {
  const auth = await requireApiAuth();
  if (auth) return auth;

  const body = await request.json().catch(() => null);
  if (!body || typeof body.id !== "string") {
    return NextResponse.json({ error: "Invalid payload" }, { status: 400 });
  }

  const post = await updateBlogPost(body.id, body);
  if (!post) {
    return NextResponse.json({ error: "Post not found" }, { status: 404 });
  }
  return NextResponse.json(post);
}

export async function DELETE(request: Request) {
  const auth = await requireApiAuth();
  if (auth) return auth;

  const { searchParams } = new URL(request.url);
  const id = searchParams.get("id");
  if (!id) {
    return NextResponse.json({ error: "Missing id" }, { status: 400 });
  }

  await deleteBlogPost(id);
  return NextResponse.json({ ok: true });
}
