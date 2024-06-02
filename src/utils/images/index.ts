import index from "@/app/personas-reveal/page";

const images=[
    "https://cdn.pixabay.com/photo/2023/01/28/20/23/ai-generated-7751688_1280.jpg",
    "https://cdn.pixabay.com/photo/2023/03/06/15/37/ai-generated-7833751_1280.jpg",
    "https://cdn.pixabay.com/photo/2023/01/28/20/23/ai-generated-7751685_1280.jpg",
    "https://cdn.pixabay.com/photo/2023/06/16/15/10/man-8068201_1280.jpg",
    "https://cdn.pixabay.com/photo/2024/03/08/12/13/ai-generated-8620811_1280.jpg"


]
export const personasRevealImages = (index:number) => {
    return images[index];
}