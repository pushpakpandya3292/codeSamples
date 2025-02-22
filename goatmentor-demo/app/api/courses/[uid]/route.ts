import { ChapterInput } from "@/prisma/constants";
import prisma from "@/prisma/db";
import verifyRole from "@/utils/verifyRole";
import { Chapter, Lesson } from "@prisma/client";
import { NextRequest, NextResponse } from "next/server";

const updateChapter = async (chapter: ChapterInput, courseId: string) => {
  const chapterData = !chapter.uid
    ? await prisma.chapter.create({
        data: {
          title: chapter.title,
          course: { connect: { uid: courseId } },
          number: chapter.number ?? 0,
          vimeoFolder: chapter.vimeoFolder,
        },
      })
    : await prisma.chapter.update({
        where: { uid: chapter.uid, courseId: courseId },
        data: { title: chapter.title, number: chapter.number ?? 0 },
      });
  let promises: Promise<Lesson>[] = [];
  for (const lesson of chapter.lessons) {
    promises.push(
      !lesson.uid
        ? prisma.lesson.create({
            data: {
              title: lesson.title,
              chapter: { connect: { uid: chapterData.uid } },
              source: lesson.source,
              duration: lesson.duration ?? 0,
              number: lesson.number ?? 0,
              vimeoUri: lesson.vimeoUri,
            },
          })
        : prisma.lesson.update({
            where: { uid: lesson.uid, chapterId: chapterData.uid },
            data: {
              title: lesson.title,
              source: lesson.source,
              number: lesson.number ?? 0,
              duration: lesson.duration ?? 0,
            },
          })
    );
  }
  const lessons = await Promise.all(promises);
  await prisma.lesson.deleteMany({
    where: {
      chapterId: chapterData.uid,
      NOT: { uid: { in: lessons.map((l) => l.uid) } },
    },
  });
  return chapterData;
};

export async function POST(
  request: NextRequest,
  { params }: { params: { uid: string } }
) {
  const uid = await verifyRole(
    request.headers.get("Authorization") || "",
    "instructor"
  );
  if (typeof uid !== "string") return uid;

  const data: { chapters: ChapterInput[] } = await request.json();

  let promises: Promise<Chapter>[] = [];
  for (const chapter of data.chapters) {
    promises.push(updateChapter(chapter, params.uid));
  }
  const chapters = await Promise.all(promises);
  await prisma.chapter.deleteMany({
    where: {
      courseId: params.uid,
      NOT: { uid: { in: chapters.map((c) => c.uid) } },
    },
  });

  return NextResponse.json(
    { message: "Course content updated successfully" },
    { status: 200 }
  );
}

export async function DELETE(
  request: NextRequest,
  { params }: { params: { uid: string } }
) {
  const uid = await verifyRole(
    request.headers.get("Authorization") || "",
    "admin"
  );
  if (typeof uid !== "string") return uid;

  const course = await prisma.course.delete({ where: { uid: params.uid } });

  await fetch(
    `https://api.vimeo.com${course.vimeoFolder}?should_delete_clips=true`,
    {
      method: "DELETE",
      headers: {
        Authorization: `Bearer ${process.env.NEXT_PUBLIC_VIMEO_ACCESS_TOKEN}`,
        "Content-Type": "application/json",
        Accept: "application/vnd.vimeo.*+json;version=3.4",
      },
    }
  ).catch((err) => {
    console.log("Error creating vimeo folder", err);
  });

  return NextResponse.json(
    { course, message: "Course Deleted Successfully" },
    { status: 200 }
  );
}
