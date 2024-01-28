import { NextResponse } from "next/server";
import { main } from "../route";
import prisma from "@/prisma";

export const GET = async (req: any, {params}: {params: any}) => {
    const {id} = params;

    try {
        const post = await prisma.post.findUnique({
            where: {id},
        });
        return NextResponse.json(post, {status: 200});
    } catch (err) {
        console.log(err);
        return NextResponse.json({message: "Ne radi ti dynamic Id!\n"}, {status: 500});
    }
};

export const PUT = async (req: Request, res: NextResponse) => {
    try {
        const id = req.url.split("/vijesti/")[1];
        const { title, description, content } = await req.json();
        await main();
        const post = await prisma.post.update({ 
            data: { title, description, content }, 
            where: { id },
        });
        return NextResponse.json({message: "Success", post}, {status: 200});
     } catch (err) {
         return NextResponse.json({message: "Error", err}, {status: 500});
     } finally {
         await prisma.$disconnect();
     }
};
export const DELETE = async (req: Request, res: NextResponse) => {
    try {
        const id = req.url.split("/vijesti/")[1];
        await main();
        const post = await prisma.post.delete({where: { id }});
        return NextResponse.json({message: "Success", post}, {status: 200});
     } catch (err) {
         return NextResponse.json({message: "Error", err}, {status: 500});
     } finally {
         await prisma.$disconnect();
     }
};