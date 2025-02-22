import prisma from "@/prisma/db";

export const createEnrollment = async (
  courseId: string,
  customerId: string
) => {
  const user = await prisma.user.findFirst({
    where: { customerId },
    select: { uid: true },
  });
  if (!user) return;
  const enrollment = await prisma.enrollment.create({
    data: {
      courseId,
      userId: user.uid,
    },
  });
};
