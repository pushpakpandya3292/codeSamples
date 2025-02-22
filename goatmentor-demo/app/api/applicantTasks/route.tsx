import prisma from "@/prisma/db";
import verifyRole from "@/utils/verifyRole";
import { NextRequest, NextResponse } from "next/server";


export async function POST(request: NextRequest) {
    const token = request.headers.get("Authorization") || "";
    const uid = await verifyRole(token, "recruiter");
    if (typeof uid !== "string") return uid;

    const data = await request.json();
    const task = await prisma.applicantTasks.create({ data: data });

    return NextResponse.json(
        { data: task, message: "Task Created Successfully" },
        { status: 201 }
    );
}

export async function PATCH(request: NextRequest) {
    const token = request.headers.get("Authorization") || "";
    const requestUid = await verifyRole(token, "recruiter");
    if (typeof requestUid !== "string") return requestUid;

    const { uid, ...data } = await request.json();

    const task = await prisma.applicantTasks.update({
        where: { uid },
        data: data,
    });

    return NextResponse.json(
        { data: task, message: "Task Updated Successfully" },
        { status: 200 }
    );
}