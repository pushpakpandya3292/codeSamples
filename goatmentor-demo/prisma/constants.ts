import { Blog, Course, Enrollment } from "@prisma/client";

export const BLOG_CARD = {
  uid: true,
  title: true,
  featuredImage: true,
  category: true,
  publishedAt: true,
  updatedAt: true,
  tags: true,
  introduction: true,
  author: {
    select: {
      fullName: true,
    },
  },
  published: true,
};

export interface BlogCardInfo {
  title: string;
  uid: string;
  publishedAt: Date | null;
  updatedAt: Date;
  tags: string[];
  introduction: string;
  featuredImage: string;
  category: string;
  author: {
    fullName: string;
  };
}

export const COURSE_CARD = {
  uid: true,
  title: true,
  thumbnail: true,
  category: true,
  price: true,
  ordinaryPrice: true,
  instructor: {
    select: {
      fullName: true,
      photo: true,
    },
  },
  chapters: {
    select: {
      _count: {
        select: { lessons: true },
      },
      lessons: {
        select: {
          duration: true,
          uid: true,
        },
      },
    },
  },
};

export const COURSE_PROGRESS = {
  progress: true,
  course: {
    select: {
      title: true,
      thumbnail: true,
      uid: true,
      chapters: {
        select: {
          _count: {
            select: { lessons: true },
          },
          lessons: { select: { uid: true } },
        },
      },
    },
  },
};

export interface CourseCardInfo {
  uid: string;
  title: string;
  thumbnail: string;
  price: number;
  ordinaryPrice: number | null;
  category: string;
  instructor: {
    fullName: string;
    photo: string | null;
  };
  chapters: {
    _count: {
      lessons: number;
    };
    lessons: {
      duration: number;
      uid: string;
    }[];
  }[];
}

export interface CourseProgressInfo {
  course: {
    uid: string;
    title: string;
    thumbnail: string;
    chapters: {
      _count: {
        lessons: number;
      };
      lessons: {
        uid: string;
      }[];
    }[];
  };
  progress: string[];
}

export type CourseDetails = {
  instructor: {
    fullName: string;
    photo: string | null;
    linkedin: string | null;
  };
  enrollments?: Enrollment[];
  chapters: {
    number: number;
    title: string;
    _count: {
      lessons: number;
    };
    lessons: {
      number: number;
      uid: string;
      title: string;
      source: string;
      duration: number;
    }[];
  }[];
} & Course;

export interface LessonDetails {
  uid: string;
  title: string;
  source: string;
  duration: number;
  vimeoUri: string;
}

export interface ChapterDetails {
  uid: string;
  title: string;
  lessons: LessonDetails[];
  vimeoFolder: string;
}

export interface LessonForm {
  uid?: string;
  title: string;
  source: string;
  number?: number;
  duration: number;
  vimeoUri: string;
}

export interface ChapterInput {
  uid?: string | undefined;
  title: string;
  number?: number;
  lessons: LessonForm[];
  vimeoFolder: string;
}

export interface BlogCommentCard {
  uid: string;
  content: string;
  _count: {
    replies: number;
    likes: number;
  };
  user: {
    fullName: string;
    photo: string | null;
  };
  replyToId: string | null;
  likes: { uid: string }[];
}

export type BlogContent = {
  author: {
    fullName: string;
    photo: string | null;
  };
  comments: BlogCommentCard[];
  _count: { comments: number };
} & Blog;

export const ROLES = ["user", "blogger", "recruiter", "instructor", "admin"];
